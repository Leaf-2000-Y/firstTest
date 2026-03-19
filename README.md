# 00后人生问题知识图谱 - 应用级优化版 v3.0

## 项目概述

这是一个面向"00后"（2000年后出生）年轻人的综合性人生问题知识图谱系统。采用应用级架构设计，支持高性能渲染、智能搜索和模块化扩展。

## 核心特性

### 1. 高性能 Canvas 渲染引擎
- **双缓冲渲染**: 使用离屏 Canvas 提升渲染性能
- **对象池技术**: 复用渲染对象，减少内存分配
- **懒加载机制**: 按需加载和渲染节点
- **60FPS 流畅体验**: 优化的渲染循环

### 2. 智能搜索系统
- **全文检索**: 支持节点名称、描述、标签搜索
- **模糊匹配**: 基于 Levenshtein 距离的容错搜索
- **自动补全**: 实时搜索建议
- **高亮显示**: 搜索结果关键词高亮

### 3. 模块化架构
```
knowledge-system-v2/
├── src/
│   ├── core/              # 核心框架
│   │   ├── EventBus.js    # 事件总线（支持命名空间和优先级）
│   │   ├── StateManager.js # 状态管理（Redux风格）
│   │   └── App.js         # 应用主类
│   ├── modules/           # 功能模块
│   │   ├── visualization/ # 可视化模块
│   │   │   └── CanvasRenderer.js  # Canvas渲染器
│   │   └── search/        # 搜索模块
│   │       └── SearchEngine.js    # 搜索引擎
│   ├── data/              # 数据管理
│   │   ├── GraphDataManager.js   # 图谱数据管理
│   │   ├── DataLoader.js         # 数据加载器
│   │   └── NodeValidator.js      # 节点验证器
│   └── utils/             # 工具函数
├── js/                    # 数据文件
│   ├── comprehensive-data.js     # 主要数据
│   └── data-extensions.js        # 扩展数据
└── app.html              # 应用入口
```

### 4. 数据管理系统
- **数据验证**: 自动验证节点和连接数据
- **格式转换**: 支持多种数据格式（标准格式、旧版格式）
- **数据合并**: 智能合并多个数据源
- **本地存储**: 支持 localStorage 持久化

### 5. 交互体验
- **拖拽平移**: 拖拽空白处平移视图
- **滚轮缩放**: 鼠标滚轮缩放视图
- **节点拖拽**: 拖拽节点调整位置
- **单击详情**: 点击节点查看详细信息
- **双击展开**: 双击节点展开/收起子节点
- **搜索聚焦**: 搜索结果自动聚焦到节点

## 数据结构

### 节点类型
- **center**: 中心主题（00后人生问题）
- **domain**: 领域（学习成长、职业发展等6大领域）
- **subcategory**: 子类别（核心问题、常见问题等）
- **problem**: 问题节点（具体的人生问题）

### 节点属性
```javascript
{
  id: string,           // 唯一标识
  name: string,         // 节点名称
  type: string,         // 节点类型
  description: string,  // 描述
  x, y: number,         // 坐标
  radius: number,       // 半径
  color: string,        // 颜色
  icon: string,         // 图标
  severity: string,     // 严重程度
  symptoms: array,      // 症状
  solutions: array,     // 解决方案
  cases: array,         // 案例
  resources: array,     // 资源
  hasChildren: boolean, // 是否有子节点
  expanded: boolean,    // 是否展开
  visible: boolean      // 是否可见
}
```

## 使用方法

### 1. 启动应用
```bash
# 进入项目目录
cd knowledge-system-v2

# 启动本地服务器
python3 -m http.server 8080

# 浏览器访问
http://localhost:8080/app.html
```

### 2. 操作指南
- **缩放**: 鼠标滚轮
- **平移**: 拖拽空白处
- **查看详情**: 单击节点
- **展开/收起**: 双击节点
- **搜索**: 顶部搜索框输入关键词
- **筛选**: 左侧边栏勾选领域和严重程度

### 3. 数据扩展

#### 添加新节点
```javascript
// 在 comprehensive-data.js 中添加
const knowledgeGraphData = {
  center: { ... },
  domains: {
    learning: {
      name: '学习成长',
      subcategories: {
        'new-category': {
          name: '新类别',
          problems: [
            {
              name: '新问题',
              description: '问题描述',
              severity: 'high',
              symptoms: ['症状1', '症状2'],
              solutions: [
                {
                  title: '解决方案',
                  description: '方案描述',
                  steps: ['步骤1', '步骤2']
                }
              ]
            }
          ]
        }
      }
    }
  }
};
```

#### 使用 DataLoader 加载外部数据
```javascript
import { DataLoader } from './src/data/DataLoader.js';

const loader = new DataLoader(dataManager);

// 从 URL 加载
await loader.loadFromURL('data/external-data.json');

// 加载内联数据
loader.loadInlineData({
  nodes: [...],
  links: [...]
});

// 从 localStorage 加载
loader.loadFromLocalStorage();
```

## 性能优化

### 1. 渲染优化
- 使用 requestAnimationFrame 实现流畅动画
- 双缓冲技术减少画面闪烁
- 视口裁剪，只渲染可见节点
- 对象池复用，减少 GC 压力

### 2. 数据优化
- 懒加载：只加载可见节点数据
- 数据缓存：避免重复计算
- 增量更新：只更新变化的部分

### 3. 搜索优化
- 倒排索引加速搜索
- 防抖处理减少搜索频率
- 结果缓存提升响应速度

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 技术栈

- **前端框架**: 原生 ES6+ JavaScript（模块化）
- **样式**: Tailwind CSS
- **字体**: Google Fonts (Noto Sans SC)
- **图标**: SVG 内联图标

## 开发计划

### 已完成 ✅
- [x] 核心架构设计
- [x] Canvas 渲染引擎
- [x] 数据管理系统
- [x] 智能搜索系统
- [x] 节点详情面板
- [x] 性能监控面板
- [x] 响应式布局

### 待开发 📋
- [ ] 力导向布局算法
- [ ] 数据编辑功能
- [ ] 导出图片/PDF
- [ ] 多语言支持
- [ ] PWA 支持
- [ ] 后端数据同步

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎提交 Issue 或 Pull Request。

---

**版本**: v3.0 应用级优化版  
**更新日期**: 2026-02-21  
**作者**: AI Assistant
