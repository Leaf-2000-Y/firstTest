// ==================== DataLoader - 运行时数据加载器 ====================
// 支持开发/生产模式、按需加载、增量更新、缓存管理

class DataLoader {
  constructor(options = {}) {
    this.options = {
      mode: 'development', // 'development' | 'production'
      baseUrl: '',
      cacheEnabled: true,
      lazyLoading: true,
      preloadDomains: [], // 预加载的领域
      retryAttempts: 3,
      retryDelay: 1000,
      ...options
    };

    this.cache = new Map();
    this.loadedDomains = new Set();
    this.loadingPromises = new Map();
    this.manifest = null;
    this.data = {
      center: null,
      domains: [],
      knowledgeNodes: {},
      relationships: [],
      extensions: {},
      statistics: {}
    };

    this.listeners = new Map();
    this.isInitialized = false;
  }

  // 初始化加载器
  async initialize() {
    if (this.isInitialized) return;

    console.log('[DataLoader] 初始化...');

    try {
      // 1. 加载清单
      await this.loadManifest();

      // 2. 加载核心数据
      await this.loadCore();

      // 3. 预加载指定领域
      if (this.options.preloadDomains.length > 0) {
        await Promise.all(
          this.options.preloadDomains.map(domain => this.loadDomain(domain))
        );
      }

      this.isInitialized = true;
      this.emit('initialized', { data: this.data });
      console.log('[DataLoader] 初始化完成');

    } catch (error) {
      console.error('[DataLoader] 初始化失败:', error);
      this.emit('error', { error });
      throw error;
    }
  }

  // 加载清单
  async loadManifest() {
    const manifestUrl = this.getDataUrl('manifest.json');
    
    try {
      const response = await this.fetchWithRetry(manifestUrl);
      this.manifest = await response.json();
      console.log('[DataLoader] 清单加载完成:', this.manifest.version);
    } catch (error) {
      console.warn('[DataLoader] 无法加载清单，使用默认配置');
      this.manifest = { version: '1.0.0', files: {} };
    }
  }

  // 加载核心数据
  async loadCore() {
    if (this.options.mode === 'development') {
      // 开发模式：加载完整数据
      const dataUrl = this.getDataUrl('data.json');
      const response = await this.fetchWithRetry(dataUrl);
      const fullData = await response.json();
      
      this.data = { ...this.data, ...fullData };
      
      // 标记所有领域已加载
      Object.keys(fullData.knowledgeNodes || {}).forEach(domain => {
        this.loadedDomains.add(domain);
      });
      
    } else {
      // 生产模式：加载核心数据
      const coreUrl = this.getDataUrl('data.split/core.json');
      const response = await this.fetchWithRetry(coreUrl);
      const coreData = await response.json();
      
      this.data.center = coreData.center;
      this.data.domains = coreData.domains;
      this.data.metadata = coreData.metadata;
    }

    console.log('[DataLoader] 核心数据加载完成');
  }

  // 加载特定领域
  async loadDomain(domainId) {
    // 检查是否已加载
    if (this.loadedDomains.has(domainId)) {
      return this.data.knowledgeNodes[domainId];
    }

    // 检查是否正在加载
    if (this.loadingPromises.has(domainId)) {
      return this.loadingPromises.get(domainId);
    }

    // 创建加载Promise
    const loadPromise = this.doLoadDomain(domainId);
    this.loadingPromises.set(domainId, loadPromise);

    try {
      const result = await loadPromise;
      this.loadedDomains.add(domainId);
      this.loadingPromises.delete(domainId);
      
      this.emit('domainLoaded', { domainId, data: result });
      return result;
      
    } catch (error) {
      this.loadingPromises.delete(domainId);
      throw error;
    }
  }

  // 实际加载领域数据
  async doLoadDomain(domainId) {
    console.log(`[DataLoader] 加载领域: ${domainId}`);

    // 检查缓存
    if (this.options.cacheEnabled) {
      const cached = this.getCache(`domain_${domainId}`);
      if (cached) {
        console.log(`[DataLoader] 使用缓存: ${domainId}`);
        this.data.knowledgeNodes[domainId] = cached.categories;
        return cached.categories;
      }
    }

    // 加载数据
    const dataUrl = this.getDataUrl(`data.split/${domainId}.json`);
    const response = await this.fetchWithRetry(dataUrl);
    const domainData = await response.json();

    // 存储数据
    this.data.knowledgeNodes[domainId] = domainData.categories;

    // 缓存数据
    if (this.options.cacheEnabled) {
      this.setCache(`domain_${domainId}`, domainData);
    }

    return domainData.categories;
  }

  // 加载扩展数据
  async loadExtensions() {
    if (this.data.extensions && Object.keys(this.data.extensions).length > 0) {
      return this.data.extensions;
    }

    const extensionsUrl = this.getDataUrl('data.split/extensions.json');
    const response = await this.fetchWithRetry(extensionsUrl);
    this.data.extensions = await response.json();

    return this.data.extensions;
  }

  // 加载关系数据
  async loadRelationships() {
    if (this.data.relationships.length > 0) {
      return this.data.relationships;
    }

    const relationshipsUrl = this.getDataUrl('data.split/relationships.json');
    const response = await this.fetchWithRetry(relationshipsUrl);
    this.data.relationships = await response.json();

    return this.data.relationships;
  }

  // 获取数据URL
  getDataUrl(filename) {
    const basePath = this.options.mode === 'development' 
      ? 'data/build/development'
      : 'data/build/production';
    
    return `${this.options.baseUrl}/${basePath}/${filename}`;
  }

  // 带重试的fetch
  async fetchWithRetry(url, options = {}, attempt = 1) {
    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
      
    } catch (error) {
      if (attempt < this.options.retryAttempts) {
        console.warn(`[DataLoader] 重试 ${url} (${attempt}/${this.options.retryAttempts})`);
        await this.delay(this.options.retryDelay * attempt);
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      
      throw error;
    }
  }

  // 延迟
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 缓存管理
  getCache(key) {
    if (!this.options.cacheEnabled) return null;
    
    try {
      const item = localStorage.getItem(`dataLoader_${key}`);
      if (!item) return null;
      
      const { data, timestamp, ttl } = JSON.parse(item);
      
      // 检查是否过期
      if (ttl && Date.now() - timestamp > ttl) {
        localStorage.removeItem(`dataLoader_${key}`);
        return null;
      }
      
      return data;
    } catch {
      return null;
    }
  }

  setCache(key, data, ttl = 24 * 60 * 60 * 1000) {
    if (!this.options.cacheEnabled) return;
    
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(`dataLoader_${key}`, JSON.stringify(item));
    } catch (error) {
      console.warn('[DataLoader] 缓存失败:', error);
    }
  }

  clearCache() {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith('dataLoader_'))
        .forEach(key => localStorage.removeItem(key));
      
      this.cache.clear();
      console.log('[DataLoader] 缓存已清除');
    } catch (error) {
      console.error('[DataLoader] 清除缓存失败:', error);
    }
  }

  // 获取节点
  async getNode(nodeId) {
    // 先检查已加载的数据
    for (const categories of Object.values(this.data.knowledgeNodes)) {
      for (const category of Object.values(categories)) {
        if (category.problems) {
          const node = category.problems.find(p => p.id === nodeId);
          if (node) return node;
        }
      }
    }

    // 如果找不到，尝试加载所有领域
    if (this.options.lazyLoading) {
      for (const domain of this.data.domains) {
        if (!this.loadedDomains.has(domain.id)) {
          await this.loadDomain(domain.id);
          
          // 再次查找
          for (const category of Object.values(this.data.knowledgeNodes[domain.id] || {})) {
            if (category.problems) {
              const node = category.problems.find(p => p.id === nodeId);
              if (node) return node;
            }
          }
        }
      }
    }

    return null;
  }

  // 搜索节点
  async searchNodes(query, options = {}) {
    const { 
      domain = null, 
      type = null, 
      severity = null,
      limit = 50 
    } = options;

    const results = [];

    // 确保所有领域已加载
    const domainsToSearch = domain 
      ? [domain] 
      : this.data.domains.map(d => d.id);

    for (const domainId of domainsToSearch) {
      await this.loadDomain(domainId);
      
      const categories = this.data.knowledgeNodes[domainId];
      if (!categories) continue;

      for (const category of Object.values(categories)) {
        if (!category.problems) continue;

        for (const problem of category.problems) {
          // 过滤条件
          if (type && problem.type !== type) continue;
          if (severity && problem.severity !== severity) continue;

          // 搜索匹配
          const matchScore = this.calculateMatchScore(problem, query);
          if (matchScore > 0) {
            results.push({ node: problem, score: matchScore, domain: domainId });
          }
        }
      }
    }

    // 按匹配度排序并限制数量
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(r => r.node);
  }

  // 计算匹配分数
  calculateMatchScore(node, query) {
    const queryLower = query.toLowerCase();
    let score = 0;

    // 名称匹配（权重最高）
    if (node.name?.toLowerCase().includes(queryLower)) {
      score += node.name.toLowerCase() === queryLower ? 100 : 50;
    }

    // 描述匹配
    if (node.description?.toLowerCase().includes(queryLower)) {
      score += 20;
    }

    // ID匹配
    if (node.id?.toLowerCase().includes(queryLower)) {
      score += 30;
    }

    return score;
  }

  // 获取统计
  getStatistics() {
    return this.data.statistics || {};
  }

  // 获取完整数据
  getData() {
    return this.data;
  }

  // 检查领域是否已加载
  isDomainLoaded(domainId) {
    return this.loadedDomains.has(domainId);
  }

  // 获取已加载领域列表
  getLoadedDomains() {
    return Array.from(this.loadedDomains);
  }

  // 事件监听
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[DataLoader] 事件处理错误:`, error);
        }
      });
    }
  }

  // 检查更新
  async checkUpdate() {
    try {
      const manifestUrl = this.getDataUrl('manifest.json');
      const response = await fetch(manifestUrl, { cache: 'no-cache' });
      const newManifest = await response.json();

      const currentVersion = this.manifest?.version;
      const newVersion = newManifest.version;

      return {
        hasUpdate: newVersion !== currentVersion,
        currentVersion,
        newVersion,
        manifest: newManifest
      };
    } catch (error) {
      console.error('[DataLoader] 检查更新失败:', error);
      return { hasUpdate: false, error };
    }
  }

  // 更新数据
  async update() {
    const updateInfo = await this.checkUpdate();
    
    if (!updateInfo.hasUpdate) {
      console.log('[DataLoader] 数据已是最新');
      return false;
    }

    console.log(`[DataLoader] 更新数据: ${updateInfo.currentVersion} -> ${updateInfo.newVersion}`);

    // 清除缓存
    this.clearCache();

    // 重新初始化
    this.isInitialized = false;
    this.loadedDomains.clear();
    this.data = {
      center: null,
      domains: [],
      knowledgeNodes: {},
      relationships: [],
      extensions: {},
      statistics: {}
    };

    await this.initialize();
    
    this.emit('updated', { version: updateInfo.newVersion });
    return true;
  }

  // 预加载所有领域
  async preloadAll() {
    console.log('[DataLoader] 预加载所有领域...');
    
    const domains = this.data.domains.map(d => d.id);
    
    for (let i = 0; i < domains.length; i++) {
      const domainId = domains[i];
      await this.loadDomain(domainId);
      
      // 报告进度
      const progress = ((i + 1) / domains.length) * 100;
      this.emit('preloadProgress', { 
        domainId, 
        progress, 
        loaded: i + 1, 
        total: domains.length 
      });
    }

    console.log('[DataLoader] 所有领域加载完成');
  }
}

// 创建全局实例
const dataLoader = new DataLoader();

// 导出
export { DataLoader, dataLoader };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataLoader, dataLoader };
}

if (typeof window !== 'undefined') {
  window.DataLoader = DataLoader;
  window.dataLoader = dataLoader;
}
