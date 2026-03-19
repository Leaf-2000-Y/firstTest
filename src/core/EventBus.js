// ==================== EventBus - 事件总线系统 ====================
// 提供应用范围内的事件订阅、发布机制
// 支持命名空间、优先级、一次性监听等高级特性

class EventBus {
  constructor() {
    this.events = new Map();
    this.onceEvents = new Map();
    this.priorities = new Map();
    this.middlewares = [];
    this.history = [];
    this.maxHistory = 100;
    this.debug = false;
  }

  // 订阅事件
  on(event, callback, options = {}) {
    const { priority = 0, namespace = 'default' } = options;
    const key = this.getKey(event, namespace);
    
    if (!this.events.has(key)) {
      this.events.set(key, []);
      this.priorities.set(key, []);
    }
    
    const callbacks = this.events.get(key);
    const priorities = this.priorities.get(key);
    
    // 按优先级插入
    const index = priorities.findIndex(p => p < priority);
    const insertIndex = index === -1 ? callbacks.length : index;
    
    callbacks.splice(insertIndex, 0, callback);
    priorities.splice(insertIndex, 0, priority);
    
    if (this.debug) {
      console.log(`[EventBus] 订阅事件: ${key}, 优先级: ${priority}`);
    }
    
    // 返回取消订阅函数
    return () => this.off(event, callback, namespace);
  }

  // 一次性订阅
  once(event, callback, options = {}) {
    const { namespace = 'default' } = options;
    const key = this.getKey(event, namespace);
    
    if (!this.onceEvents.has(key)) {
      this.onceEvents.set(key, []);
    }
    
    const wrappedCallback = (...args) => {
      this.off(event, wrappedCallback, namespace);
      callback(...args);
    };
    
    this.onceEvents.get(key).push(wrappedCallback);
    return this.on(event, wrappedCallback, options);
  }

  // 取消订阅
  off(event, callback, namespace = 'default') {
    const key = this.getKey(event, namespace);
    
    if (this.events.has(key)) {
      const callbacks = this.events.get(key);
      const priorities = this.priorities.get(key);
      const index = callbacks.indexOf(callback);
      
      if (index > -1) {
        callbacks.splice(index, 1);
        priorities.splice(index, 1);
      }
    }
    
    if (this.onceEvents.has(key)) {
      const callbacks = this.onceEvents.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // 发布事件
  emit(event, data, options = {}) {
    const { namespace = 'default', async = false } = options;
    const key = this.getKey(event, namespace);
    
    const eventData = {
      event,
      namespace,
      data,
      timestamp: Date.now(),
      id: this.generateId()
    };
    
    // 记录历史
    this.addToHistory(eventData);
    
    if (this.debug) {
      console.log(`[EventBus] 发布事件: ${key}`, data);
    }
    
    // 执行中间件
    const context = { event: eventData, bus: this };
    for (const middleware of this.middlewares) {
      middleware(context);
    }
    
    // 执行回调
    const executeCallbacks = () => {
      // 普通事件
      if (this.events.has(key)) {
        const callbacks = [...this.events.get(key)];
        callbacks.forEach(callback => {
          try {
            callback(data, eventData);
          } catch (error) {
            console.error(`[EventBus] 事件处理错误: ${key}`, error);
            this.emit('error', { event: key, error, data });
          }
        });
      }
      
      // 通配符事件
      this.emitWildcard(event, data, namespace);
    };
    
    if (async) {
      setTimeout(executeCallbacks, 0);
    } else {
      executeCallbacks();
    }
    
    return eventData;
  }

  // 发布事件（异步）
  emitAsync(event, data, options = {}) {
    return this.emit(event, data, { ...options, async: true });
  }

  // 通配符事件处理
  emitWildcard(event, data, namespace) {
    const wildcardKey = this.getKey('*', namespace);
    if (this.events.has(wildcardKey)) {
      this.events.get(wildcardKey).forEach(callback => {
        callback(data, { event, namespace, data });
      });
    }
    
    // 命名空间通配符
    const nsWildcardKey = this.getKey(event, '*');
    if (this.events.has(nsWildcardKey)) {
      this.events.get(nsWildcardKey).forEach(callback => {
        callback(data, { event, namespace, data });
      });
    }
  }

  // 添加中间件
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 等待特定事件
  waitFor(event, options = {}) {
    const { timeout = 5000, namespace = 'default' } = options;
    
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`等待事件超时: ${event}`));
      }, timeout);
      
      this.once(event, (data) => {
        clearTimeout(timer);
        resolve(data);
      }, { namespace });
    });
  }

  // 获取事件历史
  getHistory(filter = {}) {
    let history = [...this.history];
    
    if (filter.event) {
      history = history.filter(h => h.event === filter.event);
    }
    if (filter.namespace) {
      history = history.filter(h => h.namespace === filter.namespace);
    }
    if (filter.since) {
      history = history.filter(h => h.timestamp >= filter.since);
    }
    
    return history;
  }

  // 清空历史
  clearHistory() {
    this.history = [];
  }

  // 获取所有监听器
  getListeners(event, namespace = 'default') {
    const key = this.getKey(event, namespace);
    return this.events.has(key) ? [...this.events.get(key)] : [];
  }

  // 获取所有事件名称
  getEventNames() {
    const names = new Set();
    this.events.forEach((_, key) => {
      const [event] = key.split(':');
      names.add(event);
    });
    return Array.from(names);
  }

  // 清空所有监听器
  clear() {
    this.events.clear();
    this.onceEvents.clear();
    this.priorities.clear();
    this.middlewares = [];
  }

  // 销毁
  destroy() {
    this.clear();
    this.clearHistory();
  }

  // 私有方法
  getKey(event, namespace) {
    return `${namespace}:${event}`;
  }

  generateId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  addToHistory(eventData) {
    this.history.push(eventData);
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }
  }
}

// 创建全局事件总线实例
const eventBus = new EventBus();

// 导出
export { EventBus, eventBus };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EventBus, eventBus };
}

if (typeof window !== 'undefined') {
  window.EventBus = EventBus;
  window.eventBus = eventBus;
}
