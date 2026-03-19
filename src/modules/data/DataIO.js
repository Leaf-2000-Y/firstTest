// ==================== DataIO - 数据导入导出模块 ====================
// 支持 JSON、CSV 格式的数据导入导出

class DataIO {
  constructor() {
    this.supportedFormats = ['json', 'csv', 'graphml'];
  }

  // ==================== 导出功能 ====================

  // 导出为 JSON
  exportToJSON(data, options = {}) {
    const { pretty = true, includeMetadata = true } = options;

    const exportData = {
      version: '3.0',
      exportTime: new Date().toISOString(),
      metadata: includeMetadata ? {
        nodeCount: data.nodes.length,
        linkCount: data.links.length,
        description: '00后人生问题知识图谱'
      } : undefined,
      nodes: data.nodes.map(n => ({
        id: n.id,
        name: n.name,
        type: n.type,
        x: n.x,
        y: n.y,
        radius: n.radius,
        color: n.color,
        icon: n.icon,
        description: n.description,
        severity: n.severity,
        expanded: n.expanded,
        hasChildren: n.hasChildren,
        tags: n.tags || []
      })),
      links: data.links.map(l => ({
        source: typeof l.source === 'object' ? l.source.id : l.source,
        target: typeof l.target === 'object' ? l.target.id : l.target,
        type: l.type || 'hierarchy',
        width: l.width,
        color: l.color,
        dashed: l.dashed
      }))
    };

    const jsonString = pretty
      ? JSON.stringify(exportData, null, 2)
      : JSON.stringify(exportData);

    return jsonString;
  }

  // 导出为 CSV
  exportToCSV(data) {
    // 节点 CSV
    const nodeHeaders = ['id', 'name', 'type', 'x', 'y', 'radius', 'color', 'description', 'severity', 'parent'];
    const nodeRows = data.nodes.map(n => {
      const parent = data.links.find(l =>
        (typeof l.target === 'object' ? l.target.id : l.target) === n.id
      );
      return [
        n.id,
        `"${n.name}"`,
        n.type,
        n.x,
        n.y,
        n.radius,
        n.color,
        `"${n.description || ''}"`,
        n.severity || '',
        parent ? (typeof parent.source === 'object' ? parent.source.id : parent.source) : ''
      ].join(',');
    });

    const nodeCSV = [nodeHeaders.join(','), ...nodeRows].join('\n');

    // 连接 CSV
    const linkHeaders = ['source', 'target', 'type', 'width', 'color', 'dashed'];
    const linkRows = data.links.map(l => [
      typeof l.source === 'object' ? l.source.id : l.source,
      typeof l.target === 'object' ? l.target.id : l.target,
      l.type || 'hierarchy',
      l.width || 1,
      l.color || '#94a3b8',
      l.dashed || false
    ].join(','));

    const linkCSV = [linkHeaders.join(','), ...linkRows].join('\n');

    return { nodes: nodeCSV, links: linkCSV };
  }

  // 导出为图片
  async exportToImage(canvas, options = {}) {
    const {
      format = 'png',
      quality = 1,
      backgroundColor = '#0f172a',
      padding = 50
    } = options;

    // 创建临时画布
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');

    // 计算边界
    const bounds = this.calculateBounds(canvas);
    tempCanvas.width = bounds.width + padding * 2;
    tempCanvas.height = bounds.height + padding * 2;

    // 填充背景
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // 绘制原画布内容
    ctx.drawImage(
      canvas,
      bounds.x - padding,
      bounds.y - padding,
      bounds.width + padding * 2,
      bounds.height + padding * 2,
      0,
      0,
      tempCanvas.width,
      tempCanvas.height
    );

    // 转换为图片数据
    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    return tempCanvas.toDataURL(mimeType, quality);
  }

  // 计算画布边界
  calculateBounds(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let minX = canvas.width, minY = canvas.height;
    let maxX = 0, maxY = 0;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 0) {
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  // 触发下载
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ==================== 导入功能 ====================

  // 从 JSON 导入
  importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);

      // 验证数据结构
      if (!data.nodes || !Array.isArray(data.nodes)) {
        throw new Error('Invalid JSON: nodes array required');
      }

      if (!data.links || !Array.isArray(data.links)) {
        throw new Error('Invalid JSON: links array required');
      }

      // 处理节点
      const nodes = data.nodes.map(n => ({
        id: n.id,
        name: n.name,
        type: n.type || 'problem',
        x: n.x || 0,
        y: n.y || 0,
        radius: n.radius || 20,
        color: n.color || '#64748b',
        icon: n.icon,
        description: n.description,
        severity: n.severity,
        expanded: n.expanded || false,
        hasChildren: n.hasChildren || false,
        tags: n.tags || [],
        visible: true
      }));

      // 处理连接
      const links = data.links.map(l => ({
        source: l.source,
        target: l.target,
        type: l.type || 'hierarchy',
        width: l.width || 1,
        color: l.color || '#94a3b8',
        dashed: l.dashed || false,
        visible: true
      }));

      return { nodes, links, metadata: data.metadata };
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error.message}`);
    }
  }

  // 从 CSV 导入
  importFromCSV(nodeCSV, linkCSV) {
    const parseCSV = (csv) => {
      const lines = csv.trim().split('\n');
      const headers = lines[0].split(',').map(h => h.trim());

      return lines.slice(1).map(line => {
        const values = this.parseCSVLine(line);
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = values[index];
        });
        return obj;
      });
    };

    // 解析节点
    const nodeData = parseCSV(nodeCSV);
    const nodes = nodeData.map(n => ({
      id: n.id,
      name: n.name.replace(/^"|"$/g, ''),
      type: n.type || 'problem',
      x: parseFloat(n.x) || 0,
      y: parseFloat(n.y) || 0,
      radius: parseFloat(n.radius) || 20,
      color: n.color || '#64748b',
      description: n.description ? n.description.replace(/^"|"$/g, '') : '',
      severity: n.severity || null,
      expanded: false,
      hasChildren: false,
      visible: true
    }));

    // 解析连接
    const linkData = linkCSV ? parseCSV(linkCSV) : [];
    const links = linkData.map(l => ({
      source: l.source,
      target: l.target,
      type: l.type || 'hierarchy',
      width: parseFloat(l.width) || 1,
      color: l.color || '#94a3b8',
      dashed: l.dashed === 'true',
      visible: true
    }));

    // 计算 hasChildren
    links.forEach(l => {
      const parent = nodes.find(n => n.id === l.source);
      if (parent) {
        parent.hasChildren = true;
      }
    });

    return { nodes, links };
  }

  // 解析 CSV 行（处理引号）
  parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    values.push(current.trim());
    return values;
  }

  // 文件读取
  readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (e) => {
        reject(new Error('Failed to read file'));
      };

      if (file.type.includes('json') || file.name.endsWith('.json')) {
        reader.readAsText(file);
      } else if (file.type.includes('csv') || file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reject(new Error('Unsupported file format'));
      }
    });
  }

  // 自动检测并导入
  async importFromFile(file) {
    const content = await this.readFile(file);
    const extension = file.name.split('.').pop().toLowerCase();

    switch (extension) {
      case 'json':
        return this.importFromJSON(content);
      case 'csv':
        // 假设包含节点和连接在同一个文件
        return this.importFromCSV(content, '');
      default:
        throw new Error(`Unsupported file format: ${extension}`);
    }
  }

  // ==================== 数据验证 ====================

  validateData(data) {
    const errors = [];

    // 验证节点
    if (!data.nodes || data.nodes.length === 0) {
      errors.push('No nodes found');
    } else {
      const nodeIds = new Set();
      data.nodes.forEach((node, index) => {
        if (!node.id) {
          errors.push(`Node at index ${index} has no ID`);
        } else if (nodeIds.has(node.id)) {
          errors.push(`Duplicate node ID: ${node.id}`);
        } else {
          nodeIds.add(node.id);
        }

        if (!node.name) {
          errors.push(`Node ${node.id} has no name`);
        }
      });
    }

    // 验证连接
    if (data.links) {
      data.links.forEach((link, index) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;

        if (!sourceId || !targetId) {
          errors.push(`Link at index ${index} is missing source or target`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// 导出
export { DataIO };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DataIO };
}

if (typeof window !== 'undefined') {
  window.DataIO = DataIO;
}
