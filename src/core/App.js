// ==================== App - 应用主类 ====================
// 整合所有模块，提供统一的应用接口

class KnowledgeGraphApp {
  constructor(options = {}) {
    this.options = {
      container: 'app',
      data: null,
      theme: 'dark',
      debug: false,
      ...options
    };
    
    this.container = null;
    this.modules = new Map();
    this.plugins = [];
    this.isInitialized = false;
    this.isRunning = false;
    
    // 核心组件
    this.eventBus = null;
    this.stateManager = null;
    
    // 性能监控
    this.performanceMetrics = {
      initTime: 0,
      renderTime: 0,
      fps: 0,
      memory: 0
    };
    
    // 错误处理
    this.errorHandlers = [];
    
    this.init();
  }
  
  async init() {
    const startTime = performance.now();
    
    try {
      // 1. 初始化容器
      this.initContainer();
      
      // 2. 初始化核心系统
      this.initCore();
      
      // 3. 初始化模块
      await this.initModules();
      
      // 4. 初始化插件
      this.initPlugins();
      
      // 5. 绑定事件
      this.bindEvents();
      
      // 6. 启动应用
      await this.start();
      
      this.isInitialized = true;
      this.performanceMetrics.initTime = performance.now() - startTime;
      
      this.emit('app:initialized', {
        initTime: this.performanceMetrics.initTime,
        modules: Array.from(this.modules.keys()),
        plugins: this.plugins.map(p => p.name)
      });
      
      if (this.options.debug) {
        console.log(`[App] 初始化完成，耗时: ${this.performanceMetrics.initTime.toFixed(2)}ms`);
      }
      
    } catch (error) {
      this.handleError(error, 'init');
    }
  }
  
  initContainer() {
    this.container = document.getElementById(this.options.container);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = this.options.container;
      document.body.appendChild(this.container);
    }
    
    // 添加基础样式
    this.container.className = 'knowledge-graph-app';
    this.container.style.cssText = `
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: relative;
    `;
  }
  
  initCore() {
    // 初始化事件总线
    if (typeof EventBus !== 'undefined') {
      this.eventBus = new EventBus();
      this.eventBus.debug = this.options.debug;
    }
    
    // 初始化状态管理
    if (typeof StateManager !== 'undefined') {
      this.stateManager = new StateManager({
        storageKey: 'kg_app_state',
        persist: true,
        debug: this.options.debug
      });
      
      // 注册 UI Reducer
      this.stateManager.registerReducer('ui', this.uiReducer);
      this.stateManager.registerReducer('graph', this.graphReducer);
      this.stateManager.registerReducer('user', this.userReducer);
    }
    
    // 全局错误处理
    window.addEventListener('error', (e) => this.handleError(e.error, 'window'));
    window.addEventListener('unhandledrejection', (e) => this.handleError(e.reason, 'promise'));
  }
  
  async initModules() {
    // 数据模块
    if (typeof DataModule !== 'undefined') {
      this.registerModule('data', new DataModule(this));
    }
    
    // 可视化模块
    if (typeof VisualizationModule !== 'undefined') {
      this.registerModule('visualization', new VisualizationModule(this));
    }
    
    // 搜索模块
    if (typeof SearchModule !== 'undefined') {
      this.registerModule('search', new SearchModule(this));
    }
    
    // UI 模块
    if (typeof UIModule !== 'undefined') {
      this.registerModule('ui', new UIModule(this));
    }
    
    // 分析模块
    if (typeof AnalyticsModule !== 'undefined') {
      this.registerModule('analytics', new AnalyticsModule(this));
    }
    
    // 初始化所有模块
    for (const [name, module] of this.modules) {
      if (module.init) {
        await module.init();
      }
    }
  }
  
  initPlugins() {
    // 可以动态加载插件
    if (this.options.plugins) {
      for (const plugin of this.options.plugins) {
        this.use(plugin);
      }
    }
  }
  
  bindEvents() {
    // 窗口大小变化
    window.addEventListener('resize', debounce(() => {
      this.emit('window:resize', {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 100));
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
      this.emit('keyboard:keydown', {
        key: e.key,
        ctrl: e.ctrlKey,
        shift: e.shiftKey,
        alt: e.altKey,
        meta: e.metaKey
      });
    });
    
    // 在线/离线状态
    window.addEventListener('online', () => this.emit('network:online'));
    window.addEventListener('offline', () => this.emit('network:offline'));
    
    // 可见性变化
    document.addEventListener('visibilitychange', () => {
      this.emit('visibility:change', { hidden: document.hidden });
    });
  }
  
  async start() {
    this.isRunning = true;
    
    // 加载数据
    if (this.options.data) {
      await this.loadData(this.options.data);
    }
    
    // 渲染
    await this.render();
    
    this.emit('app:started');
  }
  
  async loadData(data) {
    const dataModule = this.getModule('data');
    if (dataModule) {
      await dataModule.load(data);
    }
    
    this.emit('data:loaded', { size: this.getDataSize() });
  }
  
  async render() {
    const startTime = performance.now();
    
    // 渲染各个模块
    for (const [name, module] of this.modules) {
      if (module.render) {
        await module.render();
      }
    }
    
    this.performanceMetrics.renderTime = performance.now() - startTime;
    
    this.emit('app:rendered', {
      renderTime: this.performanceMetrics.renderTime
    });
  }
  
  // 模块管理
  registerModule(name, module) {
    module.app = this;
    this.modules.set(name, module);
    
    if (this.options.debug) {
      console.log(`[App] 注册模块: ${name}`);
    }
  }
  
  getModule(name) {
    return this.modules.get(name);
  }
  
  // 插件系统
  use(plugin) {
    if (typeof plugin === 'function') {
      plugin = plugin(this);
    }
    
    if (plugin && plugin.install) {
      plugin.install(this);
      this.plugins.push(plugin);
      
      if (this.options.debug) {
        console.log(`[App] 安装插件: ${plugin.name || 'anonymous'}`);
      }
    }
  }
  
  // 事件系统代理
  on(event, callback, options) {
    if (this.eventBus) {
      return this.eventBus.on(event, callback, options);
    }
  }
  
  off(event, callback, namespace) {
    if (this.eventBus) {
      this.eventBus.off(event, callback, namespace);
    }
  }
  
  emit(event, data, options) {
    if (this.eventBus) {
      return this.eventBus.emit(event, data, options);
    }
  }
  
  once(event, callback, options) {
    if (this.eventBus) {
      return this.eventBus.once(event, callback, options);
    }
  }
  
  // 状态管理代理
  getState(path) {
    return this.stateManager ? this.stateManager.getState(path) : undefined;
  }
  
  setState(path, value) {
    if (this.stateManager) {
      this.stateManager.setState(path, value);
    }
  }
  
  dispatch(action) {
    if (this.stateManager) {
      return this.stateManager.dispatch(action);
    }
  }
  
  subscribe(path, listener) {
    if (this.stateManager) {
      return this.stateManager.subscribe(listener, { path });
    }
  }
  
  // Reducers
  uiReducer(state = { theme: 'dark', sidebar: true, loading: false }, action) {
    switch (action.type) {
      case 'UI_SET_THEME':
        return { ...state, theme: action.theme };
      case 'UI_TOGGLE_SIDEBAR':
        return { ...state, sidebar: !state.sidebar };
      case 'UI_SET_LOADING':
        return { ...state, loading: action.loading };
      default:
        return state;
    }
  }
  
  graphReducer(state = { nodes: [], links: [], selected: null, zoom: 1 }, action) {
    switch (action.type) {
      case 'GRAPH_SET_NODES':
        return { ...state, nodes: action.nodes };
      case 'GRAPH_SET_LINKS':
        return { ...state, links: action.links };
      case 'GRAPH_SELECT_NODE':
        return { ...state, selected: action.nodeId };
      case 'GRAPH_SET_ZOOM':
        return { ...state, zoom: action.zoom };
      default:
        return state;
    }
  }
  
  userReducer(state = { preferences: {}, history: [] }, action) {
    switch (action.type) {
      case 'USER_SET_PREFERENCE':
        return {
          ...state,
          preferences: { ...state.preferences, [action.key]: action.value }
        };
      case 'USER_ADD_HISTORY':
        return {
          ...state,
          history: [action.item, ...state.history.slice(0, 99)]
        };
      default:
        return state;
    }
  }
  
  // 工具方法
  getDataSize() {
    const dataModule = this.getModule('data');
    return dataModule ? dataModule.getSize() : 0;
  }
  
  getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }
  
  // 错误处理
  handleError(error, context = 'app') {
    console.error(`[App Error] ${context}:`, error);
    
    // 调用错误处理器
    this.errorHandlers.forEach(handler => {
      try {
        handler(error, context);
      } catch (e) {
        console.error('Error handler failed:', e);
      }
    });
    
    this.emit('app:error', { error, context });
  }
  
  onError(handler) {
    this.errorHandlers.push(handler);
    return () => {
      const index = this.errorHandlers.indexOf(handler);
      if (index > -1) {
        this.errorHandlers.splice(index, 1);
      }
    };
  }
  
  // 销毁
  destroy() {
    this.isRunning = false;
    
    // 销毁模块
    for (const [name, module] of this.modules) {
      if (module.destroy) {
        module.destroy();
      }
    }
    this.modules.clear();
    
    // 销毁核心组件
    if (this.eventBus) {
      this.eventBus.destroy();
    }
    if (this.stateManager) {
      this.stateManager.destroy();
    }
    
    // 清理容器
    if (this.container) {
      this.container.innerHTML = '';
    }
    
    this.emit('app:destroyed');
  }
}

// 工具函数
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KnowledgeGraphApp };
} else {
  window.KnowledgeGraphApp = KnowledgeGraphApp;
}
