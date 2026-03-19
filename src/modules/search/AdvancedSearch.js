// ==================== AdvancedSearch - 高级搜索模块 ====================
// 支持多条件组合搜索、搜索结果可视化、搜索历史

class AdvancedSearch {
  constructor(options = {}) {
    this.options = {
      maxResults: 50,
      fuzzyThreshold: 0.6,
      enableHistory: true,
      maxHistorySize: 20,
      ...options
    };

    this.documents = new Map();
    this.index = new Map();
    this.history = [];
    this.filters = new Map();
    this.searchId = 0;
  }

  // 添加文档到索引
  addDocument(doc) {
    if (!doc.id) {
      console.warn('[AdvancedSearch] Document must have an id');
      return;
    }

    this.documents.set(doc.id, {
      ...doc,
      _indexedAt: Date.now()
    });

    // 构建倒排索引
    this.indexDocument(doc);
  }

  // 构建倒排索引
  indexDocument(doc) {
    const fields = ['name', 'description', 'tags', 'type', 'severity'];

    fields.forEach(field => {
      if (doc[field]) {
        const tokens = this.tokenize(String(doc[field]));
        tokens.forEach(token => {
          if (!this.index.has(token)) {
            this.index.set(token, new Set());
          }
          this.index.get(token).add(doc.id);
        });
      }
    });
  }

  // 分词
  tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^\u4e00-\u9fa5a-z0-9]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 1);
  }

  // 高级搜索
  search(query, options = {}) {
    const startTime = performance.now();
    this.searchId++;

    const {
      filters = {},
      sortBy = 'relevance',
      limit = this.options.maxResults,
      highlight = true,
      includePath = false
    } = options;

    let results = [];

    // 1. 文本搜索
    if (query && query.trim()) {
      results = this.textSearch(query);
    } else {
      // 无查询词时返回所有文档
      results = Array.from(this.documents.values()).map(doc => ({
        document: doc,
        score: 1
      }));
    }

    // 2. 应用过滤器
    if (Object.keys(filters).length > 0) {
      results = this.applyFilters(results, filters);
    }

    // 3. 排序
    results = this.sortResults(results, sortBy);

    // 4. 高亮
    if (highlight && query) {
      results = results.map(result => ({
        ...result,
        highlighted: this.highlightMatches(result.document, query)
      }));
    }

    // 5. 限制结果数
    results = results.slice(0, limit);

    const searchTime = performance.now() - startTime;

    // 记录搜索历史
    if (this.options.enableHistory && query) {
      this.addToHistory(query, filters, results.length);
    }

    return {
      results,
      total: results.length,
      query,
      filters,
      time: searchTime,
      searchId: this.searchId
    };
  }

  // 文本搜索
  textSearch(query) {
    const tokens = this.tokenize(query);
    const scores = new Map();

    // 精确匹配
    this.documents.forEach((doc, id) => {
      let score = 0;
      const queryLower = query.toLowerCase();

      // 名称精确匹配（权重最高）
      if (doc.name && doc.name.toLowerCase().includes(queryLower)) {
        score += doc.name.toLowerCase() === queryLower ? 100 : 50;
      }

      // 描述匹配
      if (doc.description && doc.description.toLowerCase().includes(queryLower)) {
        score += 20;
      }

      // 标签匹配
      if (doc.tags && doc.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
        score += 30;
      }

      if (score > 0) {
        scores.set(id, (scores.get(id) || 0) + score);
      }
    });

    // 分词匹配
    tokens.forEach(token => {
      const docIds = this.index.get(token);
      if (docIds) {
        docIds.forEach(id => {
          const doc = this.documents.get(id);
          if (doc) {
            // 计算TF-IDF分数
            const tf = this.calculateTF(token, doc);
            const idf = this.calculateIDF(token);
            const score = tf * idf * 10;

            scores.set(id, (scores.get(id) || 0) + score);
          }
        });
      }

      // 模糊匹配
      this.index.forEach((docIds, indexedToken) => {
        const distance = this.levenshteinDistance(token, indexedToken);
        const similarity = 1 - distance / Math.max(token.length, indexedToken.length);

        if (similarity >= this.options.fuzzyThreshold) {
          docIds.forEach(id => {
            const score = similarity * 5;
            scores.set(id, (scores.get(id) || 0) + score);
          });
        }
      });
    });

    // 转换为结果数组
    return Array.from(scores.entries())
      .map(([id, score]) => ({
        document: this.documents.get(id),
        score
      }))
      .filter(result => result.document);
  }

  // 计算词频（TF）
  calculateTF(token, doc) {
    let count = 0;
    const text = `${doc.name} ${doc.description || ''}`.toLowerCase();
    const tokens = this.tokenize(text);

    tokens.forEach(t => {
      if (t === token) count++;
    });

    return count / tokens.length;
  }

  // 计算逆文档频率（IDF）
  calculateIDF(token) {
    const docCount = this.index.get(token)?.size || 0;
    const totalDocs = this.documents.size;
    return Math.log(totalDocs / (docCount + 1)) + 1;
  }

  // 应用过滤器
  applyFilters(results, filters) {
    return results.filter(result => {
      const doc = result.document;

      for (const [field, value] of Object.entries(filters)) {
        if (value === undefined || value === null) continue;

        switch (field) {
          case 'type':
            if (Array.isArray(value)) {
              if (!value.includes(doc.type)) return false;
            } else if (doc.type !== value) {
              return false;
            }
            break;

          case 'severity':
            if (Array.isArray(value)) {
              if (!value.includes(doc.severity)) return false;
            } else if (doc.severity !== value) {
              return false;
            }
            break;

          case 'tags':
            if (Array.isArray(value)) {
              if (!value.some(tag => doc.tags?.includes(tag))) return false;
            } else if (!doc.tags?.includes(value)) {
              return false;
            }
            break;

          case 'dateRange':
            const docDate = new Date(doc.date || doc._indexedAt);
            if (value.start && docDate < new Date(value.start)) return false;
            if (value.end && docDate > new Date(value.end)) return false;
            break;
        }
      }

      return true;
    });
  }

  // 排序结果
  sortResults(results, sortBy) {
    const sortFunctions = {
      relevance: (a, b) => b.score - a.score,
      name: (a, b) => a.document.name.localeCompare(b.document.name),
      date: (a, b) => (b.document.date || 0) - (a.document.date || 0),
      severity: (a, b) => {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityOrder[b.document.severity] - severityOrder[a.document.severity];
      }
    };

    const sortFn = sortFunctions[sortBy] || sortFunctions.relevance;
    return results.sort(sortFn);
  }

  // 高亮匹配文本
  highlightMatches(doc, query) {
    const highlighted = {};
    const queryLower = query.toLowerCase();

    ['name', 'description'].forEach(field => {
      if (doc[field]) {
        const text = doc[field];
        const regex = new RegExp(`(${this.escapeRegex(query)})`, 'gi');
        highlighted[field] = text.replace(regex, '<mark>$1</mark>');
      }
    });

    return highlighted;
  }

  // 转义正则表达式特殊字符
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 计算编辑距离（Levenshtein Distance）
  levenshteinDistance(a, b) {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
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

    return matrix[b.length][a.length];
  }

  // 自动补全建议
  autocomplete(query, limit = 10) {
    if (!query || query.length < 1) return [];

    const tokens = this.tokenize(query);
    const suggestions = new Map();

    // 基于前缀匹配
    this.index.forEach((docIds, token) => {
      if (token.startsWith(query.toLowerCase())) {
        suggestions.set(token, docIds.size);
      }
    });

    // 基于模糊匹配
    if (suggestions.size < limit) {
      this.index.forEach((docIds, token) => {
        if (suggestions.has(token)) return;

        const distance = this.levenshteinDistance(query.toLowerCase(), token);
        const similarity = 1 - distance / Math.max(query.length, token.length);

        if (similarity >= this.options.fuzzyThreshold) {
          suggestions.set(token, docIds.size);
        }
      });
    }

    return Array.from(suggestions.entries())
      .map(([text, docCount]) => ({ text, docCount }))
      .sort((a, b) => b.docCount - a.docCount)
      .slice(0, limit);
  }

  // 添加到搜索历史
  addToHistory(query, filters, resultCount) {
    const entry = {
      id: Date.now(),
      query,
      filters: { ...filters },
      resultCount,
      timestamp: new Date().toISOString()
    };

    // 去重
    this.history = this.history.filter(h => h.query !== query);

    // 添加到开头
    this.history.unshift(entry);

    // 限制历史记录大小
    if (this.history.length > this.options.maxHistorySize) {
      this.history = this.history.slice(0, this.options.maxHistorySize);
    }
  }

  // 获取搜索历史
  getHistory() {
    return this.history;
  }

  // 清除搜索历史
  clearHistory() {
    this.history = [];
  }

  // 保存搜索预设
  saveFilterPreset(name, filters) {
    this.filters.set(name, {
      filters: { ...filters },
      createdAt: new Date().toISOString()
    });
  }

  // 获取搜索预设
  getFilterPreset(name) {
    return this.filters.get(name);
  }

  // 获取所有预设
  getAllFilterPresets() {
    return Array.from(this.filters.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  }

  // 删除预设
  deleteFilterPreset(name) {
    this.filters.delete(name);
  }

  // 查找路径（从一个节点到另一个节点）
  findPath(startId, endId) {
    const start = this.documents.get(startId);
    const end = this.documents.get(endId);

    if (!start || !end) return null;

    // BFS查找最短路径
    const queue = [[start]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      if (current.id === endId) {
        return path;
      }

      // 查找相邻节点
      this.documents.forEach(doc => {
        if (!visited.has(doc.id)) {
          // 检查是否有连接关系
          const isConnected = this.checkConnection(current.id, doc.id);
          if (isConnected) {
            visited.add(doc.id);
            queue.push([...path, doc]);
          }
        }
      });
    }

    return null;
  }

  // 检查两个节点是否有连接
  checkConnection(id1, id2) {
    // 这里需要根据实际的连接数据结构来实现
    // 简化版本：检查是否有共同的标签或类型
    const doc1 = this.documents.get(id1);
    const doc2 = this.documents.get(id2);

    if (!doc1 || !doc2) return false;

    // 检查标签重叠
    if (doc1.tags && doc2.tags) {
      return doc1.tags.some(tag => doc2.tags.includes(tag));
    }

    return false;
  }

  // 获取相关节点
  getRelatedNodes(nodeId, limit = 5) {
    const node = this.documents.get(nodeId);
    if (!node) return [];

    const related = [];

    this.documents.forEach((doc, id) => {
      if (id === nodeId) return;

      let score = 0;

      // 类型相同
      if (doc.type === node.type) score += 10;

      // 严重程度相同
      if (doc.severity === node.severity) score += 5;

      // 标签重叠
      if (doc.tags && node.tags) {
        const commonTags = doc.tags.filter(tag => node.tags.includes(tag));
        score += commonTags.length * 15;
      }

      // 描述相似度（简单版本）
      if (doc.description && node.description) {
        const commonWords = this.getCommonWords(doc.description, node.description);
        score += commonWords.length * 5;
      }

      if (score > 0) {
        related.push({ document: doc, score });
      }
    });

    return related
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // 获取两个文本的共同词汇
  getCommonWords(text1, text2) {
    const words1 = this.tokenize(text1);
    const words2 = this.tokenize(text2);
    return words1.filter(word => words2.includes(word));
  }

  // 清除所有数据
  clear() {
    this.documents.clear();
    this.index.clear();
    this.history = [];
    this.filters.clear();
  }
}

// 导出
export { AdvancedSearch };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AdvancedSearch };
}

if (typeof window !== 'undefined') {
  window.AdvancedSearch = AdvancedSearch;
}
