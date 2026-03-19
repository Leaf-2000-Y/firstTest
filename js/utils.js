// ==================== 工具函数 ====================

// 生成唯一ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 格式化日期
function formatDateTime(dateString) {
  if (!dateString) return '';
  var date = new Date(dateString);
  var now = new Date();
  var diff = now - date;
  
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前';
  
  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, '0');
  var day = String(date.getDate()).padStart(2, '0');
  var hours = String(date.getHours()).padStart(2, '0');
  var minutes = String(date.getMinutes()).padStart(2, '0');
  
  if (year === now.getFullYear()) {
    return month + '-' + day + ' ' + hours + ':' + minutes;
  }
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}

// 从内容生成摘要
function generateSummary(content, maxLength) {
  maxLength = maxLength || 100;
  if (!content) return '';
  var text = content.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// 自动识别内容维度
function detectDimensions(content) {
  var detected = [];
  var text = content.toLowerCase();
  
  Object.values(LIFE_DIMENSIONS).forEach(function(dimension) {
    var hasKeyword = dimension.keywords.some(function(keyword) {
      return text.includes(keyword.toLowerCase());
    });
    if (hasKeyword && !detected.includes(dimension.id)) {
      detected.push(dimension.id);
    }
  });
  
  return detected;
}

// 生成启发式建议
function generateHeuristicAdvice(dimensionId, answers) {
  var advices = {
    health: {
      excellent: '太棒了！保持这种良好的状态。建议：1) 记录你的健康习惯，形成可复制的经验 2) 帮助他人改善健康 3) 挑战更高目标如马拉松',
      good: '整体不错！建议：1) 识别并改善1-2个小问题 2) 建立更规律的作息 3) 尝试新的运动方式',
      fair: '需要关注了。建议：1) 从睡眠入手，固定作息时间 2) 每天增加15分钟运动 3) 减少加工食品摄入',
      poor: '急需改善！建议：1) 立即预约体检 2) 寻求专业医生或教练帮助 3) 从最小改变开始，不要急于求成'
    },
    career: {
      very: '职业发展很好！建议：1) 培养团队领导力 2) 分享经验，建立个人品牌 3) 规划下一步晋升或创业',
      somewhat: '还算满意。建议：1) 找出工作中最有成就感的部分，多做 2) 主动争取有挑战的项目 3) 与上级沟通职业发展',
      neutral: '缺乏激情。建议：1) 重新审视职业目标 2) 学习新技能增加竞争力 3) 考虑内部转岗或跳槽',
      dissatisfied: '需要改变。建议：1) 明确自己真正想要的是什么 2) 制定转行或转型计划 3) 寻求职业咨询'
    },
    finance: {
      secure: '财务状况健康！建议：1) 优化投资组合 2) 考虑长期财务目标如房产、子女教育 3) 学习税务规划',
      stable: '基本稳定。建议：1) 建立3-6个月应急基金 2) 开始定期投资 3) 减少不必要的开支',
      tight: '有些紧张。建议：1) 开始记账，了解钱花在哪 2) 制定预算并严格执行 3) 寻找增加收入的机会',
      concerned: '需要立即行动。建议：1) 列出所有债务，制定还款计划 2) 削减所有非必要开支 3) 寻求财务顾问帮助'
    },
    family: {
      harmonious: '家庭关系很好！建议：1) 创造更多家庭传统 2) 记录家庭美好时光 3) 主动化解小问题，保持和谐',
      good: '关系不错。建议：1) 增加高质量陪伴时间 2) 改善沟通方式 3) 共同制定家庭目标',
      distant: '需要加强。建议：1) 安排定期家庭活动 2) 主动表达关心和爱 3) 创造共同话题和兴趣',
      strained: '需要修复。建议：1) 坦诚沟通，表达感受 2) 寻求家庭咨询 3) 给彼此时间和空间'
    },
    social: {
      rich: '社交圈很棒！建议：1) 深化重要关系 2) 利用人脉创造机会 3) 成为连接者，帮助他人建立联系',
      adequate: '基本满足。建议：1) 主动联系老朋友 2) 参加1-2个新活动拓展圈子 3) 培养深度关系',
      limited: '需要拓展。建议：1) 加入兴趣社群 2) 主动发起聚会 3) 练习社交技能',
      lonely: '需要连接。建议：1) 从小处开始，每天与人交流 2) 寻找志同道合的群体 3) 考虑寻求心理咨询'
    },
    learning: {
      actively: '学习状态很好！建议：1) 建立知识体系 2) 教授他人巩固学习 3) 挑战更高难度的内容',
      occasionally: '保持好奇。建议：1) 制定系统学习计划 2) 找到学习伙伴 3) 应用所学，项目驱动',
      planning: '开始行动。建议：1) 设定具体学习目标 2) 分解为可执行的小步骤 3) 建立学习习惯',
      stagnant: '急需学习。建议：1) 识别必须学习的技能 2) 从每天15分钟开始 3) 找到学习的内在动力'
    },
    entertainment: {
      abundant: '生活丰富！建议：1) 记录快乐时刻 2) 分享体验启发他人 3) 尝试更有深度的活动',
      balanced: '平衡不错。建议：1) 尝试一种新爱好 2) 计划一次特别体验 3) 创造更多心流时刻',
      lacking: '需要调剂。建议：1) 列出想做的事情清单 2) 每周安排专门娱乐时间 3) 从小乐趣开始',
      burnout: '急需放松。建议：1) 立即安排休息时间 2) 学会说"不" 3) 重新定义工作与生活的边界'
    },
    spiritual: {
      peaceful: '内心平静！建议：1) 深化冥想或反思练习 2) 帮助他人找到意义 3) 记录智慧和感悟',
      searching: '正在探索。建议：1) 阅读哲学或灵性书籍 2) 尝试冥想或正念 3) 与智者交流',
      confused: '需要思考。建议：1) 花时间独处反思 2) 写下价值观和人生目标 3) 寻求导师指导',
      lost: '需要指引。建议：1) 寻求专业心理咨询 2) 从微小改变开始 3)  reconnect with your core values'
    }
  };
  
  var dimensionAdvice = advices[dimensionId];
  if (!dimensionAdvice) return '继续探索这个维度，记录你的发现和成长。';
  
  var firstAnswer = answers[0] || 'good';
  return dimensionAdvice[firstAnswer] || dimensionAdvice.good || '保持觉察，持续改进。';
}

// 生成提示词
function generatePrompt(requirement, type, dimensions, role, format, depth) {
  var typeLabels = {
    plan: '规划计划',
    analysis: '分析诊断',
    review: '复盘总结',
    knowledge: '知识整理'
  };
  
  var roleLabels = {
    coach: '人生教练',
    expert: '领域专家',
    mentor: '导师',
    analyst: '分析师',
    friend: '知心朋友'
  };
  
  var formatLabels = {
    structured: '结构化',
    narrative: '故事化',
    checklist: '清单式',
    qa: '问答式',
    visual: '可视化'
  };
  
  var depthLabels = {
    beginner: '入门级',
    intermediate: '进阶级',
    advanced: '专家级'
  };
  
  var dimNames = dimensions.map(function(id) {
    var dim = Object.values(LIFE_DIMENSIONS).find(function(d) { return d.id === id; });
    return dim ? dim.name : id;
  }).join('、');
  
  var prompt = '';
  prompt += '# 角色\n';
  prompt += '你是' + (roleLabels[role] || '专业顾问') + '，';
  prompt += '擅长从多维度帮助人们进行系统性思考和规划。\n\n';
  
  prompt += '# 背景\n';
  prompt += '用户的需求是：' + requirement + '\n\n';
  
  prompt += '# 任务\n';
  prompt += '请基于' + dimNames + '等维度，';
  prompt += '生成一份' + (depthLabels[depth] || '详细') + '的' + (typeLabels[type] || '规划') + '。\n\n';
  
  prompt += '# 要求\n';
  prompt += '1. 采用' + (formatLabels[format] || '清晰') + '的表达方式\n';
  prompt += '2. 每个维度都要包含：现状分析、目标设定、行动计划\n';
  prompt += '3. 内容要具体、可执行、有针对性\n';
  prompt += '4. 维度之间要相互协调、平衡发展\n\n';
  
  prompt += '# 输出格式\n';
  prompt += '为每个维度生成独立章节，包含：\n';
  prompt += '- 维度名称和图标\n';
  prompt += '- 现状评估（1-2段）\n';
  prompt += '- 具体目标（3-5条）\n';
  prompt += '- 行动计划（短期、中期、长期）\n';
  prompt += '- 关键里程碑和检查点\n';
  
  return prompt;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    generateId: generateId,
    formatDateTime: formatDateTime,
    generateSummary: generateSummary,
    detectDimensions: detectDimensions,
    generateHeuristicAdvice: generateHeuristicAdvice,
    generatePrompt: generatePrompt
  };
}
