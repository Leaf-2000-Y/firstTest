// ==================== ExportManager - 导出管理器 ====================
// 支持导出图片(PNG/JPG)和PDF

class ExportManager {
  constructor(options = {}) {
    this.options = {
      scale: options.scale || 2,           // 导出缩放比例
      quality: options.quality || 0.9,     // 图片质量
      format: options.format || 'png',     // 默认格式
      backgroundColor: options.backgroundColor || '#0f172a',
      padding: options.padding || 50,      // 边距
      ...options
    };
  }
  
  // 导出Canvas为图片
  exportImage(canvas, options = {}) {
    const opts = { ...this.options, ...options };
    
    return new Promise((resolve, reject) => {
      try {
        // 创建高分辨率Canvas
        const exportCanvas = document.createElement('canvas');
        const ctx = exportCanvas.getContext('2d');
        
        // 计算导出尺寸
        const width = canvas.width * opts.scale;
        const height = canvas.height * opts.scale;
        
        exportCanvas.width = width;
        exportCanvas.height = height;
        
        // 填充背景
        ctx.fillStyle = opts.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        
        // 绘制原始Canvas内容（缩放）
        ctx.drawImage(canvas, 0, 0, width, height);
        
        // 转换为DataURL
        const mimeType = opts.format === 'jpg' ? 'image/jpeg' : 'image/png';
        const dataURL = exportCanvas.toDataURL(mimeType, opts.quality);
        
        resolve({
          success: true,
          dataURL,
          width,
          height,
          format: opts.format
        });
      } catch (error) {
        reject({
          success: false,
          error: error.message
        });
      }
    });
  }
  
  // 导出为Blob
  exportBlob(canvas, options = {}) {
    const opts = { ...this.options, ...options };
    
    return new Promise((resolve, reject) => {
      try {
        const exportCanvas = document.createElement('canvas');
        const ctx = exportCanvas.getContext('2d');
        
        const width = canvas.width * opts.scale;
        const height = canvas.height * opts.scale;
        
        exportCanvas.width = width;
        exportCanvas.height = height;
        
        ctx.fillStyle = opts.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(canvas, 0, 0, width, height);
        
        const mimeType = opts.format === 'jpg' ? 'image/jpeg' : 'image/png';
        
        exportCanvas.toBlob(
          (blob) => {
            resolve({
              success: true,
              blob,
              width,
              height,
              format: opts.format
            });
          },
          mimeType,
          opts.quality
        );
      } catch (error) {
        reject({
          success: false,
          error: error.message
        });
      }
    });
  }
  
  // 下载图片
  async downloadImage(canvas, filename, options = {}) {
    try {
      const result = await this.exportImage(canvas, options);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = filename || `knowledge-graph-${Date.now()}.${options.format || this.options.format}`;
      link.href = result.dataURL;
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      return { success: true };
    } catch (error) {
      console.error('[ExportManager] 下载图片失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 导出为PDF（使用html2pdf.js或类似库）
  async exportPDF(canvas, options = {}) {
    const opts = {
      title: '00后人生问题知识图谱',
      author: 'Knowledge Graph System',
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      ...options
    };
    
    try {
      // 先导出为图片
      const imageResult = await this.exportImage(canvas, { scale: 2 });
      
      if (!imageResult.success) {
        throw new Error(imageResult.error);
      }
      
      // 创建PDF（使用简单的PDF生成方法）
      const pdfContent = this.createSimplePDF(imageResult.dataURL, opts);
      
      return {
        success: true,
        dataURL: pdfContent,
        format: 'pdf'
      };
    } catch (error) {
      console.error('[ExportManager] 导出PDF失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 创建简单PDF（使用data URL方式）
  createSimplePDF(imageDataURL, options) {
    // 这是一个简化的PDF生成方法
    // 实际项目中建议使用 jsPDF 或 pdfmake 库
    
    const { title, author, orientation } = options;
    
    // 创建包含图片的HTML页面
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          @page {
            size: A4 ${orientation};
            margin: 10mm;
          }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #0f172a;
          }
          img {
            max-width: 100%;
            max-height: 100vh;
            object-fit: contain;
          }
          .header {
            position: fixed;
            top: 10mm;
            left: 10mm;
            right: 10mm;
            color: white;
            font-family: 'Noto Sans SC', sans-serif;
          }
          .header h1 {
            margin: 0;
            font-size: 18pt;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 10pt;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>作者: ${author} | 导出时间: ${new Date().toLocaleString('zh-CN')}</p>
        </div>
        <img src="${imageDataURL}" alt="${title}">
      </body>
      </html>
    `;
    
    // 返回HTML data URL（可以用浏览器打印为PDF）
    return 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
  }
  
  // 导出数据为JSON
  exportJSON(data, filename) {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = filename || `knowledge-graph-data-${Date.now()}.json`;
      link.href = url;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('[ExportManager] 导出JSON失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 导出数据为CSV
  exportCSV(nodes, links, filename) {
    try {
      // 导出节点
      let csv = 'ID,Name,Type,Description,Severity,X,Y\n';
      nodes.forEach(node => {
        csv += `"${node.id}","${node.name}","${node.type}","${node.description || ''}","${node.severity || ''}",${node.x || 0},${node.y || 0}\n`;
      });
      
      // 导出连接
      csv += '\n\nSource,Target,Type\n';
      links.forEach(link => {
        const source = typeof link.source === 'object' ? link.source.id : link.source;
        const target = typeof link.target === 'object' ? link.target.id : link.target;
        csv += `"${source}","${target}","${link.type || 'hierarchy'}"\n`;
      });
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.download = filename || `knowledge-graph-data-${Date.now()}.csv`;
      link.href = url;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('[ExportManager] 导出CSV失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 复制到剪贴板
  async copyToClipboard(canvas, options = {}) {
    try {
      const result = await this.exportBlob(canvas, options);
      
      if (!result.success) {
        throw new Error(result.error);
      }
      
      // 使用 Clipboard API
      if (navigator.clipboard && navigator.clipboard.write) {
        await navigator.clipboard.write([
          new ClipboardItem({
            [result.blob.type]: result.blob
          })
        ]);
        
        return { success: true, message: '已复制到剪贴板' };
      } else {
        throw new Error('浏览器不支持剪贴板API');
      }
    } catch (error) {
      console.error('[ExportManager] 复制到剪贴板失败:', error);
      return { success: false, error: error.message };
    }
  }
  
  // 获取导出预览
  getPreview(canvas, options = {}) {
    return this.exportImage(canvas, { scale: 0.5, ...options });
  }
}

// 导出
export { ExportManager };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExportManager };
}

if (typeof window !== 'undefined') {
  window.ExportManager = ExportManager;
}
