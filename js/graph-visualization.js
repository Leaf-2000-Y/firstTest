// ==================== 00后人生问题知识图谱可视化 ====================

class KnowledgeGraph {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);
    this.data = data;
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    // 缩放和平移状态
    this.transform = { x: 0, y: 0, k: 1 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    
    // 节点和连接数据
    this.nodes = [];
    this.links = [];
    this.simulation = null;
    
    // 当前选中的节点
    this.selectedNode = null;
    this.highlightedNodes = new Set();
    
    // 视图模式
    this.viewMode = 'network'; // network, mindmap, radial
    
    // 过滤器
    this.filters = {
      dimensions: new Set(data.dimensions.map(d => d.id)),
      severity: new Set(['high', 'medium', 'low']),
      search: ''
    };
    
    this.init();
  }
  
  init() {
    this.setupSVG();
    this.setupZoom();
    this.prepareData();
    this.setupSimulation();
    this.render();
    this.setupEventListeners();
  }
  
  setupSVG() {
    // 创建SVG
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('id', 'graph-svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [0, 0, this.width, this.height]);
    
    // 定义渐变和滤镜
    const defs = this.svg.append('defs');
    
    // 发光滤镜
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
    
    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');
    
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    
    // 箭头标记
    defs.append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#64748b');
    
    // 主容器组
    this.g = this.svg.append('g');
    
    // 连接线组
    this.linkGroup = this.g.append('g').attr('class', 'links');
    
    // 节点组
    this.nodeGroup = this.g.append('g').attr('class', 'nodes');
    
    // 标签组
    this.labelGroup = this.g.append('g').attr('class', 'labels');
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
    // 准备节点数据
    this.nodes = [];
    
    // 添加中心节点
    this.nodes.push({
      ...this.data.center,
      radius: 50,
      level: 0
    });
    
    // 添加维度节点
    this.data.dimensions.forEach((dim, i) => {
      const angle = (i / this.data.dimensions.length) * 2 * Math.PI - Math.PI / 2;
      this.nodes.push({
        ...dim,
        radius: 35,
        level: 1,
        angle: angle,
        parentId: 'center'
      });
      
      // 添加该维度下的问题节点
      const problems = this.data.problems[dim.id] || [];
      problems.forEach((problem, j) => {
        const problemAngle = angle + (j - problems.length / 2) * 0.3;
        this.nodes.push({
          ...problem,
          dimensionId: dim.id,
          radius: problem.severity === 'high' ? 20 : 15,
          level: 2,
          angle: problemAngle,
          parentId: dim.id,
          color: dim.color
        });
      });
    });
    
    // 添加解决方案节点
    this.data.solutions.forEach((sol, i) => {
      this.nodes.push({
        ...sol,
        radius: 25,
        level: 3,
        parentId: 'center'
      });
    });
    
    // 准备连接数据
    this.links = this.data.links.map(link => ({
      ...link,
      source: link.source,
      target: link.target
    }));
  }
  
  setupSimulation() {
    this.simulation = d3.forceSimulation(this.nodes)
      .force('link', d3.forceLink(this.links)
        .id(d => d.id)
        .distance(d => {
          if (d.type === 'main') return 180;
          if (d.type === 'contains') return 120;
          if (d.type === 'causes') return 150;
          return 100;
        })
        .strength(d => d.strength * 0.5)
      )
      .force('charge', d3.forceManyBody()
        .strength(d => {
          if (d.type === 'center') return -2000;
          if (d.type === 'dimension') return -800;
          if (d.type === 'problem') return -300;
          return -200;
        })
      )
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('collision', d3.forceCollide().radius(d => d.radius + 10))
      .force('radial', d3.forceRadial(d => {
        if (d.type === 'center') return 0;
        if (d.type === 'dimension') return 200;
        if (d.type === 'problem') return 350;
        if (d.type === 'solution') return 450;
        return 300;
      }, this.width / 2, this.height / 2).strength(0.3));
  }
  
  render() {
    this.renderLinks();
    this.renderNodes();
    this.renderLabels();
    
    // 监听模拟更新
    this.simulation.on('tick', () => {
      this.updatePositions();
    });
  }
  
  renderLinks() {
    this.linkElements = this.linkGroup
      .selectAll('.graph-link')
      .data(this.links)
      .join('line')
      .attr('class', d => `graph-link link-${d.type}`)
      .attr('stroke', d => {
        if (d.type === 'main') return '#6366f1';
        if (d.type === 'related') return '#64748b';
        if (d.type === 'causes') return '#ef4444';
        if (d.type === 'solves') return '#22c55e';
        return '#94a3b8';
      })
      .attr('stroke-width', d => {
        if (d.type === 'main') return 3;
        if (d.type === 'causes' || d.type === 'solves') return 2;
        return 1;
      })
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', d => d.type === 'causes' ? 'url(#arrow)' : null);
    
    // 添加虚线动画
    this.linkGroup
      .selectAll('.link-causes, .link-solves')
      .attr('stroke-dasharray', '5,5')
      .attr('class', d => `graph-link link-${d.type} link-animated`);
  }
  
  renderNodes() {
    this.nodeElements = this.nodeGroup
      .selectAll('.graph-node')
      .data(this.nodes)
      .join('g')
      .attr('class', d => `graph-node node-${d.type}`)
      .attr('cursor', 'pointer')
      .call(d3.drag()
        .on('start', (event, d) => this.dragstarted(event, d))
        .on('drag', (event, d) => this.dragged(event, d))
        .on('end', (event, d) => this.dragended(event, d)));
    
    // 添加圆形背景
    this.nodeElements.append('circle')
      .attr('r', d => d.radius)
      .attr('fill', d => {
        if (d.type === 'center') return 'url(#centerGradient)';
        if (d.type === 'dimension') return d.color;
        if (d.type === 'problem') return d.color || '#64748b';
        if (d.type === 'solution') return d.color;
        return '#94a3b8';
      })
      .attr('stroke', d => {
        if (d.type === 'center') return '#818cf8';
        return 'rgba(255,255,255,0.3)';
      })
      .attr('stroke-width', d => d.type === 'center' ? 3 : 2)
      .attr('filter', 'url(#glow)');
    
    // 添加图标或文字
    this.nodeElements.each(function(d) {
      const node = d3.select(this);
      if (d.icon) {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.8)
          .text(d.icon);
      } else if (d.type === 'problem') {
        node.append('text')
          .attr('text-anchor', 'middle')
          .attr('dy', '0.35em')
          .attr('font-size', d.radius * 0.5)
          .attr('fill', 'white')
          .text(d.severity === 'high' ? '!' : '?');
      }
    });
    
    // 添加交互事件
    this.nodeElements
      .on('click', (event, d) => this.handleNodeClick(d))
      .on('mouseover', (event, d) => this.handleNodeHover(event, d))
      .on('mouseout', () => this.handleNodeOut());
  }
  
  renderLabels() {
    this.labelElements = this.labelGroup
      .selectAll('.graph-label')
      .data(this.nodes.filter(d => d.type !== 'problem' || d.severity === 'high'))
      .join('text')
      .attr('class', 'graph-label')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.radius + 18)
      .attr('font-size', d => d.type === 'center' ? 16 : (d.type === 'dimension' ? 14 : 12))
      .attr('font-weight', d => d.type === 'center' || d.type === 'dimension' ? 600 : 400)
      .text(d => d.name)
      .style('pointer-events', 'none');
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
    this.isDragging = true;
  }
  
  dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  dragended(event, d) {
    if (!event.active) this.simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    this.isDragging = false;
  }
  
  // 节点点击
  handleNodeClick(d) {
    event.stopPropagation();
    this.selectedNode = d;
    this.highlightConnections(d);
    this.showDetailPanel(d);
  }
  
  // 高亮连接
  highlightConnections(node) {
    // 重置所有节点和连接
    this.nodeElements.classed('dimmed', true);
    this.linkElements.classed('dimmed', true);
    
    // 找到相关节点
    const connectedNodes = new Set([node.id]);
    const connectedLinks = new Set();
    
    this.links.forEach(link => {
      if (link.source.id === node.id) {
        connectedNodes.add(link.target.id);
        connectedLinks.add(link.index);
      } else if (link.target.id === node.id) {
        connectedNodes.add(link.source.id);
        connectedLinks.add(link.index);
      }
    });
    
    // 应用高亮
    this.nodeElements
      .classed('dimmed', d => !connectedNodes.has(d.id))
      .classed('highlighted', d => connectedNodes.has(d.id));
    
    this.linkElements
      .classed('dimmed', (d, i) => !connectedLinks.has(i))
      .classed('highlighted', (d, i) => connectedLinks.has(i));
  }
  
  // 重置高亮
  resetHighlight() {
    this.nodeElements
      .classed('dimmed', false)
      .classed('highlighted', false);
    this.linkElements
      .classed('dimmed', false)
      .classed('highlighted', false);
  }
  
  // 节点悬停
  handleNodeHover(event, d) {
    if (this.isDragging) return;
    
    const tooltip = document.getElementById('tooltip');
    tooltip.innerHTML = `
      <div class="tooltip-title">${d.icon || ''} ${d.name}</div>
      <div class="tooltip-desc">${d.description || ''}</div>
    `;
    tooltip.classList.add('visible');
    
    // 定位提示框
    const rect = this.container.getBoundingClientRect();
    tooltip.style.left = (event.pageX + 10) + 'px';
    tooltip.style.top = (event.pageY - 10) + 'px';
  }
  
  handleNodeOut() {
    const tooltip = document.getElementById('tooltip');
    tooltip.classList.remove('visible');
  }
  
  // 显示详情面板
  showDetailPanel(node) {
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('detail-content');
    
    let html = '';
    
    // 头部
    html += `
      <div class="detail-header">
        <div class="detail-icon" style="background: ${node.color || '#6366f1'}20; color: ${node.color || '#6366f1'}">
          ${node.icon || (node.type === 'problem' ? '⚠️' : '🔹')}
        </div>
        <div class="detail-title-group">
          <div class="detail-title">${node.name}</div>
          <span class="detail-type" style="background: ${node.color || '#6366f1'}20; color: ${node.color || '#6366f1'}">
            ${this.getTypeLabel(node.type)}
          </span>
        </div>
      </div>
    `;
    
    // 描述
    if (node.description) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">📋 描述</div>
          <div class="detail-description">${node.description}</div>
        </div>
      `;
    }
    
    // 问题特有的信息
    if (node.type === 'problem') {
      // 严重程度
      html += `
        <div class="detail-section">
          <div class="detail-section-title">⚡ 严重程度</div>
          <div class="tag ${node.severity}">${node.severity === 'high' ? '高' : node.severity === 'medium' ? '中' : '低'}</div>
        </div>
      `;
      
      // 症状
      if (node.symptoms && node.symptoms.length > 0) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">🔍 常见症状</div>
            <div class="tag-list">
              ${node.symptoms.map(s => `<span class="tag">${s}</span>`).join('')}
            </div>
          </div>
        `;
      }
      
      // 原因
      if (node.causes && node.causes.length > 0) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">🎯 深层原因</div>
            <div class="tag-list">
              ${node.causes.map(c => `<span class="tag">${c}</span>`).join('')}
            </div>
          </div>
        `;
      }
      
      // 解决方案
      if (node.solutions && node.solutions.length > 0) {
        html += `
          <div class="detail-section">
            <div class="detail-section-title">💡 建议方案</div>
            <div class="tag-list">
              ${node.solutions.map(s => `<span class="tag" style="background: rgba(34, 197, 94, 0.2); color: #86efac;">${s}</span>`).join('')}
            </div>
          </div>
        `;
      }
    }
    
    // 维度特有的统计
    if (node.type === 'dimension' && node.stats) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">📊 统计数据</div>
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
              <span>严重程度</span>
              <span>${node.stats.severity}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${node.stats.severity}%; background: ${node.color};"></div>
            </div>
          </div>
          <div style="margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
              <span>普遍程度</span>
              <span>${node.stats.prevalence}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${node.stats.prevalence}%; background: ${node.color};"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-secondary); margin-bottom: 4px;">
              <span>复杂程度</span>
              <span>${node.stats.complexity}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${node.stats.complexity}%; background: ${node.color};"></div>
            </div>
          </div>
        </div>
      `;
    }
    
    // 相关连接
    const relatedLinks = this.links.filter(l => 
      l.source.id === node.id || l.target.id === node.id
    );
    
    if (relatedLinks.length > 0) {
      html += `
        <div class="detail-section">
          <div class="detail-section-title">🔗 关联问题</div>
          <div class="connection-list">
      `;
      
      relatedLinks.forEach(link => {
        const otherNode = link.source.id === node.id ? link.target : link.source;
        const relationType = this.getRelationLabel(link.type);
        
        html += `
          <div class="connection-item" onclick="graph.focusNode('${otherNode.id}')">
            <div class="connection-icon" style="background: ${otherNode.color || '#64748b'}20; color: ${otherNode.color || '#64748b'}">
              ${otherNode.icon || '•'}
            </div>
            <div class="connection-info">
              <div class="connection-name">${otherNode.name}</div>
              <div class="connection-type">${relationType}</div>
            </div>
          </div>
        `;
      });
      
      html += '</div></div>';
    }
    
    content.innerHTML = html;
    panel.classList.add('open');
  }
  
  // 获取类型标签
  getTypeLabel(type) {
    const labels = {
      'center': '核心主题',
      'dimension': '维度',
      'problem': '问题',
      'solution': '解决方案',
      'resource': '资源'
    };
    return labels[type] || type;
  }
  
  // 获取关系标签
  getRelationLabel(type) {
    const labels = {
      'main': '核心关联',
      'related': '相关',
      'contains': '包含',
      'causes': '导致',
      'solves': '解决'
    };
    return labels[type] || type;
  }
  
  // 聚焦到节点
  focusNode(nodeId) {
    const node = this.nodes.find(n => n.id === nodeId);
    if (node) {
      // 移动视图到节点
      const scale = 1.5;
      const x = -node.x * scale + this.width / 2;
      const y = -node.y * scale + this.height / 2;
      
      this.svg.transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity.translate(x, y).scale(scale));
      
      // 触发点击
      this.handleNodeClick(node);
    }
  }
  
  // 设置事件监听
  setupEventListeners() {
    // 点击空白处重置
    this.svg.on('click', () => {
      this.resetHighlight();
      document.getElementById('detail-panel').classList.remove('open');
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
  
  // 切换视图模式
  setViewMode(mode) {
    this.viewMode = mode;
    
    if (mode === 'radial') {
      // 径向布局
      this.simulation.force('radial', d3.forceRadial(d => {
        if (d.type === 'center') return 0;
        if (d.type === 'dimension') return 180;
        if (d.type === 'problem') return 320;
        if (d.type === 'solution') return 420;
        return 300;
      }, this.width / 2, this.height / 2).strength(0.8));
      
      this.simulation.force('charge', d3.forceManyBody().strength(-100));
      this.simulation.alpha(1).restart();
    } else if (mode === 'network') {
      // 网络布局
      this.simulation.force('radial', d3.forceRadial(d => {
        if (d.type === 'center') return 0;
        if (d.type === 'dimension') return 200;
        if (d.type === 'problem') return 350;
        if (d.type === 'solution') return 450;
        return 300;
      }, this.width / 2, this.height / 2).strength(0.3));
      
      this.simulation.force('charge', d3.forceManyBody().strength(d => {
        if (d.type === 'center') return -2000;
        if (d.type === 'dimension') return -800;
        if (d.type === 'problem') return -300;
        return -200;
      }));
      this.simulation.alpha(1).restart();
    }
  }
  
  // 应用过滤器
  applyFilters() {
    const { dimensions, severity, search } = this.filters;
    
    // 过滤节点
    this.nodeElements.style('display', d => {
      if (d.type === 'dimension' && !dimensions.has(d.id)) return 'none';
      if (d.type === 'problem') {
        if (!dimensions.has(d.dimensionId)) return 'none';
        if (!severity.has(d.severity)) return 'none';
      }
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) {
        return 'none';
      }
      return 'block';
    });
    
    // 过滤标签
    this.labelElements.style('display', d => {
      if (d.type === 'dimension' && !dimensions.has(d.id)) return 'none';
      if (d.type === 'problem') {
        if (!dimensions.has(d.dimensionId)) return 'none';
        if (!severity.has(d.severity)) return 'none';
      }
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) {
        return 'none';
      }
      return 'block';
    });
    
    // 过滤连接
    this.linkElements.style('display', d => {
      const sourceVisible = this.isNodeVisible(d.source);
      const targetVisible = this.isNodeVisible(d.target);
      return sourceVisible && targetVisible ? 'block' : 'none';
    });
  }
  
  isNodeVisible(node) {
    const { dimensions, severity, search } = this.filters;
    
    if (node.type === 'dimension' && !dimensions.has(node.id)) return false;
    if (node.type === 'problem') {
      if (!dimensions.has(node.dimensionId)) return false;
      if (!severity.has(node.severity)) return false;
    }
    if (search && !node.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
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
  
  // 销毁
  destroy() {
    if (this.simulation) {
      this.simulation.stop();
    }
    this.svg.remove();
  }
}

// ==================== 粒子背景 ====================
class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 50;
    this.connectionDistance = 100;
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // 创建粒子
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // 更新和绘制粒子
    this.particles.forEach((p, i) => {
      // 更新位置
      p.x += p.vx;
      p.y += p.vy;
      
      // 边界检查
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
      
      // 绘制粒子
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
      this.ctx.fill();
      
      // 绘制连接
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / this.connectionDistance)})`;
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// ==================== 初始化 ====================
let graph;
let particleBg;

document.addEventListener('DOMContentLoaded', () => {
  // 初始化粒子背景
  particleBg = new ParticleBackground('particles-canvas');
  
  // 初始化图谱
  const container = document.getElementById('graph-container');
  graph = new KnowledgeGraph('graph-container', GraphData);
  
  // 隐藏加载动画
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 1000);
  
  // 设置UI事件
  setupUIEvents();
});

function setupUIEvents() {
  // 视图切换
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const mode = btn.dataset.mode;
      if (mode && graph) {
        graph.setViewMode(mode);
      }
    });
  });
  
  // 缩放控制
  document.getElementById('zoom-in').addEventListener('click', () => graph.zoomIn());
  document.getElementById('zoom-out').addEventListener('click', () => graph.zoomOut());
  document.getElementById('zoom-reset').addEventListener('click', () => graph.resetZoom());
  
  // 侧边栏切换
  document.getElementById('toggle-sidebar').addEventListener('click', () => {
    document.querySelector('.graph-sidebar').classList.toggle('collapsed');
    document.querySelector('.visualization-area').classList.toggle('full-width');
  });
  
  // 详情面板关闭
  document.getElementById('detail-close').addEventListener('click', () => {
    document.getElementById('detail-panel').classList.remove('open');
    graph.resetHighlight();
  });
  
  // 维度过滤器
  document.querySelectorAll('.dimension-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const dimId = item.dataset.id;
      
      if (graph.filters.dimensions.has(dimId)) {
        graph.filters.dimensions.delete(dimId);
      } else {
        graph.filters.dimensions.add(dimId);
      }
      
      graph.applyFilters();
    });
  });
  
  // 严重程度过滤器
  document.querySelectorAll('.filter-item[data-severity]').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('active');
      const severity = item.dataset.severity;
      
      if (graph.filters.severity.has(severity)) {
        graph.filters.severity.delete(severity);
      } else {
        graph.filters.severity.add(severity);
      }
      
      graph.applyFilters();
    });
  });
  
  // 搜索
  const searchInput = document.getElementById('search-input');
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      graph.filters.search = e.target.value;
      graph.applyFilters();
    }, 300);
  });
}
