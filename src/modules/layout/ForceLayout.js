// ==================== ForceLayout - 力导向布局算法 ====================
// 实现基于物理模拟的节点布局，支持多种力模型

class ForceLayout {
  constructor(options = {}) {
    this.options = {
      // 斥力参数
      repulsionStrength: 1000,
      repulsionDistance: 200,
      
      // 引力参数
      springStrength: 0.05,
      springLength: 100,
      
      // 中心力
      centerStrength: 0.01,
      
      // 碰撞检测
      collisionStrength: 0.5,
      
      // 阻尼
      damping: 0.9,
      
      // 最大速度
      maxSpeed: 10,
      
      // 迭代次数
      iterations: 300,
      
      // 收敛阈值
      convergenceThreshold: 0.01,
      
      // 动画帧率
      fps: 60,
      
      ...options
    };
    
    this.nodes = [];
    this.links = [];
    this.isRunning = false;
    this.animationId = null;
    this.iteration = 0;
    
    // 温度（用于模拟退火）
    this.temperature = 1.0;
    this.coolingRate = 0.995;
    
    // 事件监听
    this.listeners = new Map();
  }
  
  // 设置数据
  setData(nodes, links) {
    this.nodes = nodes.map(n => ({
      ...n,
      vx: n.vx || 0,
      vy: n.vy || 0,
      fx: n.fx || null, // 固定位置
      fy: n.fy || null
    }));
    
    this.links = links.map(l => ({
      ...l,
      source: typeof l.source === 'string' ? this.nodes.find(n => n.id === l.source) : l.source,
      target: typeof l.target === 'string' ? this.nodes.find(n => n.id === l.target) : l.target
    }));
    
    this.iteration = 0;
    this.temperature = 1.0;
  }
  
  // 启动布局计算
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.iteration = 0;
    this.emit('start');
    
    this.tick();
  }
  
  // 停止布局计算
  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.emit('end');
  }
  
  // 单步计算
  tick() {
    if (!this.isRunning || this.iteration >= this.options.iterations) {
      this.stop();
      return;
    }
    
    this.applyForces();
    this.updatePositions();
    this.coolDown();
    
    this.iteration++;
    
    // 检查收敛
    const energy = this.calculateEnergy();
    this.emit('tick', { iteration: this.iteration, energy });
    
    if (energy < this.options.convergenceThreshold) {
      this.stop();
      return;
    }
    
    this.animationId = requestAnimationFrame(() => this.tick());
  }
  
  // 应用所有力
  applyForces() {
    // 重置力
    this.nodes.forEach(node => {
      if (node.fx === null) node.fx = 0;
      if (node.fy === null) node.fy = 0;
    });
    
    // 应用斥力（节点间）
    this.applyRepulsion();
    
    // 应用引力（连接线）
    this.applySpringForce();
    
    // 应用中心力
    this.applyCenterForce();
    
    // 应用碰撞检测
    this.applyCollision();
  }
  
  // 斥力（Coulomb's Law）
  applyRepulsion() {
    const { repulsionStrength, repulsionDistance } = this.options;
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        
        if (distance < repulsionDistance) {
          const force = repulsionStrength / (distance * distance);
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          if (nodeA.fx !== null) {
            nodeA.fx -= fx;
            nodeA.fy -= fy;
          }
          if (nodeB.fx !== null) {
            nodeB.fx += fx;
            nodeB.fy += fy;
          }
        }
      }
    }
  }
  
  // 弹簧引力（Hooke's Law）
  applySpringForce() {
    const { springStrength, springLength } = this.options;
    
    this.links.forEach(link => {
      const source = link.source;
      const target = link.target;
      
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      
      const force = (distance - springLength) * springStrength;
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      
      if (source.fx !== null) {
        source.fx += fx;
        source.fy += fy;
      }
      if (target.fx !== null) {
        target.fx -= fx;
        target.fy -= fy;
      }
    });
  }
  
  // 中心引力
  applyCenterForce() {
    const { centerStrength } = this.options;
    
    // 计算中心点
    let centerX = 0, centerY = 0;
    this.nodes.forEach(node => {
      centerX += node.x;
      centerY += node.y;
    });
    centerX /= this.nodes.length;
    centerY /= this.nodes.length;
    
    this.nodes.forEach(node => {
      if (node.fx !== null) {
        node.fx -= (node.x - centerX) * centerStrength;
        node.fy -= (node.y - centerY) * centerStrength;
      }
    });
  }
  
  // 碰撞检测
  applyCollision() {
    const { collisionStrength } = this.options;
    
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];
        
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDistance = nodeA.radius + nodeB.radius;
        
        if (distance < minDistance) {
          const force = (minDistance - distance) * collisionStrength;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          if (nodeA.fx !== null) {
            nodeA.fx -= fx;
            nodeA.fy -= fy;
          }
          if (nodeB.fx !== null) {
            nodeB.fx += fx;
            nodeB.fy += fy;
          }
        }
      }
    }
  }
  
  // 更新位置
  updatePositions() {
    const { damping, maxSpeed } = this.options;
    
    this.nodes.forEach(node => {
      if (node.fx === null || node.fy === null) return;
      
      // 应用力到速度
      node.vx = (node.vx + node.fx) * damping;
      node.vy = (node.vy + node.fy) * damping;
      
      // 限制最大速度
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }
      
      // 应用温度（模拟退火）
      node.vx *= this.temperature;
      node.vy *= this.temperature;
      
      // 更新位置
      node.x += node.vx;
      node.y += node.vy;
      
      // 重置力
      node.fx = 0;
      node.fy = 0;
    });
  }
  
  // 降温（模拟退火）
  coolDown() {
    this.temperature *= this.coolingRate;
  }
  
  // 计算系统能量
  calculateEnergy() {
    let energy = 0;
    this.nodes.forEach(node => {
      energy += Math.sqrt(node.vx * node.vx + node.vy * node.vy);
    });
    return energy / this.nodes.length;
  }
  
  // 固定节点位置
  fixNode(nodeId, x, y) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.fx = null;
      node.fy = null;
      node.x = x;
      node.y = y;
    }
  }
  
  // 释放节点
  releaseNode(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      node.fx = 0;
      node.fy = 0;
    }
  }
  
  // 重新加热（继续优化）
  reheat() {
    this.temperature = 1.0;
    this.iteration = 0;
    if (!this.isRunning) {
      this.start();
    }
  }
  
  // 获取布局后的数据
  getLayoutData() {
    return {
      nodes: this.nodes.map(n => ({
        id: n.id,
        x: n.x,
        y: n.y,
        vx: n.vx,
        vy: n.vy
      })),
      links: this.links.map(l => ({
        source: l.source.id,
        target: l.target.id
      }))
    };
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
