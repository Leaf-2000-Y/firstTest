// ==================== ForceLayout - 力导向布局算法 ====================
// 基于物理模拟的节点布局算法，实现自动排列

class ForceLayout {
  constructor(options = {}) {
    this.options = {
      // 力参数
      repulsion: options.repulsion || 1000,        // 斥力强度
      attraction: options.attraction || 0.05,      // 引力强度
      gravity: options.gravity || 0.01,            // 向心力
      friction: options.friction || 0.9,           // 摩擦力
      
      // 布局参数
      linkDistance: options.linkDistance || 100,   // 连接理想长度
      nodeRepulsion: options.nodeRepulsion || 500, // 节点间斥力
      centerForce: options.centerForce || 0.02,    // 向中心拉力
      
      // 模拟参数
      alpha: options.alpha || 1,                   // 初始能量
      alphaDecay: options.alphaDecay || 0.02,      // 能量衰减
      alphaMin: options.alphaMin || 0.001,         // 最小能量
      velocityDecay: options.velocityDecay || 0.4, // 速度衰减
      
      // 约束参数
      maxVelocity: options.maxVelocity || 10,      // 最大速度
      padding: options.padding || 50,              // 边距
      
      // 层级参数
      levelSeparation: options.levelSeparation || 150, // 层级间距
      siblingSeparation: options.siblingSeparation || 80, // 同级间距
      ...options
    };
    
    this.nodes = [];
    this.links = [];
    this.simulation = null;
    this.running = false;
    this.animationId = null;
    
    // 事件监听
    this.listeners = new Map();
  }
  
  // 设置数据
  setData(nodes, links) {
    this.nodes = nodes.map(n => ({
      ...n,
      vx: n.vx || 0,
      vy: n.vy || 0,
      fx: n.fx || null,  // 固定位置
      fy: n.fy || null
    }));
    
    this.links = links.map(l => ({
      source: typeof l.source === 'object' ? l.source.id : l.source,
      target: typeof l.target === 'object' ? l.target.id : l.target,
      distance: l.distance || this.options.linkDistance,
      strength: l.strength || 1
    }));
    
    // 初始化位置（如果没有）
    this.initializePositions();
  }
  
  // 初始化节点位置
  initializePositions() {
    const centerX = 0;
    const centerY = 0;
    
    // 按层级分组
    const levelGroups = new Map();
    
    this.nodes.forEach(node => {
      const level = node.level || 0;
      if (!levelGroups.has(level)) {
        levelGroups.set(level, []);
      }
      levelGroups.get(level).push(node);
    });
    
    // 按层级环形布局初始化
    levelGroups.forEach((nodes, level) => {
      const radius = level * this.options.levelSeparation;
      const angleStep = (2 * Math.PI) / Math.max(nodes.length, 1);
      
      nodes.forEach((node, i) => {
        if (node.x === undefined || node.y === undefined) {
          const angle = i * angleStep;
          node.x = centerX + Math.cos(angle) * radius;
          node.y = centerY + Math.sin(angle) * radius;
        }
      });
    });
  }
  
  // 启动模拟
  start() {
    if (this.running) return;
    
    this.running = true;
    this.options.alpha = 1;
    this.tick();
    
    this.emit('start');
  }
  
  // 停止模拟
  stop() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.emit('end');
  }
  
  // 单步模拟
  tick() {
    if (!this.running) return;
    
    // 计算力
    this.calculateForces();
    
    // 更新位置
    this.updatePositions();
    
    // 衰减能量
    this.options.alpha -= this.options.alphaDecay;
    
    // 检查是否结束
    if (this.options.alpha < this.options.alphaMin) {
      this.stop();
      return;
    }
    
    // 触发tick事件
    this.emit('tick', { nodes: this.nodes, alpha: this.options.alpha });
    
    // 下一帧
    this.animationId = requestAnimationFrame(() => this.tick());
  }
  
  // 计算各种力
  calculateForces() {
    // 1. 节点间斥力（Coulomb's Law）
    this.applyRepulsion();
    
    // 2. 连接引力（Hooke's Law）
    this.applyAttraction();
    
    // 3. 中心引力
    this.applyCenterForce();
    
    // 4. 层级约束
    this.applyHierarchyConstraints();
    
    // 5. 碰撞检测
    this.applyCollision();
  }
  
  // 斥力 - 节点之间相互排斥
  applyRepulsion() {
    const { nodeRepulsion, alpha } = this.options;
    
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i];
      if (nodeA.fx !== null) continue; // 固定节点
      
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeB = this.nodes[j];
        if (nodeB.fx !== null) continue;
        
        const dx = nodeA.x - nodeB.x;
        const dy = nodeA.y - nodeB.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) {
          distance = 0.1;
        }
        
        // 斥力与距离平方成反比
        const force = (nodeRepulsion * alpha) / (distance * distance);
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        
        nodeA.vx += fx;
        nodeA.vy += fy;
        nodeB.vx -= fx;
        nodeB.vy -= fy;
      }
    }
  }
  
  // 引力 - 连接的节点相互吸引
  applyAttraction() {
    const { attraction, alpha } = this.options;
    
    this.links.forEach(link => {
      const source = this.nodes.find(n => n.id === link.source);
      const target = this.nodes.find(n => n.id === link.target);
      
      if (!source || !target) return;
      
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance === 0) return;
      
      // 引力与距离成正比（弹簧模型）
      const force = (distance - link.distance) * attraction * link.strength * alpha;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      
      if (source.fx === null) {
        source.vx += fx;
        source.vy += fy;
      }
      if (target.fx === null) {
        target.vx -= fx;
        target.vy -= fy;
      }
    });
  }
  
  // 中心引力 - 将节点拉向中心
  applyCenterForce() {
    const { centerForce, alpha } = this.options;
    
    this.nodes.forEach(node => {
      if (node.fx !== null) return;
      
      const dx = -node.x;
      const dy = -node.y;
      
      node.vx += dx * centerForce * alpha;
      node.vy += dy * centerForce * alpha;
    });
  }
  
  // 层级约束 - 保持层级结构
  applyHierarchyConstraints() {
    const { levelSeparation, siblingSeparation, alpha } = this.options;
    
    // 找到父子关系
    this.links.forEach(link => {
      if (link.type !== 'hierarchy') return;
      
      const parent = this.nodes.find(n => n.id === link.source);
      const child = this.nodes.find(n => n.id === link.target);
      
      if (!parent || !child) return;
      
      // 保持垂直层级间距
      const targetY = parent.y + levelSeparation;
      const dy = targetY - child.y;
      
      if (child.fy === null) {
        child.vy += dy * 0.1 * alpha;
      }
      
      // 子节点在父节点下方呈扇形分布
      const siblings = this.links
        .filter(l => l.source === parent.id && l.type === 'hierarchy')
        .map(l => this.nodes.find(n => n.id === l.target))
        .filter(Boolean);
      
      if (siblings.length > 1) {
        const index = siblings.indexOf(child);
        const totalAngle = Math.min(Math.PI / 2, siblings.length * 0.3);
        const startAngle = -totalAngle / 2;
        const angleStep = totalAngle / Math.max(siblings.length - 1, 1);
        const targetAngle = startAngle + index * angleStep;
        
        const targetX = parent.x + Math.sin(targetAngle) * siblingSeparation;
        const dx = targetX - child.x;
        
        if (child.fx === null) {
          child.vx += dx * 0.05 * alpha;
        }
      }
    });
  }
  
  // 碰撞检测 - 防止节点重叠
  applyCollision() {
    const padding = 5;
    
    for (let i = 0; i < this.nodes.length; i++) {
      const nodeA = this.nodes[i];
      if (nodeA.fx !== null && nodeA.fy !== null) continue;
      
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeB = this.nodes[j];
        if (nodeB.fx !== null && nodeB.fy !== null) continue;
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const minDistance = (nodeA.radius || 20) + (nodeB.radius || 20) + padding;
        
        if (distance < minDistance && distance > 0) {
          const force = (minDistance - distance) / distance * 0.5;
          const fx = dx * force;
          const fy = dy * force;
          
          if (nodeA.fx === null) {
            nodeA.x -= fx;
            nodeA.y -= fy;
          }
          if (nodeB.fx === null) {
            nodeB.x += fx;
            nodeB.y += fy;
          }
        }
      }
    }
  }
  
  // 更新位置
  updatePositions() {
    const { friction, maxVelocity, velocityDecay } = this.options;
    
    this.nodes.forEach(node => {
      if (node.fx !== null) {
        node.x = node.fx;
        node.vx = 0;
      }
      if (node.fy !== null) {
        node.y = node.fy;
        node.vy = 0;
      }
      
      if (node.fx !== null && node.fy !== null) return;
      
      // 限制最大速度
      const velocity = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (velocity > maxVelocity) {
        const scale = maxVelocity / velocity;
        node.vx *= scale;
        node.vy *= scale;
      }
      
      // 更新位置
      if (node.fx === null) {
        node.x += node.vx;
        node.vx *= (1 - velocityDecay);
      }
      if (node.fy === null) {
        node.y += node.vy;
        node.vy *= (1 - velocityDecay);
      }
    });
  }
  
  // 固定节点位置
  fixNode(nodeId, x, y) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.fx = x;
      node.fy = y;
    }
  }
  
  // 解除固定
  unfixNode(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }
  
  // 重新加热（重新启动模拟）
  reheat() {
    this.options.alpha = 1;
    if (!this.running) {
      this.start();
    }
  }
  
  // 获取节点位置
  getPositions() {
    return this.nodes.map(n => ({
      id: n.id,
      x: n.x,
      y: n.y,
      vx: n.vx,
      vy: n.vy
    }));
  }
  
  // 设置节点位置
  setPositions(positions) {
    positions.forEach(pos => {
      const node = this.nodes.find(n => n.id === pos.id);
      if (node) {
        node.x = pos.x;
        node.y = pos.y;
        if (pos.vx !== undefined) node.vx = pos.vx;
        if (pos.vy !== undefined) node.vy = pos.vy;
      }
    });
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
          console.error(`[ForceLayout] Event handler error:`, error);
        }
      });
    }
  }
  
  // 销毁
  destroy() {
    this.stop();
    this.listeners.clear();
    this.nodes = [];
    this.links = [];
  }
}

// 导出
export { ForceLayout };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ForceLayout };
}

if (typeof window !== 'undefined') {
  window.ForceLayout = ForceLayout;
}
