// ==================== 00后人生问题知识图谱 - 数据扩展包 ====================
// 版本: 3.0 扩展版
// 包含：更多问题节点、实际案例、连接关系、行业数据

const DataExtensions = {
  // ==================== 1. 扩展的问题节点 ====================
  
  // 学习成长领域 - 新增3个子类别
  learning_extended: {
    'digital-literacy': {
      name: '数字素养',
      icon: '💻',
      problems: [
        { id: 'dl-1', name: '信息过载', severity: 'high', description: '每天接收大量信息，难以筛选和处理', symptoms: ['信息焦虑', '注意力分散', '决策困难'], causes: ['算法推荐', 'FOMO心理', '缺乏筛选能力'], solutions: ['信息节食', '建立筛选标准', '定期数字排毒'] },
        { id: 'dl-2', name: '虚假信息辨别困难', severity: 'high', description: '难以识别网络上的虚假信息和谣言', symptoms: ['轻信谣言', '传播错误信息', '被误导'], causes: ['媒体素养不足', '批判思维缺乏', '信息源单一'], solutions: ['事实核查', '多元信息源', '批判思维训练'] },
        { id: 'dl-3', name: '网络沉迷', severity: 'high', description: '过度沉迷网络娱乐和社交媒体', symptoms: ['时间失控', '现实社交减少', '作息紊乱'], causes: ['即时满足', '逃避现实', '缺乏自控'], solutions: ['使用时间限制', '寻找替代活动', '建立线下兴趣'] },
        { id: 'dl-4', name: '隐私保护意识弱', severity: 'medium', description: '对个人隐私保护不够重视', symptoms: ['信息泄露', '被骚扰', '安全隐患'], causes: ['意识不足', '便利优先', '知识缺乏'], solutions: ['隐私设置', '最小化信息分享', '安全意识教育'] },
        { id: 'dl-5', name: '数字鸿沟', severity: 'medium', description: '与数字原生代的技能差距', symptoms: ['跟不上技术', '工作效率低', '焦虑'], causes: ['学习慢', '技术更新快', '缺乏培训'], solutions: ['持续学习', '寻求帮助', '专注核心技能'] },
        { id: 'dl-6', name: '网络礼仪缺失', severity: 'low', description: '在网络交流中缺乏基本礼仪', symptoms: ['冲突', '被排斥', '误解'], causes: ['匿名性', '缺乏规范', '自我中心'], solutions: ['网络礼仪学习', '换位思考', '文明上网'] },
        { id: 'dl-7', name: '算法依赖', severity: 'medium', description: '过度依赖算法推荐，失去主动探索', symptoms: ['信息茧房', '视野狭窄', '思维固化'], causes: ['推荐算法', '惰性', '缺乏好奇心'], solutions: ['主动搜索', '跨领域阅读', '保持好奇'] },
        { id: 'dl-8', name: '数字身份管理', severity: 'low', description: '难以管理多个平台的数字身份', symptoms: ['形象不一致', '隐私风险', '维护困难'], causes: ['平台多', '身份复杂', '时间成本'], solutions: ['统一形象', '定期清理', '专注核心平台'] }
      ]
    },
    'creative-thinking': {
      name: '创新思维',
      icon: '🎨',
      problems: [
        { id: 'ct-1', name: '思维固化', severity: 'high', description: '思维模式僵化，难以跳出框架思考', symptoms: ['缺乏创意', '解决问题单一', '抗拒新方法'], causes: ['教育模式', '舒适区', '缺乏训练'], solutions: ['思维导图', '头脑风暴', '跨界学习'] },
        { id: 'ct-2', name: '批判性思维不足', severity: 'high', description: '缺乏独立思考和质疑能力', symptoms: ['盲从权威', '缺乏主见', '容易被说服'], causes: ['应试教育', '缺乏训练', '思维懒惰'], solutions: ['苏格拉底提问', '逻辑训练', '辩论练习'] },
        { id: 'ct-3', name: '创造力枯竭', severity: 'medium', description: '感觉没有创意，无法产生新想法', symptoms: ['创意贫乏', '工作平庸', '缺乏激情'], causes: ['压力', '环境限制', '输入不足'], solutions: ['创意训练', '环境改变', '多元输入'] },
        { id: 'ct-4', name: '问题解决能力弱', severity: 'high', description: '面对复杂问题时无从下手', symptoms: ['逃避问题', '解决表面', '重复犯错'], causes: ['方法缺乏', '经验不足', '系统思维弱'], solutions: ['问题分解', '系统思考', '案例学习'] },
        { id: 'ct-5', name: '创新恐惧', severity: 'medium', description: '害怕尝试新方法和新思路', symptoms: ['保守', '拒绝改变', '错失机会'], causes: ['失败恐惧', '风险厌恶', '完美主义'], solutions: ['小步试错', '接受失败', '成长思维'] },
        { id: 'ct-6', name: '跨界思维缺乏', severity: 'medium', description: '难以将不同领域的知识结合', symptoms: ['知识孤岛', '创新困难', '视野狭窄'], causes: ['专业化', '学科壁垒', '缺乏连接'], solutions: ['跨学科学习', '寻找模式', '知识图谱'] },
        { id: 'ct-7', name: '逆向思维不足', severity: 'low', description: '不善于从反面思考问题', symptoms: ['思维单向', '考虑不周', '错过机会'], causes: ['习惯', '教育', '思维定式'], solutions: ['反向思考练习', '假设检验', '多角度分析'] },
        { id: 'ct-8', name: '设计思维缺失', severity: 'medium', description: '缺乏以用户为中心的设计思维', symptoms: ['产品不受欢迎', '需求理解偏差', '迭代困难'], causes: ['技术导向', '用户研究不足', '缺乏方法'], solutions: ['设计思维学习', '用户调研', '原型测试'] }
      ]
    },
    'learning-ecosystem': {
      name: '学习生态',
      icon: '🌿',
      problems: [
        { id: 'le-1', name: '学习环境不佳', severity: 'medium', description: '缺乏良好的物理和心理学习环境', symptoms: ['容易分心', '效率低', '压力大'], causes: ['空间不适', '干扰多', '氛围差'], solutions: ['打造学习空间', '减少干扰', '寻找学习伙伴'] },
        { id: 'le-2', name: '学习社区缺失', severity: 'medium', description: '缺乏学习共同体和交流平台', symptoms: ['孤独学习', '问题无人讨论', '动力不足'], causes: ['社交圈小', '平台缺乏', '主动性差'], solutions: ['加入学习群', '参加线下活动', '建立学习小组'] },
        { id: 'le-3', name: '知识付费陷阱', severity: 'medium', description: '购买大量课程但学不完', symptoms: ['课程囤积', '学完率低', '经济压力'], causes: ['焦虑营销', 'FOMO', '缺乏规划'], solutions: ['按需购买', '学完再买', '质量优先'] },
        { id: 'le-4', name: '导师寻找困难', severity: 'high', description: '难以找到合适的学习导师', symptoms: ['走弯路', '成长慢', '困惑多'], causes: ['资源少', '识别难', '维护成本'], solutions: ['主动寻找', '多导师策略', '线上平台'] },
        { id: 'le-5', name: '学习反馈不足', severity: 'medium', description: '学习过程中缺乏及时反馈', symptoms: ['不知对错', '进步慢', '动力下降'], causes: ['独自学习', '缺乏测评', '反馈延迟'], solutions: ['寻找同伴', '参加测试', '项目实践'] },
        { id: 'le-6', name: '学习资源分散', severity: 'medium', description: '学习资源分散在各平台，难以整合', symptoms: ['管理困难', '重复学习', '遗漏'], causes: ['平台多', '格式不一', '缺乏系统'], solutions: ['统一平台', '知识管理工具', '定期整理'] },
        { id: 'le-7', name: '学习仪式感缺失', severity: 'low', description: '缺乏学习前的准备和仪式感', symptoms: ['难以开始', '状态不稳', '效率波动'], causes: ['习惯不良', '环境混乱', '心理准备不足'], solutions: ['建立仪式', '固定时间', '环境整理'] },
        { id: 'le-8', name: '终身学习动力不足', severity: 'high', description: '离开学校后缺乏持续学习的动力', symptoms: ['停止学习', '知识老化', '竞争力下降'], causes: ['目标缺失', '压力消失', '舒适区'], solutions: ['设定目标', '找到兴趣', '建立习惯'] }
      ]
    }
  },

  // 职业发展领域 - 新增3个子类别
  career_extended: {
    'side-hustle': {
      name: '副业探索',
      icon: '🚀',
      problems: [
        { id: 'sh-1', name: '副业选择困难', severity: 'high', description: '不知道选择什么副业方向', symptoms: ['盲目跟风', '尝试多失败多', '时间浪费'], causes: ['不了解自己', '市场研究不足', '急于求成'], solutions: ['优势分析', '市场调研', '小步试错'] },
        { id: 'sh-2', name: '主业副业平衡', severity: 'high', description: '难以平衡主业和副业的时间精力', symptoms: ['主业受影响', '副业做不起来', '身心疲惫'], causes: ['时间有限', '精力不足', '边界不清'], solutions: ['时间块管理', '优先级排序', '阶段聚焦'] },
        { id: 'sh-3', name: '副业变现困难', severity: 'high', description: '副业难以产生实际收入', symptoms: ['投入多回报少', '坚持困难', '放弃'], causes: ['商业模式不清', '市场验证不足', '推广困难'], solutions: ['MVP验证', '找到付费用户', '持续迭代'] },
        { id: 'sh-4', name: '副业法律风险', severity: 'medium', description: '副业可能涉及法律或合同风险', symptoms: ['合同纠纷', '竞业限制', '税务问题'], causes: ['法律意识弱', '合同审查不严', '合规不足'], solutions: ['法律咨询', '合同审查', '合规经营'] },
        { id: 'sh-5', name: '副业技能不足', severity: 'medium', description: '副业所需技能与主业差异大', symptoms: ['学习曲线陡峭', '质量不高', '竞争力弱'], causes: ['技能差距', '时间有限', '培训不足'], solutions: ['技能补充', '合作外包', '聚焦优势'] },
        { id: 'sh-6', name: '副业心态问题', severity: 'medium', description: '对副业抱有不切实际的期望', symptoms: ['急功近利', '轻言放弃', '焦虑'], causes: ['成功案例误导', '缺乏耐心', '认知偏差'], solutions: ['长期视角', '过程导向', '调整期望'] },
        { id: 'sh-7', name: '副业社交压力', severity: 'low', description: '副业带来的社交压力和偏见', symptoms: ['被质疑', '社交成本', '身份困惑'], causes: ['社会偏见', '不理解', '自我认同'], solutions: ['坚定选择', '寻找同好', '成果证明'] },
        { id: 'sh-8', name: '副业转型困难', severity: 'medium', description: '难以将副业转为主业', symptoms: ['收入不稳', '风险恐惧', '时机把握'], causes: ['准备不足', '风险评估', '机会成本'], solutions: ['渐进过渡', '财务准备', '时机判断'] }
      ]
    },
    'entrepreneurship': {
      name: '创业准备',
      icon: '💡',
      problems: [
        { id: 'ep-1', name: '创业想法验证', severity: 'high', description: '难以验证创业想法的可行性', symptoms: ['盲目开始', '产品没人要', '资源浪费'], causes: ['市场调研不足', '用户验证缺失', '自我陶醉'], solutions: ['MVP测试', '用户访谈', '数据验证'] },
        { id: 'ep-2', name: '创业资金筹集', severity: 'high', description: '创业初期资金筹集困难', symptoms: ['启动困难', '发展受限', '股权稀释'], causes: ['储蓄不足', '融资困难', '成本高'], solutions: ['自筹资金', '天使投资', '政府补贴'] },
        { id: 'ep-3', name: '创业团队组建', severity: 'high', description: '难以找到合适的创业伙伴', symptoms: ['单打独斗', '能力单一', '分歧冲突'], causes: ['人脉有限', '标准高', '信任建立难'], solutions: ['明确需求', '扩展人脉', '试用合作'] },
        { id: 'ep-4', name: '创业风险评估', severity: 'high', description: '对创业风险评估不足', symptoms: ['准备不足', '应对困难', '失败率高'], causes: ['乐观偏差', '经验缺乏', '信息不全'], solutions: ['最坏情况分析', '风险预案', '逐步投入'] },
        { id: 'ep-5', name: '创业法律知识', severity: 'medium', description: '缺乏创业所需的法律知识', symptoms: ['合规风险', '合同纠纷', '知识产权'], causes: ['专业性强', '学习成本高', '重视不够'], solutions: ['法律咨询', '专业培训', '合规审查'] },
        { id: 'ep-6', name: '创业心理压力', severity: 'high', description: '创业带来的巨大心理压力', symptoms: ['焦虑', '失眠', ' burnout'], causes: ['不确定性', '责任重', '孤独感'], solutions: ['心理支持', '社群交流', '压力管理'] },
        { id: 'ep-7', name: '创业资源获取', severity: 'medium', description: '难以获取创业所需的资源', symptoms: ['渠道少', '成本高', '效率低'], causes: ['人脉少', '信息不对称', '议价能力弱'], solutions: ['孵化器', '行业活动', '资源互换'] },
        { id: 'ep-8', name: '创业退出机制', severity: 'medium', description: '缺乏明确的创业退出策略', symptoms: ['进退两难', '损失大', '机会成本'], causes: ['规划不足', '情感因素', '市场变化'], solutions: ['提前规划', '定期评估', '灵活调整'] }
      ]
    },
    'career-transition': {
      name: '职业转型',
      icon: '🔄',
      problems: [
        { id: 'ct-1', name: '转型时机判断', severity: 'high', description: '难以判断最佳转型时机', symptoms: ['过早', '过晚', '错过机会'], causes: ['信息不足', '判断困难', '恐惧'], solutions: ['市场研究', '能力评估', '时机分析'] },
        { id: 'ct-2', name: '技能迁移困难', severity: 'high', description: '原有技能难以迁移到新领域', symptoms: ['从零开始', '竞争力弱', '薪资下降'], causes: ['领域差异大', '技能专用', '认知偏差'], solutions: ['寻找可迁移技能', '补充学习', '组合优势'] },
        { id: 'ct-3', name: '转型经济压力', severity: 'high', description: '转型期间的经济压力', symptoms: ['收入中断', '储蓄消耗', '生活质量下降'], causes: ['准备不足', '过渡期长', '收入差距'], solutions: ['财务储备', '渐进转型', '副业过渡'] },
        { id: 'ct-4', name: '年龄歧视', severity: 'high', description: '转型时遭遇年龄相关歧视', symptoms: ['机会少', '薪资低', '被拒绝'], causes: ['行业偏见', '成本考量', '刻板印象'], solutions: ['能力证明', '经验优势', '网络利用'] },
        { id: 'ct-5', name: '转型心理准备', severity: 'medium', description: '对转型的心理准备不足', symptoms: ['后悔', '焦虑', '适应困难'], causes: ['期望落差', '身份丧失', '不确定性'], solutions: ['心理建设', '支持系统', '渐进适应'] },
        { id: 'ct-6', name: '新领域融入', severity: 'medium', description: '难以融入新的职业领域', symptoms: ['文化冲突', '人脉缺乏', '不被认可'], causes: ['圈子固化', '信任建立慢', '背景差异'], solutions: ['主动融入', '寻找导师', '展示价值'] },
        { id: 'ct-7', name: '转型家庭支持', severity: 'medium', description: '家庭对转型的支持不足', symptoms: ['压力', '冲突', '内疚'], causes: ['风险厌恶', '经济担忧', '不理解'], solutions: ['充分沟通', '逐步证明', '共同规划'] },
        { id: 'ct-8', name: '转型后发展', severity: 'medium', description: '转型后的职业发展不确定', symptoms: ['迷茫', '停滞', '二次转型'], causes: ['规划不清', '市场变化', '能力瓶颈'], solutions: ['长期规划', '持续学习', '灵活调整'] }
      ]
    }
  },

  // ==================== 2. 实际案例数据 ====================
  caseStudies: {
    learning: [
      {
        id: 'case-learn-1',
        title: '从学渣到学霸的逆袭之路',
        person: '小明，22岁，大三学生',
        background: '大一时GPA只有2.3，面临退学警告，对学习完全失去兴趣',
        challenges: ['学习方法不当', '沉迷游戏', '时间管理混乱', '缺乏学习动力'],
        actions: [
          '参加学习力提升工作坊',
          '采用番茄工作法，每天专注学习4小时',
          '建立学习小组，互相监督',
          '寻求学业导师指导',
          '使用Anki进行间隔重复记忆'
        ],
        timeline: [
          { month: 1, milestone: '找到适合自己的学习方法' },
          { month: 3, milestone: 'GPA提升到2.8' },
          { month: 6, milestone: '获得学习进步奖' },
          { month: 12, milestone: 'GPA达到3.8，获得奖学金' }
        ],
        results: '大三结束时GPA提升到3.8，获得校级奖学金，成功保研',
        lessons: '找到适合自己的学习方法是关键，坚持和反馈同样重要',
        tags: ['学习方法', '时间管理', '逆袭', '大学生']
      },
      {
        id: 'case-learn-2',
        title: '在职考研成功上岸',
        person: '小红，26岁，工作3年',
        background: '本科毕业后直接工作，但一直有名校梦，决定在职考研',
        challenges: ['工作繁忙', '时间碎片化', '精力不足', '孤军奋战'],
        actions: [
          '制定详细的备考计划',
          '利用通勤时间背单词',
          '周末参加线下辅导班',
          '加入考研互助群',
          '调整作息，保证睡眠'
        ],
        timeline: [
          { month: 3, milestone: '完成基础阶段复习' },
          { month: 6, milestone: '完成强化阶段' },
          { month: 9, milestone: '开始冲刺阶段' },
          { month: 12, milestone: '成功上岸985高校' }
        ],
        results: '以优异成绩考入985高校研究生，实现学历提升',
        lessons: '合理规划时间，利用碎片时间，保持持续学习的习惯',
        tags: ['在职考研', '时间管理', '坚持', '学历提升']
      }
    ],
    career: [
      {
        id: 'case-career-1',
        title: '零基础转行程序员',
        person: '小李，25岁，文科生',
        background: '英语专业毕业，从事行政工作2年，对现状不满，想转行IT',
        challenges: ['零基础', '年龄焦虑', '经济压力', '学习曲线陡峭'],
        actions: [
          '报名编程训练营',
          '每天下班后学习4小时',
          '周末参加编程工作坊',
          '建立GitHub作品集',
          '参加技术社区活动'
        ],
        timeline: [
          { month: 1, milestone: '完成HTML/CSS基础' },
          { month: 3, milestone: '掌握JavaScript' },
          { month: 5, milestone: '完成3个项目作品' },
          { month: 6, milestone: '成功入职互联网公司' }
        ],
        results: '6个月后成功入职互联网公司，薪资从5k提升到12k',
        lessons: '系统学习+项目实践+社区参与是转行成功的关键',
        tags: ['转行', '程序员', '零基础', '薪资翻倍']
      },
      {
        id: 'case-career-2',
        title: '从打工人到自由职业者',
        person: '小王，28岁，设计师',
        background: '在传统设计公司工作4年，感到职业瓶颈，决定成为自由设计师',
        challenges: ['收入不稳定', '客户获取难', '自我管理', '社保问题'],
        actions: [
          '建立个人作品集网站',
          '在多个平台接单',
          '维护老客户关系',
          '学习商业谈判',
          '建立个人品牌'
        ],
        timeline: [
          { month: 3, milestone: '接到第一个长期客户' },
          { month: 6, milestone: '月收入超过工资' },
          { month: 12, milestone: '建立稳定的客户群' },
          { month: 18, milestone: '收入是原来的2倍' }
        ],
        results: '成为月入3万+的自由设计师，工作时间自由，客户稳定',
        lessons: '建立个人品牌和稳定的客户关系是自由职业成功的关键',
        tags: ['自由职业', '设计师', '个人品牌', '收入增长']
      }
    ]
  },

  // ==================== 3. 扩展的连接关系 ====================
  extendedRelationships: [
    // 学习成长内部关联
    { source: 'lm-1', target: 'ep-1', type: 'causes', strength: 0.8, description: '学习效率低导致考试准备不充分' },
    { source: 'lm-5', target: 'lm-1', type: 'causes', strength: 0.7, description: '缺乏学习动力导致效率低下' },
    { source: 'dl-3', target: 'lm-2', type: 'causes', strength: 0.9, description: '网络沉迷严重影响专注力' },
    
    // 职业发展内部关联
    { source: 'cc-1', target: 'sh-1', type: 'causes', strength: 0.6, description: '专业不对口促使探索副业' },
    { source: 'ct-2', target: 'cg-2', type: 'causes', strength: 0.7, description: '技能过时需要转型' },
    { source: 'ep-1', target: 'sh-3', type: 'enables', strength: 0.5, description: '副业成功可转化为创业' },
    
    // 跨领域关联
    { source: 'lm-1', target: 'wa-3', type: 'causes', strength: 0.6, description: '学习压力影响工作表现' },
    { source: 'cc-2', target: 'sc-1', type: 'causes', strength: 0.8, description: '职业迷茫导致自我认同危机' },
    { source: 'dl-3', target: 'rr-1', type: 'causes', strength: 0.5, description: '网络沉迷减少现实社交机会' },
    { source: 'em-1', target: 'cg-5', type: 'causes', strength: 0.7, description: '情绪问题导致职业倦怠' },
    { source: 'fm-1', target: 'sl-7', type: 'causes', strength: 0.6, description: '经济压力影响单身生活' },
    
    // 心理健康与其他领域
    { source: 'pr-1', target: 'ct-4', type: 'enables', strength: 0.6, description: '心理韧性帮助应对转型挫折' },
    { source: 'em-2', target: 'ep-4', type: 'causes', strength: 0.7, description: '焦虑影响创业决策' },
    { source: 'sc-2', target: 'ss-3', type: 'causes', strength: 0.8, description: '自卑导致边界设定困难' }
  ],

  // ==================== 4. 行业统计数据 ====================
  industryData: {
    employment: {
      '2023届毕业生就业率': { value: '85.2%', trend: 'down', change: '-2.1%' },
      '00后平均跳槽频率': { value: '1.8年/次', trend: 'up', change: '+0.3年' },
      '灵活就业比例': { value: '18.5%', trend: 'up', change: '+3.2%' },
      '创业比例': { value: '3.2%', trend: 'stable', change: '0%' },
      '考研比例': { value: '46.8%', trend: 'up', change: '+5.3%' },
      '考公比例': { value: '12.3%', trend: 'up', change: '+2.1%' }
    },
    mentalHealth: {
      '焦虑检出率': { value: '32.1%', trend: 'up', change: '+4.2%' },
      '抑郁检出率': { value: '18.7%', trend: 'up', change: '+2.8%' },
      '睡眠问题比例': { value: '45.3%', trend: 'up', change: '+6.1%' },
      '寻求专业帮助比例': { value: '8.9%', trend: 'up', change: '+1.5%' },
      '使用心理健康APP比例': { value: '23.6%', trend: 'up', change: '+7.2%' }
    },
    education: {
      '在线学习参与率': { value: '78.9%', trend: 'up', change: '+12.3%' },
      '知识付费用户比例': { value: '56.4%', trend: 'up', change: '+8.7%' },
      '技能培训参与率': { value: '67.3%', trend: 'up', change: '+5.4%' },
      '出国留学比例': { value: '5.2%', trend: 'down', change: '-1.8%' }
    },
    social: {
      '日均社交媒体使用时间': { value: '3.2小时', trend: 'up', change: '+0.5小时' },
      '线上交友比例': { value: '34.7%', trend: 'up', change: '+6.2%' },
      '独居比例': { value: '28.3%', trend: 'up', change: '+3.1%' },
      '宠物陪伴比例': { value: '42.1%', trend: 'up', change: '+5.7%' }
    }
  },

  // ==================== 5. 趋势数据 ====================
  trends: {
    career: [
      { year: 2020, remoteWork: 12, gigEconomy: 15, entrepreneurship: 2.8 },
      { year: 2021, remoteWork: 35, gigEconomy: 18, entrepreneurship: 3.1 },
      { year: 2022, remoteWork: 28, gigEconomy: 22, entrepreneurship: 3.0 },
      { year: 2023, remoteWork: 25, gigEconomy: 25, entrepreneurship: 3.2 },
      { year: 2024, remoteWork: 23, gigEconomy: 28, entrepreneurship: 3.5 }
    ],
    mentalHealth: [
      { year: 2020, anxiety: 24.5, depression: 14.2, sleepIssues: 36.8 },
      { year: 2021, anxiety: 28.3, depression: 16.5, sleepIssues: 40.2 },
      { year: 2022, anxiety: 30.1, depression: 17.8, sleepIssues: 42.7 },
      { year: 2023, anxiety: 32.1, depression: 18.7, sleepIssues: 45.3 },
      { year: 2024, anxiety: 33.8, depression: 19.5, sleepIssues: 47.1 }
    ]
  },

  // ==================== 6. 详细解决方案步骤 ====================
  detailedSolutions: {
    'lm-1': {
      title: '提升学习效率的系统方案',
      estimatedTime: '4-6周',
      difficulty: '中等',
      steps: [
        {
          step: 1,
          title: '诊断当前学习状况',
          description: '记录一周的学习时间分配，使用番茄钟记录专注时间，找出时间黑洞和效率低下的环节',
          duration: '1周',
          tools: ['Toggl Track', 'RescueTime', 'Excel表格'],
          checklist: ['记录每天学习时间', '标记高效和低谷时段', '识别干扰源']
        },
        {
          step: 2,
          title: '建立学习目标系统',
          description: '使用OKR方法设定学习目标，将大目标分解为可执行的小任务',
          duration: '3天',
          tools: ['Notion', 'Trello', '飞书文档'],
          checklist: ['设定季度目标', '分解为月度里程碑', '制定周计划']
        },
        {
          step: 3,
          title: '采用科学学习方法',
          description: '学习并实践费曼技巧、间隔重复、主动回忆等科学学习方法',
          duration: '2周',
          tools: ['Anki', 'RemNote', '思维导图软件'],
          checklist: ['学习费曼技巧', '建立Anki卡片', '每日复习计划']
        },
        {
          step: 4,
          title: '优化学习环境',
          description: '打造专注的学习空间，减少干扰，建立学习仪式感',
          duration: '1周',
          tools: ['Forest', 'Freedom', '白噪音APP'],
          checklist: ['整理学习空间', '安装屏蔽软件', '建立学习仪式']
        },
        {
          step: 5,
          title: '建立反馈机制',
          description: '定期测试学习效果，调整策略，建立奖励机制',
          duration: '持续',
          tools: ['学习日志', '进度追踪表'],
          checklist: ['每周自测', '月度复盘', '调整策略']
        }
      ],
      resources: {
        books: [
          { title: '学习之道', author: '芭芭拉·奥克利', rating: 4.5 },
          { title: '深度工作', author: '卡尔·纽波特', rating: 4.3 },
          { title: '刻意练习', author: '安德斯·艾利克森', rating: 4.4 }
        ],
        courses: [
          { title: 'Learning How to Learn', platform: 'Coursera', rating: 4.8 },
          { title: '高效学习策略', platform: '得到', rating: 4.6 }
        ],
        tools: [
          { name: 'Anki', type: '记忆工具', description: '间隔重复记忆卡片' },
          { name: 'Forest', type: '专注工具', description: '番茄钟+游戏化' },
          { name: 'Notion', type: '知识管理', description: 'All-in-one工作空间' }
        ]
      },
      successStories: [
        '小明通过这套方法，3个月内GPA从2.3提升到3.5',
        '小红使用Anki记忆法，考研英语从60分提升到85分'
      ]
    }
  },

  // ==================== 7. 用户评论和经验分享 ====================
  userContributions: {
    'lm-1': [
      {
        id: 'uc-1',
        user: '考研党小张',
        avatar: '👨‍🎓',
        rating: 5,
        comment: '番茄工作法真的有效！坚持一个月后，每天有效学习时间从4小时提升到7小时。关键是要有仪式感，我开始学习前会泡一杯茶，告诉自己"现在开始专注"',
        date: '2024-01-15',
        helpful: 328,
        tags: ['番茄工作法', '仪式感', '时间提升']
      },
      {
        id: 'uc-2',
        user: '在职学习的小李',
        avatar: '👩‍💼',
        rating: 4,
        comment: '建议配合运动！我每天早上跑步30分钟，大脑一整天都很清醒。另外，Anki确实好用，但前期制作卡片比较耗时，建议直接下载别人分享的高质量卡组',
        date: '2024-02-01',
        helpful: 256,
        tags: ['运动', 'Anki', '卡片制作']
      },
      {
        id: 'uc-3',
        user: '二战考研生',
        avatar: '📚',
        rating: 5,
        comment: '最重要的是找到适合自己的节奏。不要盲目追求学习时长，效率更重要。我后来发现我早上效率最高，就把最难的内容放在早上学习',
        date: '2024-02-15',
        helpful: 189,
        tags: ['效率优先', '生物钟', '节奏']
      }
    ],
    'cc-1': [
      {
        id: 'uc-4',
        user: '转行成功的小王',
        avatar: '💻',
        rating: 5,
        comment: '专业不对口不可怕，关键是找到自己的 transferable skills。我从英语专业转到产品经理，语言能力和跨文化沟通成了我的优势',
        date: '2024-01-20',
        helpful: 412,
        tags: [' transferable skills', '产品经理', '优势转化']
      }
    ]
  },

  // ==================== 8. 工具函数 ====================
  utils: {
    // 合并扩展数据到主数据
    mergeWithMainData(mainData) {
      // 使用 DataExtensions 直接引用，避免 this 指向问题
      // 合并学习成长扩展
      Object.assign(mainData.knowledgeNodes.learning, DataExtensions.learning_extended);
      
      // 合并职业发展扩展
      Object.assign(mainData.knowledgeNodes.career, DataExtensions.career_extended);
      
      // 合并案例数据
      mainData.caseStudies = DataExtensions.caseStudies;
      
      // 合并关系数据
      mainData.relationships = [...mainData.relationships, ...DataExtensions.extendedRelationships];
      
      // 合并行业数据
      mainData.industryData = DataExtensions.industryData;
      mainData.trends = DataExtensions.trends;
      
      // 合并详细解决方案
      mainData.detailedSolutions = { ...mainData.detailedSolutions, ...DataExtensions.detailedSolutions };
      
      // 合并用户贡献
      mainData.userContributions = DataExtensions.userContributions;
      
      // 更新统计
      DataExtensions.utils.updateStatistics(mainData);
      
      return mainData;
    },
    
    // 更新统计数据
    updateStatistics(mainData) {
      let totalProblems = 0;
      Object.values(mainData.knowledgeNodes).forEach(domain => {
        Object.values(domain).forEach(subcategory => {
          if (subcategory.problems) {
            totalProblems += subcategory.problems.length;
          }
        });
      });
      
      mainData.statistics.totalProblems = totalProblems;
      // 使用 DataExtensions 直接引用，避免 this 指向问题
      mainData.statistics.caseStudies = Object.values(DataExtensions.caseStudies).flat().length;
      mainData.statistics.userContributions = Object.values(DataExtensions.userContributions).flat().length;
    }
  }
};

// 自动合并到主数据（如果主数据已加载）
if (typeof ComprehensiveData !== 'undefined') {
  DataExtensions.utils.mergeWithMainData(ComprehensiveData);
  console.log('✅ 数据扩展包已加载并合并');
  console.log(`📊 当前总问题数: ${ComprehensiveData.statistics.totalProblems}`);
}

// 导出扩展数据
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DataExtensions;
}
