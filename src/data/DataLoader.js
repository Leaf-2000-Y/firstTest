// ==================== DataLoader - 数据加载器 ====================
// 负责从各种来源加载和合并数据

import { GraphDataManager } from './GraphDataManager.js';

class DataLoader {
  constructor(dataManager) {
    this.dataManager = dataManager || new GraphDataManager();
    this.loadedSources = new Set();
    this.loadingPromises = new Map();
  }
  
  // 从URL加载JSON数据
  async loadFromURL(url, options = {}) {
    const { 
      transform = null,  // 数据转换函数
      merge = true,      // 是否合并到现有数据
      priority = 0       // 数据优先级
    } = options;
    
    // 检查是否已在加载中
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url);
    }
    
    const promise = this.fetchData(url, transform, merge, priority);
    this.loadingPromises.set(url, promise);
    
    try {
      const result = await promise;
      this.loadedSources.add(url);
      return result;
    } finally {
      this.loadingPromises.delete(url);
    }
  }
  
  // 获取数据
  async fetchData(url, transform, merge, priority) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      let data = await response.json();
      
      // 应用数据转换
      if (transform && typeof transform === 'function') {
        data = transform(data);
      }
      
      // 标准化数据格式
      data = this.normalizeData(data);
      
      // 合并或替换数据
      if (merge) {
        this.mergeData(data, priority);
      } else {
        this.dataManager.setData(data.nodes, data.links);
      }
      
      return {
        success: true,
        url,
        nodeCount: data.nodes.length,
        linkCount: data.links.length,
        data
      };
      
    } catch (error) {
      console.error(`[DataLoader] 加载失败: ${url}`, error);
      return {
        success: false,
        url,
        error: error.message
      };
    }
  }
  
  // 从本地存储加载
  loadFromLocalStorage(key = 'knowledgeGraphData') {
    try {
      const stored = localStorage.getItem(key);
      if (!stored) {
        return { success: false, error: 'No data found in localStorage' };
      }
      
      const data = JSON.parse(stored);
      const normalized = this.normalizeData(data);
      this.dataManager.setData(normalized.nodes, normalized.links);
      
      return {
        success: true,
        nodeCount: normalized.nodes.length,
        linkCount: normalized.links.length
      };
    } catch (error) {
      console.error('[DataLoader] 从localStorage加载失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 保存到本地存储
  saveToLocalStorage(key = 'knowledgeGraphData') {
    try {
      const data = this.dataManager.exportData();
      localStorage.setItem(key, JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error('[DataLoader] 保存到localStorage失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 加载内联数据
  loadInlineData(data, options = {}) {
    const { merge = true, priority = 0 } = options;
    
    const normalized = this.normalizeData(data);
    
    if (merge) {
      this.mergeData(normalized, priority);
    } else {
      this.dataManager.setData(normalized.nodes, normalized.links);
    }
    
    return {
      success: true,
      nodeCount: normalized.nodes.length,
      linkCount: normalized.links.length
    };
  }
  
  // 标准化数据格式
  normalizeData(data) {
    // 处理不同的数据格式
    if (!data) {
      return { nodes: [], links: [] };
    }
    
    // 如果数据已经是标准格式
    if (Array.isArray(data.nodes) && Array.isArray(data.links)) {
      return {
        nodes: data.nodes.map(n => this.normalizeNode(n)),
        links: data.links.map(l => this.normalizeLink(l))
      };
    }
    
    // 处理旧版数据格式（comprehensive-data.js 格式）
    if (data.center && data.domains) {
      return this.convertLegacyFormat(data);
    }
    
    // 处理 additional-domains.js 格式（直接的领域对象）
    if (this.isDomainDataFormat(data)) {
      return this.convertDomainDataFormat(data);
    }
    
    // 处理简单的节点数组
    if (Array.isArray(data)) {
      return {
        nodes: data.map(n => this.normalizeNode(n)),
        links: []
      };
    }
    
    console.warn('[DataLoader] 未知的数据格式，使用空数据');
    return { nodes: [], links: [] };
  }
  
  // 检查是否是 additional-domains.js 格式
  isDomainDataFormat(data) {
    // 检查是否包含领域特征（如 relationship, mental, emotion, social 等）
    const domainKeys = ['relationship', 'mental', 'emotion', 'social', 'learning', 'career'];
    const keys = Object.keys(data);
    
    // 如果包含任何领域键，且该键有 name 和 subcategories，则认为是领域数据格式
    for (const key of keys) {
      if (data[key] && typeof data[key] === 'object' && 
          data[key].name && data[key].subcategories) {
        return true;
      }
    }
    return false;
  }
  
  // 转换 additional-domains.js 格式
  convertDomainDataFormat(data) {
    const nodes = [];
    const links = [];
    
    // 处理每个领域
    Object.entries(data).forEach(([domainId, domain]) => {
      if (!domain || typeof domain !== 'object' || !domain.name) return;
      
      // 添加领域节点
      nodes.push({
        id: domainId,
        name: domain.name,
        type: 'domain',
        description: domain.description || '',
        icon: domain.icon,
        radius: 35,
        color: domain.color,
        hasChildren: true,
        expanded: true,
        parent: 'center'
      });
      
      // 添加连接到中心
      links.push({
        source: 'center',
        target: domainId,
        type: 'hierarchy',
        width: 3,
        color: domain.color
      });
      
      // 处理子类别
      if (domain.subcategories) {
        Object.entries(domain.subcategories).forEach(([subId, sub]) => {
          const fullSubId = `${domainId}-${subId}`;
          
          nodes.push({
            id: fullSubId,
            name: sub.name,
            type: 'subcategory',
            description: sub.description,
            radius: 25,
            color: domain.color,
            hasChildren: Array.isArray(sub.problems) && sub.problems.length > 0,
            expanded: false,
            parent: domainId
          });
          
          links.push({
            source: domainId,
            target: fullSubId,
            type: 'hierarchy',
            width: 2,
            color: domain.color + '80'
          });
          
          // 处理问题
          if (sub.problems) {
            sub.problems.forEach((problem, index) => {
              const problemId = `${fullSubId}-problem-${index}`;
              
              nodes.push({
                id: problemId,
                name: problem.name,
                type: 'problem',
                description: problem.description,
                severity: problem.severity || 'medium',
                radius: 15,
                color: domain.color,
                hasChildren: false,
                visible: false,
                parent: fullSubId,
                symptoms: problem.symptoms,
                solutions: problem.solutions,
                cases: problem.cases,
                resources: problem.resources
              });
              
              links.push({
                source: fullSubId,
                target: problemId,
                type: 'hierarchy',
                width: 1,
                color: domain.color + '60',
                visible: false
              });
            });
          }
        });
      }
    });
    
    return { nodes, links };
  }
  
  // 标准化单个节点
  normalizeNode(node) {
    if (!node || typeof node !== 'object') {
      return null;
    }
    
    return {
      id: node.id || `node-${Date.now()}-${Math.random()}`,
      name: node.name || '未命名节点',
      type: node.type || 'problem',
      description: node.description || '',
      x: typeof node.x === 'number' ? node.x : 0,
      y: typeof node.y === 'number' ? node.y : 0,
      radius: node.radius || this.getDefaultRadius(node.type),
      color: node.color || this.getDefaultColor(node.type),
      icon: node.icon || '',
      severity: node.severity || 'medium',
      tags: Array.isArray(node.tags) ? node.tags : [],
      hasChildren: !!node.hasChildren || (Array.isArray(node.children) && node.children.length > 0),
      expanded: !!node.expanded,
      visible: node.visible !== false,
      opacity: typeof node.opacity === 'number' ? node.opacity : 1,
      scale: typeof node.scale === 'number' ? node.scale : 1,
      level: typeof node.level === 'number' ? node.level : 0,
      parent: node.parent || null,
      children: Array.isArray(node.children) ? node.children : [],
      // 保留其他属性
      ...node
    };
  }
  
  // 标准化连接
  normalizeLink(link) {
    if (!link || typeof link !== 'object') {
      return null;
    }
    
    return {
      source: link.source || link.from || link.sourceId,
      target: link.target || link.to || link.targetId,
      type: link.type || 'hierarchy',
      width: link.width || 1,
      color: link.color || '#94a3b8',
      opacity: typeof link.opacity === 'number' ? link.opacity : 0.6,
      visible: link.visible !== false,
      dashed: !!link.dashed,
      // 保留其他属性
      ...link
    };
  }
  
  // 转换旧版数据格式
  convertLegacyFormat(data) {
    const nodes = [];
    const links = [];
    
    // 添加中心节点
    if (data.center) {
      nodes.push({
        id: 'center',
        name: data.center.name,
        type: 'center',
        description: data.center.description,
        radius: 50,
        color: '#6366f1',
        hasChildren: true,
        expanded: true
      });
    }
    
    // 处理领域
    if (data.domains) {
      Object.entries(data.domains).forEach(([domainId, domain]) => {
        // 添加领域节点
        nodes.push({
          id: domainId,
          name: domain.name,
          type: 'domain',
          description: domain.description,
          icon: domain.icon,
          radius: 35,
          color: domain.color,
          hasChildren: true,
          expanded: true,
          parent: 'center'
        });
        
        // 添加连接到中心
        links.push({
          source: 'center',
          target: domainId,
          type: 'hierarchy',
          width: 3,
          color: domain.color
        });
        
        // 处理子类别
        if (domain.subcategories) {
          Object.entries(domain.subcategories).forEach(([subId, sub]) => {
            const fullSubId = `${domainId}-${subId}`;
            
            nodes.push({
              id: fullSubId,
              name: sub.name,
              type: 'subcategory',
              description: sub.description,
              radius: 25,
              color: domain.color,
              hasChildren: Array.isArray(sub.problems) && sub.problems.length > 0,
              expanded: false,
              parent: domainId
            });
            
            links.push({
              source: domainId,
              target: fullSubId,
              type: 'hierarchy',
              width: 2,
              color: domain.color + '80'
            });
            
            // 处理问题
            if (sub.problems) {
              sub.problems.forEach((problem, index) => {
                const problemId = `${fullSubId}-problem-${index}`;
                
                nodes.push({
                  id: problemId,
                  name: problem.name,
                  type: 'problem',
                  description: problem.description,
                  severity: problem.severity || 'medium',
                  radius: 15,
                  color: domain.color,
                  hasChildren: false,
                  visible: false,
                  parent: fullSubId,
                  // 保留问题的其他属性
                  symptoms: problem.symptoms,
                  solutions: problem.solutions,
                  cases: problem.cases,
                  resources: problem.resources
                });
                
                links.push({
                  source: fullSubId,
                  target: problemId,
                  type: 'hierarchy',
                  width: 1,
                  color: domain.color + '60',
                  visible: false
                });
              });
            }
          });
        }
      });
    }
    
    // 处理关系连接
    if (data.relationships) {
      data.relationships.forEach(rel => {
        links.push({
          source: rel.from,
          target: rel.to,
          type: rel.type || 'related',
          description: rel.description,
          dashed: true,
          color: '#94a3b8'
        });
      });
    }
    
    return { nodes, links };
  }
  
  // 合并数据
  mergeData(data, priority = 0) {
    const existingNodes = this.dataManager.getAllNodes();
    const existingLinks = this.dataManager.getAllLinks();
    
    // 合并节点（避免重复）
    const nodeMap = new Map(existingNodes.map(n => [n.id, n]));
    
    data.nodes.forEach(node => {
      if (nodeMap.has(node.id)) {
        // 如果节点已存在，根据优先级决定是否更新
        if (priority > 0) {
          const existing = nodeMap.get(node.id);
          nodeMap.set(node.id, { ...existing, ...node });
        }
      } else {
        nodeMap.set(node.id, node);
      }
    });
    
    // 合并连接
    const linkMap = new Map(existingLinks.map(l => [`${l.source}-${l.target}`, l]));
    
    data.links.forEach(link => {
      const key = `${link.source}-${link.target}`;
      if (!linkMap.has(key)) {
        linkMap.set(key, link);
      }
    });
    
    // 更新数据管理器
    this.dataManager.setData(
      Array.from(nodeMap.values()),
      Array.from(linkMap.values())
    );
  }
  
  // 获取默认半径
  getDefaultRadius(type) {
    const radii = {
      center: 50,
      domain: 35,
      subcategory: 25,
      problem: 15,
      solution: 12,
      resource: 10
    };
    return radii[type] || 20;
  }
  
  // 获取默认颜色
  getDefaultColor(type) {
    const colors = {
      center: '#6366f1',
      domain: '#8b5cf6',
      subcategory: '#64748b',
      problem: '#94a3b8',
      solution: '#10b981',
      resource: '#f59e0b'
    };
    return colors[type] || '#64748b';
  }
  
  // 批量加载多个数据源
  async loadMultiple(sources) {
    const results = [];
    
    for (const source of sources) {
      let result;
      
      if (typeof source === 'string') {
        // URL字符串
        result = await this.loadFromURL(source);
      } else if (source.url) {
        // 配置对象
        result = await this.loadFromURL(source.url, source.options);
      } else if (source.data) {
        // 内联数据
        result = this.loadInlineData(source.data, source.options);
      }
      
      results.push(result);
    }
    
    return results;
  }
  
  // 获取加载统计
  getLoadingStats() {
    return {
      loadedSources: Array.from(this.loadedSources),
      totalNodes: this.dataManager.getStatistics().totalNodes,
      totalLinks: this.dataManager.getStatistics().totalLinks
    };
  }
  
  // 清空所有数据
  clear() {
    this.dataManager.clear();
    this.loadedSources.clear();
    this.loadingPromises.clear();
  }
}

// 导出
export { DataLoader };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataLoader };
}

if (typeof window !== 'undefined') {
  window.DataLoader = DataLoader;
}
