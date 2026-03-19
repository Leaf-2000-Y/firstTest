// ==================== ToastManager - Toast通知管理器 ====================
// 提供全局Toast通知功能，支持成功、错误、警告、信息四种类型

class ToastManager {
  constructor(options = {}) {
    this.options = {
      duration: 3000,        // 默认显示时长（毫秒）
      maxToasts: 5,          // 最大同时显示的Toast数量
      position: 'top-right', // 位置：top-right, top-left, bottom-right, bottom-left, top-center
      ...options
    };

    this.toasts = [];
    this.container = null;
    this.toastId = 0;

    this.init();
  }

  // 初始化容器
  init() {
    // 检查是否已存在容器
    this.container = document.getElementById('toast-container');
    
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = `toast-container toast-${this.options.position}`;
      document.body.appendChild(this.container);
    }

    // 添加样式
    this.addStyles();
  }

  // 添加样式
  addStyles() {
    if (document.getElementById('toast-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'toast-styles';
    styles.textContent = `
      .toast-container {
        position: fixed;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
      }

      .toast-container.toast-top-right {
        top: 20px;
        right: 20px;
      }

      .toast-container.toast-top-left {
        top: 20px;
        left: 20px;
      }

      .toast-container.toast-bottom-right {
        bottom: 20px;
        right: 20px;
        flex-direction: column-reverse;
      }

      .toast-container.toast-bottom-left {
        bottom: 20px;
        left: 20px;
        flex-direction: column-reverse;
      }

      .toast-container.toast-top-center {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        padding: 16px 20px;
        background: rgba(15, 23, 42, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        min-width: 300px;
        max-width: 400px;
        pointer-events: auto;
        animation: toastSlideIn 0.3s ease-out;
        transition: all 0.3s ease;
      }

      .toast.toast-exit {
        animation: toastSlideOut 0.3s ease-in forwards;
      }

      .toast-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 14px;
      }

      .toast-content {
        flex: 1;
        min-width: 0;
      }

      .toast-title {
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: 4px;
      }

      .toast-message {
        font-size: 13px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.5;
      }

      .toast-close {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s ease;
        padding: 0;
      }

      .toast-close:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }

      /* Toast类型样式 */
      .toast-success {
        border-left: 4px solid #10b981;
      }

      .toast-success .toast-icon {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }

      .toast-error {
        border-left: 4px solid #ef4444;
      }

      .toast-error .toast-icon {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }

      .toast-warning {
        border-left: 4px solid #f59e0b;
      }

      .toast-warning .toast-icon {
        background: rgba(245, 158, 11, 0.2);
        color: #f59e0b;
      }

      .toast-info {
        border-left: 4px solid #3b82f6;
      }

      .toast-info .toast-icon {
        background: rgba(59, 130, 246, 0.2);
        color: #3b82f6;
      }

      /* 动画 */
      @keyframes toastSlideIn {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toastSlideOut {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      /* 进度条 */
      .toast-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: currentColor;
        opacity: 0.3;
        border-radius: 0 0 0 12px;
        transition: width linear;
      }
    `;

    document.head.appendChild(styles);
  }

  // 显示Toast
  show(options) {
    const {
      type = 'info',
      title = '',
      message = '',
      duration = this.options.duration,
      closable = true
    } = options;

    // 限制最大数量
    if (this.toasts.length >= this.options.maxToasts) {
      this.remove(this.toasts[0].id);
    }

    this.toastId++;
    const id = this.toastId;

    // 创建Toast元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = `toast-${id}`;

    // 图标
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type]}</div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-message">${message}</div>
      </div>
      ${closable ? `
        <button class="toast-close" onclick="toastManager.dismiss(${id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      ` : ''}
      <div class="toast-progress" style="width: 100%;"></div>
    `;

    // 添加到容器
    this.container.appendChild(toast);

    // 保存引用
    const toastData = { id, element: toast, timeout: null };
    this.toasts.push(toastData);

    // 启动进度条动画
    const progressBar = toast.querySelector('.toast-progress');
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = '0%';
        progressBar.style.transitionDuration = `${duration}ms`;
      }, 10);
    }

    // 自动关闭
    if (duration > 0) {
      toastData.timeout = setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  // 成功Toast
  success(message, title = '成功') {
    return this.show({ type: 'success', title, message });
  }

  // 错误Toast
  error(message, title = '错误') {
    return this.show({ type: 'error', title, message });
  }

  // 警告Toast
  warning(message, title = '警告') {
    return this.show({ type: 'warning', title, message });
  }

  // 信息Toast
  info(message, title = '提示') {
    return this.show({ type: 'info', title, message });
  }

  // 关闭Toast
  dismiss(id) {
    this.remove(id);
  }

  // 移除Toast
  remove(id) {
    const index = this.toasts.findIndex(t => t.id === id);
    if (index === -1) return;

    const toast = this.toasts[index];

    // 清除定时器
    if (toast.timeout) {
      clearTimeout(toast.timeout);
    }

    // 添加退出动画
    toast.element.classList.add('toast-exit');

    // 动画结束后移除元素
    setTimeout(() => {
      if (toast.element.parentNode) {
        toast.element.parentNode.removeChild(toast.element);
      }
    }, 300);

    // 从数组中移除
    this.toasts.splice(index, 1);
  }

  // 清除所有Toast
  clear() {
    [...this.toasts].forEach(toast => this.remove(toast.id));
  }

  // 更新位置
  setPosition(position) {
    this.options.position = position;
    this.container.className = `toast-container toast-${position}`;
  }

  // 销毁
  destroy() {
    this.clear();
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    const styles = document.getElementById('toast-styles');
    if (styles) {
      styles.parentNode.removeChild(styles);
    }
  }
}

// 创建全局实例
const toastManager = new ToastManager();

// 导出
export { ToastManager, toastManager };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ToastManager, toastManager };
}

if (typeof window !== 'undefined') {
  window.ToastManager = ToastManager;
  window.toastManager = toastManager;
}
