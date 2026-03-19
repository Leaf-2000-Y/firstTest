// ==================== 00后人生问题知识图谱数据 ====================

const GraphData = {
  // 中心主题
  center: {
    id: 'center',
    name: '00后人生困境',
    type: 'center',
    description: '这一代年轻人面临的独特挑战与机遇',
    icon: '🎯',
    color: '#6366f1'
  },

  // 主要维度（8大领域）
  dimensions: [
    {
      id: 'career',
      name: '职业发展',
      type: 'dimension',
      icon: '💼',
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #7EDDD6 100%)',
      description: '从校园到职场的迷茫与探索',
      pillar: '价值的实现',
      stats: { severity: 85, prevalence: 92, complexity: 78 }
    },
    {
      id: 'finance',
      name: '财务压力',
      type: 'dimension',
      icon: '💰',
      color: '#45B7D1',
      gradient: 'linear-gradient(135deg, #45B7D1 0%, #74C7DD 100%)',
      description: '收入焦虑与消费主义的夹击',
      pillar: '安全的保障',
      stats: { severity: 88, prevalence: 89, complexity: 72 }
    },
    {
      id: 'relationship',
      name: '人际关系',
      type: 'dimension',
      icon: '🤝',
      color: '#A29BFE',
      gradient: 'linear-gradient(135deg, #A29BFE 0%, #B8B3FE 100%)',
      description: '社交恐惧与深度连接的缺失',
      pillar: '支持的网路',
      stats: { severity: 75, prevalence: 85, complexity: 80 }
    },
    {
      id: 'emotion',
      name: '情感困惑',
      type: 'dimension',
      icon: '💕',
      color: '#FD79A8',
      gradient: 'linear-gradient(135deg, #FD79A8 0%, #FDA5C8 100%)',
      description: '恋爱、婚姻与亲密关系的挑战',
      pillar: '情感的港湾',
      stats: { severity: 82, prevalence: 87, complexity: 85 }
    },
    {
      id: 'identity',
      name: '自我认知',
      type: 'dimension',
      icon: '🪞',
      color: '#FDCB6E',
      gradient: 'linear-gradient(135deg, #FDCB6E 0%, #FDDD9E 100%)',
      description: '我是谁？我要去哪里？',
      pillar: '成长的阶梯',
      stats: { severity: 78, prevalence: 90, complexity: 88 }
    },
    {
      id: 'family',
      name: '家庭关系',
      type: 'dimension',
      icon: '🏠',
      color: '#F9CA24',
      gradient: 'linear-gradient(135deg, #F9CA24 0%, #FAD566 100%)',
      description: '代际冲突与独立成长的张力',
      pillar: '情感的港湾',
      stats: { severity: 70, prevalence: 82, complexity: 75 }
    },
    {
      id: 'health',
      name: '身心健康',
      type: 'dimension',
      icon: '❤️',
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
      description: '身体透支与心理亚健康',
      pillar: '生命的基石',
      stats: { severity: 80, prevalence: 88, complexity: 70 }
    },
    {
      id: 'meaning',
      name: '生活意义',
      type: 'dimension',
      icon: '🧘',
      color: '#6C5CE7',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #9B8BF0 100%)',
      description: '存在焦虑与价值迷茫',
      pillar: '灵魂的归宿',
      stats: { severity: 76, prevalence: 84, complexity: 92 }
    }
  ],

  // 详细问题节点
  problems: {
    career: [
      {
        id: 'career-1',
        name: '专业不对口',
        type: 'problem',
        severity: 'high',
        description: '大学所学与实际工作需求脱节',
        symptoms: ['就业困难', '频繁跳槽', '薪资低迷', '职业倦怠'],
        causes: ['教育滞后', '市场变化快', '信息不对称'],
        solutions: ['技能重塑', '实习积累', '跨界学习', '职业咨询']
      },
      {
        id: 'career-2',
        name: '内卷焦虑',
        type: 'problem',
        severity: 'high',
        description: '竞争激烈，努力与回报不成正比',
        symptoms: ['过度加班', '身心俱疲', '比较心理', '失去热情'],
        causes: ['僧多粥少', '评价体系单一', '社会比较'],
        solutions: ['寻找蓝海', '差异化竞争', '工作生活平衡', '内在动机']
      },
      {
        id: 'career-3',
        name: '职业迷茫',
        type: 'problem',
        severity: 'medium',
        description: '不清楚自己适合什么、想要什么',
        symptoms: ['选择困难', '频繁试错', '缺乏方向', '焦虑不安'],
        causes: ['自我认知不足', '信息过载', '社会期待压力'],
        solutions: ['职业测评', '导师指导', '试错探索', '价值观澄清']
      },
      {
        id: 'career-4',
        name: '技能焦虑',
        type: 'problem',
        severity: 'high',
        description: '担心技能过时，被AI或新人取代',
        symptoms: ['持续学习压力', '知识焦虑', '时间管理困难', '效率低下'],
        causes: ['技术迭代快', '终身学习要求', '比较心理'],
        solutions: ['建立T型能力', '专注核心技能', '学会学习', '接受不完美']
      },
      {
        id: 'career-5',
        name: '创业诱惑与恐惧',
        type: 'problem',
        severity: 'medium',
        description: '想创业又害怕失败',
        symptoms: ['纠结犹豫', '机会成本焦虑', '风险厌恶', '理想化幻想'],
        causes: ['成功案例放大', '幸存者偏差', '经济压力'],
        solutions: ['MVP验证', '副业试水', '积累资源', '理性评估']
      }
    ],
    finance: [
      {
        id: 'finance-1',
        name: '月光族困境',
        type: 'problem',
        severity: 'high',
        description: '收入不低但存不下钱',
        symptoms: ['月底吃土', '信用卡依赖', '消费后悔', '储蓄为零'],
        causes: ['消费主义', '即时满足', '社交压力', '缺乏规划'],
        solutions: ['预算管理', '强制储蓄', '记账习惯', '延迟满足']
      },
      {
        id: 'finance-2',
        name: '房价压力',
        type: 'problem',
        severity: 'high',
        description: '买不起房的无力感',
        symptoms: ['租房焦虑', '定居困难', '婚恋受阻', '身份焦虑'],
        causes: ['房价收入比失衡', '资产焦虑', '传统观念'],
        solutions: ['租房也精彩', 'FIRE运动', '多元投资', '重新定义成功']
      },
      {
        id: 'finance-3',
        name: '理财知识匮乏',
        type: 'problem',
        severity: 'medium',
        description: '想理财但不知从何开始',
        symptoms: ['盲目跟风', '被骗亏损', '资金闲置', '焦虑不安'],
        causes: ['财商教育缺失', '信息噪音', '风险认知不足'],
        solutions: ['系统学习', '指数基金', '分散投资', '长期主义']
      },
      {
        id: 'finance-4',
        name: '副业焦虑',
        type: 'problem',
        severity: 'medium',
        description: '想搞副业增加收入但无从下手',
        symptoms: ['时间不够', '精力分散', '主业受影响', '副业失败'],
        causes: ['经济压力', '单一收入风险', '社交媒体影响'],
        solutions: ['技能变现', '兴趣驱动', '时间管理', '循序渐进']
      }
    ],
    relationship: [
      {
        id: 'relationship-1',
        name: '社交恐惧',
        type: 'problem',
        severity: 'high',
        description: '害怕社交，回避人际交往',
        symptoms: ['回避聚会', '线上活跃线下沉默', '孤独感', '自我封闭'],
        causes: ['数字原住民', '社交技能退化', '完美主义', '创伤经历'],
        solutions: ['小步尝试', '兴趣社交', '专业帮助', '接纳自己']
      },
      {
        id: 'relationship-2',
        name: '浅层社交',
        type: 'problem',
        severity: 'medium',
        description: '朋友很多但知心的很少',
        symptoms: ['点赞之交', '深夜孤独', '无人倾诉', '表面热闹'],
        causes: ['社交媒体', '快节奏生活', '信任困难', '地理分散'],
        solutions: ['深度对话', '定期联系', '主动付出', '质量优于数量']
      },
      {
        id: 'relationship-3',
        name: '人脉焦虑',
        type: 'problem',
        severity: 'medium',
        description: '担心人脉不够影响发展',
        symptoms: ['强行社交', '功利交友', '关系维护压力', '自我怀疑'],
        causes: ['成功学影响', '资源焦虑', '社会比较'],
        solutions: ['价值先行', '自然连接', '弱关系力量', '专注自我']
      },
      {
        id: 'relationship-4',
        name: '职场人际',
        type: 'problem',
        severity: 'medium',
        description: '职场复杂人际关系的困扰',
        symptoms: ['办公室政治', '站队压力', '沟通困难', '边界模糊'],
        causes: ['代际差异', '价值观冲突', '竞争环境', '沟通不畅'],
        solutions: ['专业主义', '边界清晰', '非暴力沟通', '寻求支持']
      }
    ],
    emotion: [
      {
        id: 'emotion-1',
        name: '脱单困难',
        type: 'problem',
        severity: 'high',
        description: '想恋爱但找不到合适的人',
        symptoms: ['相亲疲惫', ' dating app倦怠', '标准矛盾', '孤独焦虑'],
        causes: ['社交圈窄', '标准过高', '选择困难', '恐惧承诺'],
        solutions: ['拓展圈子', '降低预期', '自我提升', '享受单身']
      },
      {
        id: 'emotion-2',
        name: '恋爱焦虑',
        type: 'problem',
        severity: 'medium',
        description: '恋爱中缺乏安全感',
        symptoms: ['过度依赖', '控制欲', '患得患失', '沟通障碍'],
        causes: ['依恋问题', '自我价值感低', '过往创伤', '社会比较'],
        solutions: ['自我成长', '健康沟通', '边界建立', '心理咨询']
      },
      {
        id: 'emotion-3',
        name: '婚姻恐惧',
        type: 'problem',
        severity: 'high',
        description: '恐婚恐育，对婚姻缺乏信心',
        symptoms: ['拖延结婚', '恐育', '婚前焦虑', '离婚恐惧'],
        causes: ['离婚率高', '经济压力', '个人主义', '自由向往'],
        solutions: ['理性评估', '婚前辅导', '经济准备', '观念更新']
      },
      {
        id: 'emotion-4',
        name: '失恋恢复',
        type: 'problem',
        severity: 'medium',
        description: '分手后难以走出',
        symptoms: ['情绪低落', '自我怀疑', '纠缠前任', '社交退缩'],
        causes: ['沉没成本', '依恋断裂', '自我认同丧失', '孤独恐惧'],
        solutions: ['允许悲伤', '断联恢复', '社交支持', '重新出发']
      }
    ],
    identity: [
      {
        id: 'identity-1',
        name: '身份认同危机',
        type: 'problem',
        severity: 'high',
        description: '不清楚自己是谁，想要什么',
        symptoms: ['空虚感', '随波逐流', '选择困难', '存在焦虑'],
        causes: ['社会转型', '价值多元', '教育缺失', '自我探索不足'],
        solutions: ['自我探索', '价值观澄清', '尝试体验', '心理咨询']
      },
      {
        id: 'identity-2',
        name: '完美主义',
        type: 'problem',
        severity: 'medium',
        description: '对自己要求过高，害怕失败',
        symptoms: ['拖延', '自我批评', '焦虑', '不敢尝试'],
        causes: ['家庭教育', '社会期待', '比较心理', '自我价值绑定'],
        solutions: ['接纳不完美', '成长型思维', '自我关怀', '重新定义成功']
      },
      {
        id: 'identity-3',
        name: '同辈压力',
        type: 'problem',
        severity: 'high',
        description: '与他人比较带来的焦虑',
        symptoms: ['社交媒体焦虑', '成就焦虑', '自我贬低', '盲目跟风'],
        causes: ['社交媒体', '成功叙事', '评价体系单一', '自我认同不稳'],
        solutions: ['减少比较', '定义自己的成功', '专注成长', '感恩练习']
      },
      {
        id: 'identity-4',
        name: '代际差异',
        type: 'problem',
        severity: 'medium',
        description: '与父母价值观的冲突',
        symptoms: ['沟通困难', '不被理解', '叛逆', '内疚感'],
        causes: ['时代差异', '教育背景', '社会环境', '代际创伤'],
        solutions: ['换位思考', '边界建立', '非暴力沟通', '接纳差异']
      }
    ],
    family: [
      {
        id: 'family-1',
        name: '催婚压力',
        type: 'problem',
        severity: 'high',
        description: '父母催婚带来的压力',
        symptoms: ['家庭矛盾', '逃避回家', '焦虑', '草率决定'],
        causes: ['传统观念', '面子文化', '养老焦虑', '代际差异'],
        solutions: ['坦诚沟通', '设立边界', '转移话题', '经济独立']
      },
      {
        id: 'family-2',
        name: '经济依赖',
        type: 'problem',
        severity: 'medium',
        description: '成年后仍依赖父母经济支持',
        symptoms: ['愧疚感', '自主权受限', '独立性差', '拖延独立'],
        causes: ['房价高', '就业难', '消费高', '父母愿意'],
        solutions: ['逐步独立', '开源节流', '技能提升', '沟通协商']
      },
      {
        id: 'family-3',
        name: '代际沟通',
        type: 'problem',
        severity: 'medium',
        description: '与父母沟通困难',
        symptoms: ['说不到一起', '互相不理解', '争吵', '冷战'],
        causes: ['成长环境', '价值观', '沟通方式', '情绪管理'],
        solutions: ['耐心倾听', '非暴力沟通', '求同存异', '定期联系']
      },
      {
        id: 'family-4',
        name: '养老焦虑',
        type: 'problem',
        severity: 'high',
        description: '担心父母养老问题',
        symptoms: ['经济压力', '时间压力', '愧疚感', '未来焦虑'],
        causes: ['独生子女', '老龄化', '社保不足', '地理分散'],
        solutions: ['提前规划', '保险配置', '定期陪伴', '寻求支持']
      }
    ],
    health: [
      {
        id: 'health-1',
        name: '睡眠问题',
        type: 'problem',
        severity: 'high',
        description: '失眠、熬夜、睡眠质量差',
        symptoms: ['入睡困难', '多梦易醒', '白天困倦', '依赖咖啡因'],
        causes: ['手机依赖', '工作压力', '焦虑', '作息紊乱'],
        solutions: ['睡眠卫生', '睡前仪式', '限制屏幕', '放松练习']
      },
      {
        id: 'health-2',
        name: '久坐亚健康',
        type: 'problem',
        severity: 'medium',
        description: '缺乏运动，身体处于亚健康状态',
        symptoms: ['颈椎腰椎问题', '肥胖', '体能下降', '慢性病风险'],
        causes: ['工作性质', '懒惰', '时间不够', '缺乏意识'],
        solutions: ['微运动', '站立办公', '定期体检', '循序渐进']
      },
      {
        id: 'health-3',
        name: '心理健康',
        type: 'problem',
        severity: 'high',
        description: '焦虑、抑郁、情绪问题',
        symptoms: ['情绪低落', '焦虑不安', '注意力难集中', '社交退缩'],
        causes: ['压力', '孤独', '完美主义', '生物因素'],
        solutions: ['心理咨询', '运动', '冥想', '社交支持', '必要时药物']
      },
      {
        id: 'health-4',
        name: '饮食不规律',
        type: 'problem',
        severity: 'medium',
        description: '外卖依赖、饮食不健康',
        symptoms: ['肠胃问题', '营养不良', '肥胖', '精力不济'],
        causes: ['忙碌', '不会做饭', '外卖便利', '口味偏好'],
        solutions: [' meal prep', '健康外卖', '简单烹饪', '规律进餐']
      }
    ],
    meaning: [
      {
        id: 'meaning-1',
        name: '存在焦虑',
        type: 'problem',
        severity: 'high',
        description: '人生意义感的缺失',
        symptoms: ['空虚感', '无聊', '迷茫', '无目标'],
        causes: ['价值多元', '宗教衰落', '消费主义', '意义危机'],
        solutions: ['寻找热爱', '服务他人', '创造价值', '哲学思考']
      },
      {
        id: 'meaning-2',
        name: '工作意义感缺失',
        type: 'problem',
        severity: 'medium',
        description: '工作只是为了赚钱',
        symptoms: ['职业倦怠', '缺乏动力', '机械重复', '价值怀疑'],
        causes: ['工作异化', '螺丝钉角色', '意义感缺失', '期望落差'],
        solutions: ['寻找意义', '副业探索', '工作重塑', '价值观对齐']
      },
      {
        id: 'meaning-3',
        name: '信息过载',
        type: 'problem',
        severity: 'medium',
        description: '被信息淹没，难以专注',
        symptoms: ['注意力分散', '决策疲劳', '焦虑', '时间黑洞'],
        causes: ['算法推荐', '社交媒体', 'FOMO', '信息爆炸'],
        solutions: ['数字断舍离', '信息筛选', '深度阅读', '正念练习']
      },
      {
        id: 'meaning-4',
        name: '死亡焦虑',
        type: 'problem',
        severity: 'medium',
        description: '对衰老和死亡的恐惧',
        symptoms: ['健康焦虑', '时间焦虑', '存在恐惧', '后悔过去'],
        causes: ['生命有限', '未完成感', '社会忽视', '医疗环境'],
        solutions: ['向死而生', '活在当下', ' legacy建设', '哲学思考']
      }
    ]
  },

  // 解决方案节点
  solutions: [
    {
      id: 'solution-1',
      name: '心理咨询',
      type: 'solution',
      icon: '🧠',
      color: '#9B59B6',
      description: '专业心理支持',
      applicable: ['emotion', 'identity', 'health', 'meaning']
    },
    {
      id: 'solution-2',
      name: '职业规划',
      type: 'solution',
      icon: '📈',
      color: '#3498DB',
      description: '明确职业方向',
      applicable: ['career', 'finance']
    },
    {
      id: 'solution-3',
      name: '财务管理',
      type: 'solution',
      icon: '💳',
      color: '#27AE60',
      description: '建立财务系统',
      applicable: ['finance']
    },
    {
      id: 'solution-4',
      name: '社交技能',
      type: 'solution',
      icon: '🗣️',
      color: '#E67E22',
      description: '提升人际交往能力',
      applicable: ['relationship', 'emotion', 'family']
    },
    {
      id: 'solution-5',
      name: '自我探索',
      type: 'solution',
      icon: '🔍',
      color: '#1ABC9C',
      description: '深入了解自己',
      applicable: ['identity', 'meaning', 'emotion']
    },
    {
      id: 'solution-6',
      name: '健康管理',
      type: 'solution',
      icon: '🏃',
      color: '#E74C3C',
      description: '身心全面健康',
      applicable: ['health', 'career', 'emotion']
    },
    {
      id: 'solution-7',
      name: '正念冥想',
      type: 'solution',
      icon: '🧘',
      color: '#9B59B6',
      description: '内心平静练习',
      applicable: ['health', 'meaning', 'identity', 'emotion']
    },
    {
      id: 'solution-8',
      name: '持续学习',
      type: 'solution',
      icon: '📚',
      color: '#F39C12',
      description: '终身成长',
      applicable: ['career', 'finance', 'identity', 'meaning']
    }
  ],

  // 资源节点
  resources: [
    {
      id: 'resource-1',
      name: '书籍推荐',
      type: 'resource',
      icon: '📖',
      items: [
        { title: '《被讨厌的勇气》', category: '心理' },
        { title: '《原则》', category: '职场' },
        { title: '《穷爸爸富爸爸》', category: '理财' },
        { title: '《非暴力沟通》', category: '关系' },
        { title: '《心流》', category: '成长' }
      ]
    },
    {
      id: 'resource-2',
      name: '优质课程',
      type: 'resource',
      icon: '🎓',
      items: [
        { title: 'Coursera 心理学', category: '心理' },
        { title: '得到 职业发展', category: '职场' },
        { title: '长投学堂', category: '理财' },
        { title: 'Headspace 冥想', category: '健康' }
      ]
    },
    {
      id: 'resource-3',
      name: '实用工具',
      type: 'resource',
      icon: '🛠️',
      items: [
        { title: 'Notion 知识管理', category: '效率' },
        { title: 'Forest 专注', category: '效率' },
        { title: '薄荷健康', category: '健康' },
        { title: '随手记', category: '理财' }
      ]
    },
    {
      id: 'resource-4',
      name: '社群支持',
      type: 'resource',
      icon: '👥',
      items: [
        { title: '豆瓣小组', category: '社区' },
        { title: '知识星球', category: '社区' },
        { title: '线下活动', category: '社交' },
        { title: '互助小组', category: '支持' }
      ]
    }
  ],

  // 关系连接
  links: [
    // 中心到维度
    { source: 'center', target: 'career', type: 'main', strength: 1 },
    { source: 'center', target: 'finance', type: 'main', strength: 1 },
    { source: 'center', target: 'relationship', type: 'main', strength: 1 },
    { source: 'center', target: 'emotion', type: 'main', strength: 1 },
    { source: 'center', target: 'identity', type: 'main', strength: 1 },
    { source: 'center', target: 'family', type: 'main', strength: 1 },
    { source: 'center', target: 'health', type: 'main', strength: 1 },
    { source: 'center', target: 'meaning', type: 'main', strength: 1 },

    // 维度间关联
    { source: 'career', target: 'finance', type: 'related', strength: 0.8 },
    { source: 'career', target: 'health', type: 'related', strength: 0.6 },
    { source: 'career', target: 'meaning', type: 'related', strength: 0.7 },
    { source: 'finance', target: 'family', type: 'related', strength: 0.7 },
    { source: 'finance', target: 'emotion', type: 'related', strength: 0.6 },
    { source: 'relationship', target: 'emotion', type: 'related', strength: 0.9 },
    { source: 'relationship', target: 'identity', type: 'related', strength: 0.6 },
    { source: 'emotion', target: 'health', type: 'related', strength: 0.8 },
    { source: 'emotion', target: 'family', type: 'related', strength: 0.7 },
    { source: 'identity', target: 'meaning', type: 'related', strength: 0.9 },
    { source: 'identity', target: 'career', type: 'related', strength: 0.7 },
    { source: 'family', target: 'identity', type: 'related', strength: 0.6 },
    { source: 'health', target: 'meaning', type: 'related', strength: 0.5 },

    // 问题到维度
    { source: 'career', target: 'career-1', type: 'contains', strength: 1 },
    { source: 'career', target: 'career-2', type: 'contains', strength: 1 },
    { source: 'career', target: 'career-3', type: 'contains', strength: 1 },
    { source: 'career', target: 'career-4', type: 'contains', strength: 1 },
    { source: 'career', target: 'career-5', type: 'contains', strength: 1 },
    { source: 'finance', target: 'finance-1', type: 'contains', strength: 1 },
    { source: 'finance', target: 'finance-2', type: 'contains', strength: 1 },
    { source: 'finance', target: 'finance-3', type: 'contains', strength: 1 },
    { source: 'finance', target: 'finance-4', type: 'contains', strength: 1 },
    { source: 'relationship', target: 'relationship-1', type: 'contains', strength: 1 },
    { source: 'relationship', target: 'relationship-2', type: 'contains', strength: 1 },
    { source: 'relationship', target: 'relationship-3', type: 'contains', strength: 1 },
    { source: 'relationship', target: 'relationship-4', type: 'contains', strength: 1 },
    { source: 'emotion', target: 'emotion-1', type: 'contains', strength: 1 },
    { source: 'emotion', target: 'emotion-2', type: 'contains', strength: 1 },
    { source: 'emotion', target: 'emotion-3', type: 'contains', strength: 1 },
    { source: 'emotion', target: 'emotion-4', type: 'contains', strength: 1 },
    { source: 'identity', target: 'identity-1', type: 'contains', strength: 1 },
    { source: 'identity', target: 'identity-2', type: 'contains', strength: 1 },
    { source: 'identity', target: 'identity-3', type: 'contains', strength: 1 },
    { source: 'identity', target: 'identity-4', type: 'contains', strength: 1 },
    { source: 'family', target: 'family-1', type: 'contains', strength: 1 },
    { source: 'family', target: 'family-2', type: 'contains', strength: 1 },
    { source: 'family', target: 'family-3', type: 'contains', strength: 1 },
    { source: 'family', target: 'family-4', type: 'contains', strength: 1 },
    { source: 'health', target: 'health-1', type: 'contains', strength: 1 },
    { source: 'health', target: 'health-2', type: 'contains', strength: 1 },
    { source: 'health', target: 'health-3', type: 'contains', strength: 1 },
    { source: 'health', target: 'health-4', type: 'contains', strength: 1 },
    { source: 'meaning', target: 'meaning-1', type: 'contains', strength: 1 },
    { source: 'meaning', target: 'meaning-2', type: 'contains', strength: 1 },
    { source: 'meaning', target: 'meaning-3', type: 'contains', strength: 1 },
    { source: 'meaning', target: 'meaning-4', type: 'contains', strength: 1 },

    // 问题间关联
    { source: 'career-2', target: 'health-3', type: 'causes', strength: 0.8 },
    { source: 'career-2', target: 'emotion-2', type: 'causes', strength: 0.7 },
    { source: 'finance-1', target: 'emotion-2', type: 'causes', strength: 0.6 },
    { source: 'finance-2', target: 'emotion-3', type: 'causes', strength: 0.7 },
    { source: 'relationship-1', target: 'emotion-1', type: 'causes', strength: 0.8 },
    { source: 'identity-1', target: 'career-3', type: 'causes', strength: 0.9 },
    { source: 'identity-3', target: 'emotion-2', type: 'causes', strength: 0.7 },
    { source: 'family-1', target: 'emotion-3', type: 'causes', strength: 0.8 },
    { source: 'health-3', target: 'career-2', type: 'causes', strength: 0.6 },
    { source: 'meaning-1', target: 'career-4', type: 'causes', strength: 0.7 },

    // 解决方案关联
    { source: 'solution-1', target: 'emotion', type: 'solves', strength: 0.9 },
    { source: 'solution-1', target: 'identity', type: 'solves', strength: 0.8 },
    { source: 'solution-1', target: 'health', type: 'solves', strength: 0.8 },
    { source: 'solution-2', target: 'career', type: 'solves', strength: 0.9 },
    { source: 'solution-3', target: 'finance', type: 'solves', strength: 0.9 },
    { source: 'solution-4', target: 'relationship', type: 'solves', strength: 0.8 },
    { source: 'solution-5', target: 'identity', type: 'solves', strength: 0.9 },
    { source: 'solution-6', target: 'health', type: 'solves', strength: 0.9 },
    { source: 'solution-7', target: 'health', type: 'solves', strength: 0.8 },
    { source: 'solution-7', target: 'meaning', type: 'solves', strength: 0.8 },
    { source: 'solution-8', target: 'career', type: 'solves', strength: 0.7 }
  ],

  // 人生阶段
  lifeStages: [
    { id: 'stage-1', name: '大学期', age: '18-22', problems: ['identity-1', 'career-1', 'emotion-1', 'finance-1'] },
    { id: 'stage-2', name: '初入职场', age: '22-25', problems: ['career-2', 'career-3', 'finance-1', 'health-1', 'relationship-4'] },
    { id: 'stage-3', name: '职场成长', age: '25-28', problems: ['career-4', 'finance-3', 'emotion-2', 'identity-3', 'health-2'] },
    { id: 'stage-4', name: '成家立业', age: '28-32', problems: ['emotion-3', 'family-1', 'finance-2', 'career-5', 'meaning-2'] },
    { id: 'stage-5', name: '中年危机', age: '32-35', problems: ['meaning-1', 'health-3', 'family-4', 'identity-1', 'career-2'] }
  ],

  // 统计数据
  statistics: {
    totalProblems: 40,
    highSeverity: 18,
    mediumSeverity: 16,
    lowSeverity: 6,
    mostConnected: ['identity-1', 'career-2', 'emotion-2'],
    crossDomainIssues: [
      { domains: ['career', 'health'], issue: '工作与生活平衡', severity: 'high' },
      { domains: ['finance', 'emotion'], issue: '金钱焦虑', severity: 'high' },
      { domains: ['identity', 'career'], issue: '职业认同', severity: 'medium' },
      { domains: ['relationship', 'emotion'], issue: '亲密关系依赖', severity: 'medium' }
    ]
  }
};

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GraphData;
}
