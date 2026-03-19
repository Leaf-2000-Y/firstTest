// ==================== 00后人生问题知识图谱可视化引擎 ====================

class ComprehensiveKnowledgeGraph {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    // 视图模式: 'mindmap', 'hierarchy', 'network', 'radar'
    this.viewMode = 'network';
    
    // 缩放和平移
    this.transform = { x: 0, y: 0, k: 1 };
    
    // 节点和连接
    this.nodes = [];
    this.links = [];
    this.simulation = null;
    
    // 状态
    this.selectedNode = null;
    this.expandedNodes = new Set(['center']);
    this.filters = {
      domains: new Set(data.domains.map(d => d.id)),
      severity: new Set(['high', 'medium', 'low']),
      search: ''
    };
    
    // 颜色配置
    this.colors = {
      center: '#6366f1',
      learning: '#3b82f6',
      career: '#10b981',
      relationship: '#f59e0b',
      mental: '#8b5cf6',
      emotion: '#ec4899',
      social: '#06b6d4'
    };
    
    this.init();
  }
  
  init() {
    this.setupSVG();
    this.setupDefs();
    this.setupZoom();
    this.prepareData();
    this.render();
    this.setupEventListeners();
  }
  
  setupSVG() {
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('id', 'comprehensive-graph-svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [0, 0, this.width, this.height]);
    
    // 主容器
    this.g = this.svg.append('g').attr('class', 'main-group');
    
    // 分层组
    this.linkGroup = this.g.append('g').attr('class', 'links-layer');
    this.nodeGroup = this.g.append('g').attr('class', 'nodes-layer');
    this.labelGroup = this.g.append('g').attr('class', 'labels-layer');
  }
  
  setupDefs() {
    const defs = this.svg.append('defs');
    
    // 发光滤镜
    const filter = defs.append('filter')
      .attr('id', 'node-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    
    // 渐变定义
    const gradients = [
      { id: 'grad-center', colors: ['#6366f1', '#8b5cf6'] },
      { id: 'grad-learning', colors: ['#3b82f6', '#60a5fa'] },
      { id: 'grad-career', colors: ['#10b981', '#34d399'] },
      { id: 'grad-relationship', colors: ['#f59e0b', '#fbbf24'] },
      { id: 'grad-mental', colors: ['#8b5cf6', '#a78bfa'] },
      { id: 'grad-emotion', colors: ['#ec4899', '#f472b6'] },
      { id: 'grad-social', colors: ['#06b6d4', '#22d3ee'] }
    ];
    
    gradients.forEach(g => {
      const grad = defs.append('radialGradient')
        .attr('id', g.id)
        .attr('cx', '30%')
        .attr('cy', '30%');
      
      grad.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', g.colors[1]);
      
      grad.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', g.colors[0]);
    });
    
    // 箭头标记
    defs.append('marker')
      .attr('id', 'arrow-causes')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#ef4444');
    
    defs.append('marker')
      .attr('id', 'arrow-enables')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 20)
      .attr('refY', 0)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#22c55e');
  }
  
  setupZoom() {
    this.zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        this.transform = event.transform;
        this.g.attr('transform', event.transform);
      });
    
    this.svg.call(this.zoom);
  }
  
  prepareData() {
    this.nodes = [];
    this.links = [];
    
    // 只加载中心节点，其他节点通过点击展开
    this.nodes.push({
      id: 'center',
      name: this.data.center.name,
      type: 'center',
      icon: this.data.center.icon,
      color: this.data.center.color,
      radius: 60,
      level: 0,
      x: this.width / 2,
      y: this.height / 2
    });
    
    // 默认展开中心节点，加载领域节点
    this.expandedNodes.add('center');
    this.expandNode(this.nodes[0]);
  }
  
  render() {
    this.renderLinks();
    this.renderNodesWithAnimation();
    this.renderLabels();
    this.setupSimulation();
  }
  
  renderLinks() {
    this.linkElements = this.linkGroup
      .selectAll('.graph-link')
      .data(this.links)
      .join('line')
      .attr('class', d => `graph-link link-${d.type}`)
      .attr('stroke', d => {
        if (d.type === 'main') return 'url(#grad-center)';
        if (d.type === 'contains') return '#64748b';
        if (d.type === 'causes') return '#ef4444';
        if (d.type === 'enables') return '#22c55e';
        if (d.type === 'affects') return '#f59e0b';
        if (d.type === 'supports') return '#3b82f6';
        return '#94a3b8';
      })
      .attr('stroke-width', d => {
        if (d.type === 'main') return 4;
        if (d.type === 'contains') return 2;
        return 2;
      })
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', d => {
        if (d.type === 'causes') return 'url(#arrow-causes)';
        if (d.type === 'enables') return 'url(#arrow-enables)';
        return null;
      });
    
    // 动画效果
    this.linkGroup
      .selectAll('.link-causes, .link-enables')
      .attr('stroke-dasharray', '8,4')
      .style('animation', 'flowAnimation 2s linear infinite');
  }
  
  renderNodes() {
    this.nodeElements = this.nodeGroup
      .selectAll('.graph-node')
      .data(this.nodes)
      .join('g')
      .attr('class', d => `graph-node node-${d.type}`)
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (e, d) => this.dragstarted(e, d))
        .on('drag', (e, d) => this.dragged(e, d))
        .on('end', (e, d) => this.dragended(e, d)));
    
    // 节点圆形
    this.nodeElements.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.type === 'center') return 'url(#grad-center)';
        if (d.type === 'domain') return d.gradient;
        if (d.severity === 'high') return '#ef4444';
        if (d.severity === 'medium') return '#f59e0b';
        return d.color || '#64748b';
      })
      .attr('stroke', d => {
        if (d.type === 'center') return '#818cf8';
        return 'rgba(255,255,255,0.4)';
      })
      .attr('stroke-width', d => d.type === 'center' ? 4 : 2)
      .attr('filter', 'url(#node-glow)')
      .style('transition', 'all 0.3s ease');
    
    // 节点图标/文字
    this.nodeElements.each(function(d) {
      const node = d3.select(this);
      if (d.icon) {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.7)
          .text(d.icon);
      } else if (d.type === 'problem') {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.5)
          .attr('fill', 'white')
          .text(d.severity === 'high' ? '!' : d.severity === 'medium' ? '•' : '○');
      }
    });
    
    // 交互事件
    this.nodeElements
      .on('click', (e, d) => this.handleNodeClick(e, d))
      .on('mouseover', (e, d) => this.handleNodeHover(e, d))
      .on('mouseout', () => this.handleNodeOut());
  }
  
  renderLabels() {
    // 为所有节点渲染标签
    this.labelElements = this.labelGroup
      .selectAll('.graph-label')
      .data(this.nodes, d => d.id)
      .join('text')
      .attr('class', d => `graph-label label-${d.type}`)
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 18)
      .attr('font-size', d => this.getLabelFontSize(d))
      .attr('font-weight', d => d.type === 'center' || d.type === 'domain' ? 700 : 500)
      .attr('fill', '#f8fafc')
      .style('text-shadow', '0 2px 4px rgba(0,0,0,0.9)')
      .style('pointer-events', 'none')
      .style('opacity', d => this.getLabelOpacity(d))
      .text(d => this.truncateLabel(d.name, d.type));
  }
  
  getLabelFontSize(node) {
    if (node.type === 'center') return 16;
    if (node.type === 'domain') return 14;
    if (node.type === 'subcategory') return 12;
    // 问题节点使用较小字体
    return 10;
  }
  
  getLabelOpacity(node) {
    // 根据节点类型和当前缩放级别决定标签透明度
    if (node.type === 'center' || node.type === 'domain') return 1;
    if (node.type === 'subcategory') return 0.9;
    // 问题节点始终显示标签
    return 0.85;
  }
  
  truncateLabel(name, type) {
    // 根据节点类型截断长标签
    const maxLength = type === 'problem' ? 5 : (type === 'subcategory' ? 6 : 10);
    if (name.length <= maxLength) return name;
    return name.slice(0, maxLength) + '...';
  }
  
  setupSimulation() {
    this.simulation = d3.forceSimulation(this.nodes)
      .force('link', d3.forceLink(this.links)
        .id(d => d.id)
        .distance(d => {
          if (d.type === 'main') return 180;
          if (d.type === 'contains') return 120;
          return 150;
        })
        .strength(d => d.strength * 0.5)
      )
      .force('charge', d3.forceManyBody()
        .strength(d => {
          if (d.type === 'center') return -3000;
          if (d.type === 'domain') return -1500;
          if (d.type === 'subcategory') return -800;
          return -400;
        })
      )
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(d => d.radius + 15))
      .force('radial', d3.forceRadial(d => {
        if (d.type === 'center') return 0;
        if (d.type === 'domain') return 200;
        if (d.type === 'subcategory') return 350;
        return 500;
      }, this.width / 2, this.height / 2).strength(0.3));
    
    this.simulation.on('tick', () => {
      this.updatePositions();
    });
  }
  
  updatePositions() {
    this.linkElements
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);
    
    this.nodeElements
      .attr('transform', d => `translate(${d.x},${d.y})`);
    
    this.labelElements
      .attr('x', d => d.x)
      .attr('y', d => d.y);
  }
  
  // 拖拽功能
  dragstarted(event, d) {
    if (!event.active) this.simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  dragended(event, d) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  // 节点点击
  handleNodeClick(event, d) {
    event.stopPropagation();
    this.selectedNode = d;
    
    // 高亮相关节点
    this.highlightConnections(d);
    
    // 显示详情
    this.showDetailPanel(d);
  }
  
  // 高亮连接
  highlightConnections(node) {
    // 重置
    this.nodeElements.classed('dimmed highlighted', false);
    this.linkElements.classed('dimmed highlighted', false);
    
    // 找到相关节点
    const connected = new Set([node.id]);
    this.links.forEach(link => {
      if (link.source.id === node.id) connected.add(link.target.id);
      if (link.target.id === node.id) connected.add(link.source.id);
    });
    
    // 应用样式
    this.nodeElements
      .classed('dimmed', d => !connected.has(d.id))
      .classed('highlighted', d => connected.has(d.id));
    
    this.linkElements
      .classed('dimmed', d => 
        !connected.has(d.source.id) || !connected.has(d.target.id)
      )
      .classed('highlighted', d => 
        connected.has(d.source.id) && connected.has(d.target.id)
      );
  }
  
  // 悬停效果
  handleNodeHover(event, d) {
    const tooltip = document.getElementById('comprehensive-tooltip');
    if (tooltip) {
      tooltip.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 4px; color: ${d.color || '#fff'}">
          ${d.icon || ''} ${d.name}
        </div>
        <div style="font-size: 12px; color: #cbd5e1; line-height: 1.4;">
          ${d.description || ''}
        </div>
        ${d.severity ? `<div style="margin-top: 6px; font-size: 11px;">
          <span style="color: ${d.severity === 'high' ? '#ef4444' : d.severity === 'medium' ? '#f59e0b' : '#22c55e'}">
            ${d.severity === 'high' ? '● 高风险' : d.severity === 'medium' ? '● 中风险' : '● 低风险'}
          </span>
        </div>` : ''}
      `;
      tooltip.style.left = (event.pageX + 15) + 'px';
      tooltip.style.top = (event.pageY - 10) + 'px';
      tooltip.classList.add('visible');
    }
  }
  
  handleNodeOut() {
    const tooltip = document.getElementById('comprehensive-tooltip');
    if (tooltip) {
      tooltip.classList.remove('visible');
    }
  }
  
  // 显示详情面板
  showDetailPanel(node) {
    // 使用新的模态弹窗系统
    if (typeof nodeDetailModal !== 'undefined' && nodeDetailModal) {
      nodeDetailModal.open(node);
    } else {
      // 降级到旧的侧边面板
      this.showLegacyDetailPanel(node);
    }
  }
  
  showLegacyDetailPanel(node) {
    // 支持两种ID: detail-panel/detail-content (新页面) 和 comprehensive-detail-panel/comprehensive-detail-content (旧页面)
    const panel = document.getElementById('detail-panel') || document.getElementById('comprehensive-detail-panel');
    const content = document.getElementById('detail-content') || document.getElementById('comprehensive-detail-content');
    
    if (!panel || !content) {
      console.warn('Detail panel not found');
      return;
    }
    
    let html = `
      <div class="detail-header" style="border-bottom: 1px solid #334155; padding-bottom: 20px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <div style="width: 64px; height: 64px; border-radius: 16px; background: ${node.color || '#6366f1'}20; 
                      display: flex; align-items: center; justify-content: center; font-size: 32px;">
            ${node.icon || '🔹'}
          </div>
          <div>
            <h2 style="margin: 0 0 8px 0; font-size: 24px; color: #f8fafc;">${node.name}</h2>
            <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
                        background: ${node.color || '#6366f1'}20; color: ${node.color || '#6366f1'};">
              ${this.getTypeLabel(node.type)}
            </span>
          </div>
        </div>
      </div>
    `;
    
    if (node.description) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            📋 问题描述
          </h3>
          <p style="color: #cbd5e1; line-height: 1.7; margin: 0;">${node.description}</p>
        </div>
      `;
    }
    
    if (node.severity) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            ⚡ 严重程度
          </h3>
          <div style="display: inline-block; padding: 8px 16px; border-radius: 8px; font-weight: 600;
                      background: ${node.severity === 'high' ? '#ef444420' : node.severity === 'medium' ? '#f59e0b20' : '#22c55e20'};
                      color: ${node.severity === 'high' ? '#fca5a5' : node.severity === 'medium' ? '#fcd34d' : '#86efac'};">
            ${node.severity === 'high' ? '高风险' : node.severity === 'medium' ? '中风险' : '低风险'}
          </div>
        </div>
      `;
    }
    
    if (node.symptoms && node.symptoms.length > 0) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            🔍 常见症状
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${node.symptoms.map(s => `
              <span style="padding: 6px 12px; background: #1e293b; border-radius: 6px; font-size: 13px; color: #cbd5e1;">
                ${s}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    if (node.causes && node.causes.length > 0) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            🎯 深层原因
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${node.causes.map(c => `
              <span style="padding: 6px 12px; background: #1e293b; border-radius: 6px; font-size: 13px; color: #cbd5e1;">
                ${c}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    if (node.solutions && node.solutions.length > 0) {
      html += `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            💡 建议方案
          </h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${node.solutions.map(s => `
              <span style="padding: 6px 12px; background: #22c55e20; border-radius: 6px; font-size: 13px; color: #86efac;">
                ${s}
              </span>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    content.innerHTML = html;
    panel.classList.add('open');
  }
  
  getTypeLabel(type) {
    const labels = {
      'center': '核心主题',
      'domain': '领域',
      'subcategory': '子类别',
      'problem': '问题'
    };
    return labels[type] || type;
  }
  
  // 切换视图模式
  setViewMode(mode) {
    this.viewMode = mode;
    
    if (mode === 'radial') {
      this.simulation.force('radial').strength(0.8);
      this.simulation.alpha(1).restart();
    } else if (mode === 'network') {
      this.simulation.force('radial').strength(0.3);
      this.simulation.alpha(1).restart();
    }
  }
  
  // 应用过滤器
  applyFilters() {
    const { domains, severity, search } = this.filters;
    
    this.nodeElements.style('display', d => {
      if (d.type === 'domain' && !domains.has(d.id)) return 'none';
      if (d.type === 'subcategory' && !domains.has(d.domainId)) return 'none';
      if (d.type === 'problem') {
        if (!domains.has(d.domainId)) return 'none';
        if (!severity.has(d.severity)) return 'none';
      }
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) {
        return 'none';
      }
      return 'block';
    });
    
    this.labelElements.style('display', d => {
      if (d.type === 'domain' && !domains.has(d.id)) return 'none';
      if (d.type === 'subcategory' && !domains.has(d.domainId)) return 'none';
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) {
        return 'none';
      }
      return 'block';
    });
  }
  
  // 缩放控制
  zoomIn() {
    this.svg.transition().call(this.zoom.scaleBy, 1.3);
  }
  
  zoomOut() {
    this.svg.transition().call(this.zoom.scaleBy, 0.7);
  }
  
  resetZoom() {
    this.svg.transition().call(this.zoom.transform, d3.zoomIdentity);
  }
  
  // ==================== 节点展开/收起功能 ====================
  toggleNodeExpansion(node) {
    if (this.expandedNodes.has(node.id)) {
      this.expandedNodes.delete(node.id);
      this.collapseNode(node);
    } else {
      this.expandedNodes.add(node.id);
      this.expandNode(node);
    }
    this.updateExpandIndicators();
  }
  
  expandNode(parentNode) {
    const children = this.getChildren(parentNode);
    if (children.length === 0) return;
    
    // 添加子节点
    children.forEach(child => {
      if (!this.nodes.find(n => n.id === child.id)) {
        this.nodes.push(child);
        this.links.push({
          source: parentNode.id,
          target: child.id,
          type: 'contains',
          strength: 0.8
        });
      }
    });
    
    this.updateVisualization();
  }
  
  collapseNode(parentNode) {
    // 递归移除所有子节点
    this.removeChildrenRecursively(parentNode);
    this.updateVisualization();
  }
  
  removeChildrenRecursively(parentNode) {
    const children = this.nodes.filter(n => n.parentId === parentNode.id);
    children.forEach(child => {
      // 递归移除孙节点
      this.removeChildrenRecursively(child);
      
      // 从节点数组中移除
      const childIndex = this.nodes.findIndex(n => n.id === child.id);
      if (childIndex > -1) {
        this.nodes.splice(childIndex, 1);
      }
      
      // 从展开集合中移除
      this.expandedNodes.delete(child.id);
    });
    
    // 移除相关连接
    this.links = this.links.filter(l => {
      const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
      return sourceId !== parentNode.id;
    });
  }
  
  getChildren(parentNode) {
    const children = [];
    
    if (parentNode.type === 'center') {
      // 返回领域节点
      this.data.domains.forEach((domain, i) => {
        const angle = (i / this.data.domains.length) * 2 * Math.PI - Math.PI / 2;
        const distance = 200;
        children.push({
          id: domain.id,
          name: domain.name,
          type: 'domain',
          icon: domain.icon,
          color: domain.color,
          gradient: `url(#grad-${domain.id})`,
          radius: 45,
          level: 1,
          description: domain.description,
          parentId: 'center',
          x: this.width / 2 + Math.cos(angle) * distance,
          y: this.height / 2 + Math.sin(angle) * distance
        });
      });
    } else if (parentNode.type === 'domain') {
      // 返回子类别节点
      const subcategories = this.data.knowledgeNodes[parentNode.id];
      if (subcategories) {
        const domainIndex = this.data.domains.findIndex(d => d.id === parentNode.id);
        const baseAngle = (domainIndex / this.data.domains.length) * 2 * Math.PI - Math.PI / 2;
        const subKeys = Object.keys(subcategories);
        
        subKeys.forEach((subKey, j) => {
          const subData = subcategories[subKey];
          const subAngle = baseAngle + (j - subKeys.length / 2) * 0.4;
          const subDistance = 350;
          
          children.push({
            id: `${parentNode.id}-${subKey}`,
            name: subData.name,
            type: 'subcategory',
            icon: subData.icon,
            color: parentNode.color,
            radius: 30,
            level: 2,
            parentId: parentNode.id,
            domainId: parentNode.id,
            x: this.width / 2 + Math.cos(subAngle) * subDistance,
            y: this.height / 2 + Math.sin(subAngle) * subDistance
          });
        });
      }
    } else if (parentNode.type === 'subcategory') {
      // 返回问题节点
      const domainId = parentNode.domainId;
      const subKey = parentNode.id.replace(`${domainId}-`, '');
      const subData = this.data.knowledgeNodes[domainId]?.[subKey];
      
      if (subData?.problems) {
        const baseAngle = Math.atan2(
          parentNode.y - this.height / 2,
          parentNode.x - this.width / 2
        );
        
        subData.problems.forEach((problem, k) => {
          const probAngle = baseAngle + (k - subData.problems.length / 2) * 0.1;
          const probDistance = 480;
          
          children.push({
            id: problem.id,
            name: problem.name,
            type: 'problem',
            severity: problem.severity,
            description: problem.description,
            symptoms: problem.symptoms,
            causes: problem.causes,
            solutions: problem.solutions,
            color: parentNode.color,
            radius: problem.severity === 'high' ? 18 : 14,
            level: 3,
            parentId: parentNode.id,
            domainId: domainId,
            x: this.width / 2 + Math.cos(probAngle) * probDistance,
            y: this.height / 2 + Math.sin(probAngle) * probDistance
          });
        });
      }
    }
    
    return children;
  }
  
  hasChildren(node) {
    if (node.type === 'center') return true;
    if (node.type === 'domain') {
      return !!this.data.knowledgeNodes[node.id];
    }
    if (node.type === 'subcategory') {
      const domainId = node.domainId;
      const subKey = node.id.replace(`${domainId}-`, '');
      const subData = this.data.knowledgeNodes[domainId]?.[subKey];
      return !!(subData?.problems?.length > 0);
    }
    return false;
  }
  
  updateVisualization() {
    // 重新渲染连接
    this.renderLinks();
    
    // 重新渲染节点（带动画）
    this.renderNodesWithAnimation();
    
    // 重新渲染标签
    this.renderLabels();
    
    // 更新模拟（如果已初始化）
    if (this.simulation) {
      this.simulation.nodes(this.nodes);
      this.simulation.force('link').links(this.links);
      this.simulation.alpha(0.3).restart();
    }
  }
  
  renderNodesWithAnimation() {
    // 绑定数据
    const nodeSelection = this.nodeGroup
      .selectAll('.graph-node')
      .data(this.nodes, d => d.id);
    
    // 移除退出的节点
    nodeSelection.exit()
      .transition()
      .duration(300)
      .attr('transform', d => `translate(${d.x},${d.y}) scale(0)`)
      .style('opacity', 0)
      .remove();
    
    // 添加新节点
    const nodeEnter = nodeSelection.enter()
      .append('g')
      .attr('class', d => `graph-node node-${d.type}`)
      .attr('cursor', 'pointer')
      .attr('transform', d => `translate(${d.x},${d.y}) scale(0)`)
      .style('opacity', 0)
      .call(d3.drag()
        .on('start', (e, d) => this.dragstarted(e, d))
        .on('drag', (e, d) => this.dragged(e, d))
        .on('end', (e, d) => this.dragended(e, d)));
    
    // 添加圆形
    nodeEnter.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.type === 'center') return 'url(#grad-center)';
        if (d.type === 'domain') return d.gradient;
        if (d.severity === 'high') return '#ef4444';
        if (d.severity === 'medium') return '#f59e0b';
        return d.color || '#64748b';
      })
      .attr('stroke', d => {
        if (d.type === 'center') return '#818cf8';
        return 'rgba(255,255,255,0.4)';
      })
      .attr('stroke-width', d => d.type === 'center' ? 4 : 2)
      .attr('filter', 'url(#node-glow)');
    
    // 添加图标
    nodeEnter.each(function(d) {
      const node = d3.select(this);
      if (d.icon) {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.7)
          .text(d.icon);
      } else if (d.type === 'problem') {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.5)
          .attr('fill', 'white')
          .text(d.severity === 'high' ? '!' : d.severity === 'medium' ? '•' : '○');
      }
    });
    
    // 添加展开/收起指示器
    this.renderExpandIndicators(nodeEnter);
    
    // 合并并更新所有节点
    this.nodeElements = nodeEnter.merge(nodeSelection);
    
    // 动画效果
    this.nodeElements.transition()
      .duration(300)
      .attr('transform', d => `translate(${d.x},${d.y}) scale(1)`)
      .style('opacity', 1);
    
    // 绑定事件
    this.nodeElements
      .on('click', (e, d) => {
        e.stopPropagation();
        if (this.hasChildren(d)) {
          this.toggleNodeExpansion(d);
        }
        this.handleNodeClick(e, d);
      })
      .on('mouseover', (e, d) => this.handleNodeHover(e, d))
      .on('mouseout', () => this.handleNodeOut());
  }
  
  renderExpandIndicators(selection) {
    selection.each((d, i, nodes) => {
      if (this.hasChildren(d)) {
        const node = d3.select(nodes[i]);
        const isExpanded = this.expandedNodes.has(d.id);
        
        // 指示器背景
        node.append('circle')
          .attr('class', 'expand-indicator-bg')
          .attr('r', 8)
          .attr('cx', d.radius - 5)
          .attr('cy', -d.radius + 5)
          .attr('fill', '#fff')
          .attr('stroke', d.color || '#6366f1')
          .attr('stroke-width', 2);
        
        // 指示器文字
        node.append('text')
          .attr('class', 'expand-indicator-text')
          .attr('x', d.radius - 5)
          .attr('y', -d.radius + 5)
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', 10)
          .attr('font-weight', 'bold')
          .attr('fill', d.color || '#6366f1')
          .text(isExpanded ? '−' : '+');
      }
    });
  }
  
  updateExpandIndicators() {
    this.nodeElements.each((d, i, nodes) => {
      if (this.hasChildren(d)) {
        const node = d3.select(nodes[i]);
        const isExpanded = this.expandedNodes.has(d.id);
        
        node.select('.expand-indicator-text')
          .text(isExpanded ? '−' : '+');
      }
    });
  }
  
  // ==================== 搜索功能 ====================
  search(query) {
    if (!query || query.trim().length < 2) return [];
    
    const results = [];
    const lowerQuery = query.toLowerCase().trim();
    
    this.nodes.forEach(node => {
      if (node.type === 'problem') {
        const match = 
          node.name.toLowerCase().includes(lowerQuery) ||
          (node.description && node.description.toLowerCase().includes(lowerQuery)) ||
          (node.symptoms && node.symptoms.some(s => s.toLowerCase().includes(lowerQuery))) ||
          (node.causes && node.causes.some(c => c.toLowerCase().includes(lowerQuery))) ||
          (node.solutions && node.solutions.some(s => s.toLowerCase().includes(lowerQuery)));
        
        if (match) {
          results.push(node);
        }
      }
    });
    
    return results;
  }
  
  // ==================== 筛选功能 ====================
  filterByDomains(domainIds) {
    this.filteredDomains = domainIds || [];
    this.applyFilters();
  }
  
  filterBySeverity(severities) {
    this.filteredSeverities = severities || [];
    this.applyFilters();
  }
  
  // ==================== 节点聚焦 ====================
  focusNode(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node && node.x !== undefined && node.y !== undefined) {
      // 显示详情
      this.handleNodeClick(null, node);
      
      // 缩放并居中到该节点
      const transform = d3.zoomIdentity
        .translate(this.width / 2, this.height / 2)
        .scale(2.5)
        .translate(-node.x, -node.y);
      
      this.svg.transition().duration(750).call(
        this.zoom.transform,
        transform
      );
      
      // 高亮连接
      this.highlightConnections(node);
    }
  }
  
  setupEventListeners() {
    // 点击空白处重置
    this.svg.on('click', () => {
      this.nodeElements.classed('dimmed highlighted', false);
      this.linkElements.classed('dimmed highlighted', false);
      
      const panel = document.getElementById('detail-panel') || document.getElementById('comprehensive-detail-panel');
      if (panel) panel.classList.remove('open');
    });
    
    // 窗口大小改变
    window.addEventListener('resize', () => {
      this.width = this.container.clientWidth;
      this.height = this.container.clientHeight;
      this.svg.attr('width', this.width).attr('height', this.height);
      this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
      this.simulation.alpha(0.3).restart();
    });
  }
}

// ==================== 初始化 ====================
let comprehensiveGraph;

document.addEventListener('DOMContentLoaded', () => {
  // 支持两种容器ID: graph-container (新页面) 和 comprehensive-graph-container (旧页面)
  const containerId = document.getElementById('graph-container') ? 'graph-container' : 
                      (document.getElementById('comprehensive-graph-container') ? 'comprehensive-graph-container' : null);
  
  if (containerId && typeof ComprehensiveData !== 'undefined') {
    comprehensiveGraph = new ComprehensiveKnowledgeGraph(containerId, ComprehensiveData);
    
    // 设置UI事件
    setupComprehensiveUIEvents();
    
    // 隐藏加载动画
    setTimeout(() => {
      const loading = document.getElementById('loading') || document.getElementById('comprehensive-loading');
      if (loading) loading.style.display = 'none';
    }, 1000);
  }
});

function setupComprehensiveUIEvents() {
  // 视图切换
  document.querySelectorAll('.view-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const mode = btn.dataset.mode;
      if (comprehensiveGraph) {
        comprehensiveGraph.setViewMode(mode);
      }
    });
  });
  
  // 缩放控制
  const zoomIn = document.getElementById('comprehensive-zoom-in');
  const zoomOut = document.getElementById('comprehensive-zoom-out');
  const zoomReset = document.getElementById('comprehensive-zoom-reset');
  
  if (zoomIn) zoomIn.addEventListener('click', () => comprehensiveGraph.zoomIn());
  if (zoomOut) zoomOut.addEventListener('click', () => comprehensiveGraph.zoomOut());
  if (zoomReset) zoomReset.addEventListener('click', () => comprehensiveGraph.resetZoom());
  
  // 详情面板关闭
  const closeBtn = document.getElementById('close-detail') || document.getElementById('comprehensive-detail-close');
  const detailPanel = document.getElementById('detail-panel') || document.getElementById('comprehensive-detail-panel');
  if (closeBtn && detailPanel) {
    closeBtn.addEventListener('click', () => {
      detailPanel.classList.remove('open');
      if (comprehensiveGraph) {
        comprehensiveGraph.nodeElements.classed('dimmed highlighted', false);
        comprehensiveGraph.linkElements.classed('dimmed highlighted', false);
      }
    });
  }
  
  // 搜索
  const searchInput = document.getElementById('comprehensive-search');
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        comprehensiveGraph.filters.search = e.target.value;
        comprehensiveGraph.applyFilters();
      }, 300);
    });
  }
  
  // 过滤器
  document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateFilters();
    });
  });
}

function updateFilters() {
  if (!comprehensiveGraph) return;
  
  // 更新领域过滤器
  const domainCheckboxes = document.querySelectorAll('.domain-filter');
  comprehensiveGraph.filters.domains.clear();
  domainCheckboxes.forEach(cb => {
    if (cb.checked) comprehensiveGraph.filters.domains.add(cb.dataset.domain);
  });
  
  // 更新严重度过滤器
  const severityCheckboxes = document.querySelectorAll('.severity-filter');
  comprehensiveGraph.filters.severity.clear();
  severityCheckboxes.forEach(cb => {
    if (cb.checked) comprehensiveGraph.filters.severity.add(cb.dataset.severity);
  });
  
  comprehensiveGraph.applyFilters();
}
