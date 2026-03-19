// ==================== 人生八大维度定义 ====================
const LIFE_DIMENSIONS = {
  HEALTH: {
    id: 'health',
    name: '健康',
    icon: '❤️',
    color: '#FF6B6B',
    bgColor: '#FFF5F5',
    gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
    description: '身体健康与心理平衡',
    keywords: ['运动', '睡眠', '饮食', '体检', '心理', '冥想', '健身', '休息'],
    pillar: '生命的基石'
  },
  CAREER: {
    id: 'career',
    name: '事业',
    icon: '💼',
    color: '#4ECDC4',
    bgColor: '#E8F8F7',
    gradient: 'linear-gradient(135deg, #4ECDC4 0%, #7EDDD6 100%)',
    description: '职业发展与工作成就',
    keywords: ['工作', '项目', '职业', '技能', '绩效', '规划', '目标', '晋升'],
    pillar: '价值的实现'
  },
  FINANCE: {
    id: 'finance',
    name: '财务',
    icon: '💰',
    color: '#45B7D1',
    bgColor: '#E8F4F8',
    gradient: 'linear-gradient(135deg, #45B7D1 0%, #74C7DD 100%)',
    description: '财富积累与财务自由',
    keywords: ['收入', '支出', '投资', '理财', '预算', '储蓄', '保险', '资产'],
    pillar: '安全的保障'
  },
  FAMILY: {
    id: 'family',
    name: '家庭',
    icon: '🏠',
    color: '#F9CA24',
    bgColor: '#FEF9E7',
    gradient: 'linear-gradient(135deg, #F9CA24 0%, #FAD566 100%)',
    description: '亲情维系与家庭和谐',
    keywords: ['家人', '父母', '伴侣', '孩子', '家庭', '陪伴', '亲情', '责任'],
    pillar: '情感的港湾'
  },
  SOCIAL: {
    id: 'social',
    name: '社交',
    icon: '🤝',
    color: '#A29BFE',
    bgColor: '#F3F1FF',
    gradient: 'linear-gradient(135deg, #A29BFE 0%, #B8B3FE 100%)',
    description: '人脉拓展与社会连接',
    keywords: ['朋友', '社交', '人脉', '聚会', '圈子', '关系', '合作', '影响力'],
    pillar: '支持的网路'
  },
  LEARNING: {
    id: 'learning',
    name: '学习',
    icon: '📚',
    color: '#FD79A8',
    bgColor: '#FFF0F5',
    gradient: 'linear-gradient(135deg, #FD79A8 0%, #FDA5C8 100%)',
    description: '知识获取与能力提升',
    keywords: ['学习', '阅读', '课程', '技能', '知识', '成长', '考试', '证书'],
    pillar: '成长的阶梯'
  },
  ENTERTAINMENT: {
    id: 'entertainment',
    name: '娱乐',
    icon: '🎮',
    color: '#FDCB6E',
    bgColor: '#FFF9E6',
    gradient: 'linear-gradient(135deg, #FDCB6E 0%, #FDDD9E 100%)',
    description: '兴趣爱好与生活乐趣',
    keywords: ['娱乐', '游戏', '电影', '旅行', '爱好', '放松', '体验', '创造'],
    pillar: '快乐的源泉'
  },
  SPIRITUAL: {
    id: 'spiritual',
    name: '精神',
    icon: '🧘',
    color: '#6C5CE7',
    bgColor: '#F0EEFC',
    gradient: 'linear-gradient(135deg, #6C5CE7 0%, #9B8BF0 100%)',
    description: '内心平静与人生意义',
    keywords: ['内心', '信仰', '价值观', '意义', '哲学', '感恩', '正念', '智慧'],
    pillar: '灵魂的归宿'
  }
};

// ==================== 启发式问题模板 ====================
const HEURISTIC_QUESTIONS = {
  health: {
    entry: {
      question: "最近一周，你的身体和心理状态如何？",
      options: [
        { value: "excellent", label: "精力充沛，状态很好", emoji: "💪" },
        { value: "good", label: "总体不错，偶尔疲惫", emoji: "🙂" },
        { value: "fair", label: "一般般，有些小毛病", emoji: "😐" },
        { value: "poor", label: "不太好，需要调整", emoji: "😔" }
      ]
    },
    sleep: {
      question: "你的睡眠质量怎么样？",
      followUp: [
        "通常几点入睡，几点起床？",
        "入睡困难吗？会夜醒吗？",
        "早上醒来感觉如何？"
      ]
    },
    energy: {
      question: "一天中你的精力如何分布？",
      insight: "精力管理比时间管理更重要"
    },
    exercise: {
      question: "这周运动了几次？",
      guide: "WHO建议：每周150分钟中等强度运动"
    }
  },
  career: {
    entry: {
      question: "目前的工作让你感到充实吗？",
      options: [
        { value: "very", label: "非常充实，充满热情", emoji: "🔥" },
        { value: "somewhat", label: "还算满意，有成就感", emoji: "✨" },
        { value: "neutral", label: "一般，按部就班", emoji: "📋" },
        { value: "dissatisfied", label: "不太满意，想改变", emoji: "🤔" }
      ]
    },
    growth: {
      question: "过去一年，你在职业上最大的成长是什么？",
      reflection: true
    },
    bottleneck: {
      question: "当前职业发展遇到的最大挑战是什么？",
      analysis: true
    }
  },
  finance: {
    entry: {
      question: "你对自己的财务状况满意吗？",
      options: [
        { value: "secure", label: "财务安全，有盈余", emoji: "🛡️" },
        { value: "stable", label: "收支平衡，还算稳定", emoji: "⚖️" },
        { value: "tight", label: "有些紧张，需要规划", emoji: "📊" },
        { value: "concerned", label: "比较担忧，急需改善", emoji: "⚠️" }
      ]
    },
    habits: {
      question: "你有记账的习惯吗？",
      tip: "记账是理财的第一步"
    }
  },
  family: {
    entry: {
      question: "最近和家人的关系如何？",
      options: [
        { value: "harmonious", label: "非常融洽，充满温暖", emoji: "❤️" },
        { value: "good", label: "关系不错，偶有摩擦", emoji: "👨‍👩‍👧" },
        { value: "distant", label: "有些疏远，需要沟通", emoji: "📞" },
        { value: "strained", label: "关系紧张，需要修复", emoji: "💔" }
      ]
    },
    time: {
      question: "上周你花了多少时间陪伴家人？",
      reflection: "质量比数量更重要"
    }
  },
  social: {
    entry: {
      question: "你的社交圈让你感到满足吗？",
      options: [
        { value: "rich", label: "朋友众多，关系深厚", emoji: "🌟" },
        { value: "adequate", label: "有几个知心好友", emoji: "🤝" },
        { value: "limited", label: "圈子较小，想拓展", emoji: "🌱" },
        { value: "lonely", label: "感到孤独，需要连接", emoji: "💭" }
      ]
    }
  },
  learning: {
    entry: {
      question: "你最近在学习什么新东西吗？",
      options: [
        { value: "actively", label: "正在积极学习新技能", emoji: "📖" },
        { value: "occasionally", label: "偶尔学习，保持好奇", emoji: "🔍" },
        { value: "planning", label: "有计划，还没开始", emoji: "📅" },
        { value: "stagnant", label: "很久没有学习了", emoji: "⏸️" }
      ]
    }
  },
  entertainment: {
    entry: {
      question: "你的生活有足够乐趣吗？",
      options: [
        { value: "abundant", label: "生活丰富，乐趣多多", emoji: "🎉" },
        { value: "balanced", label: "工作与娱乐平衡", emoji: "⚖️" },
        { value: "lacking", label: "有点单调，需要调剂", emoji: "🎨" },
        { value: "burnout", label: "工作太忙，没时间玩", emoji: "😫" }
      ]
    }
  },
  spiritual: {
    entry: {
      question: "你的内心平静吗？有人生方向感吗？",
      options: [
        { value: "peaceful", label: "内心平静，方向清晰", emoji: "🕊️" },
        { value: "searching", label: "正在探索，有所感悟", emoji: "🌅" },
        { value: "confused", label: "有些迷茫，需要思考", emoji: "🌊" },
        { value: "lost", label: "感到迷失，急需指引", emoji: "🌑" }
      ]
    }
  }
};

// ==================== 知识库内容 ====================
const KNOWLEDGE_BASE = {
  health: {
    theories: [
      {
        title: "精力管理金字塔",
        content: `精力管理包含四个层次：
        1. **体能精力** - 基础层，通过饮食、运动、睡眠管理
        2. **情绪精力** - 积极情绪补充精力，消极情绪消耗精力
        3. **思维精力** - 专注和乐观的思维模式
        4. **意志精力** - 源于人生目标和价值观`,
        source: "《精力管理》吉姆·洛尔"
      },
      {
        title: "睡眠周期理论",
        content: `R90睡眠方案：
        - 每个睡眠周期90分钟
        - 每晚需要4-5个周期（6-7.5小时）
        - 按周期起床，而非固定时间
        - 每周35个周期为理想目标`,
        source: "《睡眠革命》尼克·利特尔黑尔斯"
      }
    ],
    tools: [
      {
        name: "精力自测表",
        items: [
          "早晨醒来是否感到精力充沛？",
          "下午3-4点是否会感到困倦？",
          "每周运动是否达到150分钟？",
          "睡眠是否规律（固定时间入睡/起床）？",
          "饮食是否均衡（蔬菜、蛋白质、碳水）？"
        ]
      },
      {
        name: "健康习惯打卡",
        habits: [
          { name: "早起一杯水", points: 5 },
          { name: "运动30分钟", points: 20 },
          { name: "冥想10分钟", points: 15 },
          { name: "11点前入睡", points: 15 },
          { name: "吃5份蔬果", points: 10 }
        ]
      }
    ],
    cases: [
      {
        title: "从亚健康到马拉松",
        summary: "35岁程序员通过系统训练，2年内完成首个全马",
        keyPoints: ["循序渐进", "找到伙伴", "数据追踪"]
      }
    ]
  },
  career: {
    theories: [
      {
        title: "OKR目标管理法",
        content: `Objectives & Key Results：
        - 目标（O）要有挑战性、鼓舞人心
        - 关键结果（KR）要具体、可衡量
        - 每个O对应3-5个KR
        - 定期回顾和调整`,
        source: "安迪·格鲁夫"
      },
      {
        title: "能力三核模型",
        content: `职业能力由三部分组成：
        1. **知识** - 知道什么（概念、理论）
        2. **技能** - 能做什么（操作、方法）
        3. **才干** - 天生优势（性格、特质）`,
        source: "古典《超级个体》"
      }
    ],
    tools: [
      {
        name: "职业现状评估",
        dimensions: [
          { name: "薪资满意度", weight: 20 },
          { name: "成长空间", weight: 25 },
          { name: "工作意义", weight: 20 },
          { name: "团队氛围", weight: 15 },
          { name: "工作生活平衡", weight: 20 }
        ]
      }
    ],
    cases: [
      {
        title: "转行成功的产品经理",
        summary: "从传统行业销售转型互联网产品经理",
        keyPoints: ["技能迁移", "项目实战", "人脉借力"]
      }
    ]
  },
  finance: {
    theories: [
      {
        title: "50/30/20法则",
        content: `收入分配原则：
        - 50% 需要（房租、食物、交通）
        - 30% 想要（娱乐、购物、旅行）
        - 20% 储蓄和投资
        
        先储蓄后消费，建立自动转账机制`,
        source: "伊丽莎白·沃伦"
      },
      {
        title: "复利效应",
        content: `时间是最好的投资伙伴：
        - 年化收益7%，10年翻倍
        - 越早开始，复利效应越明显
        - 持续投入比一次性投入更重要`,
        source: "爱因斯坦"
      }
    ],
    tools: [
      {
        name: "财务自由计算器",
        formula: "年支出 × 25 = 财务自由所需资产",
        example: "年支出10万 → 需要250万资产"
      }
    ],
    cases: [
      {
        title: "5年存下第一桶金",
        summary: "月薪8000的95后如何实现财务自由第一步",
        keyPoints: ["强制储蓄", "副业增收", "基金定投"]
      }
    ]
  },
  family: {
    theories: [
      {
        title: "爱的五种语言",
        content: `表达爱的方式：
        1. **肯定的言辞** - 赞美、鼓励
        2. **服务的行动** - 帮忙做事
        3. **接受礼物** - 精心挑选的礼物
        4. **高质量时间** - 专注的陪伴
        5. **身体接触** - 拥抱、牵手`,
        source: "盖瑞·查普曼"
      }
    ],
    tools: [
      {
        name: "家庭会议模板",
        agenda: [
          "本周感恩分享",
          "家庭事务讨论",
          "下周计划安排",
          "游戏/活动时光"
        ]
      }
    ],
    cases: [
      {
        title: "修复破裂的亲子关系",
        summary: "通过非暴力沟通重建与青春期孩子的信任",
        keyPoints: ["倾听", "共情", "边界"]
      }
    ]
  },
  social: {
    theories: [
      {
        title: "弱连接的力量",
        content: `人脉网络的价值：
        - 强连接：亲密朋友，信息同质化
        - 弱连接：泛泛之交，信息多元化
        - 新机会往往来自弱连接
        - 维护弱连接成本更低`,
        source: "马克·格兰诺维特"
      }
    ],
    tools: [
      {
        name: "人脉管理表",
        fields: ["姓名", "关系类型", "认识场景", "共同话题", "上次联系", "下次联系计划"]
      }
    ],
    cases: [
      {
        title: "从社恐到社交达人",
        summary: "内向者如何通过刻意练习建立人脉网络",
        keyPoints: ["找到舒适区", "质量优于数量", "真诚连接"]
      }
    ]
  },
  learning: {
    theories: [
      {
        title: "费曼学习法",
        content: `四步学习法：
        1. **选择概念** - 确定学习目标
        2. **教授他人** - 用简单语言讲解
        3. **发现缺口** - 识别理解盲点
        4. **简化语言** - 类比和可视化`,
        source: "理查德·费曼"
      },
      {
        title: "刻意练习",
        content: `高效练习的要素：
        - 明确具体的目标
        - 专注投入
        - 及时反馈
        - 走出舒适区`,
        source: "安德斯·艾利克森"
      }
    ],
    tools: [
      {
        name: "学习项目规划表",
        sections: ["目标", "资源", "时间表", "里程碑", "输出成果"]
      }
    ],
    cases: [
      {
        title: "6个月掌握新技能",
        summary: "全职工作者如何高效学习编程",
        keyPoints: ["项目驱动", "番茄工作法", "社群学习"]
      }
    ]
  },
  entertainment: {
    theories: [
      {
        title: "心流理论",
        content: `最优体验的条件：
        - 挑战与技能平衡
        - 明确的目标
        - 即时反馈
        - 深度专注
        - 时间感消失`,
        source: "米哈里·契克森米哈伊"
      }
    ],
    tools: [
      {
        name: "兴趣探索清单",
        categories: ["创造性", "运动类", "社交类", "智力类", "自然类"]
      }
    ],
    cases: [
      {
        title: "培养终身爱好",
        summary: "从0开始学摄影，成为业余摄影师",
        keyPoints: ["从模仿开始", "加入社群", "持续创作"]
      }
    ]
  },
  spiritual: {
    theories: [
      {
        title: "意义疗法",
        content: `找到人生意义的三个途径：
        1. **创造** - 做有意义的事
        2. **体验** - 爱与被爱
        3. **态度** - 面对苦难的选择`,
        source: "维克多·弗兰克尔"
      },
      {
        title: "正念冥想",
        content: `活在当下的练习：
        - 关注呼吸
        - 觉察身体感受
        - 观察念头而不评判
        - 培养慈悲心`,
        source: "乔·卡巴金"
      }
    ],
    tools: [
      {
        name: "人生意义探索",
        questions: [
          "什么让你感到充满活力？",
          "你希望人们如何记住你？",
          "什么是你愿意为之付出努力的？",
          "你的核心价值观是什么？"
        ]
      }
    ],
    cases: [
      {
        title: "中年危机后的觉醒",
        summary: "40岁重新思考人生意义，找到新方向",
        keyPoints: ["接纳变化", "重新定义成功", "服务他人"]
      }
    ]
  }
};

// ==================== 提示词模板系统 ====================
const PROMPT_TEMPLATES_ADVANCED = {
  roles: [
    { id: 'coach', name: '人生教练', style: '鼓励引导式', tone: '温暖支持' },
    { id: 'expert', name: '领域专家', style: '专业分析式', tone: '权威严谨' },
    { id: 'mentor', name: '导师', style: '经验分享式', tone: '亲切智慧' },
    { id: 'analyst', name: '分析师', style: '数据驱动式', tone: '客观理性' },
    { id: 'friend', name: '知心朋友', style: '平等对话式', tone: '真诚直接' }
  ],
  formats: [
    { id: 'structured', name: '结构化', description: '清晰的标题和列表' },
    { id: 'narrative', name: '故事化', description: '生动的案例和场景' },
    { id: 'checklist', name: '清单式', description: '可执行的步骤清单' },
    { id: 'qa', name: '问答式', description: '问题引导思考' },
    { id: 'visual', name: '可视化', description: '表格、图表、框架' }
  ],
  depths: [
    { id: 'beginner', name: '入门级', description: '基础概念，易于理解' },
    { id: 'intermediate', name: '进阶级', description: '深入分析，实用技巧' },
    { id: 'advanced', name: '专家级', description: '系统全面，专业深度' }
  ],
  timeframes: [
    { id: 'short', name: '短期', description: '本周/本月' },
    { id: 'medium', name: '中期', description: '未来3-6个月' },
    { id: 'long', name: '长期', description: '1-3年规划' }
  ]
};

// ==================== 应用配置 ====================
const APP_CONFIG = {
  name: '智识空间',
  version: '3.0',
  tagline: '人生八维，全面成长',
  features: [
    '启发式引导',
    '知识库学习',
    '智能提示词',
    '维度分析',
    '进度追踪'
  ]
};

// 导出（用于模块化）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LIFE_DIMENSIONS,
    HEURISTIC_QUESTIONS,
    KNOWLEDGE_BASE,
    PROMPT_TEMPLATES_ADVANCED,
    APP_CONFIG
  };
}
