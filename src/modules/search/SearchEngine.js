// ==================== SearchEngine - 智能搜索引擎 ====================
// 支持全文检索、模糊匹配、语义相似度、多维度过滤

class SearchEngine {
  constructor(options = {}) {
    this.options = {
      caseSensitive: false,
      fuzzyThreshold: 0.6,
      maxResults: 50,
      indexFields: ['name', 'description', 'symptoms', 'causes', 'solutions', 'tags'],
      ...options
    };
    
    // 索引数据
    this.documents = new Map();
    this.invertedIndex = new Map();
    this.fieldIndexes = new Map();
    
    // 搜索历史
    this.searchHistory = [];
    this.maxHistory = 20;
    
    // 缓存
    this.queryCache = new Map();
    this.cacheSize = 100;
    
    // 性能统计
    this.stats = {
      totalQueries: 0,
      avgQueryTime: 0,
      cacheHitRate: 0
    };
  }
  
  // 添加文档到索引
  addDocument(doc) {
    if (!doc.id) {
      console.warn('[SearchEngine] 文档缺少 id 字段');
      return;
    }
    
    // 处理文档
    const processedDoc = this.processDocument(doc);
    this.documents.set(doc.id, processedDoc);
    
    // 更新倒排索引
    this.updateInvertedIndex(processedDoc);
    
    // 清除相关缓存
    this.invalidateCache();
  }
  
  // 批量添加文档
  addDocuments(docs) {
    for (const doc of docs) {
      this.addDocument(doc);
    }
  }
  
  // 移除文档
  removeDocument(docId) {
    const doc = this.documents.get(docId);
    if (!doc) return;
    
    // 从倒排索引中移除
    this.removeFromInvertedIndex(doc);
    
    // 移除文档
    this.documents.delete(docId);
    
    // 清除缓存
    this.invalidateCache();
  }
  
  // 更新文档
  updateDocument(doc) {
    this.removeDocument(doc.id);
    this.addDocument(doc);
  }
  
  // 处理文档
  processDocument(doc) {
    const processed = {
      ...doc,
      _tokens: new Map(),
      _searchableText: ''
    };
    
    // 对每个字段进行分词
    for (const field of this.options.indexFields) {
      if (doc[field]) {
        const text = Array.isArray(doc[field]) 
          ? doc[field].join(' ') 
          : String(doc[field]);
        
        const tokens = this.tokenize(text);
        processed._tokens.set(field, tokens);
        processed._searchableText += ' ' + text;
      }
    }
    
    // 整体分词
    processed._allTokens = this.tokenize(processed._searchableText);
    
    return processed;
  }
  
  // 分词
  tokenize(text) {
    if (!text) return [];
    
    // 预处理
    let processed = text;
    if (!this.options.caseSensitive) {
      processed = text.toLowerCase();
    }
    
    // 中文分词（简单实现）
    const chineseTokens = processed.match(/[\u4e00-\u9fa5]/g) || [];
    
    // 英文分词
    const englishTokens = processed
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 0);
    
    // 合并并去重
    return [...new Set([...chineseTokens, ...englishTokens])];
  }
  
  // 更新倒排索引
  updateInvertedIndex(doc) {
    for (const [field, tokens] of doc._tokens) {
      for (const token of tokens) {
        const key = `${field}:${token}`;
        if (!this.invertedIndex.has(key)) {
          this.invertedIndex.set(key, new Set());
        }
        this.invertedIndex.get(key).add(doc.id);
      }
    }
    
    // 更新全局索引
    for (const token of doc._allTokens) {
      if (!this.invertedIndex.has(token)) {
        this.invertedIndex.set(token, new Set());
      }
      this.invertedIndex.get(token).add(doc.id);
    }
  }
  
  // 从倒排索引中移除
  removeFromInvertedIndex(doc) {
    for (const [field, tokens] of doc._tokens) {
      for (const token of tokens) {
        const key = `${field}:${token}`;
        const set = this.invertedIndex.get(key);
        if (set) {
          set.delete(doc.id);
          if (set.size === 0) {
            this.invertedIndex.delete(key);
          }
        }
      }
    }
    
    for (const token of doc._allTokens) {
      const set = this.invertedIndex.get(token);
      if (set) {
        set.delete(doc.id);
        if (set.size === 0) {
          this.invertedIndex.delete(token);
        }
      }
    }
  }
  
  // 搜索
  search(query, options = {}) {
    const startTime = performance.now();
    
    const {
      filters = {},
      sortBy = 'relevance',
      limit = this.options.maxResults,
      fuzzy = true,
      highlight = false
    } = options;
    
    // 检查缓存
    const cacheKey = this.getCacheKey(query, options);
    if (this.queryCache.has(cacheKey)) {
      this.stats.cacheHitRate = (this.stats.cacheHitRate * this.stats.totalQueries + 1) / (this.stats.totalQueries + 1);
      return this.queryCache.get(cacheKey);
    }
    
    // 解析查询
    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return { results: [], total: 0, query, time: 0 };
    }
    
    // 执行搜索
    let results = this.executeSearch(queryTokens, fuzzy);
    
    // 应用过滤器
    results = this.applyFilters(results, filters);
    
    // 排序
    results = this.sortResults(results, sortBy, queryTokens);
    
    // 限制结果数量
    const total = results.length;
    results = results.slice(0, limit);
    
    // 高亮
    if (highlight) {
      results = results.map(r => ({
        ...r,
        highlighted: this.highlightMatches(r.document, queryTokens)
      }));
    }
    
    // 格式化结果
    const formattedResults = results.map(r => ({
      id: r.document.id,
      score: r.score,
      document: r.document,
      matchedFields: r.matchedFields,
      ...(highlight && { highlighted: r.highlighted })
    }));
    
    const queryTime = performance.now() - startTime;
    
    // 更新统计
    this.updateStats(queryTime);
    
    // 添加到历史
    this.addToHistory(query, formattedResults.length);
    
    const result = {
      results: formattedResults,
      total,
      query,
      time: queryTime,
      suggestions: this.getSuggestions(query)
    };
    
    // 缓存结果
    this.addToCache(cacheKey, result);
    
    return result;
  }
  
  // 执行搜索核心逻辑
  executeSearch(queryTokens, fuzzy) {
    const scores = new Map();
    const matchedFields = new Map();
    
    for (const token of queryTokens) {
      // 精确匹配
      const exactMatches = this.invertedIndex.get(token);
      if (exactMatches) {
        for (const docId of exactMatches) {
          this.addScore(scores, matchedFields, docId, 1.0, 'exact');
        }
      }
      
      // 模糊匹配
      if (fuzzy && token.length > 2) {
        for (const [key, docIds] of this.invertedIndex) {
          if (key.includes(':')) continue; // 跳过字段特定索引
          
          const similarity = this.calculateSimilarity(token, key);
          if (similarity >= this.options.fuzzyThreshold) {
            for (const docId of docIds) {
              this.addScore(scores, matchedFields, docId, similarity * 0.5, 'fuzzy');
            }
          }
        }
      }
    }
    
    // 构建结果列表
    const results = [];
    for (const [docId, score] of scores) {
      const doc = this.documents.get(docId);
      if (doc) {
        results.push({
          document: doc,
          score,
          matchedFields: matchedFields.get(docId) || new Set()
        });
      }
    }
    
    return results;
  }
  
  // 添加分数
  addScore(scores, matchedFields, docId, score, matchType) {
    scores.set(docId, (scores.get(docId) || 0) + score);
    
    if (!matchedFields.has(docId)) {
      matchedFields.set(docId, new Set());
    }
    matchedFields.get(docId).add(matchType);
  }
  
  // 计算字符串相似度
  calculateSimilarity(s1, s2) {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }
  
  // Levenshtein 距离
  levenshteinDistance(s1, s2) {
    const matrix = [];
    
    for (let i = 0; i <= s2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= s1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= s2.length; i++) {
      for (let j = 1; j <= s1.length; j++) {
        if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[s2.length][s1.length];
  }
  
  // 应用过滤器
  applyFilters(results, filters) {
    return results.filter(r => {
      for (const [field, value] of Object.entries(filters)) {
        const docValue = r.document[field];
        
        if (Array.isArray(value)) {
          if (!value.includes(docValue)) return false;
        } else if (typeof value === 'function') {
          if (!value(docValue)) return false;
        } else {
          if (docValue !== value) return false;
        }
      }
      return true;
    });
  }
  
  // 排序结果
  sortResults(results, sortBy, queryTokens) {
    switch (sortBy) {
      case 'relevance':
        return results.sort((a, b) => b.score - a.score);
      
      case 'name':
        return results.sort((a, b) => {
          const nameA = (a.document.name || '').toLowerCase();
          const nameB = (b.document.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
      
      case 'severity':
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return results.sort((a, b) => {
          const sevA = severityOrder[a.document.severity] || 999;
          const sevB = severityOrder[b.document.severity] || 999;
          return sevA - sevB;
        });
      
      default:
        return results;
    }
  }
  
  // 高亮匹配
  highlightMatches(document, queryTokens) {
    const highlighted = {};
    
    for (const field of this.options.indexFields) {
      if (!document[field]) continue;
      
      let text = Array.isArray(document[field]) 
        ? document[field].join(', ')
        : String(document[field]);
      
      // 高亮匹配的词
      for (const token of queryTokens) {
        const regex = new RegExp(`(${this.escapeRegex(token)})`, 'gi');
        text = text.replace(regex, '<mark>$1</mark>');
      }
      
      highlighted[field] = text;
    }
    
    return highlighted;
  }
  
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  // 获取搜索建议
  getSuggestions(query) {
    if (query.length < 2) return [];
    
    const suggestions = [];
    const queryLower = query.toLowerCase();
    
    // 基于历史记录
    for (const history of this.searchHistory) {
      if (history.query.toLowerCase().startsWith(queryLower) && 
          history.query !== query) {
        suggestions.push({
          text: history.query,
          type: 'history',
          count: history.count
        });
      }
    }
    
    // 基于索引
    for (const [key] of this.invertedIndex) {
      if (key.includes(':')) continue;
      
      if (key.toLowerCase().startsWith(queryLower) && 
          !suggestions.find(s => s.text === key)) {
        suggestions.push({
          text: key,
          type: 'suggestion',
          count: this.invertedIndex.get(key).size
        });
      }
    }
    
    return suggestions.slice(0, 5);
  }
  
  // 自动补全
  autocomplete(prefix, limit = 10) {
    if (prefix.length < 1) return [];
    
    const prefixLower = prefix.toLowerCase();
    const completions = [];
    
    for (const [key] of this.invertedIndex) {
      if (key.includes(':')) continue;
      
      if (key.toLowerCase().startsWith(prefixLower)) {
        completions.push({
          text: key,
          docCount: this.invertedIndex.get(key).size
        });
      }
      
      if (completions.length >= limit) break;
    }
    
    return completions.sort((a, b) => b.docCount - a.docCount);
  }
  
  // 高级搜索语法
  advancedSearch(queryString) {
    // 解析查询字符串
    // 支持: field:value, "exact phrase", +must, -must_not
    const parsed = this.parseAdvancedQuery(queryString);
    
    return this.search(parsed.query, {
      filters: parsed.filters,
      fuzzy: parsed.fuzzy
    });
  }
  
  parseAdvancedQuery(queryString) {
    const filters = {};
    const terms = [];
    let fuzzy = true;
    
    // 字段过滤: field:value
    const fieldRegex = /(\w+):"([^"]+)"|(\w+):(\S+)/g;
    let match;
    while ((match = fieldRegex.exec(queryString)) !== null) {
      const field = match[1] || match[3];
      const value = match[2] || match[4];
      filters[field] = value;
    }
    
    // 剩余部分作为查询词
    let remaining = queryString.replace(fieldRegex, '').trim();
    
    // 精确短语: "phrase"
    const phraseRegex = /"([^"]+)"/g;
    while ((match = phraseRegex.exec(remaining)) !== null) {
      terms.push(match[1]);
    }
    remaining = remaining.replace(phraseRegex, '').trim();
    
    // 必须包含: +term
    // 必须排除: -term
    const words = remaining.split(/\s+/);
    for (const word of words) {
      if (word.startsWith('+')) {
        terms.push(word.slice(1));
      } else if (word.startsWith('-')) {
        // 排除逻辑在 filters 中处理
      } else if (word) {
        terms.push(word);
      }
    }
    
    return { query: terms.join(' '), filters, fuzzy };
  }
  
  // 获取热门搜索
  getTrendingSearches(limit = 10) {
    const sorted = [...this.searchHistory]
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    
    return sorted.map(h => ({
      query: h.query,
      count: h.count,
      lastSearched: h.lastSearched
    }));
  }
  
  // 获取搜索历史
  getSearchHistory() {
    return [...this.searchHistory];
  }
  
  // 清除历史
  clearHistory() {
    this.searchHistory = [];
  }
  
  // 添加到历史
  addToHistory(query, resultCount) {
    const existing = this.searchHistory.find(h => h.query === query);
    
    if (existing) {
      existing.count++;
      existing.lastSearched = Date.now();
      existing.resultCount = resultCount;
    } else {
      this.searchHistory.unshift({
        query,
        count: 1,
        lastSearched: Date.now(),
        resultCount
      });
      
      if (this.searchHistory.length > this.maxHistory) {
        this.searchHistory.pop();
      }
    }
  }
  
  // 缓存相关
  getCacheKey(query, options) {
    return `${query}:${JSON.stringify(options)}`;
  }
  
  addToCache(key, result) {
    if (this.queryCache.size >= this.cacheSize) {
      const firstKey = this.queryCache.keys().next().value;
      this.queryCache.delete(firstKey);
    }
    this.queryCache.set(key, result);
  }
  
  invalidateCache() {
    this.queryCache.clear();
  }
  
  // 统计
  updateStats(queryTime) {
    this.stats.totalQueries++;
    this.stats.avgQueryTime = 
      (this.stats.avgQueryTime * (this.stats.totalQueries - 1) + queryTime) / 
      this.stats.totalQueries;
  }
  
  getStats() {
    return { ...this.stats };
  }
  
  // 清空所有数据
  clear() {
    this.documents.clear();
    this.invertedIndex.clear();
    this.fieldIndexes.clear();
    this.queryCache.clear();
    this.searchHistory = [];
  }
  
  // 获取索引统计
  getIndexStats() {
    return {
      documents: this.documents.size,
      tokens: this.invertedIndex.size,
      cacheSize: this.queryCache.size,
      historySize: this.searchHistory.length
    };
  }
}

// 导出
export { SearchEngine };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SearchEngine };
}

if (typeof window !== 'undefined') {
  window.SearchEngine = SearchEngine;
}
