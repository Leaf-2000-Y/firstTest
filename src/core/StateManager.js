// ==================== StateManager - 状态管理系统 ====================
// Redux-style 状态管理，支持时间旅行、持久化、计算属性

class StateManager {
  constructor(options = {}) {
    this.state = {};
    this.initialState = {};
    this.reducers = new Map();
    this.middlewares = [];
    this.subscribers = new Set();
    this.computedProperties = new Map();
    this.computedCache = new Map();
    this.computedDeps = new Map();
    
    // 时间旅行
    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = options.maxHistory || 50;
    
    // 持久化
    this.storageKey = options.storageKey || 'app_state';
    this.persist = options.persist !== false;
    this.persistKeys = options.persistKeys || null; // null 表示全部
    
    // 性能优化
    this.batchUpdates = false;
    this.pendingUpdates = new Set();
    this.debounceTime = options.debounceTime || 16; // ~60fps
    this.debounceTimer = null;
    
    // 调试
    this.debug = options.debug || false;
    this.actionId = 0;
    
    // 初始化
    this.init();
  }

  init() {
    if (this.persist) {
      this.loadFromStorage();
    }
  }

  // 注册 Reducer
  registerReducer(path, reducer) {
    this.reducers.set(path, reducer);
    
    // 初始化状态
    const initialValue = reducer(undefined, { type: '@@INIT' });
    this.setState(path, initialValue, false);
    
    if (this.debug) {
      console.log(`[StateManager] 注册 Reducer: ${path}`);
    }
  }

  // 注册计算属性
  registerComputed(name, deps, computeFn) {
    this.computedProperties.set(name, { deps, computeFn });
    this.computedDeps.set(name, new Set(deps));
    
    // 初始化计算
    this.updateComputed(name);
  }

  // 获取状态
  getState(path) {
    if (!path) return this.state;
    
    const keys = path.split('.');
    let value = this.state;
    
    for (const key of keys) {
      if (value === null || value === undefined) return undefined;
      value = value[key];
    }
    
    return value;
  }

  // 设置状态
  setState(path, value, notify = true) {
    const keys = path.split('.');
    let current = this.state;
    
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }
    
    const lastKey = keys[keys.length - 1];
    const oldValue = current[lastKey];
    
    if (oldValue !== value) {
      current[lastKey] = value;
      
      // 标记计算属性需要更新
      this.invalidateComputed(path);
      
      if (notify) {
        if (this.batchUpdates) {
          this.pendingUpdates.add(path);
        } else {
          this.notify(path, value, oldValue);
        }
      }
    }
  }

  // 派发 Action
  dispatch(action) {
    const actionWithMeta = {
      ...action,
      id: ++this.actionId,
      timestamp: Date.now()
    };
    
    if (this.debug) {
      console.log(`[StateManager] Dispatch:`, actionWithMeta);
    }
    
    // 执行中间件
    let result = actionWithMeta;
    for (const middleware of this.middlewares) {
      result = middleware(result, this.getState.bind(this), this.dispatch.bind(this));
      if (!result) return; // 中间件阻止了 action
    }
    
    // 执行 Reducers
    this.batchUpdates = true;
    
    for (const [path, reducer] of this.reducers) {
      const currentState = this.getState(path);
      const newState = reducer(currentState, result);
      
      if (newState !== currentState) {
        this.setState(path, newState, false);
      }
    }
    
    // 提交批量更新
    this.commitBatch();
    
    // 记录历史
    this.addToHistory(result);
    
    // 持久化
    if (this.persist) {
      this.saveToStorage();
    }
    
    return result;
  }

  // 订阅状态变化
  subscribe(listener, options = {}) {
    const { path, immediate = false } = options;
    
    const subscription = { listener, path };
    this.subscribers.add(subscription);
    
    if (immediate && path) {
      listener(this.getState(path), undefined, path);
    }
    
    return () => {
      this.subscribers.delete(subscription);
    };
  }

  // 通知订阅者
  notify(path, newValue, oldValue) {
    for (const { listener, path: subPath } of this.subscribers) {
      if (!subPath || path.startsWith(subPath) || subPath.startsWith(path)) {
        listener(newValue, oldValue, path);
      }
    }
  }

  // 提交批量更新
  commitBatch() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    this.debounceTimer = setTimeout(() => {
      this.batchUpdates = false;
      
      for (const path of this.pendingUpdates) {
        this.notify(path, this.getState(path), undefined);
      }
      
      this.pendingUpdates.clear();
    }, this.debounceTime);
  }

  // 计算属性更新
  updateComputed(name) {
    const { deps, computeFn } = this.computedProperties.get(name);
    const values = deps.map(dep => this.getState(dep));
    
    const newValue = computeFn(...values);
    this.computedCache.set(name, newValue);
    
    return newValue;
  }

  // 获取计算属性
  getComputed(name) {
    if (!this.computedCache.has(name)) {
      this.updateComputed(name);
    }
    return this.computedCache.get(name);
  }

  // 使计算属性失效
  invalidateComputed(changedPath) {
    for (const [name, deps] of this.computedDeps) {
      if (deps.has(changedPath) || Array.from(deps).some(dep => changedPath.startsWith(dep))) {
        this.computedCache.delete(name);
        
        // 递归使依赖此计算属性的其他计算属性失效
        this.invalidateComputed(`computed.${name}`);
      }
    }
  }

  // 添加中间件
  use(middleware) {
    this.middlewares.push(middleware);
  }

  // 时间旅行 - 撤销
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreState(this.historyIndex);
    }
  }

  // 时间旅行 - 重做
  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreState(this.historyIndex);
    }
  }

  // 跳转到特定历史状态
  jumpToHistory(index) {
    if (index >= 0 && index < this.history.length) {
      this.historyIndex = index;
      this.restoreState(index);
    }
  }

  // 恢复到历史状态
  restoreState(index) {
    const historyEntry = this.history[index];
    if (historyEntry && historyEntry.snapshot) {
      this.state = JSON.parse(historyEntry.snapshot);
      this.notify('', this.state, null);
    }
  }

  // 获取历史记录
  getHistory() {
    return this.history.map((entry, index) => ({
      index,
      action: entry.action,
      timestamp: entry.timestamp,
      current: index === this.historyIndex
    }));
  }

  // 添加历史记录
  addToHistory(action) {
    // 移除当前索引之后的历史
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    // 添加新记录
    this.history.push({
      action,
      timestamp: Date.now(),
      snapshot: JSON.stringify(this.state)
    });
    
    // 限制历史长度
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
  }

  // 持久化到存储
  saveToStorage() {
    try {
      let dataToSave = this.state;
      
      if (this.persistKeys) {
        dataToSave = {};
        for (const key of this.persistKeys) {
          dataToSave[key] = this.state[key];
        }
      }
      
      localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('[StateManager] 保存状态失败:', error);
    }
  }

  // 从存储加载
  loadFromStorage() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (error) {
      console.error('[StateManager] 加载状态失败:', error);
    }
  }

  // 重置状态
  reset() {
    this.state = JSON.parse(JSON.stringify(this.initialState));
    this.history = [];
    this.historyIndex = -1;
    this.computedCache.clear();
    this.notify('', this.state, null);
  }

  // 销毁
  destroy() {
    this.subscribers.clear();
    this.reducers.clear();
    this.middlewares = [];
    this.computedProperties.clear();
    this.computedCache.clear();
    this.computedDeps.clear();
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}

// 创建全局状态管理实例
const stateManager = new StateManager({
  storageKey: 'knowledge_graph_state',
  persist: true,
  persistKeys: ['ui', 'user', 'preferences'],
  debug: false
});

// 导出
export { StateManager, stateManager };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { StateManager, stateManager };
}

if (typeof window !== 'undefined') {
  window.StateManager = StateManager;
  window.stateManager = stateManager;
}
