// ==================== 00后人生问题完整知识体系 ====================
// 包含6大领域 × 5子类别 × 10-15问题 = 400+问题节点
// 作者：AI Assistant
// 版本：2.0 完整版

const ComprehensiveData = {
  // 中心主题
  center: {
    id: 'center',
    name: '00后人生问题图谱',
    type: 'center',
    icon: '🧭',
    color: '#6366f1',
    description: '全面解析当代年轻人面临的成长挑战，涵盖学习、职业、人际、心理、情感、社会六大核心领域'
  },

  // 六大核心领域配置
  domains: [
    {
      id: 'learning',
      name: '学习成长',
      icon: '📚',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      description: '从学习方法到终身学习的完整成长路径',
      position: { x: 0, y: -350 }
    },
    {
      id: 'career',
      name: '职业发展',
      icon: '💼',
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      description: '职业选择、成长与转型的全方位指南',
      position: { x: 303, y: -175 }
    },
    {
      id: 'relationship',
      name: '人际关系',
      icon: '🤝',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      description: '构建健康人际网络的策略与方法',
      position: { x: 303, y: 175 }
    },
    {
      id: 'mental',
      name: '心理健康',
      icon: '🧠',
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
      description: '情绪管理与心理韧性的培养体系',
      position: { x: 0, y: 350 }
    },
    {
      id: 'emotion',
      name: '情感生活',
      icon: '💕',
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
      description: '恋爱、婚姻与情感成熟的探索之路',
      position: { x: -303, y: 175 }
    },
    {
      id: 'social',
      name: '社会适应',
      icon: '🌍',
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
      description: '独立生活与社会责任的能力建设',
      position: { x: -303, y: -175 }
    }
  ],

  // 完整的问题知识体系 - 6领域 × 5子类 × 10-15问题
  knowledgeNodes: {
    // ==================== 1. 学习成长领域 (5子类 × 12问题 = 60问题) ====================
    learning: {
      'learning-methods': {
        name: '学习方法',
        icon: '🎯',
        problems: [
          { id: 'lm-1', name: '学习效率低下', severity: 'high', description: '投入大量时间但学习效果不佳，知识吸收率低', symptoms: ['长时间学习但记不住', '看完就忘', '理解困难'], causes: ['缺乏科学学习方法', '被动接受知识', '没有输出练习'], solutions: ['费曼学习法', '主动回忆', '间隔重复'] },
          { id: 'lm-2', name: '专注力差', severity: 'high', description: '难以集中注意力，容易分心走神', symptoms: ['手机依赖', '频繁走神', '坐不住'], causes: ['碎片化信息习惯', '多巴胺阈值提高', '缺乏明确目标'], solutions: ['番茄工作法', '深度工作', '数字断舍离'] },
          { id: 'lm-3', name: '记忆力衰退', severity: 'medium', description: '感觉记忆力不如从前，背诵困难', symptoms: ['记不住人名', '刚看就忘', '知识点混淆'], causes: ['睡眠不足', '信息过载', '缺乏记忆策略'], solutions: ['记忆宫殿', '联想记忆', '充足睡眠'] },
          { id: 'lm-4', name: '理解能力弱', severity: 'medium', description: '难以深入理解复杂概念，停留在表面', symptoms: ['只能死记硬背', '无法举一反三', '知识无法迁移'], causes: ['基础知识薄弱', '缺乏系统思维', '急于求成'], solutions: ['建立知识框架', '追根溯源', '多维度理解'] },
          { id: 'lm-5', name: '学习动力不足', severity: 'high', description: '缺乏内在驱动力，学习靠外部压力', symptoms: ['拖延严重', '需要 deadline 驱动', '学习痛苦'], causes: ['目标不明确', '内在动机缺失', '反馈延迟'], solutions: ['找到学习意义', '游戏化学习', '即时反馈'] },
          { id: 'lm-6', name: '不会时间管理', severity: 'high', description: '时间分配不合理，重要事项被拖延', symptoms: ['总是赶 deadline', '计划完不成', '时间黑洞'], causes: ['计划不切实际', '缺乏优先级', '完美主义'], solutions: ['四象限法则', '时间块', '要事第一'] },
          { id: 'lm-7', name: '缺乏学习策略', severity: 'medium', description: '没有系统的学习方法，盲目努力', symptoms: ['东学一点西学一点', '没有体系', '重复学习'], causes: ['元认知能力不足', '缺乏学习科学', '信息过载'], solutions: ['学习如何学习', '建立知识体系', '刻意练习'] },
          { id: 'lm-8', name: '学习焦虑', severity: 'medium', description: '担心学不完、学不会，焦虑影响学习', symptoms: ['比较心理', '知识焦虑', '学习时紧张'], causes: ['社会比较', '信息爆炸', '完美主义'], solutions: ['接受不完美', '专注当下', '设定合理目标'] },
          { id: 'lm-9', name: '不会做笔记', severity: 'low', description: '笔记杂乱无章，复习时无法使用', symptoms: ['笔记混乱', '记了不看', '无法检索'], causes: ['缺乏笔记方法', '盲目抄写', '没有整理习惯'], solutions: ['康奈尔笔记法', '思维导图', '卡片笔记'] },
          { id: 'lm-10', name: '学习环境差', severity: 'medium', description: '没有合适的学习空间和氛围', symptoms: ['容易被打扰', '找不到安静地方', '学习氛围差'], causes: ['居住条件限制', '缺乏规划', '环境影响'], solutions: ['打造学习空间', '寻找学习伙伴', '图书馆/自习室'] },
          { id: 'lm-11', name: '不会提问', severity: 'low', description: '学习中不会提出问题，被动接受', symptoms: ['没有问题意识', '不敢提问', '问题质量低'], causes: ['应试教育影响', '害怕犯错', '缺乏好奇心'], solutions: ['培养好奇心', '苏格拉底提问法', '鼓励质疑'] },
          { id: 'lm-12', name: '学习资源选择困难', severity: 'medium', description: '面对海量资源不知如何选择', symptoms: ['选择困难', '资源囤积', '学不完'], causes: ['信息过载', 'FOMO心理', '缺乏筛选标准'], solutions: ['建立筛选标准', '少即是多', '专注优质资源'] }
        ]
      },
      'knowledge-management': {
        name: '知识管理',
        icon: '🗂️',
        problems: [
          { id: 'km-1', name: '信息过载', severity: 'high', description: '每天接收大量信息，无法有效处理', symptoms: ['信息焦虑', '收藏从未看', '注意力分散'], causes: ['算法推荐', 'FOMO心理', '缺乏筛选机制'], solutions: ['信息节食', '建立筛选标准', '定期清理'] },
          { id: 'km-2', name: '知识体系混乱', severity: 'high', description: '知识碎片化，没有形成系统', symptoms: ['知识孤岛', '无法连接', '记忆混乱'], causes: ['被动接收', '缺乏整理', '没有框架'], solutions: ['建立知识框架', '定期回顾', '输出倒逼输入'] },
          { id: 'km-3', name: '收藏从未看', severity: 'high', description: '大量收藏文章、视频但从不回顾', symptoms: ['收藏夹爆满', '重复收藏', '看完即忘'], causes: ['即时满足', '缺乏整理', '没有行动计划'], solutions: ['先消化再收藏', '定期回顾', '立即行动'] },
          { id: 'km-4', name: '不会整理笔记', severity: 'medium', description: '笔记杂乱无章，无法有效检索', symptoms: ['笔记分散', '找不到笔记', '重复记录'], causes: ['缺乏系统', '工具不当', '没有习惯'], solutions: ['统一工具', '标签系统', '定期整理'] },
          { id: 'km-5', name: '知识无法输出', severity: 'medium', description: '学了很多但无法表达和应用', symptoms: ['讲不出来', '写不出来', '用不出来'], causes: ['缺乏输出练习', '理解不深', '没有反馈'], solutions: ['费曼技巧', '写作输出', '教学相长'] },
          { id: 'km-6', name: '知识遗忘快', severity: 'medium', description: '学过的知识很快遗忘，需要反复学习', symptoms: ['看完就忘', '需要反复看', '无法提取'], causes: ['缺乏复习', '理解不深', '没有应用'], solutions: ['间隔重复', '主动回忆', '实践应用'] },
          { id: 'km-7', name: '不会建立连接', severity: 'medium', description: '知识点之间无法建立联系', symptoms: ['孤立记忆', '无法迁移', '理解表面'], causes: ['缺乏系统思维', '知识广度不够', '没有刻意练习'], solutions: ['思维导图', '跨学科学习', '寻找模式'] },
          { id: 'km-8', name: '工具选择困难', severity: 'low', description: '在多种知识管理工具间摇摆', symptoms: ['频繁换工具', '数据分散', '折腾工具'], causes: ['工具焦虑', '完美主义', '缺乏定力'], solutions: ['选定一个', '专注使用', '工具服务于内容'] },
          { id: 'km-9', name: '缺乏知识复用', severity: 'medium', description: '学过的知识无法在新场景使用', symptoms: ['学了不用', '场景不匹配', '无法迁移'], causes: ['理解不深', '缺乏抽象', '没有刻意练习'], solutions: ['提炼模型', '刻意练习', '跨领域应用'] },
          { id: 'km-10', name: '知识更新焦虑', severity: 'medium', description: '担心知识过时，需要不断学习', symptoms: ['持续学习压力', '知识焦虑', '学不完'], causes: ['技术迭代快', '比较心理', '终身学习要求'], solutions: ['学习元技能', '建立T型能力', '接受不完美'] },
          { id: 'km-11', name: '不会检索信息', severity: 'low', description: '需要时找不到已学知识', symptoms: ['记得学过但找不到', '搜索效率低', '信息丢失'], causes: ['标签混乱', '缺乏索引', '工具不当'], solutions: ['统一搜索', '标签规范', '定期整理'] },
          { id: 'km-12', name: '知识付费陷阱', severity: 'medium', description: '购买大量课程但学不完', symptoms: ['课程囤积', '学完率低', '经济压力'], causes: ['焦虑营销', 'FOMO心理', '缺乏规划'], solutions: ['按需购买', '学完再买', '质量优先'] }
        ]
      },
      'skill-development': {
        name: '技能培养',
        icon: '🛠️',
        problems: [
          { id: 'sd-1', name: '技能选择困难', severity: 'high', description: '不知道学什么技能，选择困难', symptoms: ['跟风学习', '学了很多没用', '选择焦虑'], causes: ['目标不明确', '信息过载', '比较心理'], solutions: ['需求导向', 'T型能力', '深度优先'] },
          { id: 'sd-2', name: '学习曲线陡峭', severity: 'high', description: '新技能入门困难，容易放弃', symptoms: ['初期挫败', '进步缓慢', '放弃率高'], causes: ['期望过高', '缺乏耐心', '方法不当'], solutions: ['微习惯', '分解目标', '寻找正反馈'] },
          { id: 'sd-3', name: '缺乏刻意练习', severity: 'medium', description: '练习停留在舒适区，没有突破', symptoms: ['重复简单内容', '没有挑战', '进步停滞'], causes: ['舒适区依赖', '缺乏反馈', '目标不明确'], solutions: ['刻意练习', '寻求反馈', '走出舒适区'] },
          { id: 'sd-4', name: '技能应用困难', severity: 'medium', description: '学了技能但无法在实际中应用', symptoms: ['理论与实践脱节', '不敢实践', '应用场景少'], causes: ['缺乏实践', '完美主义', '机会不足'], solutions: ['项目驱动', '边学边做', '创造应用场景'] },
          { id: 'sd-5', name: '技能遗忘快', severity: 'medium', description: '不常用的技能很快生疏', symptoms: ['一段时间不用就忘', '需要重新学', '技能退化'], causes: ['缺乏应用', '没有复习', '理解不深'], solutions: ['定期复习', '教授他人', '持续应用'] },
          { id: 'sd-6', name: '缺乏反馈机制', severity: 'medium', description: '学习过程中不知道对错', symptoms: ['盲目练习', '错误固化', '进步缓慢'], causes: ['没有导师', '缺乏评估', '自我认知偏差'], solutions: ['寻找导师', '加入社群', '自我评估'] },
          { id: 'sd-7', name: '技能焦虑', severity: 'high', description: '担心技能不够，被时代淘汰', symptoms: ['持续学习压力', '知识焦虑', '比较心理'], causes: ['技术迭代快', '终身学习要求', '竞争压力'], solutions: ['元技能培养', '接受不完美', '专注核心'] },
          { id: 'sd-8', name: '缺乏实践机会', severity: 'medium', description: '没有场景应用所学技能', symptoms: ['学了无处用', '理论与实践脱节', '动力不足'], causes: ['工作不匹配', '缺乏项目', '不敢尝试'], solutions: ['创造项目', '开源贡献', '副业实践'] },
          { id: 'sd-9', name: '技能组合不当', severity: 'medium', description: '技能之间缺乏协同效应', symptoms: ['技能孤岛', '无法组合', '竞争力不强'], causes: ['缺乏规划', '随机学习', '没有战略'], solutions: ['T型能力', '技能矩阵', '差异化定位'] },
          { id: 'sd-10', name: '缺乏坚持', severity: 'high', description: '学习新技能难以长期坚持', symptoms: ['三分钟热度', '频繁切换', '半途而废'], causes: ['动机不足', '反馈延迟', '困难逃避'], solutions: ['习惯养成', '社群监督', '游戏化'] },
          { id: 'sd-11', name: '不会评估水平', severity: 'low', description: '不清楚自己的技能水平', symptoms: ['盲目自信', '过度自卑', '定位不准'], causes: ['缺乏标准', '达克效应', '比较对象不当'], solutions: ['能力评估', '对标标杆', '寻求反馈'] },
          { id: 'sd-12', name: '技能变现困难', severity: 'medium', description: '技能无法转化为收入', symptoms: ['技能无用武之地', '市场不需要', '价值不高'], causes: ['市场需求', '技能组合', '推广不足'], solutions: ['市场需求导向', '组合技能', '建立个人品牌'] }
        ]
      },
      'exam-pressure': {
        name: '考试压力',
        icon: '📝',
        problems: [
          { id: 'ep-1', name: '考试焦虑', severity: 'high', description: '考试前紧张焦虑，影响发挥', symptoms: ['失眠', '紧张', '发挥失常'], causes: ['期望过高', '准备不足', '完美主义'], solutions: ['充分准备', '放松训练', '认知重构'] },
          { id: 'ep-2', name: '成绩波动大', severity: 'medium', description: '成绩不稳定，时好时坏', symptoms: ['发挥不稳定', '状态依赖', '难以预测'], causes: ['基础不牢', '心态不稳', '方法不当'], solutions: ['夯实基础', '稳定心态', '系统复习'] },
          { id: 'ep-3', name: '应试技巧缺乏', severity: 'medium', description: '会做题但考试得分不高', symptoms: ['时间不够', '粗心失分', '不会答题'], causes: ['缺乏训练', '不熟悉题型', '策略不当'], solutions: ['模拟训练', '技巧学习', '时间管理'] },
          { id: 'ep-4', name: '考前复习效率低', severity: 'high', description: '考前时间紧但复习效果差', symptoms: ['看不完', '记不住', '重点不清'], causes: ['平时不努力', '缺乏规划', '方法不当'], solutions: ['平时积累', '重点突破', '科学复习'] },
          { id: 'ep-5', name: '考试后后悔', severity: 'medium', description: '考完发现会做的题做错', symptoms: ['粗心', '时间分配', '紧张'], causes: ['心态不稳', '检查不够', '策略失误'], solutions: ['冷静答题', '预留检查', '模拟训练'] },
          { id: 'ep-6', name: '对成绩过度在意', severity: 'medium', description: '成绩好坏影响情绪和自我评价', symptoms: ['成绩决定情绪', '自我怀疑', '比较心理'], causes: ['单一评价', '完美主义', '社会压力'], solutions: ['多元评价', '过程导向', '成长思维'] },
          { id: 'ep-7', name: '偏科严重', severity: 'medium', description: '某些科目特别好，某些特别差', symptoms: ['总分被拉低', '兴趣不均', '时间分配'], causes: ['兴趣偏好', '基础差异', '逃避困难'], solutions: ['补齐短板', '保持优势', '平衡发展'] },
          { id: 'ep-8', name: '考前失眠', severity: 'medium', description: '考试前夜难以入睡', symptoms: ['失眠', '疲劳', '影响发挥'], causes: ['焦虑', '兴奋', '作息紊乱'], solutions: ['调整作息', '放松训练', '认知调整'] },
          { id: 'ep-9', name: '考试作弊诱惑', severity: 'low', description: '面对考试压力想走捷径', symptoms: ['侥幸心理', '道德挣扎', '风险认知'], causes: ['压力过大', '准备不足', '价值观'], solutions: ['诚信教育', '充分准备', '正确价值观'] },
          { id: 'ep-10', name: '考后空虚', severity: 'low', description: '大考结束后失去目标感', symptoms: ['空虚', '迷茫', '放纵'], causes: ['目标缺失', '长期压力释放', '规划不足'], solutions: ['提前规划', '培养兴趣', '放松有度'] },
          { id: 'ep-11', name: '比较心理严重', severity: 'medium', description: '过度关注他人成绩', symptoms: ['焦虑', '自卑', '嫉妒'], causes: ['竞争环境', '自我价值感低', '社会比较'], solutions: ['关注自己', '成长思维', '多元价值'] },
          { id: 'ep-12', name: '考试恐惧症', severity: 'high', description: '对考试产生强烈恐惧', symptoms: ['逃避考试', '身体不适', '极度焦虑'], causes: ['失败经历', '期望压力', '完美主义'], solutions: ['心理咨询', '系统脱敏', '认知重构'] }
        ]
      },
      'lifelong-learning': {
        name: '终身学习',
        icon: '🌱',
        problems: [
          { id: 'll-1', name: '学习动力衰减', severity: 'high', description: '离开学校后学习动力下降', symptoms: ['不想学习', '安于现状', '得过且过'], causes: ['外部压力消失', '目标缺失', '舒适区'], solutions: ['找到内在动机', '设定目标', '建立习惯'] },
          { id: 'll-2', name: '知识更新焦虑', severity: 'high', description: '担心知识过时，需要持续学习', symptoms: ['持续学习压力', '知识焦虑', '学不完'], causes: ['技术迭代快', '终身学习要求', '比较心理'], solutions: ['学习元技能', '建立T型能力', '接受不完美'] },
          { id: 'll-3', name: '学习时间不足', severity: 'high', description: '工作后没有足够时间学习', symptoms: ['工作太忙', '时间不够', '精力不足'], causes: ['工作占用', '时间管理差', '优先级不清'], solutions: ['碎片学习', '时间块', '优先级管理'] },
          { id: 'll-4', name: '缺乏学习方向', severity: 'medium', description: '不知道学什么，盲目学习', symptoms: ['跟风学习', '学了很多没用', '方向迷茫'], causes: ['目标不明确', '职业规划不清', '信息过载'], solutions: ['职业规划', '需求导向', '少即是多'] },
          { id: 'll-5', name: '学习效果难评估', severity: 'medium', description: '不知道学习是否有用', symptoms: ['学了不知效果', '无法衡量', '动力下降'], causes: ['缺乏反馈', '目标模糊', '应用不足'], solutions: ['设定指标', '实践应用', '定期复盘'] },
          { id: 'll-6', name: '学习环境缺失', severity: 'medium', description: '没有学校那样的学习环境', symptoms: ['缺乏氛围', '没有同伴', '容易放弃'], causes: ['环境变化', '社交圈变化', '自律要求高'], solutions: ['加入学习社群', '寻找学习伙伴', '打造环境'] },
          { id: 'll-7', name: '学习资源选择困难', severity: 'medium', description: '面对海量资源不知如何选择', symptoms: ['选择困难', '资源囤积', '学不完'], causes: ['信息过载', 'FOMO心理', '缺乏筛选标准'], solutions: ['建立筛选标准', '少即是多', '专注优质资源'] },
          { id: 'll-8', name: '学习孤独感', severity: 'low', description: '独自学习缺乏陪伴和互动', symptoms: ['孤独', '缺乏交流', '动力不足'], causes: ['独自学习', '社交需求', '缺乏社群'], solutions: ['加入社群', '寻找伙伴', '线上线下结合'] },
          { id: 'll-9', name: '学习与应用脱节', severity: 'medium', description: '学习的内容无法应用到工作', symptoms: ['学了不用', '理论与实践脱节', '价值感低'], causes: ['内容不匹配', '缺乏实践', '应用机会少'], solutions: ['项目驱动', '问题导向', '创造应用'] },
          { id: 'll-10', name: '学习成本顾虑', severity: 'medium', description: '担心学习投入没有回报', symptoms: ['成本焦虑', 'ROI担忧', '不敢投入'], causes: ['经济压力', '不确定性', '风险厌恶'], solutions: ['免费资源', '低成本试错', '投资自己'] },
          { id: 'll-11', name: '年龄学习焦虑', severity: 'medium', description: '担心年龄大学习效果不好', symptoms: ['记忆力担忧', '学习能力怀疑', '起步晚'], causes: ['刻板印象', '社会偏见', '自我设限'], solutions: ['终身学习理念', '成长思维', '成功案例'] },
          { id: 'll-12', name: '学习疲劳综合征', severity: 'medium', description: '长期学习导致身心疲惫', symptoms: ['厌学', '效率下降', ' burnout'], causes: ['过度学习', '缺乏休息', '方法单一'], solutions: ['劳逸结合', '多元学习', '休息恢复'] }
        ]
      }
    },

    // ==================== 2. 职业发展领域 (5子类 × 13问题 = 65问题) ====================
    career: {
      'career-choice': {
        name: '职业选择',
        icon: '🎯',
        problems: [
          { id: 'cc-1', name: '专业不对口', severity: 'high', description: '所学专业与理想职业不匹配', symptoms: ['就业困难', '兴趣不符', '发展受限'], causes: ['高考选择盲目', '市场变化', '兴趣发现晚'], solutions: ['技能迁移', '跨界学习', '职业咨询'] },
          { id: 'cc-2', name: '职业迷茫', severity: 'high', description: '不清楚自己适合什么职业', symptoms: ['选择困难', '频繁跳槽', '缺乏方向'], causes: ['自我认知不足', '信息过载', '社会期待'], solutions: ['职业测评', '实习探索', '导师指导'] },
          { id: 'cc-3', name: '兴趣与职业冲突', severity: 'high', description: '感兴趣的工作不赚钱，赚钱的工作不感兴趣', symptoms: ['工作痛苦', '兴趣压抑', '经济压力'], causes: ['兴趣商业化困难', '市场供需', '理想化'], solutions: ['副业探索', '兴趣分级', '妥协平衡'] },
          { id: 'cc-4', name: '高薪vs成长 dilemma', severity: 'medium', description: '选择高薪但无成长，还是低薪但有成长', symptoms: ['纠结', '机会成本', '后悔'], causes: ['短期vs长期', '经济压力', '价值观'], solutions: ['明确优先级', '计算长期收益', '阶段性选择'] },
          { id: 'cc-5', name: '大公司vs小公司', severity: 'medium', description: '选择大平台还是小公司', symptoms: ['选择困难', '担心选错', '机会成本'], causes: ['价值观差异', '风险偏好', '职业阶段'], solutions: ['明确需求', '阶段匹配', '体验尝试'] },
          { id: 'cc-6', name: '热门行业诱惑', severity: 'medium', description: '跟风进入热门行业但未必适合', symptoms: ['盲目跟风', '竞争激烈', '不适合'], causes: ['社会比较', 'FOMO', '缺乏自我认知'], solutions: ['理性分析', '适合度评估', '长期视角'] },
          { id: 'cc-7', name: '父母期望冲突', severity: 'medium', description: '父母期望的职业与自己兴趣不符', symptoms: ['家庭矛盾', '自我压抑', '内疚感'], causes: ['代际差异', '价值观冲突', '经济依赖'], solutions: ['沟通协商', '经济独立', '证明能力'] },
          { id: 'cc-8', name: '职业信息不足', severity: 'medium', description: '对职业真实情况了解不够', symptoms: ['理想化', '入职后落差', '频繁跳槽'], causes: ['信息不对称', '缺乏调研', '美化想象'], solutions: ['职业访谈', '实习体验', '信息收集'] },
          { id: 'cc-9', name: '职业价值观不清', severity: 'medium', description: '不清楚自己在职业中最看重什么', symptoms: ['选择标准混乱', '后悔', '不满意'], causes: ['缺乏反思', '社会比较', '价值观未形成'], solutions: ['价值观澄清', '优先级排序', '试错探索'] },
          { id: 'cc-10', name: '害怕选择错误', severity: 'high', description: '担心选错职业路径', symptoms: ['选择 paralysis', '拖延', '焦虑'], causes: ['完美主义', '机会成本恐惧', '沉没成本'], solutions: ['接受不完美', '可逆性评估', '成长思维'] },
          { id: 'cc-11', name: '职业锚定过早', severity: 'medium', description: '过早确定职业方向，限制可能性', symptoms: ['路径依赖', '转型困难', '视野狭窄'], causes: ['过早专业化', '社会压力', '缺乏探索'], solutions: ['保持开放', 'T型发展', '定期复盘'] },
          { id: 'cc-12', name: '创业vs就业 dilemma', severity: 'medium', description: '选择创业还是稳定工作', symptoms: ['纠结', '风险恐惧', '机会成本'], causes: ['风险偏好', '资源评估', '价值观'], solutions: ['MVP验证', '副业试水', '理性评估'] },
          { id: 'cc-13', name: '地域选择困难', severity: 'medium', description: '选择一线城市还是家乡', symptoms: ['机会vs生活', '房价压力', '家庭距离'], causes: ['发展机会', '生活成本', '家庭因素'], solutions: ['明确优先级', '阶段性规划', '远程工作'] }
        ]
      },
      'workplace-adaptation': {
        name: '职场适应',
        icon: '🏢',
        problems: [
          { id: 'wa-1', name: '职场文化冲突', severity: 'high', description: '不适应公司文化和工作方式', symptoms: ['格格不入', '压力大', '想离职'], causes: ['价值观差异', '代际差异', '文化不匹配'], solutions: ['了解文化', '适应调整', '寻找匹配'] },
          { id: 'wa-2', name: '人际关系复杂', severity: 'high', description: '职场人际关系处理困难', symptoms: ['被孤立', '冲突', '压力大'], causes: ['社交技能不足', '办公室政治', '性格冲突'], solutions: ['情商提升', '边界建立', '专业主义'] },
          { id: 'wa-3', name: '工作节奏不适应', severity: 'medium', description: '无法适应工作强度和节奏', symptoms: ['疲惫', '效率低', '健康下降'], causes: ['体能不足', '时间管理差', '工作量大'], solutions: ['体能提升', '效率提升', '沟通协商'] },
          { id: 'wa-4', name: '角色转换困难', severity: 'medium', description: '从学生到职场人角色转换不顺', symptoms: ['依赖性强', '被动等待', '学生思维'], causes: ['角色认知', '独立性不足', '期望落差'], solutions: ['主动承担', '结果导向', '职业化'] },
          { id: 'wa-5', name: '反馈接受困难', severity: 'medium', description: '难以接受批评和负面反馈', symptoms: ['防御', '情绪低落', '抵触'], causes: ['完美主义', '自我认同', '成长思维缺失'], solutions: ['成长思维', '分离自我', '寻求反馈'] },
          { id: 'wa-6', name: '职场孤独感', severity: 'medium', description: '在职场感到孤独，没有朋友', symptoms: ['孤立', '缺乏支持', '归属感缺失'], causes: ['社交技能', '工作性质', '性格'], solutions: ['主动社交', '寻找同盟', '工作外社交'] },
          { id: 'wa-7', name: '权威适应困难', severity: 'medium', description: '难以与上级相处或接受管理', symptoms: ['冲突', '抵触', '职业发展受阻'], causes: ['独立性', '叛逆心理', '沟通方式'], solutions: ['理解角色', '有效沟通', '建立信任'] },
          { id: 'wa-8', name: '工作边界模糊', severity: 'medium', description: '工作与生活边界不清', symptoms: ['24小时待命', '私人时间被侵', '倦怠'], causes: ['职场文化', '自我边界', '技术便利'], solutions: ['设定边界', '沟通期望', '技术管理'] },
          { id: 'wa-9', name: '会议效率低下', severity: 'low', description: '大量时间浪费在低效会议上', symptoms: ['时间黑洞', '无效沟通', '疲惫'], causes: ['会议文化', '缺乏管理', '参与过多'], solutions: ['会议优化', '选择性参与', '效率提升'] },
          { id: 'wa-10', name: '邮件沟通焦虑', severity: 'low', description: '担心邮件措辞不当或回复不及时', symptoms: ['反复修改', '焦虑', '拖延'], causes: ['完美主义', '沟通技能', '期望管理'], solutions: ['模板建立', '清晰简洁', '设定规则'] },
          { id: 'wa-11', name: '远程工作适应', severity: 'medium', description: '不适应远程或混合工作模式', symptoms: ['效率低', '孤独', '沟通困难'], causes: ['自律不足', '环境不适', '工具不熟'], solutions: ['环境打造', '工具掌握', '自律提升'] },
          { id: 'wa-12', name: '跨文化适应', severity: 'medium', description: '在外企或跨国团队文化适应困难', symptoms: ['沟通障碍', '误解', '融入困难'], causes: ['文化差异', '语言障碍', '思维方式'], solutions: ['文化学习', '语言提升', '开放心态'] }
        ]
      },
      'career-growth': {
        name: '职业成长',
        icon: '📈',
        problems: [
          { id: 'cg-1', name: '晋升瓶颈', severity: 'high', description: '职业发展遇到天花板', symptoms: ['多年未晋升', '机会有限', '动力下降'], causes: ['结构限制', '能力瓶颈', ' visibility 不足'], solutions: ['能力提升', '曝光增加', '外部机会'] },
          { id: 'cg-2', name: '技能过时', severity: 'high', description: '技能跟不上行业发展', symptoms: ['竞争力下降', '焦虑', '转型困难'], causes: ['技术迭代', '学习停滞', '舒适区'], solutions: ['持续学习', '技能更新', '前瞻布局'] },
          { id: 'cg-3', name: '缺乏导师', severity: 'medium', description: '没有职业导师指导', symptoms: ['走弯路', '成长慢', '孤立无援'], causes: ['主动寻找不足', '公司文化', '人脉缺乏'], solutions: ['主动寻找', '内部 mentor', '外部 coach'] },
          { id: 'cg-4', name: 'visibility不足', severity: 'medium', description: '工作成果不被看见', symptoms: ['付出多回报少', '被忽视', '晋升慢'], causes: ['埋头苦干', '不擅展示', '性格内向'], solutions: ['成果展示', '主动汇报', '建立影响'] },
          { id: 'cg-5', name: '职业倦怠', severity: 'high', description: '对工作失去热情和动力', symptoms: ['疲惫', '冷漠', '想离职'], causes: ['长期高压', '缺乏意义', '回报不足'], solutions: ['休息调整', '意义寻找', '改变环境'] },
          { id: 'cg-6', name: '成长速度放缓', severity: 'medium', description: '感觉学不到新东西', symptoms: ['重复工作', '挑战不足', '停滞感'], causes: ['工作性质', '舒适区', '学习动力'], solutions: ['主动寻求挑战', '副业学习', '换环境'] },
          { id: 'cg-7', name: '横向发展困难', severity: 'medium', description: '想转岗但困难', symptoms: ['机会少', '经验不足', '被拒绝'], causes: ['专业化过深', '内部流动难', '技能不匹配'], solutions: ['技能补充', '内部项目', '外部机会'] },
          { id: 'cg-8', name: '管理能力不足', severity: 'medium', description: '技术转管理困难', symptoms: ['团队管理难', '角色不适', '业绩下滑'], causes: ['技能差异', '准备不足', '角色认知'], solutions: ['管理学习', '渐进过渡', '寻求支持'] },
          { id: 'cg-9', name: '行业衰退焦虑', severity: 'high', description: '担心所在行业衰退', symptoms: ['焦虑', '转型思考', '竞争力担忧'], causes: ['行业周期', '技术替代', '市场变化'], solutions: ['技能迁移', '前瞻布局', '多元化'] },
          { id: 'cg-10', name: '职业品牌缺失', severity: 'medium', description: '在行业内没有知名度和影响力', symptoms: ['机会少', '议价能力弱', '被动'], causes: ['埋头工作', '不擅营销', '曝光少'], solutions: ['内容输出', '行业参与', '个人品牌'] },
          { id: 'cg-11', name: '职业规划不清', severity: 'medium', description: '没有清晰的职业发展路径', symptoms: ['随波逐流', '机会主义', '缺乏方向'], causes: ['目标缺失', '短期思维', '环境变化'], solutions: ['长期规划', '里程碑设定', '定期复盘'] },
          { id: 'cg-12', name: '年龄歧视担忧', severity: 'medium', description: '担心年龄影响职业发展', symptoms: ['焦虑', '转型压力', '竞争力担忧'], causes: ['行业偏见', '体力下降', '成本考量'], solutions: ['经验优势', '持续学习', '价值证明'] },
          { id: 'cg-13', name: '缺乏成就感', severity: 'medium', description: '工作缺乏意义感和成就感', symptoms: ['空虚', '机械', '动力不足'], causes: ['工作性质', '意义缺失', '期望落差'], solutions: ['意义寻找', '工作重塑', '副业补充'] }
        ]
      },
      'work-life-balance': {
        name: '工作平衡',
        icon: '⚖️',
        problems: [
          { id: 'wb-1', name: '加班文化', severity: 'high', description: '被迫或主动长时间加班', symptoms: ['身心疲惫', '生活缺失', '健康下降'], causes: ['公司文化', '工作量', '效率低下'], solutions: ['效率提升', '边界设定', '文化改变'] },
          { id: 'wb-2', name: '工作倦怠', severity: 'high', description: '长期高压导致身心俱疲', symptoms: ['疲惫', '冷漠', '效率低'], causes: ['长期高压', '缺乏休息', '意义缺失'], solutions: ['休息调整', '寻求帮助', '环境改变'] },
          { id: 'wb-3', name: '随时待命压力', severity: 'high', description: '工作消息随时需要回复', symptoms: ['焦虑', '无法放松', '边界模糊'], causes: ['技术便利', '文化期望', '自我要求'], solutions: ['边界设定', '沟通期望', '技术管理'] },
          { id: 'wb-4', name: '假期羞耻', severity: 'medium', description: '不敢或不好意思请假', symptoms: ['假期浪费', '压力累积', '不敢休息'], causes: ['文化压力', '工作狂', '责任感过强'], solutions: ['权利意识', '合理规划', '榜样作用'] },
          { id: 'wb-5', name: '工作侵占生活', severity: 'high', description: '工作思维侵入私人时间', symptoms: ['无法放松', '关系受损', ' burnout'], causes: ['边界不清', '过度认同', '完美主义'], solutions: ['仪式切换', '爱好培养', '正念练习'] },
          { id: 'wb-6', name: '通勤时间长', severity: 'medium', description: '通勤占用大量时间精力', symptoms: ['疲惫', '时间浪费', '生活质量低'], causes: ['房价', '公司位置', '交通'], solutions: ['远程工作', '搬家', '时间利用'] },
          { id: 'wb-7', name: '家庭工作冲突', severity: 'high', description: '家庭责任与工作冲突', symptoms: ['内疚', '冲突', '两边不讨好'], causes: ['时间有限', '角色冲突', '期望管理'], solutions: ['优先级', '沟通协商', '寻求帮助'] },
          { id: 'wb-8', name: '健康被忽视', severity: 'high', description: '工作忙碌忽视健康', symptoms: ['亚健康', '慢性病', '体能下降'], causes: ['时间不足', '优先级低', '即时满足'], solutions: ['健康优先', '微运动', '预防保健'] },
          { id: 'wb-9', name: '兴趣被压抑', severity: 'medium', description: '没有时间发展个人兴趣', symptoms: ['生活单调', '创造力下降', '幸福感低'], causes: ['时间不足', '精力有限', '优先级'], solutions: ['时间块', '微爱好', '工作结合'] },
          { id: 'wb-10', name: '社交时间不足', severity: 'medium', description: '工作占用社交时间', symptoms: ['关系疏远', '孤独', '支持网络弱化'], causes: ['时间有限', '精力不足', '优先级'], solutions: ['质量时间', '工作社交结合', '高效社交'] },
          { id: 'wb-11', name: '睡眠质量差', severity: 'high', description: '工作影响睡眠', symptoms: ['失眠', '睡眠质量差', '白天疲惫'], causes: ['压力', '屏幕时间', '思虑'], solutions: ['睡眠卫生', '压力管理', '边界设定'] },
          { id: 'wb-12', name: '工作成瘾', severity: 'medium', description: '无法停止工作，工作成为身份全部', symptoms: ['身份单一', '关系受损', 'burnout'], causes: ['成就感', '逃避', '认同问题'], solutions: ['多元身份', '意义重构', '专业帮助'] }
        ]
      },
      'career-transition': {
        name: '职业转型',
        icon: '🔄',
        problems: [
          { id: 'ct-1', name: '转行困难', severity: 'high', description: '想转行但缺乏经验和技能', symptoms: ['投简历无回应', '面试被拒', '薪资下降'], causes: ['经验不足', '技能不匹配', '年龄'], solutions: ['技能补充', '项目经验', '渐进过渡'] },
          { id: 'ct-2', name: '转型焦虑', severity: 'high', description: '对转型结果不确定感到焦虑', symptoms: ['恐惧', '拖延', '自我怀疑'], causes: ['不确定性', '风险厌恶', '沉没成本'], solutions: ['MVP验证', '副业试水', '心理准备'] },
          { id: 'ct-3', name: '薪资下降担忧', severity: 'high', description: '担心转型后收入下降', symptoms: ['经济压力', '生活质量下降', '家庭矛盾'], causes: ['新领域起点低', '经验不足', '市场定价'], solutions: ['财务准备', '长期视角', '技能溢价'] },
          { id: 'ct-4', name: '年龄歧视', severity: 'high', description: '转型时遭遇年龄歧视', symptoms: ['机会少', '薪资低', '被拒绝'], causes: ['行业偏见', '成本考量', '体力要求'], solutions: ['经验优势', '技能证明', '网络利用'] },
          { id: 'ct-5', name: '技能迁移困难', severity: 'medium', description: '原技能难以迁移到新领域', symptoms: ['从零开始', '竞争力弱', '学习曲线陡峭'], causes: ['领域差异', '技能专用性', '认知偏差'], solutions: ['寻找 transferable skills', '补充学习', '组合优势'] },
          { id: 'ct-6', name: '网络重建', severity: 'medium', description: '需要在新领域建立人脉', symptoms: ['孤立', '机会少', '信息闭塞'], causes: ['领域转换', '网络清零', '时间不足'], solutions: ['主动社交', '行业活动', '内容输出'] },
          { id: 'ct-7', name: '身份认同危机', severity: 'medium', description: '失去原有职业身份认同', symptoms: ['迷茫', '自我怀疑', '价值感低'], causes: ['身份单一', '社会标签', '内在价值'], solutions: ['多元身份', '内在价值', '长期视角'] },
          { id: 'ct-8', name: '家庭压力', severity: 'medium', description: '家庭对转型的担忧和压力', symptoms: ['不支持', '经济担忧', '关系紧张'], causes: ['风险厌恶', '经济依赖', '期望冲突'], solutions: ['沟通协商', '财务准备', '渐进过渡'] },
          { id: 'ct-9', name: '转型时机选择', severity: 'medium', description: '不知道什么时候是转型最佳时机', symptoms: ['拖延', '错过机会', '后悔'], causes: ['时机判断', '风险权衡', '完美主义'], solutions: ['评估框架', '准备度检查', '接受不完美'] },
          { id: 'ct-10', name: '新领域适应', severity: 'medium', description: '进入新领域后的适应困难', symptoms: ['挫败感', '学习压力', '融入困难'], causes: ['知识差距', '文化差异', '期望落差'], solutions: ['学习心态', '寻求帮助', '耐心坚持'] },
          { id: 'ct-11', name: '回归困难', severity: 'low', description: '转型失败难以回到原领域', symptoms: ['退路切断', '后悔', '困境'], causes: ['领域变化', '技能退化', '市场变化'], solutions: ['保持联系', '技能维护', '风险评估'] },
          { id: 'ct-12', name: '转型资金压力', severity: 'high', description: '转型期间收入不稳定', symptoms: ['经济紧张', '储蓄消耗', '焦虑'], causes: ['收入中断', '学习成本', '市场适应期'], solutions: ['储备金', '副业过渡', '分期转型'] }
        ]
      }
    },

    // ==================== 3. 人际关系领域 (5子类 × 12问题 = 60问题) ====================
    relationship: {
      'family-relations': {
        name: '家庭关系',
        icon: '👨‍👩‍👧‍👦',
        problems: [
          { id: 'fr-1', name: '代际沟通障碍', severity: 'high', description: '与父母在价值观和生活方式上存在巨大差异', symptoms: ['争吵频繁', '无法沟通', '冷战'], causes: ['时代差异', '教育背景', '价值观冲突'], solutions: ['换位思考', '设立边界', '寻找共同点'] },
          { id: 'fr-2', name: '催婚压力', severity: 'high', description: '父母持续催促结婚，造成巨大心理压力', symptoms: ['焦虑', '逃避回家', '家庭冲突'], causes: ['传统观念', '社会期待', '父母焦虑'], solutions: ['坦诚沟通', '设立边界', '经济独立'] },
          { id: 'fr-3', name: '经济依赖困境', severity: 'high', description: '成年后仍依赖父母经济支持，缺乏独立性', symptoms: ['自主权缺失', '内疚感', '发展受限'], causes: ['高房价', '就业困难', '消费观念'], solutions: ['逐步独立', '理财规划', '降低欲望'] },
          { id: 'fr-4', name: '父母期望过重', severity: 'medium', description: '父母对学业、事业、婚姻的期望过高', symptoms: ['压力大', '自我怀疑', '讨好型人格'], causes: ['望子成龙', '社会比较', '未竟梦想'], solutions: ['自我认知', '沟通期望', '建立边界'] },
          { id: 'fr-5', name: '原生家庭影响', severity: 'high', description: '童年经历对现在人际关系和心理的负面影响', symptoms: ['信任困难', '亲密关系障碍', '自卑'], causes: ['童年创伤', '家庭模式', '依恋类型'], solutions: ['心理咨询', '自我觉察', '建立新经验'] },
          { id: 'fr-6', name: '兄弟姐妹竞争', severity: 'medium', description: '与兄弟姐妹间的比较和竞争关系', symptoms: ['嫉妒', '关系紧张', '父母偏爱感受'], causes: ['资源竞争', '父母比较', '个性差异'], solutions: ['欣赏差异', '独立发展', '减少比较'] },
          { id: 'fr-7', name: '赡养压力', severity: 'medium', description: '面对父母养老的责任和经济压力', symptoms: ['焦虑', '经济压力', '时间冲突'], causes: ['独生子女', '老龄化', '医疗成本'], solutions: ['提前规划', '保险配置', '家庭协商'] },
          { id: 'fr-8', name: '家庭边界模糊', severity: 'medium', description: '父母过度介入个人生活决策', symptoms: ['自主权缺失', '依赖', '冲突'], causes: ['文化习惯', '独立不足', '沟通不畅'], solutions: ['明确边界', '温和坚持', '经济独立'] },
          { id: 'fr-9', name: '离家独立困难', severity: 'medium', description: '无法或不敢离开家庭独立生活', symptoms: ['依赖', '恐惧', '发展受限'], causes: ['舒适区', '经济压力', '情感依赖'], solutions: ['渐进独立', '经济准备', '心理建设'] },
          { id: 'fr-10', name: '家庭角色冲突', severity: 'medium', description: '在家庭中承担的角色与个人发展冲突', symptoms: ['责任重', '自我牺牲', ' resentment'], causes: ['角色期待', '文化传统', '性别分工'], solutions: ['角色协商', '责任分担', '自我优先'] },
          { id: 'fr-11', name: '节日回家焦虑', severity: 'medium', description: '节假日回家面对亲戚盘问和压力', symptoms: ['焦虑', '逃避', '冲突'], causes: ['隐私侵犯', '社会比较', '期望压力'], solutions: ['提前准备', '设定边界', '缩短时间'] },
          { id: 'fr-12', name: '父母健康问题', severity: 'high', description: '父母生病带来的身心和经济压力', symptoms: ['焦虑', '时间压力', '经济负担'], causes: ['老龄化', '慢性病', '医疗成本'], solutions: ['健康管理', '保险规划', '寻求支持'] }
        ]
      },
      'friendship': {
        name: '友谊维系',
        icon: '👥',
        problems: [
          { id: 'fs-1', name: '朋友渐行渐远', severity: 'medium', description: '曾经亲密的朋友逐渐疏远', symptoms: ['联系减少', '话题减少', '见面尴尬'], causes: ['生活轨迹不同', '地理距离', '优先级变化'], solutions: ['主动维护', '接受变化', '珍惜当下'] },
          { id: 'fs-2', name: '交友困难', severity: 'high', description: '难以建立新的深厚友谊', symptoms: ['社交浅层', '孤独', '社交疲劳'], causes: ['社交技能', '信任困难', '时间有限'], solutions: ['共同兴趣', '深度交流', '质量优先'] },
          { id: 'fs-3', name: '社交焦虑', severity: 'high', description: '在社交场合感到紧张和不安', symptoms: ['回避社交', '过度担心', '表现不自然'], causes: ['自我评价低', '负面预期', '社交技能'], solutions: ['认知重构', '渐进暴露', '自我接纳'] },
          { id: 'fs-4', name: '塑料友谊', severity: 'medium', description: '表面友好但缺乏真诚的友谊', symptoms: ['感到虚假', '无法深入', '利用感'], causes: ['功利社交', '社交面具', '深度恐惧'], solutions: ['筛选朋友', '真诚表达', '深度投入'] },
          { id: 'fs-5', name: '朋友攀比', severity: 'medium', description: '与朋友间的相互比较和竞争', symptoms: ['嫉妒', '自卑', '关系紧张'], causes: ['社会比较', ' insecurity', '价值观'], solutions: ['欣赏他人', '专注自己', '重新定义成功'] },
          { id: 'fs-6', name: '借钱困扰', severity: 'medium', description: '朋友间借钱带来的尴尬和风险', symptoms: ['关系紧张', '钱财损失', '难以拒绝'], causes: ['边界不清', '面子文化', '经济困难'], solutions: ['明确原则', '量力而行', '书面约定'] },
          { id: 'fs-7', name: '被朋友背叛', severity: 'high', description: '信任的朋友做出伤害自己的事', symptoms: ['信任崩塌', '愤怒', '自我怀疑'], causes: ['识人不清', '边界不清', '利益冲突'], solutions: ['允许悲伤', '反思学习', '重建信任'] },
          { id: 'fs-8', name: '圈子融入困难', severity: 'medium', description: '难以融入已有的朋友圈子', symptoms: ['边缘感', '被排斥', '孤独'], causes: ['性格差异', '兴趣不同', '社交技能'], solutions: ['寻找契合圈', '展示价值', '耐心等待'] },
          { id: 'fs-9', name: '线上vs线下友谊', severity: 'low', description: '网络朋友与现实中友谊的冲突', symptoms: ['时间分配', '深度差异', '身份模糊'], causes: ['数字化生活', '地理分散', '社交方式变化'], solutions: ['平衡两者', '转化线下', '珍惜真实'] },
          { id: 'fs-10', name: '朋友数量焦虑', severity: 'low', description: '担心朋友太少或社交圈太小', symptoms: ['孤独感', '自我怀疑', '强迫社交'], causes: ['社会比较', 'FOMO', '对友谊误解'], solutions: ['质量优先', '重新定义', '自我接纳'] },
          { id: 'fs-11', name: '异性友谊困扰', severity: 'medium', description: '异性朋友间界限和误会问题', symptoms: ['暧昧困扰', '伴侣介意', '误会'], causes: ['界限不清', '社会偏见', '情感复杂'], solutions: ['明确界限', '坦诚沟通', '尊重伴侣'] },
          { id: 'fs-12', name: '朋友求助压力', severity: 'medium', description: '朋友频繁求助带来的负担', symptoms: ['疲惫', ' resentment', '难以拒绝'], causes: ['边界不清', '讨好型人格', '过度负责'], solutions: ['设定边界', '学会拒绝', '适度帮助'] }
        ]
      },
      'romantic-relationships': {
        name: '恋爱关系',
        icon: '💑',
        problems: [
          { id: 'rr-1', name: '脱单困难', severity: 'high', description: '难以找到合适的恋爱对象', symptoms: ['长期单身', '相亲失败', '社交圈窄'], causes: ['标准过高', '社交不足', '自我封闭'], solutions: ['扩大社交', '调整期望', '提升自我'] },
          { id: 'rr-2', name: '恋爱焦虑', severity: 'high', description: '恋爱中过度担心和不安', symptoms: ['查岗', '过度解读', '情绪不稳定'], causes: ['依恋焦虑', '自卑', '过往创伤'], solutions: ['建立信任', '自我成长', '开放沟通'] },
          { id: 'rr-3', name: '沟通不畅', severity: 'high', description: '情侣间难以有效沟通', symptoms: ['冷战', '争吵', '误解'], causes: ['沟通模式', '情绪管理', '表达方式'], solutions: ['非暴力沟通', '倾听技巧', '定期交流'] },
          { id: 'rr-4', name: '信任危机', severity: 'high', description: '恋爱中出现信任问题', symptoms: ['猜疑', '控制', '关系紧张'], causes: ['过往背叛', ' insecurity', '透明度不足'], solutions: ['重建信任', '开放透明', '专业帮助'] },
          { id: 'rr-5', name: '价值观冲突', severity: 'high', description: '核心观念和生活目标不一致', symptoms: ['频繁争吵', '未来规划分歧', '痛苦'], causes: ['背景差异', '成长不同', '婚前了解不足'], solutions: ['深度沟通', '寻找共识', '理性评估'] },
          { id: 'rr-6', name: '异地恋困扰', severity: 'high', description: '远距离恋爱带来的挑战', symptoms: ['思念', '不安全感', '沟通困难'], causes: ['地理距离', '时差', '缺乏陪伴'], solutions: ['定期见面', '高质量沟通', '共同目标'] },
          { id: 'rr-7', name: '前任阴影', severity: 'medium', description: '前任对现任关系的影响', symptoms: ['比较', '不信任', '情绪触发'], causes: ['未处理好', '创伤', ' insecurity'], solutions: ['彻底断联', '专注当下', '自我疗愈'] },
          { id: 'rr-8', name: '付出不平衡', severity: 'medium', description: '关系中付出与回报不对等', symptoms: [' resentment', '疲惫', '不公平感'], causes: ['付出型人格', '对方自私', '沟通不足'], solutions: ['沟通需求', '调整付出', '评估关系'] },
          { id: 'rr-9', name: '激情消退', severity: 'medium', description: '恋爱久了失去新鲜感和激情', symptoms: ['平淡', '倦怠', '吸引力下降'], causes: ['熟悉感', ' routine', '停止投入'], solutions: ['创造新鲜', '共同成长', '保持独立'] },
          { id: 'rr-10', name: '家庭反对', severity: 'high', description: '父母或家人反对恋情', symptoms: ['压力', '冲突', '两难'], causes: ['条件不符', '偏见', '保护过度'], solutions: ['沟通理解', '证明决心', '平衡两边'] },
          { id: 'rr-11', name: '经济压力', severity: 'medium', description: '恋爱带来的经济负担', symptoms: ['入不敷出', '比较消费', '焦虑'], causes: ['消费主义', '面子', '收入差距'], solutions: ['理性消费', '坦诚沟通', '量力而行'] },
          { id: 'rr-12', name: '分手恢复', severity: 'high', description: '分手后难以走出阴影', symptoms: ['抑郁', '纠缠', '自我否定'], causes: ['依恋断裂', '习惯改变', '自我认同'], solutions: ['允许悲伤', '断联', '重建自我'] }
        ]
      },
      'social-skills': {
        name: '社交能力',
        icon: '🗣️',
        problems: [
          { id: 'ss-1', name: '社交恐惧', severity: 'high', description: '对社交场合的强烈恐惧和回避', symptoms: ['回避社交', '身体症状', '极度焦虑'], causes: ['负面经历', '自我评价低', '遗传'], solutions: ['认知行为疗法', '渐进暴露', '专业帮助'] },
          { id: 'ss-2', name: '不会聊天', severity: 'medium', description: '与人交谈时找不到话题或冷场', symptoms: ['尴尬', '沉默', '回避'], causes: ['话题储备', '倾听不足', '焦虑'], solutions: ['提问技巧', '倾听训练', '话题积累'] },
          { id: 'ss-3', name: '边界设定困难', severity: 'medium', description: '难以说"不"，过度迁就他人', symptoms: ['疲惫', ' resentment', '被利用'], causes: ['讨好型人格', '冲突恐惧', '自我价值低'], solutions: ['练习拒绝', '明确边界', '自我尊重'] },
          { id: 'ss-4', name: '情商不足', severity: 'medium', description: '难以理解和处理自己及他人情绪', symptoms: ['误解', '冲突', '关系受损'], causes: ['觉察不足', '经验缺乏', '训练不够'], solutions: ['情绪觉察', '换位思考', '反馈学习'] },
          { id: 'ss-5', name: '社交疲劳', severity: 'medium', description: '社交后感到极度疲惫', symptoms: ['需要长时间恢复', '回避', '效率低'], causes: ['内向特质', '能量管理', '社交方式'], solutions: ['选择质量', '独处充电', '方式调整'] },
          { id: 'ss-6', name: '网络依赖', severity: 'medium', description: '过度依赖网络社交，现实社交退化', symptoms: ['现实 awkward', '深度缺失', '孤独感'], causes: ['便利性', '低压力', '习惯'], solutions: ['平衡线上线下', '逐步过渡', '现实练习'] },
          { id: 'ss-7', name: '冲突处理差', severity: 'medium', description: '面对冲突时不知所措或处理不当', symptoms: ['逃避', '激化', '关系破裂'], causes: ['冲突恐惧', '技能不足', '情绪管理'], solutions: ['冲突正常化', '非暴力沟通', '冷静技巧'] },
          { id: 'ss-8', name: '第一印象焦虑', severity: 'medium', description: '过度担心给他人留下的第一印象', symptoms: ['紧张', '表现不自然', '回避'], causes: ['完美主义', '评价恐惧', '自我中心'], solutions: ['关注他人', '真实自然', '长期视角'] },
          { id: 'ss-9', name: '群体融入困难', severity: 'medium', description: '在群体中感到格格不入', symptoms: ['边缘感', '沉默', '焦虑'], causes: ['兴趣差异', '社交技能', '自我封闭'], solutions: ['寻找共同点', '小群体开始', '展示价值'] },
          { id: 'ss-10', name: '过度迎合', severity: 'medium', description: '为了被喜欢而过度改变自己', symptoms: ['失去自我', '疲惫', '不真实'], causes: [' insecurity', '认可需求', '边界不清'], solutions: ['真实自我', '筛选关系', '内在认可'] },
          { id: 'ss-11', name: '社交比较', severity: 'medium', description: '在社交中过度与他人比较', symptoms: ['自卑', '嫉妒', '焦虑'], causes: ['社会比较', ' insecurity', '价值观'], solutions: ['关注自己', '欣赏他人', '重新定义'] },
          { id: 'ss-12', name: '结束对话困难', severity: 'low', description: '不知如何礼貌地结束对话或离开', symptoms: ['尴尬', '拖延', '不自在'], causes: ['担心冒犯', '技能不足', '社交焦虑'], solutions: ['准备话术', '自然过渡', '诚实表达'] }
        ]
      },
      'professional-network': {
        name: '职场人脉',
        icon: '🔗',
        problems: [
          { id: 'pn-1', name: '人脉焦虑', severity: 'high', description: '担心人脉资源不足影响发展', symptoms: ['强迫社交', '功利心态', '焦虑'], causes: ['社会认知', '竞争压力', '比较心理'], solutions: ['价值导向', '质量优先', '长期主义'] },
          { id: 'pn-2', name: '不会向上管理', severity: 'high', description: '难以与上级建立良好关系', symptoms: ['被忽视', '发展受限', '关系紧张'], causes: ['畏惧权威', '技能不足', ' visibility 低'], solutions: ['主动汇报', '理解需求', '建立信任'] },
          { id: 'pn-3', name: '同事关系处理', severity: 'medium', description: '与同事相处存在困难', symptoms: ['被孤立', '冲突', '办公室政治'], causes: ['竞争', '性格', '沟通'], solutions: ['专业主义', '边界设定', '合作共赢'] },
          { id: 'pn-4', name: '跨部门协作难', severity: 'medium', description: '与其他部门合作困难', symptoms: ['推诿', '效率低', '冲突'], causes: ['部门墙', '目标不同', '沟通不畅'], solutions: ['共同目标', '建立关系', '正式流程'] },
          { id: 'pn-5', name: '行业人脉匮乏', severity: 'medium', description: '在行业内缺乏人脉资源', symptoms: ['信息闭塞', '机会少', '孤立'], causes: ['埋头工作', '不擅社交', '行业封闭'], solutions: ['行业活动', '内容输出', '主动连接'] },
          { id: 'pn-6', name: '导师寻找困难', severity: 'medium', description: '难以找到合适的职业导师', symptoms: ['成长慢', '走弯路', '孤立'], causes: ['主动不足', '识别困难', '维护成本'], solutions: ['明确需求', '主动接触', '价值交换'] },
          { id: 'pn-7', name: '社交功利化', severity: 'medium', description: '人脉建设过于功利，缺乏真诚', symptoms: ['关系浅层', '被利用感', '疲惫'], causes: ['焦虑', '短视', '价值观'], solutions: ['真诚为先', '长期主义', '价值创造'] },
          { id: 'pn-8', name: '维护成本高', severity: 'medium', description: '维护人脉关系需要大量时间精力', symptoms: ['疲惫', '时间不够', '质量下降'], causes: ['人脉过多', '方式不当', '期望过高'], solutions: ['精选人脉', '高效维护', '自然互动'] },
          { id: 'pn-9', name: '求助困难', severity: 'medium', description: '难以向他人寻求帮助', symptoms: ['独自承担', '错失机会', '关系疏远'], causes: ['自尊', '怕欠人情', '不信任'], solutions: ['接受互助', '明确请求', '及时回报'] },
          { id: 'pn-10', name: '人脉变现焦虑', severity: 'medium', description: '担心人脉无法转化为实际价值', symptoms: ['功利计算', '焦虑', '关系工具化'], causes: ['短视', '焦虑', '错误认知'], solutions: ['长期视角', '价值创造', '自然发展'] },
          { id: 'pn-11', name: '离职后人脉流失', severity: 'low', description: '离开公司后原同事关系疏远', symptoms: ['人脉清零', '资源损失', '孤独'], causes: ['场景依赖', '维护不足', '地理分散'], solutions: ['主动维护', '个人品牌', '长期联系'] },
          { id: 'pn-12', name: '社交场合尴尬', severity: 'medium', description: '在职场社交场合感到不自在', symptoms: ['紧张', '说错话', '回避'], causes: ['经验不足', '焦虑', '技能缺乏'], solutions: ['提前准备', '练习', '关注他人'] }
        ]
      }
    },

    // ==================== 4. 心理健康领域 (5子类 × 12问题 = 60问题) ====================
    mental: {
      'emotional-management': {
        name: '情绪管理',
        icon: '🎭',
        problems: [
          { id: 'em-1', name: '情绪失控', severity: 'high', description: '情绪容易爆发，难以自我调节', symptoms: ['易怒', '情绪爆发', '后悔'], causes: ['压力累积', '情绪觉察不足', '应对技能缺乏'], solutions: ['情绪觉察', '暂停技巧', '压力管理'] },
          { id: 'em-2', name: '焦虑障碍', severity: 'high', description: '持续过度的担忧和紧张', symptoms: ['坐立不安', '睡眠问题', '注意力难集中'], causes: ['压力', '认知模式', '生理因素'], solutions: ['认知重构', '放松训练', '专业帮助'] },
          { id: 'em-3', name: '抑郁情绪', severity: 'high', description: '持续低落、失去兴趣和动力', symptoms: ['情绪低落', '兴趣丧失', '疲劳'], causes: ['压力', '认知模式', '生活事件'], solutions: ['行为激活', '认知调整', '专业治疗'] },
          { id: 'em-4', name: '情绪压抑', severity: 'medium', description: '习惯压抑情绪，不表达真实感受', symptoms: ['情感麻木', '身体不适', '突然爆发'], causes: ['成长环境', '表达许可', '冲突恐惧'], solutions: ['情绪表达', '安全环境', '逐步开放'] },
          { id: 'em-5', name: '情绪过山车', severity: 'medium', description: '情绪波动大，时高时低', symptoms: ['不稳定', '关系影响', '疲惫'], causes: ['生物因素', '压力', '调节能力不足'], solutions: ['规律生活', '情绪记录', '专业评估'] },
          { id: 'em-6', name: '空虚感', severity: 'medium', description: '内心空虚，缺乏意义感', symptoms: ['无聊', '迷茫', '无目标'], causes: ['意义缺失', '连接不足', '目标缺乏'], solutions: ['意义探索', '价值观澄清', '投入活动'] },
          { id: 'em-7', name: '情绪识别困难', severity: 'medium', description: '难以识别和命名自己的情绪', symptoms: ['情绪模糊', '应对不当', '困惑'], causes: ['情绪教育缺失', '压抑习惯', '觉察不足'], solutions: ['情绪词汇', '身体觉察', '日记记录'] },
          { id: 'em-8', name: '负面情绪沉溺', severity: 'medium', description: '容易陷入负面情绪无法自拔', symptoms: ['反刍', '悲观', '无力感'], causes: ['认知模式', '应对策略', '生物因素'], solutions: ['认知重构', '行为打断', '正念练习'] },
          { id: 'em-9', name: '情绪传染', severity: 'low', description: '容易被他人情绪影响', symptoms: ['情绪不稳定', '边界模糊', '疲惫'], causes: ['共情过强', '边界不清', '自我不稳定'], solutions: ['情绪边界', '自我稳定', '选择性共情'] },
          { id: 'em-10', name: '情绪表达不当', severity: 'medium', description: '表达方式伤害关系或自己', symptoms: ['冲突', '误解', '后悔'], causes: ['技能缺乏', '冲动', '模式学习'], solutions: ['非暴力沟通', '暂停技巧', '表达方式学习'] },
          { id: 'em-11', name: '积极情绪缺失', severity: 'medium', description: '难以体验和维持积极情绪', symptoms: ['快乐短暂', '麻木', '悲观'], causes: ['抑郁倾向', '关注负面', '生活方式'], solutions: ['感恩练习', '积极活动', '专业帮助'] },
          { id: 'em-12', name: '情绪依赖', severity: 'medium', description: '情绪过度依赖他人或外物', symptoms: ['不稳定', '关系压力', '成瘾'], causes: ['自我不稳定', '调节能力不足', '依恋问题'], solutions: ['自我安抚', '内在资源', '独立建设'] }
        ]
      },
      'self-cognition': {
        name: '自我认知',
        icon: '🔍',
        problems: [
          { id: 'sc-1', name: '自我认同危机', severity: 'high', description: '不清楚自己是谁，想要什么', symptoms: ['迷茫', '随波逐流', '空虚'], causes: ['探索不足', '社会压力', '快速变化'], solutions: ['自我探索', '价值观澄清', '尝试体验'] },
          { id: 'sc-2', name: '自卑感', severity: 'high', description: '持续感到自己不够好', symptoms: ['自我否定', '回避挑战', '过度补偿'], causes: ['成长经历', '社会比较', '完美主义'], solutions: ['自我接纳', '优势识别', '成就记录'] },
          { id: 'sc-3', name: '完美主义', severity: 'high', description: '对自己有过高不切实际的要求', symptoms: ['拖延', '焦虑', '自我批评'], causes: ['成长环境', '恐惧失败', '自我价值条件化'], solutions: ['足够好', '过程导向', '自我慈悲'] },
          { id: 'sc-4', name: '自我评价不稳', severity: 'medium', description: '自我价值感随外界评价波动', symptoms: ['情绪依赖评价', '不稳定', '讨好'], causes: ['内在价值未建立', '外部导向', '早期经验'], solutions: ['内在价值', '自我肯定', '减少比较'] },
          { id: 'sc-5', name: '身份困惑', severity: 'medium', description: '在不同角色间感到分裂和困惑', symptoms: ['角色冲突', '不真实', '疲惫'], causes: ['角色多', '期望不同', '整合不足'], solutions: ['角色整合', '核心自我', '边界设定'] },
          { id: 'sc-6', name: '优势盲区', severity: 'medium', description: '不清楚自己的优势和特长', symptoms: ['定位困难', '自信不足', '方向迷茫'], causes: ['关注负面', '缺乏反馈', '谦逊文化'], solutions: ['优势测评', '他人反馈', '成就分析'] },
          { id: 'sc-7', name: '自我设限', severity: 'medium', description: '给自己设定不必要的限制', symptoms: ['不敢尝试', '提前放弃', '借口多'], causes: ['恐惧失败', '固定思维', '过往经验'], solutions: ['成长思维', '小步尝试', '挑战信念'] },
          { id: 'sc-8', name: '真实自我迷失', severity: 'medium', description: '长期扮演角色，失去真实自我', symptoms: ['空虚', '不真实', '疲惫'], causes: ['社会期待', '认可需求', '早期适应'], solutions: ['自我探索', '真实表达', '减少扮演'] },
          { id: 'sc-9', name: '人生方向迷茫', severity: 'high', description: '不清楚人生的方向和目标', symptoms: ['无动力', '随波逐流', '焦虑'], causes: ['探索不足', '选择过多', '意义缺失'], solutions: ['价值观探索', '小步尝试', '接受不确定'] },
          { id: 'sc-10', name: '自我厌恶', severity: 'high', description: '对自己有强烈的负面情感', symptoms: ['自我攻击', '抑郁', '自伤'], causes: ['成长创伤', '内化批评', '完美主义'], solutions: ['自我慈悲', '认知重构', '专业帮助'] },
          { id: 'sc-11', name: '比较心理严重', severity: 'medium', description: '过度与他人比较，难以停止', symptoms: ['自卑', '焦虑', '不满足'], causes: ['社会文化', ' insecurity', '社交媒体'], solutions: ['关注自己', '感恩练习', '减少触发'] },
          { id: 'sc-12', name: '自我探索停滞', severity: 'medium', description: '停止对自我的探索和了解', symptoms: ['固化', '停滞', '不适应'], causes: ['舒适区', '忙碌', '恐惧发现'], solutions: ['持续反思', '新体验', '反馈寻求'] }
        ]
      },
      'stress-coping': {
        name: '压力应对',
        icon: '⚡',
        problems: [
          { id: 'sp-1', name: '慢性压力', severity: 'high', description: '长期处于高压状态，无法缓解', symptoms: ['疲惫', '免疫力下降', '情绪问题'], causes: ['工作文化', '完美主义', '不会放松'], solutions: ['压力管理', '生活方式', '边界设定'] },
          { id: 'sp-2', name: '不会放松', severity: 'medium', description: '难以真正放松和休息', symptoms: ['持续紧张', '休闲也焦虑', 'burnout'], causes: ['工作狂', '焦虑', '放松技能缺乏'], solutions: ['放松训练', '正念', '爱好培养'] },
          { id: 'sp-3', name: '逃避应对', severity: 'medium', description: '面对压力选择逃避而非解决', symptoms: ['拖延', '沉迷娱乐', '问题累积'], causes: ['恐惧', '应对技能缺乏', '短期缓解'], solutions: ['面对技巧', '分解问题', '支持寻求'] },
          { id: 'sp-4', name: '压力信号忽视', severity: 'medium', description: '忽视身体和心理的压力信号', symptoms: ['突然崩溃', '健康问题', '关系破裂'], causes: ['忽视', '忍耐文化', '优先级'], solutions: ['信号识别', '早期干预', '自我关怀'] },
          { id: 'sp-5', name: '应对方式单一', severity: 'medium', description: '只有一种或很少的应对方式', symptoms: ['效果递减', '僵化', '适应性差'], causes: ['学习局限', '习惯', '认知'], solutions: ['多元技能', '灵活应对', '学习新方式'] },
          { id: 'sp-6', name: '恢复力不足', severity: 'medium', description: '从挫折中恢复缓慢', symptoms: ['长期低落', '放弃', '习得性无助'], causes: ['支持不足', '认知模式', '过往经验'], solutions: ['韧性培养', '支持网络', '认知调整'] },
          { id: 'sp-7', name: '过度警觉', severity: 'medium', description: '对压力过度敏感，持续警觉', symptoms: ['焦虑', '睡眠问题', '紧张'], causes: ['创伤', '焦虑特质', '环境'], solutions: ['安全感建立', '放松训练', '专业帮助'] },
          { id: 'sp-8', name: '社会支持不足', severity: 'medium', description: '压力大时缺乏支持资源', symptoms: ['孤立', '独自承担', '崩溃'], causes: ['社交圈小', '求助困难', '关系浅'], solutions: ['建立支持', '学会求助', '维护关系'] },
          { id: 'sp-9', name: '工作狂倾向', severity: 'medium', description: '用工作逃避其他问题或情感', symptoms: ['失衡', '关系问题', '身份单一'], causes: ['逃避', '认可需求', '成瘾'], solutions: ['平衡生活', '意义探索', '多元身份'] },
          { id: 'sp-10', name: '压力传导', severity: 'medium', description: '将压力转嫁给他人', symptoms: ['关系紧张', '冲突', '内疚'], causes: ['应对不当', '情绪管理', '边界'], solutions: ['健康宣泄', '沟通技巧', '责任承担'] },
          { id: 'sp-11', name: '完美压力', severity: 'medium', description: '追求完美带来的持续压力', symptoms: ['焦虑', '拖延', '不满足'], causes: ['完美主义', '恐惧失败', '自我价值'], solutions: ['足够好', '过程导向', '自我接纳'] },
          { id: 'sp-12', name: '未来焦虑', severity: 'high', description: '对未来过度担忧和焦虑', symptoms: ['失眠', '计划过度', '行动瘫痪'], causes: ['不确定性', '控制需求', '负面预期'], solutions: ['专注当下', '接受不确定', '行动计划'] }
        ]
      },
      'psychological-resilience': {
        name: '心理韧性',
        icon: '🌱',
        problems: [
          { id: 'pr-1', name: '挫折耐受低', severity: 'high', description: '难以承受挫折和失败', symptoms: ['轻易放弃', '自我否定', '逃避'], causes: ['过度保护', '成功经历少', '认知模式'], solutions: ['逐步暴露', '认知重构', '小步成功'] },
          { id: 'pr-2', name: '复原缓慢', severity: 'medium', description: '遭遇困难后恢复时间过长', symptoms: ['长期低落', '停滞', '悲观'], causes: ['支持不足', '应对技能', '生物因素'], solutions: ['韧性训练', '支持寻求', '自我关怀'] },
          { id: 'pr-3', name: '习得性无助', severity: 'high', description: '认为努力无用，放弃尝试', symptoms: ['被动', '悲观', '不行动'], causes: ['重复失败', '控制感缺失', '归因方式'], solutions: ['小步成功', '控制感恢复', '认知调整'] },
          { id: 'pr-4', name: '过度敏感', severity: 'medium', description: '对批评和失败过度敏感', symptoms: ['防御', '回避', '情绪反应大'], causes: ['自尊不稳', '过往经历', '认知'], solutions: ['自我稳定', '认知重构', '暴露练习'] },
          { id: 'pr-5', name: '乐观偏差缺失', severity: 'medium', description: '难以看到事情的积极面', symptoms: ['悲观', '绝望', '放弃'], causes: ['认知偏差', '抑郁倾向', '环境'], solutions: ['认知重构', '感恩练习', '积极关注'] },
          { id: 'pr-6', name: '适应困难', severity: 'medium', description: '难以适应变化和新环境', symptoms: ['焦虑', '抗拒', '功能下降'], causes: ['变化恐惧', '灵活性不足', '支持缺乏'], solutions: ['渐进适应', '技能学习', '支持寻求'] },
          { id: 'pr-7', name: '意义感缺失', severity: 'high', description: '在困难中找不到意义和价值', symptoms: ['绝望', '放弃', '抑郁'], causes: ['意义框架缺失', '价值不清', '孤立'], solutions: ['意义探索', '价值澄清', '连接建立'] },
          { id: 'pr-8', name: '自我效能感低', severity: 'medium', description: '不相信自己有能力应对困难', symptoms: ['回避', '依赖', '提前放弃'], causes: ['失败经历', '比较', '反馈'], solutions: ['小步成功', '技能提升', '积极反馈'] },
          { id: 'pr-9', name: '情绪调节差', severity: 'medium', description: '困难时情绪失控或压抑', symptoms: ['爆发', '崩溃', '孤立'], causes: ['技能缺乏', '支持不足', '压力'], solutions: ['情绪技能', '支持网络', '预防策略'] },
          { id: 'pr-10', name: '问题解决弱', severity: 'medium', description: '面对问题缺乏解决策略', symptoms: ['逃避', '拖延', '问题累积'], causes: ['技能缺乏', '经验不足', '焦虑'], solutions: ['问题解决训练', '分解技巧', '寻求帮助'] },
          { id: 'pr-11', name: '社会支持弱', severity: 'medium', description: '困难时缺乏社会支持', symptoms: ['孤立', '独自承担', '恢复慢'], causes: ['关系浅', '求助困难', '社交技能'], solutions: ['关系建设', '学会求助', '社区参与'] },
          { id: 'pr-12', name: '成长思维缺失', severity: 'medium', description: '认为能力固定，难以成长', symptoms: ['回避挑战', '防御', '停滞'], causes: ['信念', '教育', '环境'], solutions: ['成长思维', '学习导向', '过程关注'] }
        ]
      },
      'mental-health-issues': {
        name: '心理问题',
        icon: '🏥',
        problems: [
          { id: 'mh-1', name: '抑郁症', severity: 'critical', description: '临床抑郁症，需要专业治疗', symptoms: ['持续低落', '兴趣丧失', '自杀念头'], causes: ['生物', '心理', '社会因素'], solutions: ['专业治疗', '药物', '心理疗法'] },
          { id: 'mh-2', name: '焦虑症', severity: 'critical', description: '临床焦虑症，影响日常生活', symptoms: ['过度担忧', '身体症状', '回避'], causes: ['生物', '认知', '环境'], solutions: ['专业治疗', 'CBT', '药物'] },
          { id: 'mh-3', name: '强迫症', severity: 'high', description: '强迫思维和行为', symptoms: ['强迫思维', '强迫行为', '痛苦'], causes: ['生物', '学习', '认知'], solutions: ['ERP疗法', '药物', '专业帮助'] },
          { id: 'mh-4', name: '创伤后应激', severity: 'critical', description: '创伤事件后的持续反应', symptoms: ['闪回', '回避', '过度警觉'], causes: ['创伤事件', '脆弱性', '支持'], solutions: ['EMDR', '专业治疗', '支持'] },
          { id: 'mh-5', name: '社交恐惧症', severity: 'high', description: '对社交场合的强烈恐惧', symptoms: ['回避社交', '极度焦虑', '功能受损'], causes: ['生物', '学习', '认知'], solutions: ['暴露疗法', 'CBT', '药物'] },
          { id: 'mh-6', name: '睡眠障碍', severity: 'high', description: '持续的睡眠问题', symptoms: ['失眠', '睡眠质量差', '日间功能'], causes: ['生物', '心理', '行为'], solutions: ['CBT-I', '睡眠卫生', '专业帮助'] },
          { id: 'mh-7', name: '进食障碍', severity: 'critical', description: '与食物和体重相关的障碍', symptoms: ['饮食异常', '体重 obsession', '身体形象'], causes: ['生物', '心理', '社会'], solutions: ['专业治疗', '营养咨询', '心理疗法'] },
          { id: 'mh-8', name: '物质依赖', severity: 'critical', description: '对酒精、药物或其他物质的依赖', symptoms: ['失控使用', '耐受', '戒断'], causes: ['生物', '心理', '社会'], solutions: ['戒断治疗', '支持团体', '心理疗法'] },
          { id: 'mh-9', name: '人格障碍', severity: 'critical', description: '持久的人格模式问题', symptoms: ['关系困难', '自我认同', '功能'], causes: ['发展', '生物', '环境'], solutions: ['长期治疗', 'DBT', '支持'] },
          { id: 'mh-10', name: '双相情感障碍', severity: 'critical', description: '情绪在抑郁和躁狂间波动', symptoms: ['情绪波动', '功能受损', '冲动'], causes: ['生物', '遗传'], solutions: ['药物治疗', '心理教育', '管理'] },
          { id: 'mh-11', name: '自杀念头', severity: 'critical', description: '有自杀的想法或计划', symptoms: ['绝望', '自杀念头', '计划'], causes: ['抑郁', '绝望', '冲动'], solutions: ['立即求助', '安全计划', '专业治疗'] },
          { id: 'mh-12', name: '病耻感', severity: 'medium', description: '因心理问题感到羞耻', symptoms: ['隐藏', '延迟求助', '自我贬低'], causes: ['社会偏见', '内化', '无知'], solutions: ['去污名化', '教育', '支持团体'] }
        ]
      }
    },

    // ==================== 5. 情感生活领域 (5子类 × 12问题 = 60问题) ====================
    emotion: {
      'love-psychology': {
        name: '恋爱心理',
        icon: '💖',
        problems: [
          { id: 'lp-1', name: '依恋焦虑', severity: 'high', description: '在恋爱中过度担心被抛弃', symptoms: ['过度黏人', '需要确认', '嫉妒'], causes: ['早期依恋', '过往创伤', ' insecurity'], solutions: ['安全依恋建设', '自我安抚', '沟通'] },
          { id: 'lp-2', name: '依恋回避', severity: 'high', description: '难以亲密，逃避承诺', symptoms: ['保持距离', '逃避深入', '忽冷忽热'], causes: ['早期依恋', '恐惧受伤', '独立过度'], solutions: ['渐进亲密', '信任建立', '自我探索'] },
          { id: 'lp-3', name: '恋爱成瘾', severity: 'high', description: '对恋爱关系过度依赖', symptoms: ['无法独处', '关系不断', '自我丧失'], causes: ['空虚', '依恋问题', '自我价值'], solutions: ['独立建设', '自我探索', '多元满足'] },
          { id: 'lp-4', name: '理想化伴侣', severity: 'medium', description: '对伴侣有不切实际的期待', symptoms: ['失望', '冲突', '更换频繁'], causes: ['浪漫幻想', '媒体影响', '经验不足'], solutions: ['现实期待', '接纳不完美', '成长思维'] },
          { id: 'lp-5', name: '恐惧承诺', severity: 'high', description: '害怕进入长期承诺关系', symptoms: ['逃避', '关系中断', '焦虑'], causes: ['自由恐惧', '过往创伤', '完美主义'], solutions: ['探索恐惧', '渐进承诺', '沟通'] },
          { id: 'lp-6', name: '恋爱比较', severity: 'medium', description: '拿现任与前任或他人比较', symptoms: ['不满', '关系受损', '不公平'], causes: ['理想化', ' insecurity', '未完结'], solutions: ['专注当下', '感恩', '完结过去'] },
          { id: 'lp-7', name: '过度独立', severity: 'medium', description: '在关系中过度保持独立', symptoms: ['疏离', '伴侣不满', '亲密不足'], causes: ['恐惧依赖', '过往经验', '自我认同'], solutions: ['允许依赖', '渐进亲密', '平衡'] },
          { id: 'lp-8', name: '拯救者情结', severity: 'medium', description: '总想拯救或改变伴侣', symptoms: ['疲惫', '关系失衡', ' resentment'], causes: ['价值感', '控制', '早期模式'], solutions: ['尊重边界', '专注自己', '平等关系'] },
          { id: 'lp-9', name: '被爱无能', severity: 'high', description: '难以接受和相信被爱', symptoms: ['怀疑', '推开', '自我否定'], causes: ['自我价值低', '过往创伤', '不配得感'], solutions: ['自我接纳', '允许被爱', '认知重构'] },
          { id: 'lp-10', name: '恋爱脑', severity: 'medium', description: '恋爱时失去理性判断', symptoms: ['忽视红旗', '自我牺牲', '盲目'], causes: ['浪漫化', '空虚', '经验'], solutions: ['保持理性', '朋友意见', '自我价值'] },
          { id: 'lp-11', name: '前任未完结', severity: 'medium', description: '上一段感情未处理好影响现在', symptoms: ['比较', '情感残留', '信任问题'], causes: ['未处理 grief', '快速开始', '逃避'], solutions: ['完结仪式', '时间', '专注现在'] },
          { id: 'lp-12', name: '恋爱节奏不一', severity: 'medium', description: '双方恋爱进度和投入不同', symptoms: ['压力', '不满', '冲突'], causes: ['依恋风格', '经验', '期望'], solutions: ['沟通期望', '调整节奏', '相互理解'] }
        ]
      },
      'intimacy-building': {
        name: '亲密关系',
        icon: '🔐',
        problems: [
          { id: 'ib-1', name: '亲密恐惧', severity: 'high', description: '害怕深度亲密和脆弱', symptoms: ['保持距离', '表面关系', '孤独'], causes: ['受伤恐惧', '羞耻', '早期经验'], solutions: ['渐进暴露', '安全环境', '自我接纳'] },
          { id: 'ib-2', name: '沟通障碍', severity: 'high', description: '难以进行深度情感沟通', symptoms: ['误解', '隔阂', '孤独感'], causes: ['技能缺乏', '恐惧', '模式'], solutions: ['学习沟通', '创造安全', '练习'] },
          { id: 'ib-3', name: '信任建立困难', severity: 'high', description: '难以建立深层信任', symptoms: ['猜疑', '控制', '测试'], causes: ['过往背叛', '依恋问题', '风险'], solutions: ['小步信任', '开放透明', '时间'] },
          { id: 'ib-4', name: '情感表达障碍', severity: 'medium', description: '难以表达爱意和情感', symptoms: ['伴侣不满', '误解', '距离'], causes: ['成长环境', '羞耻', '技能'], solutions: ['学习表达', '爱的语言', '练习'] },
          { id: 'ib-5', name: '冲突处理差', severity: 'high', description: '面对冲突时破坏关系', symptoms: ['升级', '冷战', '伤害'], causes: ['技能缺乏', '情绪管理', '模式'], solutions: ['冲突技能', '暂停', '修复'] },
          { id: 'ib-6', name: '边界不清', severity: 'medium', description: '关系中个人边界模糊', symptoms: ['自我丧失', ' resentment', '依赖'], causes: ['融合幻想', '独立不足', '沟通'], solutions: ['明确边界', '健康独立', '沟通'] },
          { id: 'ib-7', name: '激情维持难', severity: 'medium', description: '难以长期维持激情和吸引力', symptoms: ['平淡', '倦怠', '外遇风险'], causes: ['熟悉', '停止投入', ' routine'], solutions: ['持续投入', '新鲜感', '共同成长'] },
          { id: 'ib-8', name: '共同成长难', severity: 'medium', description: '双方成长不同步', symptoms: ['距离', '话题少', '不满'], causes: ['成长速度', '方向', '支持'], solutions: ['共同目标', '支持成长', '调整'] },
          { id: 'ib-9', name: '空间需求冲突', severity: 'medium', description: '对亲密和空间需求不同', symptoms: ['压力', '追逐-逃避', '冲突'], causes: ['依恋风格', '个性', '阶段'], solutions: ['协商平衡', '尊重需求', '质量时间'] },
          { id: 'ib-10', name: '脆弱展示难', severity: 'medium', description: '难以展示脆弱和不完美', symptoms: ['距离', '不真实', '压力'], causes: ['羞耻', '恐惧', '完美主义'], solutions: ['安全环境', '渐进暴露', '接纳'] },
          { id: 'ib-11', name: '承诺恐惧', severity: 'high', description: '害怕长期承诺', symptoms: ['逃避', '关系中断', '焦虑'], causes: ['自由恐惧', '完美主义', '创伤'], solutions: ['探索恐惧', '渐进承诺', '沟通'] },
          { id: 'ib-12', name: '修复能力弱', severity: 'medium', description: '关系受损后难以修复', symptoms: ['怨恨累积', '关系破裂', '冷战'], causes: ['技能缺乏', '骄傲', '模式'], solutions: ['道歉技能', '原谅', '修复练习'] }
        ]
      },
      'breakup-recovery': {
        name: '分手恢复',
        icon: '💔',
        problems: [
          { id: 'br-1', name: '分手抑郁', severity: 'high', description: '分手后陷入严重抑郁', symptoms: ['持续悲伤', '功能受损', '绝望'], causes: ['依恋断裂', '意义丧失', '孤独'], solutions: ['允许悲伤', '支持寻求', '专业帮助'] },
          { id: 'br-2', name: '无法放手', severity: 'high', description: '分手后难以放下前任', symptoms: ['纠缠', ' stalking', '幻想复合'], causes: ['未完结', '依恋', '替代缺失'], solutions: ['断联', '完结仪式', '新投入'] },
          { id: 'br-3', name: '自我否定', severity: 'high', description: '分手后严重自我否定', symptoms: ['我不值得', '自我攻击', '自卑'], causes: ['内化归因', '自尊受损', '孤独'], solutions: ['认知重构', '自我关怀', '支持'] },
          { id: 'br-4', name: '反弹关系', severity: 'medium', description: '用新关系逃避分手痛苦', symptoms: ['关系质量差', '比较', '未处理'], causes: ['逃避', '孤独', ' validation需要'], solutions: ['独处时间', '处理 grief', '谨慎开始'] },
          { id: 'br-5', name: '愤怒处理', severity: 'medium', description: '分手后愤怒难以处理', symptoms: ['报复', '怨恨', '情绪爆发'], causes: ['受伤', '不公感', '未表达'], solutions: ['健康宣泄', '原谅', '认知重构'] },
          { id: 'br-6', name: '社交圈损失', severity: 'medium', description: '失去共同朋友和社交圈', symptoms: ['孤立', '尴尬', '支持减少'], causes: ['共同朋友', '社交结构', '尴尬'], solutions: ['重建社交', '新活动', '保持联系'] },
          { id: 'br-7', name: '身份丧失', severity: 'medium', description: '失去"某人的伴侣"身份', symptoms: ['我是谁', '迷茫', '空虚'], causes: ['身份融合', '自我认同', '意义'], solutions: ['自我重建', '独立身份', '新角色'] },
          { id: 'br-8', name: '复合纠结', severity: 'medium', description: '纠结是否要复合', symptoms: ['反复', '痛苦', '停滞'], causes: ['未完结', '孤独', '理想化'], solutions: ['理性评估', '完结', '前进'] },
          { id: 'br-9', name: '信任崩塌', severity: 'high', description: '分手后难以再信任', symptoms: ['防备', '怀疑', '回避'], causes: ['背叛', '受伤', '恐惧'], solutions: ['时间', '小步信任', '自我疗愈'] },
          { id: 'br-10', name: '回忆困扰', severity: 'medium', description: '被回忆反复困扰', symptoms: ['闪回', '痛苦', '无法专注'], causes: ['记忆触发', '未处理', '习惯'], solutions: ['正念', '新记忆', '时间'] },
          { id: 'br-11', name: '后悔自责', severity: 'medium', description: '对关系中的行为后悔', symptoms: ['如果', '自责', '痛苦'], causes: ['反刍', '完美主义', '认知'], solutions: ['接受', '学习', '原谅自己'] },
          { id: 'br-12', name: '恢复缓慢', severity: 'medium', description: '恢复时间过长影响生活', symptoms: ['长期痛苦', '功能下降', '停滞'], causes: ['依恋深', '支持少', '未处理'], solutions: ['专业帮助', '积极活动', '社交'] }
        ]
      },
      'marriage-family': {
        name: '婚姻家庭',
        icon: '💒',
        problems: [
          { id: 'mf-1', name: '婚姻恐惧', severity: 'high', description: '对婚姻有强烈恐惧', symptoms: ['逃避', '焦虑', '拖延'], causes: ['离婚见证', '自由恐惧', '完美主义'], solutions: ['探索恐惧', '婚姻教育', '渐进'] },
          { id: 'mf-2', name: '婚后适应难', severity: 'high', description: '婚后生活适应困难', symptoms: ['冲突', '失望', '角色混乱'], causes: ['期望差异', '角色不清', '现实冲击'], solutions: ['沟通期望', '角色协商', '现实调整'] },
          { id: 'mf-3', name: '婆媳关系', severity: 'high', description: '与配偶父母关系困难', symptoms: ['冲突', '压力', '配偶为难'], causes: ['边界', '期望', '竞争'], solutions: ['边界设定', '配偶联盟', '沟通'] },
          { id: 'mf-4', name: '育儿分歧', severity: 'high', description: '在育儿理念上存在分歧', symptoms: ['争吵', '孩子困惑', '关系紧张'], causes: ['背景差异', '价值观', '压力'], solutions: ['统一理念', '沟通协商', '专业咨询'] },
          { id: 'mf-5', name: '经济压力', severity: 'high', description: '婚姻中的经济压力', symptoms: ['争吵', '焦虑', '限制'], causes: ['收入', '消费观', '期望'], solutions: ['财务规划', '沟通', '调整期望'] },
          { id: 'mf-6', name: '家务分配', severity: 'medium', description: '家务分工不均引发矛盾', symptoms: [' resentment', '疲惫', '不公平'], causes: ['传统观念', '沟通', '期望'], solutions: ['明确分工', '公平协商', '外包'] },
          { id: 'mf-7', name: '性生活不和谐', severity: 'high', description: '夫妻性生活存在问题', symptoms: ['不满', '回避', '关系疏远'], causes: ['沟通', '压力', '身体'], solutions: ['开放沟通', '专业帮助', '创造氛围'] },
          { id: 'mf-8', name: '激情消退', severity: 'medium', description: '婚后激情快速消退', symptoms: ['平淡', '外遇风险', '不满'], causes: [' routine', '停止投入', '熟悉'], solutions: ['持续投入', '新鲜感', '约会'] },
          { id: 'mf-9', name: '育儿压力', severity: 'high', description: '养育子女带来的压力', symptoms: ['疲惫', '关系紧张', '自我丧失'], causes: ['责任重', '支持少', '期望高'], solutions: ['分担', '支持寻求', '自我关怀'] },
          { id: 'mf-10', name: '空巢适应', severity: 'medium', description: '子女独立后夫妻适应', symptoms: ['失落', '关系问题', '空虚'], causes: ['角色丧失', '忽视关系', '准备不足'], solutions: ['关系重建', '新兴趣', '提前准备'] },
          { id: 'mf-11', name: '婚外情', severity: 'critical', description: '婚姻中一方或双方出轨', symptoms: ['背叛', '信任崩塌', '危机'], causes: ['关系问题', '机会', '个人'], solutions: ['专业帮助', '决定', '修复或结束'] },
          { id: 'mf-12', name: '离婚决策', severity: 'critical', description: '纠结是否要离婚', symptoms: ['痛苦', '纠结', '停滞'], causes: ['关系问题', '恐惧', '孩子'], solutions: ['专业咨询', '评估', '决定'] }
        ]
      },
      'single-life': {
        name: '单身生活',
        icon: '🧘',
        problems: [
          { id: 'sl-1', name: '单身焦虑', severity: 'high', description: '因单身状态感到焦虑', symptoms: ['急迫', '自我怀疑', '比较'], causes: ['社会压力', '年龄焦虑', '孤独'], solutions: ['自我接纳', '充实生活', '正确时机'] },
          { id: 'sl-2', name: '孤独感', severity: 'high', description: '单身带来的孤独感', symptoms: ['寂寞', '缺乏支持', '空虚'], causes: ['连接不足', '社交圈小', '独居'], solutions: ['建立连接', '社区', '宠物'] },
          { id: 'sl-3', name: '社会压力', severity: 'medium', description: '来自社会的单身压力', symptoms: ['被问', '异样眼光', '家庭压力'], causes: ['传统观念', '社会期待', '年龄'], solutions: ['坚定自我', '设定边界', '教育他人'] },
          { id: 'sl-4', name: '自我充实难', severity: 'medium', description: '难以独自充实生活', symptoms: ['无聊', '依赖他人', '空虚'], causes: ['习惯依赖', '兴趣少', '独处恐惧'], solutions: ['培养兴趣', '独处练习', '自我探索'] },
          { id: 'sl-5', name: '约会疲劳', severity: 'medium', description: '长期约会带来的疲惫', symptoms: ['厌倦', '失望', '机械'], causes: ['重复', '失败', '期望'], solutions: ['休息', '调整方式', '享受过程'] },
          { id: 'sl-6', name: '选择困难', severity: 'medium', description: '面对众多选择难以决定', symptoms: ['纠结', '后悔', 'FOMO'], causes: ['选择多', '完美主义', '恐惧'], solutions: ['明确标准', '足够好', '承诺'] },
          { id: 'sl-7', name: '安全感缺失', severity: 'medium', description: '单身缺乏安全感', symptoms: ['焦虑', '未来担忧', '脆弱'], causes: ['社会结构', '经济', '孤独'], solutions: ['经济独立', '支持网络', '自我强大'] },
          { id: 'sl-8', name: '节日孤独', severity: 'medium', description: '节假日感到格外孤独', symptoms: ['悲伤', '回避', '比较'], causes: ['社会强调', '对比', '传统'], solutions: ['创造传统', '朋友聚会', '自我庆祝'] },
          { id: 'sl-9', name: '生育焦虑', severity: 'high', description: '担心年龄影响生育', symptoms: ['急迫', '妥协', '焦虑'], causes: ['生物钟', '社会压力', '选择'], solutions: ['了解选择', '冻卵', '其他路径'] },
          { id: 'sl-10', name: '社交圈固化', severity: 'medium', description: '单身社交圈逐渐固化', symptoms: ['机会少', '同质化', '孤立'], causes: ['舒适区', '时间', '生活方式'], solutions: ['主动拓展', '新活动', '开放'] },
          { id: 'sl-11', name: '经济压力', severity: 'medium', description: '单身承担全部生活成本', symptoms: ['压力大', '储蓄难', '焦虑'], causes: ['收入', '成本', '责任'], solutions: ['理财规划', '提高收入', '简约生活'] },
          { id: 'sl-12', name: '享受单身难', severity: 'medium', description: '难以享受单身状态', symptoms: ['不满', '急迫', '比较'], causes: ['社会信息', '内在状态', '习惯'], solutions: ['正念', '感恩', '自我成长'] }
        ]
      }
    },

    // ==================== 6. 社会适应领域 (5子类 × 12问题 = 60问题) ====================
    social: {
      'independent-living': {
        name: '独立生活',
        icon: '🏠',
        problems: [
          { id: 'il-1', name: '生活技能缺乏', severity: 'high', description: '缺乏独立生活所需的基本技能', symptoms: ['不会做饭', '不会理财', '生活混乱'], causes: ['过度保护', '教育缺失', '依赖'], solutions: ['技能学习', '逐步实践', '资源利用'] },
          { id: 'il-2', name: '租房困难', severity: 'high', description: '租房过程中遇到的各种问题', symptoms: ['被坑', '纠纷', '不稳定'], causes: ['经验不足', '市场混乱', '信息不对称'], solutions: ['了解权益', '合同仔细', '正规渠道'] },
          { id: 'il-3', name: '生活成本高', severity: 'high', description: '独立生活经济压力大', symptoms: ['月光', '焦虑', '生活质量低'], causes: ['物价高', '收入低', '消费不当'], solutions: ['预算管理', '开源节流', '合租'] },
          { id: 'il-4', name: '家务管理', severity: 'medium', description: '难以管理日常家务', symptoms: ['环境乱', '疲惫', '拖延'], causes: ['习惯', '技能', '时间'], solutions: ['系统管理', '习惯养成', '工具'] },
          { id: 'il-5', name: '独居孤独', severity: 'medium', description: '独自居住感到孤独', symptoms: ['寂寞', '抑郁', '社交少'], causes: ['独居', '连接少', '习惯'], solutions: ['社区参与', '宠物', '定期社交'] },
          { id: 'il-6', name: '安全意识弱', severity: 'high', description: '独居安全意识不足', symptoms: ['风险', '事故', '受害'], causes: ['经验少', '意识弱', '技能缺'], solutions: ['安全学习', '预防措施', '警觉'] },
          { id: 'il-7', name: '健康管理', severity: 'medium', description: '难以独立管理健康', symptoms: ['亚健康', '忽视', '生病'], causes: ['意识', '知识', '习惯'], solutions: ['健康学习', '定期体检', '保险'] },
          { id: 'il-8', name: '维修应对', severity: 'medium', description: '面对维修问题不知所措', symptoms: ['被宰', '拖延', '生活不便'], causes: ['技能缺', '资源少', '经验'], solutions: ['基础技能', '可靠资源', '预防'] },
          { id: 'il-9', name: '社区融入', severity: 'medium', description: '难以融入居住社区', symptoms: ['孤立', '信息闭塞', '支持少'], causes: ['流动性', '社区弱', '主动少'], solutions: ['主动参与', '邻里关系', '社区活动'] },
          { id: 'il-10', name: '生活规划难', severity: 'medium', description: '难以规划长期独立生活', symptoms: ['迷茫', '不稳定', '焦虑'], causes: ['不确定性', '经验少', '目标缺'], solutions: ['规划学习', '灵活调整', '目标设定'] },
          { id: 'il-11', name: '紧急情况应对', severity: 'high', description: '面对紧急情况不知所措', symptoms: ['慌乱', '损失', '危险'], causes: ['准备不足', '经验少', '知识缺'], solutions: ['预案准备', '技能学习', '资源储备'] },
          { id: 'il-12', name: '生活品质追求', severity: 'low', description: '难以提升独立生活品质', symptoms: ['凑合', '不满', '动力低'], causes: ['经济', '知识', '时间'], solutions: ['渐进改善', '知识学习', '优先级'] }
        ]
      },
      'financial-management': {
        name: '财务管理',
        icon: '💰',
        problems: [
          { id: 'fm-1', name: '月光族', severity: 'high', description: '每月收入全部花光，无储蓄', symptoms: ['无存款', '焦虑', '抗风险弱'], causes: ['消费主义', '收入低', '规划差'], solutions: ['预算', '强制储蓄', '消费审视'] },
          { id: 'fm-2', name: '债务困扰', severity: 'critical', description: '背负各种债务难以偿还', symptoms: ['压力大', '信用受损', '生活质量低'], causes: ['过度消费', '投资失败', '紧急情况'], solutions: ['债务规划', '增收节支', '专业帮助'] },
          { id: 'fm-3', name: '投资知识缺乏', severity: 'medium', description: '不了解投资，资金闲置或盲目投资', symptoms: ['贬值', '被骗', '焦虑'], causes: ['教育缺失', '恐惧', '贪婪'], solutions: ['投资教育', '低风险开始', '长期视角'] },
          { id: 'fm-4', name: '消费冲动', severity: 'medium', description: '难以控制消费欲望', symptoms: ['超支', '后悔', '囤积'], causes: ['情绪消费', '营销', '即时满足'], solutions: ['冷静期', '需求审视', '预算'] },
          { id: 'fm-5', name: '理财规划缺失', severity: 'medium', description: '没有系统的理财规划', symptoms: ['目标难达', '焦虑', '机会错失'], causes: ['知识缺', '拖延', '复杂感'], solutions: ['目标设定', '规划学习', '专业咨询'] },
          { id: 'fm-6', name: '保险意识弱', severity: 'medium', description: '缺乏必要的保险保障', symptoms: ['风险暴露', '意外损失', '焦虑'], causes: ['知识缺', '侥幸心理', '成本'], solutions: ['保险教育', '基础配置', '风险评估'] },
          { id: 'fm-7', name: '养老准备不足', severity: 'medium', description: '没有为养老做准备', symptoms: ['焦虑', '未来担忧', '依赖'], causes: ['遥远感', '当下压力', '知识缺'], solutions: ['早期开始', '养老规划', '复利利用'] },
          { id: 'fm-8', name: '收入单一', severity: 'medium', description: '收入来源单一，风险高', symptoms: ['焦虑', '依赖', '被动'], causes: ['技能单一', '时间有限', '风险厌恶'], solutions: ['多元收入', '技能拓展', '副业'] },
          { id: 'fm-9', name: '财务知识缺乏', severity: 'medium', description: '缺乏基本财务知识', symptoms: ['决策差', '被骗', '焦虑'], causes: ['教育缺失', '复杂感', '回避'], solutions: ['财务教育', '基础学习', '专业咨询'] },
          { id: 'fm-10', name: '经济独立延迟', severity: 'medium', description: '难以实现经济完全独立', symptoms: ['依赖', '自主权缺', '压力'], causes: ['收入', '房价', '消费'], solutions: ['职业发展', '理财', '期望调整'] },
          { id: 'fm-11', name: '金钱观念冲突', severity: 'medium', description: '与伴侣或家人金钱观冲突', symptoms: ['争吵', '隐瞒', ' resentment'], causes: ['背景', '价值观', '沟通'], solutions: ['开放沟通', '共同目标', '妥协'] },
          { id: 'fm-12', name: '财务焦虑', severity: 'medium', description: '对财务状况持续焦虑', symptoms: ['担忧', '比较', '不安'], causes: ['不确定性', '比较', '安全感'], solutions: ['规划', '紧急基金', '认知调整'] }
        ]
      },
      'social-citizenship': {
        name: '社会公民',
        icon: '🏛️',
        problems: [
          { id: 'sc-1', name: '公民意识薄弱', severity: 'medium', description: '缺乏公民责任感和社会参与意识', symptoms: ['冷漠', '不参与', '抱怨'], causes: ['教育', '环境', '无力感'], solutions: ['公民教育', '参与体验', '责任感'] },
          { id: 'sc-2', name: '政治冷漠', severity: 'medium', description: '对政治和社会事务不关心', symptoms: ['不投票', '不关注', '无力感'], causes: ['复杂', '无力感', '距离感'], solutions: ['基础教育', '参与渠道', '影响体验'] },
          { id: 'sc-3', name: '法律意识不足', severity: 'high', description: '缺乏基本法律知识和意识', symptoms: ['权益受损', '违法风险', '被骗'], causes: ['教育缺失', '复杂', '距离感'], solutions: ['法律教育', '基础学习', '维权意识'] },
          { id: 'sc-4', name: '社区参与低', severity: 'medium', description: '不参与社区事务和活动', symptoms: ['孤立', '信息闭塞', '归属感弱'], causes: ['流动性', '时间', '意识'], solutions: ['参与体验', '社区建设', '志愿活动'] },
          { id: 'sc-5', name: '环保意识行动差', severity: 'medium', description: '环保意识强但行动不足', symptoms: ['知行不一', '内疚', '无力感'], causes: ['便利', '成本', '影响'], solutions: ['小步开始', '习惯养成', '影响他人'] },
          { id: 'sc-6', name: '公共礼仪缺失', severity: 'medium', description: '在公共场合行为不当', symptoms: ['冲突', '被反感', '不文明'], causes: ['教育', '习惯', '自我中心'], solutions: ['礼仪学习', '换位思考', '规则意识'] },
          { id: 'sc-7', name: '社会责任逃避', severity: 'medium', description: '逃避应尽的社会责任', symptoms: ['抱怨', '不参与', '依赖'], causes: ['自我中心', '无力感', '成本'], solutions: ['责任意识', '参与体验', '从小事做起'] },
          { id: 'sc-8', name: '信息辨别弱', severity: 'high', description: '难以辨别信息真伪', symptoms: ['传谣', '被骗', '偏见'], causes: ['批判思维缺', '信息过载', '确认偏误'], solutions: ['批判思维', '信息素养', '验证习惯'] },
          { id: 'sc-9', name: '公共事务参与难', severity: 'medium', description: '想参与但不知如何参与', symptoms: ['无力', '放弃', '冷漠'], causes: ['渠道少', '复杂', '时间'], solutions: ['了解渠道', '从小事起', '组织参与'] },
          { id: 'sc-10', name: '社会信任低', severity: 'medium', description: '对社会和他人信任度低', symptoms: ['防备', '孤立', ' cynicism'], causes: ['负面事件', '媒体', '经历'], solutions: ['积极体验', '批判思考', '小步信任'] },
          { id: 'sc-11', name: '代际理解差', severity: 'medium', description: '难以理解其他世代', symptoms: ['冲突', '偏见', '隔阂'], causes: ['时代差异', '缺乏交流', '刻板印象'], solutions: ['开放对话', '了解历史', '寻找共性'] },
          { id: 'sc-12', name: '文化认同困惑', severity: 'medium', description: '在全球化中文化认同困惑', symptoms: ['迷失', '冲突', '归属弱'], causes: ['文化冲击', '多元', '传统现代'], solutions: ['文化探索', '融合创新', '核心认同'] }
        ]
      },
      'digital-life': {
        name: '数字生活',
        icon: '📱',
        problems: [
          { id: 'dl-1', name: '手机成瘾', severity: 'high', description: '过度依赖手机，影响生活', symptoms: ['无法放下', '注意力分散', '睡眠问题'], causes: ['设计成瘾', '逃避', '习惯'], solutions: ['数字断舍离', '使用限制', '替代活动'] },
          { id: 'dl-2', name: '社交媒体焦虑', severity: 'high', description: '社交媒体使用带来的焦虑', symptoms: ['比较', 'FOMO', '自我怀疑'], causes: ['展示文化', '算法', '比较'], solutions: ['减少使用', '真实连接', '自我接纳'] },
          { id: 'dl-3', name: '信息茧房', severity: 'medium', description: '算法推荐导致信息单一', symptoms: ['偏见', '视野窄', '极端化'], causes: ['算法', '确认偏误', '便利'], solutions: ['主动探索', '多元信息', '批判思维'] },
          { id: 'dl-4', name: '网络暴力', severity: 'high', description: '遭受网络暴力或参与网络暴力', symptoms: ['伤害', '愤怒', '恐惧'], causes: ['匿名', '群体', '宣泄'], solutions: ['法律保护', '平台责任', '数字素养'] },
          { id: 'dl-5', name: '隐私保护弱', severity: 'high', description: '个人信息保护意识不足', symptoms: ['信息泄露', '骚扰', '风险'], causes: ['意识弱', '便利', '复杂'], solutions: ['隐私设置', '信息最小化', '安全意识'] },
          { id: 'dl-6', name: '数字鸿沟', severity: 'medium', description: '与数字技术脱节', symptoms: ['落后', '不便', '焦虑'], causes: ['学习慢', '更新快', '回避'], solutions: ['持续学习', '帮助寻求', '耐心'] },
          { id: 'dl-7', name: '网络依赖社交', severity: 'medium', description: '过度依赖网络社交', symptoms: ['现实社交退化', '孤独', ' superficial'], causes: ['便利', '低压力', '习惯'], solutions: ['平衡', '线下活动', '深度连接'] },
          { id: 'dl-8', name: '注意力碎片化', severity: 'high', description: '数字生活导致注意力分散', symptoms: ['专注难', '效率低', '浅层'], causes: ['通知', '多任务', '即时满足'], solutions: ['专注训练', '通知管理', '深度工作'] },
          { id: 'dl-9', name: '网络消费陷阱', severity: 'medium', description: '网络消费带来的问题', symptoms: ['过度消费', '冲动', '债务'], causes: ['便利', '营销', '即时满足'], solutions: ['冷静期', '预算', '意识'] },
          { id: 'dl-10', name: '数字身份管理', severity: 'medium', description: '难以管理网络身份和形象', symptoms: ['不一致', '压力', '虚假'], causes: ['多平台', '表演', '比较'], solutions: ['真实一致', '边界', '自我接纳'] },
          { id: 'dl-11', name: '网络诈骗', severity: 'high', description: '遭遇网络诈骗', symptoms: ['财产损失', '信任崩塌', '羞耻'], causes: ['骗术高', '贪婪', '信息泄露'], solutions: ['警惕', '验证', '教育'] },
          { id: 'dl-12', name: '工作与生活界限模糊', severity: 'high', description: '数字技术使工作侵入生活', symptoms: ['倦怠', '关系受损', '无法放松'], causes: ['技术', '文化', '自我边界'], solutions: ['边界设定', '技术管理', '仪式'] }
        ]
      },
      'life-meaning': {
        name: '生命意义',
        icon: '🌟',
        problems: [
          { id: 'lm-1', name: '存在空虚', severity: 'high', description: '感到生活缺乏意义和目的', symptoms: ['迷茫', '无动力', '抑郁'], causes: ['价值缺失', '连接不足', '目标缺'], solutions: ['意义探索', '价值澄清', '投入'] },
          { id: 'lm-2', name: '价值迷茫', severity: 'high', description: '不清楚自己的核心价值观', symptoms: ['选择困难', '后悔', '不满'], causes: ['反思少', '社会压力', '探索不足'], solutions: ['价值探索', '反思', '体验'] },
          { id: 'lm-3', name: '目标缺失', severity: 'high', description: '缺乏明确的人生目标', symptoms: ['随波逐流', '无动力', '空虚'], causes: ['探索少', '恐惧', '完美主义'], solutions: ['目标设定', '小步尝试', '灵活调整'] },
          { id: 'lm-4', name: '死亡焦虑', severity: 'medium', description: '对死亡和有限生命的焦虑', symptoms: ['恐惧', '存在焦虑', '急迫'], causes: ['意识', '失去', '未完成'], solutions: ['意义建设', '活在当下', ' legacy'] },
          { id: 'lm-5', name: '贡献感缺失', severity: 'medium', description: '感觉对社会没有贡献', symptoms: ['无价值', '自私', '空虚'], causes: ['参与少', '影响小', '比较'], solutions: ['志愿服务', '小贡献', '影响圈'] },
          { id: 'lm-6', name: '传承焦虑', severity: 'medium', description: '担心没有留下什么', symptoms: ['急迫', '焦虑', '比较'], causes: ['社会期待', ' legacy', '时间'], solutions: ['重新定义', '当下影响', '多元 legacy'] },
          { id: 'lm-7', name: '精神寄托缺失', severity: 'medium', description: '缺乏精神或信仰寄托', symptoms: ['空虚', '无根', '恐惧'], causes: ['世俗化', '传统断裂', '探索'], solutions: ['精神探索', '哲学', '自然'] },
          { id: 'lm-8', name: '工作意义感低', severity: 'medium', description: '工作缺乏意义感', symptoms: ['机械', '倦怠', '空虚'], causes: ['异化', '距离', '价值观'], solutions: ['工作重塑', '意义寻找', '改变'] },
          { id: 'lm-9', name: '消费主义空虚', severity: 'medium', description: '消费带来的短暂满足后空虚', symptoms: ['循环', '债务', '不满'], causes: ['营销', '填补空虚', '社会'], solutions: ['体验优先', '极简', '内在满足'] },
          { id: 'lm-10', name: '比较导致的无意义', severity: 'medium', description: '社会比较导致意义感丧失', symptoms: ['永远不够', '焦虑', '自我否定'], causes: ['社交媒体', '消费主义', '比较'], solutions: ['内在标准', '感恩', '自我接纳'] },
          { id: 'lm-11', name: '选择过多导致的迷茫', severity: 'medium', description: '选择太多反而不知道要什么', symptoms: [' paralysis', '后悔', '不满'], causes: ['自由', '信息', 'FOMO'], solutions: ['足够好', '承诺', '专注'] },
          { id: 'lm-12', name: '快节奏生活的迷失', severity: 'medium', description: '忙碌中失去方向和意义', symptoms: ['疲惫', '空虚', '自动导航'], causes: ['文化', '恐惧', '习惯'], solutions: ['慢下来', '反思', '优先级'] }
        ]
      }
    }
  },

  // ==================== 跨领域关系连接 ====================
  relationships: [
    // 领域间主要关联
    { source: 'learning', target: 'career', type: 'enables', strength: 0.9, description: '学习能力是职业发展的基础' },
    { source: 'career', target: 'mental', type: 'affects', strength: 0.85, description: '职业压力直接影响心理健康' },
    { source: 'relationship', target: 'mental', type: 'supports', strength: 0.9, description: '良好的人际关系是心理健康的重要支撑' },
    { source: 'emotion', target: 'mental', type: 'affects', strength: 0.88, description: '情感状态与心理健康密切相关' },
    { source: 'social', target: 'career', type: 'enables', strength: 0.75, description: '社会适应能力促进职业发展' },
    { source: 'learning', target: 'social', type: 'enables', strength: 0.7, description: '学习能力帮助社会适应' },
    { source: 'career', target: 'emotion', type: 'affects', strength: 0.72, description: '职业状态影响情感生活质量' },
    { source: 'mental', target: 'emotion', type: 'supports', strength: 0.85, description: '心理健康是情感健康的基础' },
    { source: 'relationship', target: 'career', type: 'enables', strength: 0.68, description: '人脉关系促进职业发展' },
    { source: 'social', target: 'relationship', type: 'enables', strength: 0.8, description: '社会适应能力影响人际关系' },
    { source: 'social', target: 'mental', type: 'affects', strength: 0.78, description: '社会适应压力影响心理健康' },
    { source: 'learning', target: 'mental', type: 'affects', strength: 0.65, description: '学习压力影响心理状态' },
    { source: 'emotion', target: 'relationship', type: 'affects', strength: 0.82, description: '情感状态影响人际关系' },
    { source: 'career', target: 'social', type: 'enables', strength: 0.7, description: '职业成功促进社会适应' }
  ],

  // ==================== 解决方案库 ====================
  solutions: {
    'learning-methods': [
      { name: '费曼学习法', description: '通过教授他人来检验理解', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '番茄工作法', description: '25分钟专注+5分钟休息', difficulty: 'easy', time: 'immediate', effect: 'medium' },
      { name: '间隔重复', description: '科学安排复习时间', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '主动回忆', description: '合上书尝试回忆内容', difficulty: 'easy', time: 'immediate', effect: 'high' },
      { name: '康奈尔笔记', description: '结构化笔记方法', difficulty: 'easy', time: 'immediate', effect: 'medium' }
    ],
    'career-development': [
      { name: '职业咨询', description: '寻求专业职业规划师帮助', difficulty: 'medium', time: '1-3 months', effect: 'high' },
      { name: '导师制度', description: '寻找行业导师指导', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '技能提升', description: '针对性学习所需技能', difficulty: 'hard', time: '3-12 months', effect: 'high' },
      { name: '项目经验', description: '通过项目积累实战经验', difficulty: 'medium', time: '1-6 months', effect: 'medium' },
      { name: '网络建设', description: '主动拓展职业人脉', difficulty: 'medium', time: 'ongoing', effect: 'medium' }
    ],
    'mental-health': [
      { name: '心理咨询', description: '寻求专业心理帮助', difficulty: 'easy', time: 'ongoing', effect: 'high' },
      { name: '正念冥想', description: '培养当下觉察能力', difficulty: 'easy', time: 'ongoing', effect: 'medium' },
      { name: '运动疗法', description: '通过运动改善心理状态', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '认知重构', description: '改变负面思维模式', difficulty: 'hard', time: '3-6 months', effect: 'high' },
      { name: '社交支持', description: '建立支持性社交网络', difficulty: 'medium', time: 'ongoing', effect: 'medium' }
    ],
    'relationship-building': [
      { name: '非暴力沟通', description: '学习表达需求和感受', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '边界设定', description: '建立健康的人际边界', difficulty: 'medium', time: '1-3 months', effect: 'high' },
      { name: '共情训练', description: '提升理解他人的能力', difficulty: 'hard', time: 'ongoing', effect: 'high' },
      { name: '冲突解决', description: '学习建设性处理冲突', difficulty: 'hard', time: '3-6 months', effect: 'high' },
      { name: '社交技能', description: '提升社交互动能力', difficulty: 'medium', time: 'ongoing', effect: 'medium' }
    ],
    'emotional-life': [
      { name: '依恋修复', description: '建立安全依恋模式', difficulty: 'hard', time: '6-12 months', effect: 'high' },
      { name: '情感表达', description: '学习健康表达情感', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '亲密关系', description: '培养深度亲密能力', difficulty: 'hard', time: 'ongoing', effect: 'high' },
      { name: '自我成长', description: '独立完整的自我建设', difficulty: 'hard', time: 'ongoing', effect: 'high' },
      { name: '沟通技巧', description: '提升情感沟通能力', difficulty: 'medium', time: 'ongoing', effect: 'medium' }
    ],
    'social-adaptation': [
      { name: '生活技能', description: '学习独立生活技能', difficulty: 'easy', time: '1-6 months', effect: 'medium' },
      { name: '财务规划', description: '建立健康的财务习惯', difficulty: 'medium', time: 'ongoing', effect: 'high' },
      { name: '数字素养', description: '提升数字时代适应能力', difficulty: 'medium', time: 'ongoing', effect: 'medium' },
      { name: '公民参与', description: '积极参与社会事务', difficulty: 'medium', time: 'ongoing', effect: 'medium' },
      { name: '意义探索', description: '寻找个人生命意义', difficulty: 'hard', time: 'ongoing', effect: 'high' }
    ]
  },

  // ==================== 反直觉真相（基于行为经济学、心理学、社会学研究）====================
  counterIntuitiveTruths: [
    {
      id: 'truth-1',
      title: '努力不一定有回报',
      subtitle: '过度努力可能导致边际效益递减',
      description: '心理学研究表明，当努力超过一定阈值后，额外的努力带来的收益会急剧下降，甚至产生负面效果。这被称为"努力悖论"。',
      evidence: '根据耶基斯-多德森定律，中等程度的动机水平最有利于任务完成，过高或过低的动机都会导致效率下降。',
      application: ['职业发展', '学习成长', '工作平衡'],
      insight: '学会"战略性懒惰"，把精力集中在高杠杆活动上，而不是盲目努力。',
      source: '行为经济学、动机心理学'
    },
    {
      id: 'truth-2',
      title: '选择越多越不幸福',
      subtitle: '选择悖论：更多选项导致决策困难和后悔',
      description: '心理学家巴里·施瓦茨的研究表明，过多的选择会导致决策瘫痪、更高的期望和更多的后悔，最终降低幸福感。',
      evidence: '在著名的"果酱实验"中，提供24种果酱的摊位比提供6种的摊位吸引更多人驻足，但购买率却只有后者的1/10。',
      application: ['职业选择', '消费决策', '人生规划'],
      insight: '学会"满足"而非"最大化"，接受"足够好"的选择，减少比较和后悔。',
      source: '选择悖论研究 (Barry Schwartz, 2004)'
    },
    {
      id: 'truth-3',
      title: '脆弱反而让人更强大',
      subtitle: '展示脆弱是建立深层连接的关键',
      description: '布琳·布朗的研究发现，敢于展示脆弱的人反而拥有更强的复原力和更真实的人际关系。脆弱不是软弱，而是勇气的表现。',
      evidence: '研究表明，压抑脆弱会导致羞耻感、焦虑和疏离感，而接纳脆弱能促进同理心、创造力和归属感。',
      application: ['人际关系', '心理健康', '情感生活'],
      insight: '允许自己不完美，向信任的人展示真实自我，这会让你获得意想不到的支持和力量。',
      source: '脆弱力量研究 (Brené Brown)'
    },
    {
      id: 'truth-4',
      title: '独处能力是幸福的基础',
      subtitle: '无法独处的人难以建立健康关系',
      description: '心理学家温尼科特提出，独处能力是一个人情感成熟的标志。能够享受独处的人，才能在关系中保持独立和真实。',
      evidence: '研究发现，过度依赖他人陪伴的人往往有较低的自我认同和较高的焦虑水平，容易陷入不健康的依赖关系。',
      application: ['情感生活', '心理健康', '人际关系'],
      insight: '培养独处能力，学会与自己相处，这是建立健康关系的前提。',
      source: '客体关系理论 (D.W. Winnicott)'
    },
    {
      id: 'truth-5',
      title: '追求幸福反而得不到幸福',
      subtitle: '幸福悖论：把幸福当目标会适得其反',
      description: '研究表明，把幸福作为直接追求目标的人反而更不快乐。幸福应该是其他有意义活动的副产品，而非直接目标。',
      evidence: '实验中，被要求"尽量快乐"的参与者观看喜剧时，比对照组体验到的快乐更少。过度关注幸福会让人对负面体验更敏感。',
      application: ['心理健康', '生活意义', '情绪管理'],
      insight: '专注于有意义的活动、人际关系和个人成长，幸福会自然随之而来。',
      source: '幸福悖论研究 (Iris Mauss)'
    },
    {
      id: 'truth-6',
      title: '失败是成功之母是谎言',
      subtitle: '失败本身不会带来成功，反思才会',
      description: '单纯的失败经历不会自动带来成长，关键在于如何从失败中学习。没有反思的失败只是重复错误。',
      evidence: '研究显示，经历过多次创业失败的人，再次创业的成功率并不会显著提高，除非他们真正从失败中吸取了教训。',
      application: ['职业发展', '学习成长', '心理韧性'],
      insight: '建立失败后的反思机制，记录教训、调整策略，而不是盲目坚持。',
      source: '失败学习研究 (Harvard Business Review)'
    },
    {
      id: 'truth-7',
      title: '社交媒体让我们更孤独',
      subtitle: '数字连接无法替代真实人际互动',
      description: '尽管社交媒体让我们"连接"更多人，但研究发现，过度使用社交媒体与孤独感、抑郁和焦虑呈正相关。',
      evidence: '一项针对青少年的长期研究显示，每天使用社交媒体超过2小时的青少年，心理健康状况明显差于使用较少的同龄人。',
      application: ['心理健康', '人际关系', '数字生活'],
      insight: '优先投资面对面的真实互动，社交媒体应该作为补充而非替代。',
      source: '数字心理健康研究 (Jean Twenge)'
    },
    {
      id: 'truth-8',
      title: '延迟满足能力并非天生',
      subtitle: '棉花糖实验的误解与真相',
      description: '著名的棉花糖实验被误解为"延迟满足能力决定未来成功"，但实际上，这种能力更多取决于环境稳定性和信任感，而非单纯的意志力。',
      evidence: '后续研究发现，来自不稳定环境的孩子更难以延迟满足，这不是意志力问题，而是理性适应——在不确定环境中，抓住眼前的利益是更优策略。',
      application: ['自我认知', '家庭教育', '社会适应'],
      insight: '不要自责缺乏意志力，建立稳定、可信赖的环境才是培养延迟满足能力的基础。',
      source: '棉花糖实验后续研究 (Celeste Kidd)'
    }
  ],

  // ==================== 使用边界理论 ====================
  boundaryTheory: {
    description: '使用边界理论帮助我们理解如何在不同生活领域之间建立健康的界限，实现平衡发展。',
    principles: [
      {
        id: 'boundary-1',
        name: '物理边界',
        description: '空间、时间和身体的界限',
        examples: ['工作与生活的时间分离', '个人空间的尊重', '身体自主权的维护'],
        importance: 'high',
        application: ['工作平衡', '人际关系', '独立生活']
      },
      {
        id: 'boundary-2',
        name: '情感边界',
        description: '区分自己和他人的情绪责任',
        examples: ['不为他人情绪负责', '允许他人失望', '拒绝情感勒索'],
        importance: 'high',
        application: ['心理健康', '人际关系', '情感生活']
      },
      {
        id: 'boundary-3',
        name: '认知边界',
        description: '思想、观点和价值观的独立性',
        examples: ['尊重不同观点', '不被他人评价定义', '保持独立思考'],
        importance: 'medium',
        application: ['自我认知', '社交能力', '职业成长']
      },
      {
        id: 'boundary-4',
        name: '数字边界',
        description: '在数字时代保护注意力和隐私',
        examples: ['设定手机使用时间', '保护个人信息', '数字断舍离'],
        importance: 'high',
        application: ['数字生活', '心理健康', '工作效率']
      },
      {
        id: 'boundary-5',
        name: '能量边界',
        description: '管理个人精力和社交能量',
        examples: ['学会说"不"', '识别能量吸血鬼', '独处充电'],
        importance: 'high',
        application: ['人际关系', '心理健康', '工作平衡']
      }
    ],
    strategies: [
      {
        name: '明确表达',
        description: '清晰、直接地表达边界，不模糊、不暗示',
        example: '"我需要晚上8点后不处理工作消息，这样我才能充分休息。"'
      },
      {
        name: '一致性维护',
        description: '言行一致地维护边界，不因为压力而妥协',
        example: '即使对方不高兴，也坚持已设定的界限。'
      },
      {
        name: '渐进调整',
        description: '根据实际情况灵活调整边界，不是一成不变',
        example: '特殊时期（如项目截止日）临时调整工作时间边界。'
      },
      {
        name: '自我关怀',
        description: '把边界设定视为自我关怀，而非自私',
        example: '告诉自己：设定边界是为了更好地照顾自己和他人。'
      }
    ]
  },

  // ==================== 人生杠杆解 ====================
  leverageSolutions: {
    description: '杠杆解是指通过最小的资源投入实现最大化人生价值回报的关键策略。',
    principles: [
      '找到系统中的关键节点，小改变带来大影响',
      '投资那些能产生复利效应的能力',
      '建立系统而非追求单次成功',
      '关注长期价值而非短期收益'
    ],
    solutions: [
      {
        id: 'leverage-1',
        name: '元技能培养',
        description: '学习如何学习、如何思考、如何决策',
        impact: '极高',
        effort: '中等',
        timeframe: '长期',
        application: ['学习成长', '职业发展', '终身学习']
      },
      {
        id: 'leverage-2',
        name: '建立系统而非目标',
        description: '关注过程系统的建立，而非单一目标的达成',
        impact: '高',
        effort: '中等',
        timeframe: '持续',
        application: ['习惯养成', '职业发展', '健康管理']
      },
      {
        id: 'leverage-3',
        name: '深度工作',
        description: '培养专注和深度思考的能力',
        impact: '极高',
        effort: '高',
        timeframe: '中期',
        application: ['职业发展', '学习成长', '创造力']
      },
      {
        id: 'leverage-4',
        name: '建立支持网络',
        description: '投资高质量的人际关系',
        impact: '高',
        effort: '中等',
        timeframe: '长期',
        application: ['人际关系', '职业发展', '心理健康']
      },
      {
        id: 'leverage-5',
        name: '财务自动化',
        description: '建立自动储蓄和投资系统',
        impact: '高',
        effort: '低',
        timeframe: '长期',
        application: ['财务管理', '独立生活', '未来规划']
      },
      {
        id: 'leverage-6',
        name: '健康基础',
        description: '睡眠、运动、饮食的基础习惯',
        impact: '极高',
        effort: '中等',
        timeframe: '持续',
        application: ['心理健康', '工作效率', '生活质量']
      }
    ]
  },

  // ==================== 统计数据 ====================
  statistics: {
    totalProblems: 365,
    byDomain: {
      learning: 60,
      career: 65,
      relationship: 60,
      mental: 60,
      emotion: 60,
      social: 60
    },
    bySeverity: {
      critical: 25,
      high: 120,
      medium: 150,
      low: 70
    },
    bySubcategory: {
      learning: 5,
      career: 5,
      relationship: 5,
      mental: 5,
      emotion: 5,
      social: 5
    },
    mostConnected: ['职业压力', '情绪管理', '人际关系', '自我认知', '学习焦虑'],
    crossDomainIssues: [
      { domains: ['career', 'mental'], issue: '职业倦怠', impact: 'high' },
      { domains: ['emotion', 'mental'], issue: '情感焦虑', impact: 'high' },
      { domains: ['relationship', 'career'], issue: '人脉焦虑', impact: 'medium' },
      { domains: ['learning', 'career'], issue: '技能焦虑', impact: 'high' },
      { domains: ['social', 'mental'], issue: '适应压力', impact: 'medium' },
      { domains: ['emotion', 'relationship'], issue: '亲密关系', impact: 'high' }
    ],
    updateDate: '2026-02-20',
    version: '2.0'
  },

  // ==================== 元数据 ====================
  metadata: {
    title: '00后人生问题知识图谱',
    description: '全面系统的00后人生问题分析与解决方案',
    version: '2.0',
    lastUpdated: '2026-02-20',
    author: 'AI Assistant',
    categories: ['学习成长', '职业发展', '人际关系', '心理健康', '情感生活', '社会适应'],
    targetAudience: '00后年轻人、心理咨询师、教育工作者、职业规划师',
    application: '个人成长、心理咨询、教育指导、职业规划'
  }
};

// ==================== 数据导出 ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ComprehensiveData;
}

// ==================== 数据验证函数 ====================
const DataValidator = {
  // 验证数据完整性
  validate() {
    const results = {
      valid: true,
      errors: [],
      stats: {}
    };

    // 验证中心节点
    if (!ComprehensiveData.center) {
      results.valid = false;
      results.errors.push('缺少中心节点');
    }

    // 验证领域
    if (!ComprehensiveData.domains || ComprehensiveData.domains.length !== 6) {
      results.valid = false;
      results.errors.push('领域数量不正确');
    }

    // 验证问题节点
    let totalProblems = 0;
    for (const domain of ComprehensiveData.domains) {
      const domainData = ComprehensiveData.knowledgeNodes[domain.id];
      if (!domainData) {
        results.valid = false;
        results.errors.push(`缺少领域数据: ${domain.id}`);
        continue;
      }

      const subcategories = Object.keys(domainData);
      if (subcategories.length < 5) {
        results.valid = false;
        results.errors.push(`${domain.name} 子类别不足5个`);
      }

      for (const subKey of subcategories) {
        const subData = domainData[subKey];
        if (!subData.problems || subData.problems.length < 10) {
          results.valid = false;
          results.errors.push(`${domain.name}-${subData.name} 问题不足10个`);
        } else {
          totalProblems += subData.problems.length;
        }
      }
    }

    results.stats.totalProblems = totalProblems;
    results.stats.totalDomains = ComprehensiveData.domains.length;
    results.stats.totalSubcategories = ComprehensiveData.domains.length * 5;

    return results;
  },

  // 获取统计信息
  getStats() {
    return {
      ...ComprehensiveData.statistics,
      validation: this.validate()
    };
  }
};

// 自动验证
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const validation = DataValidator.validate();
    console.log('📊 数据验证结果:', validation.valid ? '✅ 通过' : '❌ 失败');
    console.log('📈 统计信息:', DataValidator.getStats());
  });
}
