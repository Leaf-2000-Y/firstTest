// ==================== CanvasRenderer - 高性能Canvas渲染引擎 ====================
// 使用 Canvas 2D API 替代 SVG，支持 1000+ 节点流畅渲染

import { animationEngine } from '../animation/AnimationEngine.js';
import { VisualEffects } from '../effects/VisualEffects.js';

class CanvasRenderer {
  constructor(container, options = {}) {
    if (!container) {
      throw new Error('CanvasRenderer: container is required');
    }
    
    this.container = container;
    this.options = {
      width: container.clientWidth || 800,
      height: container.clientHeight || 600,
      pixelRatio: window.devicePixelRatio || 1,
      backgroundColor: '#0f172a',
      antialias: true,
      enableAnimations: true,
      enableEffects: true,
      ...options
    };
    
    // 渲染状态
    this.nodes = [];
    this.links = [];
    this.visibleNodes = [];
    this.visibleLinks = [];
    
    // 视口
    this.viewport = {
      x: 0,
      y: 0,
      zoom: 1,
      width: this.options.width,
      height: this.options.height
    };
    
    // 交互状态
    this.hoveredNode = null;
    this.selectedNode = null;
    this.draggedNode = null;
    this.isDragging = false;
    this.dragStartPos = { x: 0, y: 0 };
    this.dragThreshold = 5;
    this.lastClickTime = 0;
    this.clickDelay = 300;
    
    // 动画状态
    this.nodeAnimations = new Map();
    this.linkAnimations = new Map();
    
    // 性能优化
    this.frameCount = 0;
    this.lastFrameTime = 0;
    this.fps = 0;
    this.isAnimating = false;
    this.animationId = null;
    
    // Canvas 元素
    this.canvas = null;
    this.ctx = null;
    this.offscreenCanvas = null;
    this.offscreenCtx = null;
    
    // 视觉效果
    this.visualEffects = null;
    
    // 对象池
    this.nodePool = new ObjectPool(() => ({}), 100);
    this.linkPool = new ObjectPool(() => ({}), 200);
    
    // 初始化标志
    this.isInitialized = false;
    this.isDestroyed = false;
    
    // 数据管理器引用
    this.dataManager = null;
    
    // 绑定事件处理器的 this
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    
    // 延迟初始化
    this.init();
  }
  
  async init() {
    try {
      await this.waitForContainer();
      this.createCanvas();
      this.createOffscreenCanvas();
      
      // 初始化视觉效果
      if (this.options.enableEffects) {
        this.visualEffects = new VisualEffects(this.offscreenCanvas, this.offscreenCtx);
      }
      
      this.setupEventListeners();
      this.startRenderLoop();
      this.setupResizeObserver();
      
      this.isInitialized = true;
      console.log('[CanvasRenderer] 初始化完成');
    } catch (error) {
      console.error('[CanvasRenderer] 初始化失败:', error);
      throw error;
    }
  }
  
  waitForContainer() {
    return new Promise((resolve) => {
      const checkContainer = () => {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        if (width > 0 && height > 0) {
          this.options.width = width;
          this.options.height = height;
          this.viewport.width = width;
          this.viewport.height = height;
          resolve();
        } else {
          requestAnimationFrame(checkContainer);
        }
      };
      
      checkContainer();
      
      setTimeout(() => {
        if (!this.isInitialized) {
          this.options.width = 800;
          this.options.height = 600;
          this.viewport.width = 800;
          this.viewport.height = 600;
          resolve();
        }
      }, 2000);
    });
  }
  
  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: grab;
      touch-action: none;
    `;
    
    this.container.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d', {
      alpha: false,
      antialias: this.options.antialias
    });
    
    if (!this.ctx) {
      throw new Error('CanvasRenderer: Failed to get 2D context');
    }
    
    this.resize(this.options.width, this.options.height);
  }
  
  createOffscreenCanvas() {
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCtx = this.offscreenCanvas.getContext('2d', {
      alpha: false
    });
    
    if (!this.offscreenCtx) {
      console.warn('[CanvasRenderer] Failed to create offscreen context');
      return;
    }
    
    const dpr = this.options.pixelRatio;
    this.offscreenCanvas.width = this.options.width * dpr;
    this.offscreenCanvas.height = this.options.height * dpr;
    this.offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  
  resize(width, height) {
    if (!this.canvas || !this.ctx) return;
    
    this.options.width = width;
    this.options.height = height;
    this.viewport.width = width;
    this.viewport.height = height;
    
    const dpr = this.options.pixelRatio;
    
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    if (this.offscreenCanvas && this.offscreenCtx) {
      this.offscreenCanvas.width = width * dpr;
      this.offscreenCanvas.height = height * dpr;
      this.offscreenCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    this.updateVisibleElements();
  }
  
  setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            this.resize(width, height);
          }
        }
      });
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', this.handleResize);
    }
  }
  
  handleResize() {
    if (this.container) {
      this.resize(this.container.clientWidth, this.container.clientHeight);
    }
  }
  
  // 设置数据管理器
  setDataManager(dataManager) {
    this.dataManager = dataManager;
    
    dataManager.on('dataChanged', ({ nodes, links }) => {
      this.setData(nodes, links);
    });
    
    dataManager.on('nodeExpanded', ({ nodeId, children }) => {
      this.animateNodeExpansion(nodeId, children);
    });
    
    dataManager.on('nodeCollapsed', ({ nodeId }) => {
      this.animateNodeCollapse(nodeId);
    });
  }
  
  // 节点展开动画
  animateNodeExpansion(nodeId, childrenIds) {
    if (!this.options.enableAnimations) return;
    
    const parentNode = this.getNode(nodeId);
    if (!parentNode) return;
    
    // 涟漪效果
    if (this.visualEffects) {
      this.visualEffects.createRipple(parentNode.x, parentNode.y, {
        color: parentNode.color,
        maxRadius: parentNode.radius * 3,
        duration: 600
      });
    }
    
    // 子节点弹性进入动画
    childrenIds.forEach((childId, index) => {
      const childNode = this.getNode(childId);
      if (!childNode) return;
      
      // 延迟动画，产生stagger效果
      setTimeout(() => {
        // 从父节点位置弹出
        const startX = parentNode.x;
        const startY = parentNode.y;
        const targetX = childNode.x;
        const targetY = childNode.y;
        
        // 临时设置位置为父节点位置
        childNode.x = startX;
        childNode.y = startY;
        childNode.scale = 0;
        childNode.opacity = 0;
        
        // 弹簧动画到目标位置
        animationEngine.spring({
          target: childNode,
          property: 'x',
          from: startX,
          to: targetX,
          tension: 0.4,
          friction: 0.7
        });
        
        animationEngine.spring({
          target: childNode,
          property: 'y',
          from: startY,
          to: targetY,
          tension: 0.4,
          friction: 0.7
        });
        
        // 缩放动画
        animationEngine.animate({
          target: childNode,
          property: 'scale',
          from: 0,
          to: 1,
          duration: 400,
          easing: 'easeOutElastic'
        });
        
        // 透明度动画
        animationEngine.animate({
          target: childNode,
          property: 'opacity',
          from: 0,
          to: 1,
          duration: 300,
          easing: 'easeOutQuad'
        });
        
        // 连接线生长动画
        if (this.visualEffects) {
          this.visualEffects.createLineDraw(
            parentNode.x, parentNode.y,
            targetX, targetY,
            { color: parentNode.color + '80', duration: 400 }
          );
        }
      }, index * 50); // 每个子节点延迟50ms
    });
    
    // 展开指示器旋转动画
    animationEngine.animate({
      target: parentNode,
      property: 'indicatorRotation',
      from: 0,
      to: 90,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }
  
  // 节点收起动画
  animateNodeCollapse(nodeId) {
    if (!this.options.enableAnimations) return;
    
    const parentNode = this.getNode(nodeId);
    if (!parentNode) return;
    
    // 收起指示器旋转动画
    animationEngine.animate({
      target: parentNode,
      property: 'indicatorRotation',
      from: 90,
      to: 0,
      duration: 300,
      easing: 'easeOutQuad'
    });
  }
  
  setData(nodes, links) {
    this.nodes = (nodes || []).map(n => this.processNode(n));
    this.links = (links || []).map(l => this.processLink(l));
    this.updateVisibleElements();
    this.centerView();
  }
  
  processNode(node) {
    return {
      ...node,
      x: node.x || 0,
      y: node.y || 0,
      radius: node.radius || 20,
      color: node.color || '#64748b',
      opacity: node.opacity ?? 1,
      scale: node.scale ?? 1,
      visible: node.visible !== false,
      expanded: node.expanded || false,
      hasChildren: node.hasChildren || false,
      indicatorRotation: node.indicatorRotation || 0,
      hoverScale: 1,
      pulsePhase: Math.random() * Math.PI * 2 // 用于脉冲动画
    };
  }
  
  processLink(link) {
    return {
      ...link,
      source: link.source,
      target: link.target,
      width: link.width || 1,
      color: link.color || '#94a3b8',
      opacity: link.opacity ?? 0.6,
      visible: link.visible !== false,
      type: link.type || 'hierarchy',
      dashed: link.dashed || false,
      drawProgress: 1
    };
  }
  
  centerView() {
    if (this.nodes.length === 0) return;
    
    let minX = Infinity, minY = Infinity;
    let maxX = -Infinity, maxY = -Infinity;
    
    for (const node of this.nodes) {
      if (node.visible) {
        minX = Math.min(minX, node.x - node.radius);
        minY = Math.min(minY, node.y - node.radius);
        maxX = Math.max(maxX, node.x + node.radius);
        maxY = Math.max(maxY, node.y + node.radius);
      }
    }
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    const contentWidth = maxX - minX + 100;
    const contentHeight = maxY - minY + 100;
    const scaleX = this.options.width / contentWidth;
    const scaleY = this.options.height / contentHeight;
    const zoom = Math.min(scaleX, scaleY, 1);
    
    this.viewport.x = this.options.width / 2 - centerX * zoom;
    this.viewport.y = this.options.height / 2 - centerY * zoom;
    this.viewport.zoom = zoom;
    
    this.updateVisibleElements();
  }
  
  updateVisibleElements() {
    const bounds = this.getViewportBounds();
    const margin = 100;
    
    this.visibleNodes = this.nodes.filter(node => {
      return node.visible &&
             node.x >= bounds.x - margin &&
             node.x <= bounds.x + bounds.width + margin &&
             node.y >= bounds.y - margin &&
             node.y <= bounds.y + bounds.height + margin;
    });
    
    this.visibleLinks = this.links.filter(link => {
      const source = this.getNode(link.source);
      const target = this.getNode(link.target);
      if (!source || !target) return false;
      
      return link.visible && source.visible && target.visible;
    });
  }
  
  getViewportBounds() {
    return {
      x: -this.viewport.x / this.viewport.zoom,
      y: -this.viewport.y / this.viewport.zoom,
      width: this.options.width / this.viewport.zoom,
      height: this.options.height / this.viewport.zoom
    };
  }
  
  getNode(id) {
    return this.nodes.find(n => n.id === id);
  }
  
  startRenderLoop() {
    const loop = (timestamp) => {
      if (this.isDestroyed) return;
      
      this.updateFPS(timestamp);
      this.updateAnimations(timestamp);
      this.render();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }
  
  updateFPS(timestamp) {
    this.frameCount++;
    if (timestamp - this.lastFrameTime >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = timestamp;
    }
  }
  
  updateAnimations(timestamp) {
    // 更新脉冲动画相位
    this.visibleNodes.forEach(node => {
      node.pulsePhase += 0.05;
    });
  }
  
  render() {
    if (!this.offscreenCtx || !this.ctx) return;
    
    const ctx = this.offscreenCtx;
    const width = this.options.width;
    const height = this.options.height;
    
    // 清空
    ctx.fillStyle = this.options.backgroundColor;
    ctx.fillRect(0, 0, width, height);
    
    ctx.save();
    ctx.translate(this.viewport.x, this.viewport.y);
    ctx.scale(this.viewport.zoom, this.viewport.zoom);
    
    // 渲染链接
    this.renderLinks(ctx);
    
    // 渲染节点
    this.renderNodes(ctx);
    
    // 渲染标签
    this.renderLabels(ctx);
    
    // 渲染视觉效果
    if (this.visualEffects && this.visualEffects.isRunning) {
      this.visualEffects.tick();
    }
    
    ctx.restore();
    
    // 复制到主画布
    this.ctx.drawImage(this.offscreenCanvas, 0, 0, width, height);
  }
  
  renderLinks(ctx) {
    for (const link of this.visibleLinks) {
      const source = this.getNode(link.source);
      const target = this.getNode(link.target);
      if (!source || !target) continue;
      
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      
      ctx.strokeStyle = link.color;
      ctx.lineWidth = link.width / this.viewport.zoom;
      ctx.globalAlpha = link.opacity;
      
      // 虚线样式
      if (link.dashed) {
        ctx.setLineDash([5 / this.viewport.zoom, 5 / this.viewport.zoom]);
      } else {
        ctx.setLineDash([]);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.globalAlpha = 1;
  }
  
  renderNodes(ctx) {
    const now = performance.now();
    
    for (const node of this.visibleNodes) {
      if (!node.visible) continue;
      
      const radius = node.radius * (node.scale || 1) * (node.hoverScale || 1);
      
      // 多层发光效果
      if (node === this.hoveredNode || node === this.selectedNode) {
        this.renderMultiLayerGlow(ctx, node, radius, now);
      }
      
      // 节点圆形
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      
      // 动态渐变
      const gradient = ctx.createRadialGradient(
        node.x - radius * 0.3, node.y - radius * 0.3, 0,
        node.x, node.y, radius
      );
      
      // 根据状态调整颜色亮度
      const brightness = node === this.hoveredNode ? 40 : 30;
      gradient.addColorStop(0, this.lightenColor(node.color, brightness));
      gradient.addColorStop(1, node.color);
      
      ctx.fillStyle = gradient;
      ctx.globalAlpha = node.opacity;
      ctx.fill();
      
      // 动态边框
      if (node === this.selectedNode) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3 / this.viewport.zoom;
        ctx.stroke();
        
        // 选中状态外发光
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 20 / this.viewport.zoom;
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (node === this.hoveredNode) {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2 / this.viewport.zoom;
        ctx.stroke();
      }
      
      // 展开指示器（带动画旋转）
      if (node.hasChildren) {
        this.renderExpandIndicator(ctx, node, radius);
      }
      
      // 图标
      if (node.icon) {
        ctx.font = `${radius * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.icon, node.x, node.y);
      }
    }
    ctx.globalAlpha = 1;
  }
  
  // 多层发光效果
  renderMultiLayerGlow(ctx, node, radius, timestamp) {
    const pulseIntensity = (Math.sin(node.pulsePhase) + 1) / 2; // 0-1
    
    // 外层环境光
    const outerGradient = ctx.createRadialGradient(
      node.x, node.y, radius * 1.2,
      node.x, node.y, radius * 2
    );
    outerGradient.addColorStop(0, node.color + '20');
    outerGradient.addColorStop(1, node.color + '00');
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius * 2, 0, Math.PI * 2);
    ctx.fillStyle = outerGradient;
    ctx.fill();
    
    // 中层脉冲光晕
    const midRadius = radius * (1.3 + pulseIntensity * 0.2);
    const midGradient = ctx.createRadialGradient(
      node.x, node.y, radius,
      node.x, node.y, midRadius
    );
    midGradient.addColorStop(0, node.color + '40');
    midGradient.addColorStop(1, node.color + '00');
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, midRadius, 0, Math.PI * 2);
    ctx.fillStyle = midGradient;
    ctx.fill();
    
    // 内层柔和光晕
    const innerGradient = ctx.createRadialGradient(
      node.x, node.y, radius * 0.8,
      node.x, node.y, radius * 1.2
    );
    innerGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    innerGradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = innerGradient;
    ctx.fill();
  }
  
  // 展开指示器
  renderExpandIndicator(ctx, node, radius) {
    const indicatorRadius = 5 / this.viewport.zoom;
    const indicatorX = node.x + radius * 0.7;
    const indicatorY = node.y - radius * 0.7;
    
    // 指示器背景
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, indicatorRadius * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.fill();
    
    // 指示器颜色（展开=绿色，收起=橙色）
    ctx.beginPath();
    ctx.arc(indicatorX, indicatorY, indicatorRadius, 0, Math.PI * 2);
    ctx.fillStyle = node.expanded ? '#10b981' : '#f59e0b';
    ctx.fill();
    
    // 旋转箭头
    ctx.save();
    ctx.translate(indicatorX, indicatorY);
    ctx.rotate((node.indicatorRotation || 0) * Math.PI / 180);
    
    ctx.beginPath();
    ctx.moveTo(-indicatorRadius * 0.4, 0);
    ctx.lineTo(indicatorRadius * 0.4, 0);
    ctx.lineTo(0, indicatorRadius * 0.5);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    ctx.restore();
  }
  
  renderLabels(ctx) {
    const zoom = this.viewport.zoom;
    
    for (const node of this.visibleNodes) {
      if (!node.visible || !node.name) continue;
      
      // 小节点在缩放级别低时不显示标签
      if (node.radius < 20 && zoom < 0.7 && node !== this.hoveredNode) continue;
      
      // 计算字体大小
      let fontSize = 12 / zoom;
      if (node.radius < 15) {
        fontSize = Math.max(8, node.radius * 0.6 / zoom);
      }
      
      ctx.font = `${fontSize}px "Noto Sans SC", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      const textWidth = ctx.measureText(node.name).width;
      const padding = 6 / zoom;
      const labelY = node.y + node.radius + 8;
      
      // 标签背景（玻璃态效果）
      const bgGradient = ctx.createLinearGradient(
        node.x - textWidth / 2 - padding, labelY - padding / 2,
        node.x - textWidth / 2 - padding, labelY + fontSize + padding / 2
      );
      bgGradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
      bgGradient.addColorStop(1, 'rgba(30, 41, 59, 0.9)');
      
      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.roundRect(
        node.x - textWidth / 2 - padding,
        labelY - padding / 2,
        textWidth + padding * 2,
        fontSize + padding,
        6 / zoom
      );
      ctx.fill();
      
      // 标签边框
      ctx.strokeStyle = node.color + '40';
      ctx.lineWidth = 1 / zoom;
      ctx.stroke();
      
      // 标签文字
      ctx.fillStyle = node === this.hoveredNode ? '#ffffff' : '#e2e8f0';
      ctx.fillText(node.name, node.x, labelY);
      
      // 悬停时显示额外信息
      if (node === this.hoveredNode && node.description) {
        const descFontSize = fontSize * 0.85;
        ctx.font = `${descFontSize}px "Noto Sans SC", sans-serif`;
        const descY = labelY + fontSize + 4;
        
        ctx.fillStyle = 'rgba(148, 163, 184, 0.8)';
        ctx.fillText(node.description.substring(0, 20) + '...', node.x, descY);
      }
    }
  }
  
  setupEventListeners() {
    if (!this.canvas) return;
    
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
    this.canvas.addEventListener('wheel', this.handleWheel, { passive: false });
    this.canvas.addEventListener('dblclick', this.handleDoubleClick);
    
    this.setupTouchEvents();
  }
  
  handleMouseDown(e) {
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.dragStartPos = { x, y };
    this.isDragging = false;
    
    const node = this.hitTest(x, y);
    if (node) {
      this.draggedNode = node;
      this.selectedNode = node;
    } else {
      this.isDragging = true;
      this.canvas.style.cursor = 'grabbing';
    }
  }
  
  handleMouseMove(e) {
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (this.draggedNode) {
      const dx = x - this.dragStartPos.x;
      const dy = y - this.dragStartPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > this.dragThreshold) {
        const worldPos = this.screenToWorld(x, y);
        this.draggedNode.x = worldPos.x;
        this.draggedNode.y = worldPos.y;
        
        if (this.dataManager) {
          this.dataManager.updateNodePosition(this.draggedNode.id, worldPos.x, worldPos.y);
        }
      }
    } else if (this.isDragging) {
      this.pan(x - this.dragStartPos.x, y - this.dragStartPos.y);
      this.dragStartPos = { x, y };
    } else {
      const node = this.hitTest(x, y);
      if (node !== this.hoveredNode) {
        // 取消之前的悬停动画
        if (this.hoveredNode) {
          this.animateHover(this.hoveredNode, false);
        }
        
        this.hoveredNode = node;
        
        if (node) {
          this.animateHover(node, true);
          this.canvas.style.cursor = 'pointer';
        } else {
          this.canvas.style.cursor = 'grab';
        }
      }
    }
  }
  
  // 悬停动画
  animateHover(node, isHovering) {
    if (!this.options.enableAnimations) {
      node.hoverScale = isHovering ? 1.15 : 1;
      return;
    }
    
    const targetScale = isHovering ? 1.15 : 1;
    
    animationEngine.spring({
      target: node,
      property: 'hoverScale',
      from: node.hoverScale || 1,
      to: targetScale,
      tension: 0.5,
      friction: 0.6
    });
  }
  
  handleMouseUp(e) {
    if (this.draggedNode && !this.isDragging) {
      this.onNodeClick(this.draggedNode);
    }
    
    this.isDragging = false;
    this.draggedNode = null;
    if (this.canvas) {
      this.canvas.style.cursor = 'grab';
    }
  }
  
  handleDoubleClick(e) {
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const node = this.hitTest(x, y);
    if (node && node.hasChildren) {
      // 粒子爆炸效果
      if (this.visualEffects) {
        this.visualEffects.createParticleExplosion(node.x, node.y, {
          color: node.color,
          particleCount: 8,
          duration: 600
        });
      }
      
      this.onNodeDoubleClick(node);
    }
  }
  
  handleMouseLeave() {
    if (this.hoveredNode) {
      this.animateHover(this.hoveredNode, false);
    }
    
    this.isDragging = false;
    this.draggedNode = null;
    this.hoveredNode = null;
    if (this.canvas) {
      this.canvas.style.cursor = 'grab';
    }
  }
  
  handleWheel(e) {
    e.preventDefault();
    if (!this.canvas) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const factor = e.deltaY > 0 ? 0.9 : 1.1;
    
    this.zoom(factor, x, y);
  }
  
  onNodeClick(node) {
    const event = new CustomEvent('nodeClick', { 
      detail: { node, timestamp: Date.now() } 
    });
    this.container.dispatchEvent(event);
  }
  
  onNodeDoubleClick(node) {
    const event = new CustomEvent('nodeDoubleClick', { 
      detail: { node, timestamp: Date.now() } 
    });
    this.container.dispatchEvent(event);
  }
  
  setupTouchEvents() {
    let touches = new Map();
    let lastDistance = 0;
    
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      
      for (const touch of e.changedTouches) {
        touches.set(touch.identifier, {
          x: touch.clientX - rect.left,
          y: touch.clientY - rect.top
        });
      }
      
      if (touches.size === 2) {
        const touchArray = Array.from(touches.values());
        lastDistance = Math.hypot(
          touchArray[0].x - touchArray[1].x,
          touchArray[0].y - touchArray[1].y
        );
      }
    }, { passive: false });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.canvas) return;
      
      const rect = this.canvas.getBoundingClientRect();
      
      if (touches.size === 1) {
        const touch = e.changedTouches[0];
        const prevTouch = touches.get(touch.identifier);
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        this.pan(x - prevTouch.x, y - prevTouch.y);
        touches.set(touch.identifier, { x, y });
      } else if (touches.size === 2) {
        const touchArray = Array.from(e.touches).map(t => ({
          x: t.clientX - rect.left,
          y: t.clientY - rect.top
        }));
        
        const distance = Math.hypot(
          touchArray[0].x - touchArray[1].x,
          touchArray[0].y - touchArray[1].y
        );
        
        const centerX = (touchArray[0].x + touchArray[1].x) / 2;
        const centerY = (touchArray[0].y + touchArray[1].y) / 2;
        
        this.zoom(distance / lastDistance, centerX, centerY);
        lastDistance = distance;
      }
    }, { passive: false });
    
    this.canvas.addEventListener('touchend', (e) => {
      for (const touch of e.changedTouches) {
        touches.delete(touch.identifier);
      }
    });
  }
  
  setViewport(x, y, zoom) {
    this.viewport.x = x;
    this.viewport.y = y;
    this.viewport.zoom = Math.max(0.1, Math.min(5, zoom));
    this.updateVisibleElements();
  }

  resetViewport() {
    if (this.nodes.length === 0) return;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    this.nodes.forEach(node => {
      if (node.visible) {
        minX = Math.min(minX, node.x);
        maxX = Math.max(maxX, node.x);
        minY = Math.min(minY, node.y);
        maxY = Math.max(maxY, node.y);
      }
    });

    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    const contentWidth = maxX - minX + 100;
    const contentHeight = maxY - minY + 100;
    const scaleX = this.options.width / contentWidth;
    const scaleY = this.options.height / contentHeight;
    const zoom = Math.min(scaleX, scaleY, 1);

    this.viewport.x = this.options.width / 2 - centerX * zoom;
    this.viewport.y = this.options.height / 2 - centerY * zoom;
    this.viewport.zoom = zoom;

    this.updateVisibleElements();
  }

  pan(dx, dy) {
    this.viewport.x += dx;
    this.viewport.y += dy;
    this.updateVisibleElements();
  }
  
  zoom(factor, centerX, centerY) {
    const newZoom = Math.max(0.1, Math.min(5, this.viewport.zoom * factor));
    const zoomFactor = newZoom / this.viewport.zoom;
    
    this.viewport.x = centerX - (centerX - this.viewport.x) * zoomFactor;
    this.viewport.y = centerY - (centerY - this.viewport.y) * zoomFactor;
    this.viewport.zoom = newZoom;
    
    this.updateVisibleElements();
  }
  
  screenToWorld(screenX, screenY) {
    return {
      x: (screenX - this.viewport.x) / this.viewport.zoom,
      y: (screenY - this.viewport.y) / this.viewport.zoom
    };
  }
  
  worldToScreen(worldX, worldY) {
    return {
      x: worldX * this.viewport.zoom + this.viewport.x,
      y: worldY * this.viewport.zoom + this.viewport.y
    };
  }
  
  hitTest(screenX, screenY) {
    const worldPos = this.screenToWorld(screenX, screenY);
    
    for (let i = this.visibleNodes.length - 1; i >= 0; i--) {
      const node = this.visibleNodes[i];
      const dx = worldPos.x - node.x;
      const dy = worldPos.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance <= node.radius * (node.hoverScale || 1)) {
        return node;
      }
    }
    return null;
  }
  
  lightenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  }
  
  getFPS() {
    return this.fps;
  }
  
  destroy() {
    this.isDestroyed = true;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.visualEffects) {
      this.visualEffects.destroy();
    }
    
    if (this.canvas) {
      this.canvas.removeEventListener('mousedown', this.handleMouseDown);
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('mouseup', this.handleMouseUp);
      this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
      this.canvas.removeEventListener('wheel', this.handleWheel);
      this.canvas.removeEventListener('dblclick', this.handleDoubleClick);
      this.canvas.remove();
    }
    
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    
    window.removeEventListener('resize', this.handleResize);
  }
}

// 对象池
class ObjectPool {
  constructor(factory, initialSize = 10) {
    this.factory = factory;
    this.pool = [];
    this.active = new Set();
    
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.factory());
    }
  }
  
  acquire() {
    let obj = this.pool.pop();
    if (!obj) {
      obj = this.factory();
    }
    this.active.add(obj);
    return obj;
  }
  
  release(obj) {
    if (this.active.has(obj)) {
      this.active.delete(obj);
      this.pool.push(obj);
    }
  }
}

// 导出
export { CanvasRenderer };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CanvasRenderer };
}

if (typeof window !== 'undefined') {
  window.CanvasRenderer = CanvasRenderer;
}
