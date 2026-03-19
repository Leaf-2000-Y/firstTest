// ==================== NodeValidator - 节点数据验证器 ====================
// 验证节点数据的完整性和有效性

class NodeValidator {
  constructor(existingNodes = new Map()) {
    this.existingNodes = existingNodes;
    this.idCounters = new Map();
  }
  
  // 验证节点
  validate(node) {
    const errors = [];
    const warnings = [];
    
    // 必需字段检查
    if (!node.id) {
      errors.push('节点ID不能为空');
    } else if (typeof node.id !== 'string' && typeof node.id !== 'number') {
      errors.push('节点ID必须是字符串或数字');
    }
    
    if (!node.name) {
      errors.push('节点名称不能为空');
    } else if (typeof node.name !== 'string') {
      errors.push('节点名称必须是字符串');
    } else if (node.name.length > 100) {
      warnings.push('节点名称过长，建议保持在100字符以内');
    }
    
    // 类型检查
    const validTypes = ['center', 'domain', 'subcategory', 'problem', 'solution', 'resource'];
    if (node.type && !validTypes.includes(node.type)) {
      warnings.push(`未知的节点类型: ${node.type}，使用默认值 'problem'`);
      node.type = 'problem';
    }
    
    // 数值范围检查
    if (node.radius !== undefined) {
      if (typeof node.radius !== 'number' || node.radius < 5 || node.radius > 200) {
        warnings.push('节点半径应在 5-200 之间，已调整为默认值');
        node.radius = Math.max(5, Math.min(200, node.radius || 20));
      }
    }
    
    if (node.opacity !== undefined) {
      if (typeof node.opacity !== 'number' || node.opacity < 0 || node.opacity > 1) {
        warnings.push('透明度应在 0-1 之间，已调整为默认值');
        node.opacity = Math.max(0, Math.min(1, node.opacity || 1));
      }
    }
    
    // 颜色格式检查
    if (node.color && !this.isValidColor(node.color)) {
      warnings.push('颜色格式不正确，使用默认颜色');
      node.color = this.getDefaultColor(node.type);
    }
    
    // 坐标检查
    if (node.x !== undefined && typeof node.x !== 'number') {
      warnings.push('x坐标必须是数字，已设为0');
      node.x = 0;
    }
    
    if (node.y !== undefined && typeof node.y !== 'number') {
      warnings.push('y坐标必须是数字，已设为0');
      node.y = 0;
    }
    
    // 严重程度检查
    const validSeverities = ['critical', 'high', 'medium', 'low'];
    if (node.severity && !validSeverities.includes(node.severity)) {
      warnings.push(`未知的严重程度: ${node.severity}`);
    }
    
    // 标签检查
    if (node.tags) {
      if (!Array.isArray(node.tags)) {
        warnings.push('标签必须是数组');
        node.tags = [];
      } else if (node.tags.length > 20) {
        warnings.push('标签数量过多，建议保持在20个以内');
        node.tags = node.tags.slice(0, 20);
      }
    }
    
    // 子节点检查
    if (node.children) {
      if (!Array.isArray(node.children)) {
        warnings.push('子节点必须是数组');
        node.children = [];
      }
    }
    
    // 检查ID是否已存在
    if (node.id && this.existingNodes.has(node.id)) {
      errors.push(`节点ID已存在: ${node.id}`);
    }
    
    // 清理节点数据
    const cleanedNode = this.cleanNode(node);
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      node: cleanedNode
    };
  }
  
  // 清理节点数据
  cleanNode(node) {
    return {
      id: node.id,
      name: String(node.name || '').trim(),
      type: node.type || 'problem',
      description: node.description ? String(node.description).trim() : '',
      x: typeof node.x === 'number' ? node.x : 0,
      y: typeof node.y === 'number' ? node.y : 0,
      radius: typeof node.radius === 'number' ? node.radius : 20,
      color: node.color || this.getDefaultColor(node.type),
      icon: node.icon || '',
      severity: node.severity || 'medium',
      tags: Array.isArray(node.tags) ? node.tags.filter(t => typeof t === 'string') : [],
      hasChildren: !!node.hasChildren || (Array.isArray(node.children) && node.children.length > 0),
      expanded: !!node.expanded,
      visible: node.visible !== false,
      opacity: typeof node.opacity === 'number' ? node.opacity : 1,
      scale: typeof node.scale === 'number' ? node.scale : 1,
      level: typeof node.level === 'number' ? node.level : 0,
      parent: node.parent || null,
      children: Array.isArray(node.children) ? [...node.children] : [],
      // 保留其他自定义属性
      ...this.getCustomProperties(node)
    };
  }
  
  // 获取自定义属性
  getCustomProperties(node) {
    const standardProps = ['id', 'name', 'type', 'description', 'x', 'y', 'radius', 'color', 
                          'icon', 'severity', 'tags', 'hasChildren', 'expanded', 'visible', 
                          'opacity', 'scale', 'level', 'parent', 'children'];
    const custom = {};
    
    Object.keys(node).forEach(key => {
      if (!standardProps.includes(key)) {
        custom[key] = node[key];
      }
    });
    
    return custom;
  }
  
  // 验证颜色格式
  isValidColor(color) {
    if (typeof color !== 'string') return false;
    
    // 检查十六进制格式
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
    if (hexRegex.test(color)) return true;
    
    // 检查RGB/RGBA格式
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/;
    if (rgbRegex.test(color) || rgbaRegex.test(color)) return true;
    
    // 检查HSL/HSLA格式
    const hslRegex = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaRegex = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/;
    if (hslRegex.test(color) || hslaRegex.test(color)) return true;
    
    // 检查CSS颜色名称
    const cssColors = [
      'black', 'white', 'red', 'green', 'blue', 'yellow', 'cyan', 'magenta',
      'gray', 'grey', 'orange', 'purple', 'pink', 'brown', 'lime', 'navy',
      'teal', 'silver', 'gold', 'transparent'
    ];
    if (cssColors.includes(color.toLowerCase())) return true;
    
    return false;
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
  
  // 生成唯一ID
  generateUniqueId(prefix = 'node') {
    const count = (this.idCounters.get(prefix) || 0) + 1;
    this.idCounters.set(prefix, count);
    return `${prefix}-${Date.now()}-${count}`;
  }
  
  // 添加已存在的节点（用于验证时检查重复）
  addExistingNode(node) {
    if (node && node.id) {
      this.existingNodes.set(node.id, node);
    }
  }
  
  // 批量验证节点
  validateBatch(nodes) {
    const results = {
      valid: [],
      invalid: [],
      errors: [],
      warnings: []
    };
    
    nodes.forEach(node => {
      const result = this.validate(node);
      
      if (result.isValid) {
        results.valid.push(result.node);
      } else {
        results.invalid.push({ node, errors: result.errors });
      }
      
      results.errors.push(...result.errors);
      results.warnings.push(...result.warnings);
    });
    
    return results;
  }
  
  // 验证连接
  validateLink(link, existingNodes) {
    const errors = [];
    const warnings = [];
    
    if (!link.source) {
      errors.push('连接必须有源节点');
    } else if (!existingNodes.has(link.source)) {
      errors.push(`源节点不存在: ${link.source}`);
    }
    
    if (!link.target) {
      errors.push('连接必须有目标节点');
    } else if (!existingNodes.has(link.target)) {
      errors.push(`目标节点不存在: ${link.target}`);
    }
    
    if (link.source === link.target) {
      warnings.push('自环连接可能不是预期的');
    }
    
    const validTypes = ['hierarchy', 'related', 'influence', 'bidirectional', 'temporal'];
    if (link.type && !validTypes.includes(link.type)) {
      warnings.push(`未知的连接类型: ${link.type}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
}

// 导出
export { NodeValidator };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NodeValidator };
}

if (typeof window !== 'undefined') {
  window.NodeValidator = NodeValidator;
}
