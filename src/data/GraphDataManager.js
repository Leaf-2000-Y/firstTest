// ==================== GraphDataManager - 图谱数据管理器 ====================
// 管理节点和连接的层级关系、展开状态、数据操作

import { NodeValidator } from '../utils/NodeValidator.js';

class GraphDataManager {
  constructor() {
    this.nodes = new Map();
    this.links = new Map();
    this.nodeHierarchy = new Map(); // 节点层级关系
    this.expandedNodes = new Set(); // 已展开的节点
    this.hiddenNodes = new Set();   // 隐藏的节点
    
    // 验证器
    this.validator = new NodeValidator(this.nodes);
    
    // 事件监听
    this.listeners = new Map();
  }
  
  // 设置数据
  setData(nodes, links) {
    this.nodes.clear();
    this.links.clear();
    this.nodeHierarchy.clear();
    
    // 处理节点
    nodes.forEach(node => {
      const processedNode = this.processNode(node);
      this.nodes.set(node.id, processedNode);
    });
    
    // 处理连接并构建层级
    links.forEach(link => {
      const processedLink = this.processLink(link);
      this.links.set(`${link.source}-${link.target}`, processedLink);
      
      // 构建父子关系
      this.buildHierarchy(link.source, link.target);
    });
    
    // 默认展开第一层（中心和领域）
    this.nodes.forEach(node => {
      if (node.type === 'center' || node.type === 'domain') {
        this.expandedNodes.add(node.id);
      }
    });
    
    this.emit('dataChanged', { nodes: this.getAllNodes(), links: this.getAllLinks() });
  }
  
  // 处理节点数据
  processNode(node) {
    return {
      ...node,
      x: node.x || 0,
      y: node.y || 0,
      radius: node.radius || 20,
      color: node.color || '#64748b',
      opacity: node.opacity ?? 1,
      scale: node.scale ?? 1,
      visible: node.visible ?? true,
      expanded: node.expanded ?? false,
      level: node.level ?? 0,
      children: [],
      parent: null
    };
  }
  
  // 处理连接数据
  processLink(link) {
    return {
      ...link,
      width: link.width || 1,
      color: link.color || '#94a3b8',
      opacity: link.opacity ?? 0.6,
      visible: link.visible ?? true,
      type: link.type || 'hierarchy', // hierarchy, related, influence, bidirectional
      dashed: link.dashed || false
    };
  }
  
  // 构建层级关系
  buildHierarchy(sourceId, targetId) {
    const source = this.nodes.get(sourceId);
    const target = this.nodes.get(targetId);
    
    if (source && target) {
      // target 是 source 的子节点
      if (!source.children.includes(targetId)) {
        source.children.push(targetId);
      }
      target.parent = sourceId;
      target.level = source.level + 1;
    }
  }
  
  // 展开节点
  expandNode(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node || node.children.length === 0) return false;
    
    this.expandedNodes.add(nodeId);
    node.expanded = true;
    
    // 显示所有子节点
    node.children.forEach(childId => {
      const child = this.nodes.get(childId);
      if (child) {
        child.visible = true;
        this.hiddenNodes.delete(childId);
      }
    });
    
    // 显示相关连接
    this.updateLinkVisibility(nodeId);
    
    this.emit('nodeExpanded', { nodeId, children: node.children });
    this.emit('dataChanged', { nodes: this.getVisibleNodes(), links: this.getVisibleLinks() });
    
    return true;
  }
  
  // 收起节点
  collapseNode(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return false;
    
    this.expandedNodes.delete(nodeId);
    node.expanded = false;
    
    // 递归隐藏所有子节点
    this.hideChildrenRecursively(nodeId);
    
    this.emit('nodeCollapsed', { nodeId });
    this.emit('dataChanged', { nodes: this.getVisibleNodes(), links: this.getAllLinks() });
    
    return true;
  }
  
  // 递归隐藏子节点
  hideChildrenRecursively(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node || node.children.length === 0) return;
    
    node.children.forEach(childId => {
      const child = this.nodes.get(childId);
      if (child) {
        child.visible = false;
        this.hiddenNodes.add(childId);
        
        // 如果子节点已展开，先收起
        if (this.expandedNodes.has(childId)) {
          this.expandedNodes.delete(childId);
          child.expanded = false;
        }
        
        // 递归隐藏孙节点
        this.hideChildrenRecursively(childId);
      }
    });
  }
  
  // 切换展开/收起状态
  toggleNode(nodeId) {
    if (this.expandedNodes.has(nodeId)) {
      return this.collapseNode(nodeId);
    } else {
      return this.expandNode(nodeId);
    }
  }
  
  // 更新连接可见性
  updateLinkVisibility(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    
    // 更新从该节点出发的连接
    node.children.forEach(childId => {
      const linkKey = `${nodeId}-${childId}`;
      const link = this.links.get(linkKey);
      if (link) {
        const child = this.nodes.get(childId);
        link.visible = child && child.visible;
      }
    });
    
    // 更新指向该节点的连接
    if (node.parent) {
      const linkKey = `${node.parent}-${nodeId}`;
      const link = this.links.get(linkKey);
      if (link) {
        link.visible = node.visible;
      }
    }
  }
  
  // 获取所有节点
  getAllNodes() {
    return Array.from(this.nodes.values());
  }
  
  // 获取可见节点
  getVisibleNodes() {
    return this.getAllNodes().filter(node => node.visible !== false);
  }
  
  // 获取所有连接
  getAllLinks() {
    return Array.from(this.links.values());
  }
  
  // 获取可见连接
  getVisibleLinks() {
    return this.getAllLinks().filter(link => {
      const source = this.nodes.get(link.source);
      const target = this.nodes.get(link.target);
      return link.visible !== false && source && target && 
             source.visible !== false && target.visible !== false;
    });
  }
  
  // 获取节点的子节点
  getChildren(nodeId) {
    const node = this.nodes.get(nodeId);
    return node ? node.children.map(id => this.nodes.get(id)).filter(Boolean) : [];
  }
  
  // 获取节点的父节点
  getParent(nodeId) {
    const node = this.nodes.get(nodeId);
    return node && node.parent ? this.nodes.get(node.parent) : null;
  }
  
  // 获取节点的层级
  getNodeLevel(nodeId) {
    const node = this.nodes.get(nodeId);
    return node ? node.level : -1;
  }
  
  // 检查节点是否已展开
  isExpanded(nodeId) {
    return this.expandedNodes.has(nodeId);
  }
  
  // 检查节点是否有子节点
  hasChildren(nodeId) {
    const node = this.nodes.get(nodeId);
    return node && node.children.length > 0;
  }
  
  // 添加节点（带验证）
  addNode(node, options = {}) {
    const { skipValidation = false, validateOnly = false } = options;
    
    // 验证节点数据
    if (!skipValidation) {
      const validation = this.validator.validate(node);
      
      if (!validation.isValid) {
        this.emit('nodeValidationFailed', { 
          node, 
          errors: validation.errors,
          warnings: validation.warnings 
        });
        return { success: false, errors: validation.errors, warnings: validation.warnings };
      }
      
      // 如果只验证不添加
      if (validateOnly) {
        return { success: true, warnings: validation.warnings };
      }
      
      // 使用清理后的节点数据
      node = validation.node;
    }
    
    // 处理节点
    const processedNode = this.processNode(node);
    
    // 如果有父节点，建立层级关系
    if (processedNode.parent) {
      const parent = this.nodes.get(processedNode.parent);
      if (parent) {
        processedNode.level = parent.level + 1;
        if (!parent.children.includes(processedNode.id)) {
          parent.children.push(processedNode.id);
          parent.hasChildren = true;
        }
        
        // 创建连接
        this.addLink({
          source: processedNode.parent,
          target: processedNode.id,
          type: 'hierarchy'
        });
        
        // 如果父节点已展开，新节点可见
        if (this.expandedNodes.has(processedNode.parent)) {
          processedNode.visible = true;
        } else {
          processedNode.visible = false;
        }
      }
    }
    
    // 添加到节点集合
    this.nodes.set(processedNode.id, processedNode);
    
    // 更新验证器的节点列表
    this.validator.addExistingNode(processedNode);
    
    // 触发事件
    this.emit('nodeAdded', { node: processedNode, success: true });
    this.emit('dataChanged', { nodes: this.getVisibleNodes(), links: this.getVisibleLinks() });
    
    return { success: true, node: processedNode };
  }
  
  // 验证节点（不添加）
  validateNode(node) {
    return this.validator.validate(node);
  }
  
  // 生成唯一节点ID
  generateNodeId(prefix = 'node') {
    return this.validator.generateUniqueId(prefix);
  }
  
  // 检查节点ID是否已存在
  hasNode(nodeId) {
    return this.nodes.has(nodeId);
  }
  
  // 添加连接
  addLink(link) {
    // 验证连接
    if (!link.source || !link.target) {
      console.warn('[GraphDataManager] Link must have source and target');
      return null;
    }
    
    // 检查是否已存在
    const linkKey = `${link.source}-${link.target}`;
    if (this.links.has(linkKey)) {
      console.warn(`[GraphDataManager] Link already exists: ${linkKey}`);
      return this.links.get(linkKey);
    }
    
    const processedLink = this.processLink(link);
    this.links.set(linkKey, processedLink);
    this.buildHierarchy(link.source, link.target);
    this.emit('linkAdded', { link: processedLink });
    return processedLink;
  }
  
  // 删除节点
  removeNode(nodeId) {
    const node = this.nodes.get(nodeId);
    if (!node) {
      return { success: false, error: 'Node not found' };
    }
    
    // 删除所有子节点（递归）
    if (node.children && node.children.length > 0) {
      [...node.children].forEach(childId => {
        this.removeNode(childId);
      });
    }
    
    // 删除与父节点的连接
    if (node.parent) {
      const parent = this.nodes.get(node.parent);
      if (parent) {
        parent.children = parent.children.filter(id => id !== nodeId);
        parent.hasChildren = parent.children.length > 0;
        
        // 删除连接
        this.links.delete(`${node.parent}-${nodeId}`);
      }
    }
    
    // 删除所有相关的连接
    this.links.forEach((link, key) => {
      if (link.source === nodeId || link.target === nodeId) {
        this.links.delete(key);
      }
    });
    
    // 从集合中删除
    this.nodes.delete(nodeId);
    this.expandedNodes.delete(nodeId);
    this.hiddenNodes.delete(nodeId);
    
    // 触发事件
    this.emit('nodeRemoved', { nodeId });
    this.emit('dataChanged', { nodes: this.getVisibleNodes(), links: this.getVisibleLinks() });
    
    return { success: true };
  }
  
  // 更新节点
  updateNode(nodeId, updates) {
    const node = this.nodes.get(nodeId);
    if (!node) {
      return { success: false, error: 'Node not found' };
    }
    
    // 合并更新
    Object.assign(node, updates);
    
    // 触发事件
    this.emit('nodeUpdated', { nodeId, node, updates });
    this.emit('dataChanged', { nodes: this.getVisibleNodes(), links: this.getVisibleLinks() });
    
    return { success: true, node };
  }
  
  // 更新节点位置
  updateNodePosition(nodeId, x, y) {
    const node = this.nodes.get(nodeId);
    if (node) {
      node.x = x;
      node.y = y;
      this.emit('nodeMoved', { nodeId, x, y });
    }
  }
  
  // 事件监听
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
  
  // 移除事件监听
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  // 触发事件
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`[GraphDataManager] Event handler error:`, error);
        }
      });
    }
  }
  
  // 导出数据
  exportData() {
    return {
      nodes: this.getAllNodes(),
      links: this.getAllLinks(),
      expandedNodes: Array.from(this.expandedNodes)
    };
  }
  
  // 导入数据
  importData(data) {
    if (data.nodes && data.links) {
      this.setData(data.nodes, data.links);
      
      // 恢复展开状态
      if (data.expandedNodes) {
        data.expandedNodes.forEach(nodeId => {
          this.expandNode(nodeId);
        });
      }
    }
  }
  
  // 清空数据
  clear() {
    this.nodes.clear();
    this.links.clear();
    this.nodeHierarchy.clear();
    this.expandedNodes.clear();
    this.hiddenNodes.clear();
    this.emit('dataCleared');
  }
  
  // 获取统计信息
  getStatistics() {
    return {
      totalNodes: this.nodes.size,
      visibleNodes: this.getVisibleNodes().length,
      totalLinks: this.links.size,
      visibleLinks: this.getVisibleLinks().length,
      expandedNodes: this.expandedNodes.size,
      hiddenNodes: this.hiddenNodes.size
    };
  }
}

// 导出
export { GraphDataManager };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GraphDataManager };
}

if (typeof window !== 'undefined') {
  window.GraphDataManager = GraphDataManager;
}
