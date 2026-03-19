// ==================== 主应用 ====================

const { useState, useEffect, useRef } = React;

// ==================== UI 组件 ====================

const Button = ({ children, onClick, type = 'default', size = 'md', disabled, className = '' }) => {
  const baseClass = 'btn';
  const typeClass = `btn-${type}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  
  return React.createElement('button', {
    className: `${baseClass} ${typeClass} ${sizeClass} ${className}`,
    onClick,
    disabled
  }, children);
};

const Card = ({ children, className = '' }) => {
  return React.createElement('div', { className: `card ${className}` }, children);
};

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  
  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { className: 'modal-content', onClick: (e) => e.stopPropagation() },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('div', { className: 'modal-title' }, title),
        React.createElement('button', { className: 'modal-close', onClick: onClose }, '×')
      ),
      React.createElement('div', { className: 'modal-body' }, children),
      footer && React.createElement('div', { className: 'modal-footer' }, footer)
    )
  );
};

const Tag = ({ children, color, bgColor }) => {
  return React.createElement('span', {
    className: 'tag tag-dimension',
    style: { 
      backgroundColor: bgColor || 'var(--bg-tertiary)',
      color: color || 'var(--text-secondary)'
    }
  }, children);
};

// ==================== 页面组件 ====================

// 首页仪表盘
const Dashboard = ({ user, onNavigate }) => {
  const [stats, setStats] = useState({});
  
  useEffect(() => {
    const dimensionStats = {};
    Object.values(LIFE_DIMENSIONS).forEach(dim => {
      dimensionStats[dim.id] = NoteService.getByDimension(user.id, dim.id).length;
    });
    setStats(dimensionStats);
  }, [user]);
  
  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, 
        '👋 欢迎回来，' + user.name
      ),
      React.createElement('p', { className: 'page-subtitle' },
        '人生八维，全面成长。选择一个维度开始探索吧。'
      )
    ),
    
    React.createElement('div', { className: 'dimension-grid' },
      Object.values(LIFE_DIMENSIONS).map(dimension => {
        const count = stats[dimension.id] || 0;
        return React.createElement('div', {
          key: dimension.id,
          className: 'dimension-card',
          style: { '--dim-color': dimension.color },
          onClick: () => onNavigate('dimension', dimension.id)
        },
          React.createElement('div', { className: 'dimension-icon' }, dimension.icon),
          React.createElement('div', { className: 'dimension-name' }, dimension.name),
          React.createElement('div', { className: 'dimension-desc' }, dimension.description),
          React.createElement('div', { className: 'dimension-stats' },
            React.createElement('div', null,
              React.createElement('div', { className: 'dimension-count' }, count),
              React.createElement('div', { className: 'dimension-label' }, '篇笔记')
            )
          ),
          React.createElement('div', { className: 'dimension-pillar' }, dimension.pillar)
        );
      })
    )
  );
};

// 维度详情页
const DimensionDetail = ({ user, dimensionId, onBack, onCreateNote }) => {
  const dimension = Object.values(LIFE_DIMENSIONS).find(d => d.id === dimensionId);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('guide'); // guide, knowledge, notes
  const [showHeuristic, setShowHeuristic] = useState(false);
  const [heuristicStep, setHeuristicStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    if (dimension) {
      setNotes(NoteService.getByDimension(user.id, dimension.id));
    }
  }, [dimension, user]);
  
  if (!dimension) return null;
  
  const heuristicData = HEURISTIC_QUESTIONS[dimensionId];
  const currentQuestion = heuristicData ? Object.values(heuristicData)[heuristicStep] : null;
  
  const handleAnswer = (value) => {
    setAnswers([...answers, value]);
    if (heuristicStep < Object.keys(heuristicData).length - 1) {
      setHeuristicStep(heuristicStep + 1);
    } else {
      // 完成所有问题，生成建议
      const advice = generateHeuristicAdvice(dimensionId, answers);
      alert('基于你的回答，建议：\n\n' + advice);
      setShowHeuristic(false);
      setHeuristicStep(0);
      setAnswers([]);
    }
  };
  
  const knowledgeData = KNOWLEDGE_BASE[dimensionId] || {};
  
  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement(Button, { type: 'ghost', onClick: onBack, size: 'sm' }, '← 返回'),
        React.createElement('div', null,
          React.createElement('h1', { className: 'page-title' },
            dimension.icon + ' ' + dimension.name
          ),
          React.createElement('p', { className: 'page-subtitle' },
            dimension.description + ' · ' + dimension.pillar
          )
        )
      )
    ),
    
    // 标签切换
    React.createElement('div', { style: { display: 'flex', gap: '8px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' } },
      React.createElement(Button, {
        type: activeTab === 'guide' ? 'primary' : 'ghost',
        onClick: () => setActiveTab('guide')
      }, '💡 启发引导'),
      React.createElement(Button, {
        type: activeTab === 'knowledge' ? 'primary' : 'ghost',
        onClick: () => setActiveTab('knowledge')
      }, '📚 知识库'),
      React.createElement(Button, {
        type: activeTab === 'notes' ? 'primary' : 'ghost',
        onClick: () => setActiveTab('notes')
      }, '📝 我的笔记 (' + notes.length + ')')
    ),
    
    // 启发引导标签
    activeTab === 'guide' && React.createElement('div', null,
      React.createElement(Card, null,
        React.createElement('div', { className: 'card-body' },
          React.createElement('h3', { style: { marginBottom: '16px' } }, '开启' + dimension.name + '探索之旅'),
          React.createElement('p', { style: { color: 'var(--text-secondary)', marginBottom: '24px' } },
            '通过一系列启发式问题，帮助你深入思考' + dimension.name + '维度的现状和目标。'
          ),
          React.createElement(Button, { 
            type: 'primary',
            onClick: () => setShowHeuristic(true)
          }, '开始探索')
        )
      ),
      
      showHeuristic && currentQuestion && React.createElement(Modal, {
        isOpen: showHeuristic,
        onClose: () => setShowHeuristic(false),
        title: '问题 ' + (heuristicStep + 1) + '/' + Object.keys(heuristicData).length
      },
        React.createElement('div', { style: { padding: '20px 0' } },
          React.createElement('h4', { style: { marginBottom: '20px', fontSize: '18px' } }, 
            currentQuestion.question
          ),
          currentQuestion.options && React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
            currentQuestion.options.map(option =>
              React.createElement('button', {
                key: option.value,
                onClick: () => handleAnswer(option.value),
                style: {
                  padding: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  background: 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }
              },
                React.createElement('span', { style: { fontSize: '24px' } }, option.emoji),
                option.label
              )
            )
          )
        )
      )
    ),
    
    // 知识库标签
    activeTab === 'knowledge' && React.createElement('div', null,
      knowledgeData.theories && React.createElement(Card, { style: { marginBottom: '16px' } },
        React.createElement('div', { className: 'card-header' },
          React.createElement('div', { className: 'card-title' }, '📖 经典理论')
        ),
        React.createElement('div', { className: 'card-body' },
          knowledgeData.theories.map((theory, index) =>
            React.createElement('div', { 
              key: index,
              style: { 
                marginBottom: '20px', 
                paddingBottom: '20px',
                borderBottom: index < knowledgeData.theories.length - 1 ? '1px solid var(--border-light)' : 'none'
              }
            },
              React.createElement('h4', { style: { marginBottom: '8px' } }, theory.title),
              React.createElement('pre', { 
                style: { 
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  lineHeight: '1.6',
                  color: 'var(--text-secondary)'
                }
              }, theory.content),
              theory.source && React.createElement('div', { style: { fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' } },
                '来源：' + theory.source
              )
            )
          )
        )
      ),
      
      knowledgeData.tools && React.createElement(Card, null,
        React.createElement('div', { className: 'card-header' },
          React.createElement('div', { className: 'card-title' }, '🛠️ 实用工具')
        ),
        React.createElement('div', { className: 'card-body' },
          knowledgeData.tools.map((tool, index) =>
            React.createElement('div', { 
              key: index,
              style={{ 
                marginBottom: '16px',
                padding: '16px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px'
              }}
            },
              React.createElement('h4', { style: { marginBottom: '12px' } }, tool.name),
              tool.items && React.createElement('ul', { style: { margin: 0, paddingLeft: '20px' } },
                tool.items.map((item, i) => React.createElement('li', { key: i, style: { marginBottom: '4px' } }, item))
              )
            )
          )
        )
      )
    ),
    
    // 笔记标签
    activeTab === 'notes' && React.createElement('div', null,
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement(Button, { 
          type: 'primary',
          onClick: () => onCreateNote(dimension.id)
        }, '+ 创建' + dimension.name + '笔记')
      ),
      
      notes.length === 0 ?
        React.createElement('div', { className: 'empty-state' },
          React.createElement('div', { className: 'empty-icon' }, '📝'),
          React.createElement('div', { className: 'empty-title' }, '还没有笔记'),
          React.createElement('div', { className: 'empty-description' },
            '开始记录你的' + dimension.name + '思考和成长吧'
          ),
          React.createElement(Button, { 
            type: 'primary',
            onClick: () => onCreateNote(dimension.id)
          }, '创建第一篇笔记')
        ) :
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
          notes.map(note =>
            React.createElement(Card, { key: note.id },
              React.createElement('div', { className: 'card-body' },
                React.createElement('h4', { style: { marginBottom: '8px' } }, note.title || '无标题'),
                React.createElement('p', { style: { color: 'var(--text-secondary)', fontSize: '14px' } },
                  note.summary
                ),
                React.createElement('div', { style: { fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px' } },
                  formatDateTime(note.updatedAt)
                )
              )
            )
          )
        )
    )
  );
};

// AI生成器页
const AIGenerator = ({ user }) => {
  const [requirement, setRequirement] = useState('');
  const [documentType, setDocumentType] = useState('plan');
  const [selectedDimensions, setSelectedDimensions] = useState([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  
  const toggleDimension = (dimId) => {
    if (selectedDimensions.includes(dimId)) {
      setSelectedDimensions(selectedDimensions.filter(id => id !== dimId));
    } else {
      setSelectedDimensions([...selectedDimensions, dimId]);
    }
  };
  
  const handleGenerate = () => {
    if (!requirement.trim()) return;
    const prompt = generatePrompt(requirement, documentType, selectedDimensions, 'coach', 'structured', 'intermediate');
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      alert('提示词已复制到剪贴板！');
    });
  };
  
  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('h1', { className: 'page-title' }, '🤖 AI生成器'),
      React.createElement('p', { className: 'page-subtitle' },
        '输入你的需求，生成专业的AI提示词'
      )
    ),
    
    React.createElement(Card, null,
      React.createElement('div', { className: 'card-body' },
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '你的需求是什么？'
          ),
          React.createElement('textarea', {
            className: 'input textarea',
            placeholder: '例如：我想制定2024年的个人发展计划，希望在事业和财务方面有突破...',
            value: requirement,
            onChange: (e) => setRequirement(e.target.value)
          })
        ),
        
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '文档类型'
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            [
              { id: 'plan', name: '规划计划', icon: '📋' },
              { id: 'analysis', name: '分析诊断', icon: '🔍' },
              { id: 'review', name: '复盘总结', icon: '📊' },
              { id: 'knowledge', name: '知识整理', icon: '📚' }
            ].map(type =>
              React.createElement('button', {
                key: type.id,
                onClick: () => setDocumentType(type.id),
                style: {
                  padding: '12px 20px',
                  border: documentType === type.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: '12px',
                  background: documentType === type.id ? 'rgba(99, 102, 241, 0.1)' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }
              },
                type.icon + ' ' + type.name
              )
            )
          )
        ),
        
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '选择维度（不选则包含全部）'
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            Object.values(LIFE_DIMENSIONS).map(dim =>
              React.createElement('button', {
                key: dim.id,
                onClick: () => toggleDimension(dim.id),
                style: {
                  padding: '8px 16px',
                  border: selectedDimensions.includes(dim.id) ? '2px solid ' + dim.color : '1px solid var(--border)',
                  borderRadius: '20px',
                  background: selectedDimensions.includes(dim.id) ? dim.bgColor : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }
              },
                dim.icon + ' ' + dim.name
              )
            )
          )
        ),
        
        React.createElement(Button, {
          type: 'primary',
          onClick: handleGenerate,
          disabled: !requirement.trim()
        }, '✨ 生成提示词')
      )
    ),
    
    showPrompt && React.createElement(Modal, {
      isOpen: showPrompt,
      onClose: () => setShowPrompt(false),
      title: '生成的AI提示词',
      footer: React.createElement(React.Fragment, null,
        React.createElement(Button, { type: 'default', onClick: () => setShowPrompt(false) }, '关闭'),
        React.createElement(Button, { type: 'primary', onClick: handleCopy }, '📋 复制')
      )
    },
      React.createElement('pre', { 
        style: { 
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '13px',
          lineHeight: '1.6',
          background: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: '8px',
          maxHeight: '400px',
          overflow: 'auto'
        }
      }, generatedPrompt)
    )
  );
};

// 笔记编辑器
const NoteEditor = ({ user, dimensionId, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dimensions, setDimensions] = useState(dimensionId ? [dimensionId] : []);
  
  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入标题');
      return;
    }
    
    const note = NoteService.create({
      userId: user.id,
      title: title,
      content: content,
      dimensions: dimensions
    });
    
    onSave(note);
  };
  
  const toggleDimension = (dimId) => {
    if (dimensions.includes(dimId)) {
      setDimensions(dimensions.filter(id => id !== dimId));
    } else {
      setDimensions([...dimensions, dimId]);
    }
  };
  
  return React.createElement('div', null,
    React.createElement('div', { className: 'page-header' },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
        React.createElement(Button, { type: 'ghost', onClick: onCancel, size: 'sm' }, '← 返回'),
        React.createElement('h1', { className: 'page-title' }, '📝 新建笔记')
      )
    ),
    
    React.createElement(Card, null,
      React.createElement('div', { className: 'card-body' },
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '标题'
          ),
          React.createElement('input', {
            className: 'input',
            placeholder: '输入笔记标题...',
            value: title,
            onChange: (e) => setTitle(e.target.value)
          })
        ),
        
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '关联维度'
          ),
          React.createElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            Object.values(LIFE_DIMENSIONS).map(dim =>
              React.createElement('button', {
                key: dim.id,
                onClick: () => toggleDimension(dim.id),
                style: {
                  padding: '6px 12px',
                  border: dimensions.includes(dim.id) ? '2px solid ' + dim.color : '1px solid var(--border)',
                  borderRadius: '16px',
                  background: dimensions.includes(dim.id) ? dim.bgColor : 'white',
                  cursor: 'pointer',
                  fontSize: '13px'
                }
              },
                dim.icon + ' ' + dim.name
              )
            )
          )
        ),
        
        React.createElement('div', { style: { marginBottom: '20px' } },
          React.createElement('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 500 } },
            '内容'
          ),
          React.createElement('textarea', {
            className: 'input textarea',
            style: { minHeight: '300px' },
            placeholder: '开始记录你的想法...',
            value: content,
            onChange: (e) => setContent(e.target.value)
          })
        ),
        
        React.createElement('div', { style: { display: 'flex', gap: '12px', justifyContent: 'flex-end' } },
          React.createElement(Button, { type: 'default', onClick: onCancel }, '取消'),
          React.createElement(Button, { type: 'primary', onClick: handleSave }, '保存笔记')
        )
      )
    )
  );
};

// ==================== 主应用 ====================

const App = () => {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, dimension, generator, editor
  const [selectedDimension, setSelectedDimension] = useState(null);
  
  useEffect(() => {
    const currentUser = UserService.getCurrentUser();
    setUser(currentUser);
  }, []);
  
  const handleNavigate = (view, param) => {
    setCurrentView(view);
    if (view === 'dimension' && param) {
      setSelectedDimension(param);
    }
  };
  
  const handleCreateNote = (dimensionId) => {
    setSelectedDimension(dimensionId);
    setCurrentView('editor');
  };
  
  const handleSaveNote = () => {
    setCurrentView('dashboard');
  };
  
  if (!user) {
    return React.createElement('div', { style: { 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '18px',
      color: 'var(--text-secondary)'
    }}, '加载中...');
  }
  
  return React.createElement('div', { className: 'app-container' },
    // 头部
    React.createElement('header', { className: 'header' },
      React.createElement('div', { className: 'logo', onClick: () => handleNavigate('dashboard') },
        React.createElement('span', { className: 'logo-icon' }, '📚'),
        '智识空间'
      ),
      React.createElement('nav', { className: 'header-nav' },
        React.createElement('button', {
          className: 'nav-item ' + (currentView === 'dashboard' ? 'active' : ''),
          onClick: () => handleNavigate('dashboard')
        }, '🏠 首页'),
        React.createElement('button', {
          className: 'nav-item ' + (currentView === 'generator' ? 'active' : ''),
          onClick: () => handleNavigate('generator')
        }, '🤖 AI生成')
      )
    ),
    
    // 主布局
    React.createElement('div', { className: 'main-layout' },
      // 侧边栏
      React.createElement('aside', { className: 'sidebar' },
        React.createElement('div', { className: 'sidebar-section' },
          React.createElement('div', { className: 'sidebar-title' }, '人生八维'),
          Object.values(LIFE_DIMENSIONS).map(dim =>
            React.createElement('div', {
              key: dim.id,
              className: 'sidebar-item ' + (selectedDimension === dim.id && currentView === 'dimension' ? 'active' : ''),
              onClick: () => handleNavigate('dimension', dim.id)
            },
              React.createElement('span', { className: 'sidebar-icon' }, dim.icon),
              React.createElement('span', { className: 'sidebar-text' }, dim.name),
              React.createElement('span', { className: 'sidebar-badge' }, 
                NoteService.getByDimension(user.id, dim.id).length
              )
            )
          )
        )
      ),
      
      // 主内容
      React.createElement('main', { className: 'main-content' },
        currentView === 'dashboard' && React.createElement(Dashboard, {
          user,
          onNavigate: handleNavigate
        }),
        
        currentView === 'dimension' && selectedDimension && React.createElement(DimensionDetail, {
          user,
          dimensionId: selectedDimension,
          onBack: () => handleNavigate('dashboard'),
          onCreateNote: handleCreateNote
        }),
        
        currentView === 'generator' && React.createElement(AIGenerator, { user }),
        
        currentView === 'editor' && React.createElement(NoteEditor, {
          user,
          dimensionId: selectedDimension,
          onSave: handleSaveNote,
          onCancel: () => handleNavigate('dimension', selectedDimension)
        })
      )
    )
  );
};

// 渲染应用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
