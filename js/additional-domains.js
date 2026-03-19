// ==================== 补充领域数据 ====================
// 包含人际关系、心理健康、情感生活、社会适应四大领域

const additionalDomains = {
  // 人际关系领域
  relationship: {
    name: '人际关系',
    description: '00后在人际交往中面临的各种挑战和困惑',
    icon: '🤝',
    color: '#f59e0b',
    subcategories: {
      family: {
        name: '家庭关系',
        description: '与父母、兄弟姐妹等家庭成员的关系问题',
        problems: [
          {
            name: '代际沟通障碍',
            description: '与父母在价值观、生活方式上存在巨大分歧，难以有效沟通',
            severity: 'high',
            symptoms: ['经常与父母争吵', '不愿回家', '对父母的关心感到厌烦', '感觉不被理解'],
            solutions: [
              {
                title: '建立有效沟通机制',
                description: '学习非暴力沟通技巧，建立定期家庭交流时间',
                steps: ['选择合适时机沟通', '使用"我"语句表达感受', '倾听父母观点', '寻找共同点']
              },
              {
                title: '设定健康边界',
                description: '在尊重父母的同时，建立个人边界',
                steps: ['明确个人底线', '温和但坚定地表达', '给予父母适应时间', '保持一致性']
              }
            ],
            cases: [
              {
                title: '从冲突到理解',
                description: '小李通过每周家庭晚餐时间，逐渐改善了与父母的沟通',
                outcome: '家庭氛围明显改善，父母开始尊重她的职业选择'
              }
            ],
            resources: [
              { title: '《非暴力沟通》', author: '马歇尔·卢森堡' },
              { title: '《原生家庭》', author: '苏珊·福沃德' }
            ]
          },
          {
            name: '经济依赖与独立矛盾',
            description: '渴望经济独立但仍需依赖家庭支持，产生内疚和焦虑',
            severity: 'medium',
            symptoms: ['接受父母资助时感到羞耻', '急于证明自己', '与父母产生金钱纠纷', '独立生活压力大'],
            solutions: [
              {
                title: '制定财务独立计划',
                description: '设定清晰的财务目标和时间表',
                steps: ['记录当前支出', '设定储蓄目标', '寻找额外收入来源', '逐步减少依赖']
              }
            ],
            cases: [
              {
                title: '渐进式独立',
                description: '小王通过兼职和理财，两年内实现了基本经济独立',
                outcome: '不仅减轻了家庭负担，还提升了自信心'
              }
            ],
            resources: [
              { title: '《富爸爸穷爸爸》', author: '罗伯特·清崎' }
            ]
          },
          {
            name: '原生家庭创伤',
            description: '童年时期的家庭问题对成年后的心理和行为产生持续影响',
            severity: 'critical',
            symptoms: ['难以建立亲密关系', '自我价值感低', '重复父母的错误模式', '情绪调节困难'],
            solutions: [
              {
                title: '寻求专业心理治疗',
                description: '通过心理咨询处理童年创伤',
                steps: ['寻找合适的心理咨询师', '建立信任关系', '逐步探索童年经历', '学习新的应对模式']
              },
              {
                title: '自我疗愈练习',
                description: '通过写作、冥想等方式进行自我疗愈',
                steps: ['写情绪日记', '练习自我关怀', '建立支持系统', '设定个人成长目标']
              }
            ],
            cases: [
              {
                title: '走出阴影',
                description: '小张通过两年的心理咨询，逐步走出了原生家庭的影响',
                outcome: '建立了健康的亲密关系，职业和生活都有显著改善'
              }
            ],
            resources: [
              { title: '《童年创伤》', author: '巴塞尔·范德考克' },
              { title: '《身体从未忘记》', author: '巴塞尔·范德考克' }
            ]
          }
        ]
      },
      friends: {
        name: '朋友关系',
        description: '友谊建立、维护和结束中的各种问题',
        problems: [
          {
            name: '社交圈固化',
            description: '难以拓展新的社交圈，朋友关系停留在表面',
            severity: 'medium',
            symptoms: ['朋友数量少', '社交活动单调', '难以融入新群体', '感到孤独'],
            solutions: [
              {
                title: '主动拓展社交圈',
                description: '通过兴趣活动和社交平台认识新朋友',
                steps: ['参加兴趣社团', '尝试新的活动', '主动发起聚会', '保持联系']
              }
            ],
            cases: [
              {
                title: '从宅男到社交达人',
                description: '小陈通过参加桌游社团，认识了志同道合的朋友',
                outcome: '社交圈扩大了三倍，生活质量显著提升'
              }
            ],
            resources: [
              { title: '《如何赢得朋友与影响他人》', author: '戴尔·卡耐基' }
            ]
          },
          {
            name: '朋友背叛与信任危机',
            description: '经历朋友背叛后，难以再信任他人',
            severity: 'high',
            symptoms: ['过度防备', '难以敞开心扉', '社交焦虑', '孤立自己'],
            solutions: [
              {
                title: '重建信任能力',
                description: '逐步恢复对他人的信任',
                steps: ['承认受伤的情绪', '区分个别事件和所有人', '从小事开始信任', '建立健康边界']
              }
            ],
            cases: [
              {
                title: '重新学会信任',
                description: '小刘在被好友背叛后，通过心理咨询逐步恢复',
                outcome: '建立了新的健康友谊，学会了保护自己'
              }
            ],
            resources: [
              { title: '《信任的重建》', author: '阿米尔·莱文' }
            ]
          },
          {
            name: '社交比较与嫉妒',
            description: '在社交媒体上看到朋友的光鲜生活，产生焦虑和嫉妒',
            severity: 'medium',
            symptoms: ['频繁刷朋友圈', '看到他人成功感到焦虑', '自我贬低', '过度关注他人评价'],
            solutions: [
              {
                title: '减少社交媒体使用',
                description: '控制社交媒体使用时间，关注现实生活',
                steps: ['设定使用时间限制', '取消关注触发焦虑的账号', '培养线下爱好', '练习感恩']
              },
              {
                title: '转换比较视角',
                description: '将横向比较转为纵向比较',
                steps: ['关注自己的进步', '制定个人目标', '庆祝小成就', '理解每个人的节奏不同']
              }
            ],
            cases: [
              {
                title: '告别社交焦虑',
                description: '小赵通过减少社交媒体使用，焦虑症状明显改善',
                outcome: '更加专注于自己的成长，心态更加平和'
              }
            ],
            resources: [
              { title: '《数字极简主义》', author: '卡尔·纽波特' }
            ]
          }
        ]
      },
      workplace: {
        name: '职场关系',
        description: '工作环境中的人际关系挑战',
        problems: [
          {
            name: '职场霸凌与排挤',
            description: '在工作中遭受同事或上司的不公平对待',
            severity: 'critical',
            symptoms: ['被孤立', '工作被否定', '心理压力大', '想辞职'],
            solutions: [
              {
                title: '记录并寻求帮助',
                description: '保留证据，寻求HR或上级帮助',
                steps: ['记录事件详情', '寻找证人', '向HR正式投诉', '考虑法律途径']
              },
              {
                title: '心理支持',
                description: '寻求心理咨询，保护自己的心理健康',
                steps: ['寻找专业心理咨询', '建立支持系统', '练习自我关怀', '考虑换工作']
              }
            ],
            cases: [
              {
                title: '勇敢说不',
                description: '小吴在遭受职场霸凌后，勇敢地向HR投诉并寻求法律帮助',
                outcome: '霸凌者受到处分，公司建立了反霸凌机制'
              }
            ],
            resources: [
              { title: '《职场霸凌》', author: '加里·纳米的' }
            ]
          },
          {
            name: '向上管理困难',
            description: '难以与上司建立良好关系，影响职业发展',
            severity: 'high',
            symptoms: ['害怕与上司沟通', '工作成果不被认可', '晋升受阻', '工作积极性下降'],
            solutions: [
              {
                title: '学习向上管理技巧',
                description: '掌握与上司有效沟通的方法',
                steps: ['了解上司风格', '主动汇报工作', '提出解决方案而非问题', '建立信任关系']
              }
            ],
            cases: [
              {
                title: '扭转局面',
                description: '小郑通过学习向上管理，改善了与上司的关系',
                outcome: '获得了重要项目机会，成功晋升'
              }
            ],
            resources: [
              { title: '《向上管理》', author: '罗塞娜·博得斯基' }
            ]
          }
        ]
      }
    }
  },

  // 心理健康领域
  mental: {
    name: '心理健康',
    description: '00后面临的各种心理健康挑战',
    icon: '🧠',
    color: '#8b5cf6',
    subcategories: {
      anxiety: {
        name: '焦虑问题',
        description: '各种类型的焦虑症状和应对方法',
        problems: [
          {
            name: '广泛性焦虑障碍',
            description: '持续性的过度担忧，影响日常生活',
            severity: 'high',
            symptoms: ['持续担心', '肌肉紧张', '睡眠问题', '注意力难以集中', '易怒'],
            solutions: [
              {
                title: '认知行为疗法',
                description: '通过改变思维模式来减轻焦虑',
                steps: ['识别焦虑触发点', '挑战负面思维', '学习放松技巧', '逐步暴露']
              },
              {
                title: '正念冥想',
                description: '通过正念练习减少焦虑',
                steps: ['每天冥想10分钟', '关注当下', '接纳情绪', '练习呼吸技巧']
              }
            ],
            cases: [
              {
                title: '走出焦虑阴影',
                description: '小林通过CBT治疗，焦虑症状显著改善',
                outcome: '能够正常工作生活，学会了管理焦虑的方法'
              }
            ],
            resources: [
              { title: '《焦虑自救手册》', author: '海伦·肯纳利' },
              { title: 'Headspace App', type: '应用' }
            ]
          },
          {
            name: '社交焦虑',
            description: '在社交场合感到极度不安和恐惧',
            severity: 'high',
            symptoms: ['害怕被评价', '回避社交', '身体紧张', '过度自我关注'],
            solutions: [
              {
                title: '渐进式暴露',
                description: '逐步面对恐惧的社交情境',
                steps: ['列出恐惧等级', '从最低级开始', '记录成功经验', '逐步提高难度']
              }
            ],
            cases: [
              {
                title: '从社恐到自信',
                description: '小黄通过系统脱敏，克服了社交恐惧',
                outcome: '能够自如地参加社交活动，建立了稳定的朋友圈'
              }
            ],
            resources: [
              { title: '《社交焦虑》', author: '吉利安·巴特勒' }
            ]
          },
          {
            name: '健康焦虑',
            description: '过度担心自己的健康状况',
            severity: 'medium',
            symptoms: ['频繁查症状', '过度体检', '担心患重病', '影响日常生活'],
            solutions: [
              {
                title: '限制健康信息搜索',
                description: '控制查阅健康信息的频率',
                steps: ['设定搜索时间限制', '避免自我诊断', '定期体检而非频繁', '转移注意力']
              }
            ],
            cases: [
              {
                title: '告别疑病症',
                description: '小孙通过心理治疗，减少了对健康的过度担忧',
                outcome: '生活质量显著提高，不再被健康焦虑困扰'
              }
            ],
            resources: [
              { title: '《健康焦虑》', author: '戈登·J·G·阿斯蒙德森' }
            ]
          }
        ]
      },
      depression: {
        name: '抑郁问题',
        description: '抑郁症的识别和应对',
        problems: [
          {
            name: '轻度抑郁',
            description: '情绪低落，兴趣减退，但尚能维持日常功能',
            severity: 'medium',
            symptoms: ['情绪低落', '兴趣减退', '疲劳', '睡眠问题', '食欲改变'],
            solutions: [
              {
                title: '生活方式调整',
                description: '通过运动、作息调整改善情绪',
                steps: ['规律作息', '每日运动30分钟', '保持社交', '记录情绪日记']
              },
              {
                title: '行为激活',
                description: '通过活动安排改善情绪',
                steps: ['列出愉快活动', '制定活动计划', '执行并记录', '逐步增加活动量']
              }
            ],
            cases: [
              {
                title: '运动治愈',
                description: '小周通过规律运动，情绪明显改善',
                outcome: '不仅抑郁症状减轻，整体健康状况也提升了'
              }
            ],
            resources: [
              { title: '《抑郁症自救手册》', author: '保罗·吉尔伯特' }
            ]
          },
          {
            name: '重度抑郁',
            description: '严重的抑郁症状，严重影响生活功能',
            severity: 'critical',
            symptoms: ['持续绝望感', '自杀念头', '无法工作学习', '严重睡眠障碍', '社交退缩'],
            solutions: [
              {
                title: '寻求专业治疗',
                description: '药物治疗结合心理治疗',
                steps: ['尽快就医', '遵医嘱服药', '配合心理治疗', '建立支持系统', '危机干预']
              }
            ],
            cases: [
              {
                title: '重获新生',
                description: '小吴在重度抑郁后及时就医，经过系统治疗康复',
                outcome: '恢复了工作和生活能力，学会了预防复发的方法'
              }
            ],
            resources: [
              { title: '《走出抑郁》', author: '理查德·奥康纳' },
              { title: '心理危机热线', type: '紧急资源' }
            ]
          }
        ]
      },
      burnout: {
        name: '职业倦怠',
        description: '长期工作压力导致的心理耗竭',
        problems: [
          {
            name: '工作倦怠综合征',
            description: '长期工作压力导致的身心耗竭',
            severity: 'high',
            symptoms: ['极度疲劳', '工作热情丧失', '效率下降', '愤世嫉俗', '成就感缺失'],
            solutions: [
              {
                title: '工作再设计',
                description: '调整工作内容和方式',
                steps: ['与上司沟通', '重新分配任务', '设定合理目标', '寻求工作意义']
              },
              {
                title: '恢复性休息',
                description: '通过深度休息恢复能量',
                steps: ['安排休假', '完全断开工作', '进行放松活动', '重新评估职业方向']
              }
            ],
            cases: [
              {
                title: '从 burnout 到 balance',
                description: '小冯通过调整工作节奏和寻求新挑战，走出了倦怠',
                outcome: '找回了工作热情，实现了工作生活平衡'
              }
            ],
            resources: [
              { title: '《倦怠社会》', author: '韩炳哲' },
              { title: '《深度工作》', author: '卡尔·纽波特' }
            ]
          }
        ]
      }
    }
  },

  // 情感生活领域
  emotion: {
    name: '情感生活',
    description: '恋爱、婚姻等亲密关系中的问题',
    icon: '💕',
    color: '#ec4899',
    subcategories: {
      dating: {
        name: '恋爱关系',
        description: '恋爱过程中的各种挑战',
        problems: [
          {
            name: '恋爱焦虑',
            description: '在恋爱关系中感到不安全、焦虑',
            severity: 'high',
            symptoms: ['害怕被抛弃', '过度依赖', '频繁查岗', '情绪起伏大', '自我价值感低'],
            solutions: [
              {
                title: '建立安全依恋',
                description: '发展健康的依恋模式',
                steps: ['识别依恋模式', '理解焦虑来源', '练习自我安抚', '建立独立生活', '沟通需求']
              },
              {
                title: '提升自我价值',
                description: '建立独立的自我价值感',
                steps: ['发展个人兴趣', '建立社交圈', '设定个人目标', '练习自我肯定']
              }
            ],
            cases: [
              {
                title: '从焦虑到安全',
                description: '小玲通过心理咨询，改善了焦虑型依恋',
                outcome: '建立了健康的恋爱关系，不再被焦虑控制'
              }
            ],
            resources: [
              { title: '《依恋》', author: '阿米尔·莱文' },
              { title: '《爱的艺术》', author: '艾里希·弗洛姆' }
            ]
          },
          {
            name: '异地恋困境',
            description: '远距离恋爱带来的挑战',
            severity: 'medium',
            symptoms: ['思念焦虑', '沟通困难', '信任危机', '未来不确定', '孤独感'],
            solutions: [
              {
                title: '建立有效沟通机制',
                description: '保持高质量的远程沟通',
                steps: ['固定视频时间', '分享日常生活', '规划共同活动', '设定见面计划']
              },
              {
                title: '规划共同未来',
                description: '制定结束异地的计划',
                steps: ['讨论未来规划', '设定时间表', '共同努力目标', '定期评估进展']
              }
            ],
            cases: [
              {
                title: '跨越距离的爱',
                description: '小王和小李通过两年的异地坚持，最终团聚',
                outcome: '感情更加深厚，现已结婚'
              }
            ],
            resources: [
              { title: '《异地恋指南》', author: ' Crystal Jiang' }
            ]
          },
          {
            name: '失恋恢复',
            description: '分手后的心理恢复',
            severity: 'high',
            symptoms: ['持续悲伤', '无法专注', '睡眠食欲问题', '反复回想', '社交退缩'],
            solutions: [
              {
                title: '悲伤处理',
                description: '健康地处理失恋悲伤',
                steps: ['允许自己悲伤', '表达情绪', '寻求支持', '避免联系', '逐步恢复']
              },
              {
                title: '重建生活',
                description: '重新建立独立充实的生活',
                steps: ['恢复社交', '发展新兴趣', '专注自我提升', '重新定义自我']
              }
            ],
            cases: [
              {
                title: '从失恋中成长',
                description: '小陈在失恋后，通过自我提升实现了个人突破',
                outcome: '不仅走出失恋阴影，还获得了更好的工作机会'
              }
            ],
            resources: [
              { title: '《分手后成为更好的自己》', author: '布鲁斯·费希尔' }
            ]
          }
        ]
      },
      attachment: {
        name: '依恋模式',
        description: '依恋类型对亲密关系的影响',
        problems: [
          {
            name: '回避型依恋',
            description: '难以建立亲密关系，倾向于回避情感连接',
            severity: 'high',
            symptoms: ['害怕亲密', '回避承诺', '压抑情感', '难以信任', '保持情感距离'],
            solutions: [
              {
                title: '渐进式亲密',
                description: '逐步学习建立亲密关系',
                steps: ['识别回避模式', '小步尝试亲密', '表达真实感受', '接受他人关心']
              },
              {
                title: '心理治疗',
                description: '通过治疗探索依恋问题根源',
                steps: ['寻找专业帮助', '探索童年经历', '重建依恋模式', '练习健康关系']
              }
            ],
            cases: [
              {
                title: '学会去爱',
                description: '小张通过长期治疗，从回避型转变为安全型依恋',
                outcome: '建立了稳定的长期关系，学会了接受爱'
              }
            ],
            resources: [
              { title: '《关系的重建》', author: '阿米尔·莱文' }
            ]
          }
        ]
      }
    }
  },

  // 社会适应领域
  social: {
    name: '社会适应',
    description: '适应社会环境和应对社会压力',
    icon: '🌍',
    color: '#06b6d4',
    subcategories: {
      identity: {
        name: '身份认同',
        description: '自我认同和社会角色的困惑',
        problems: [
          {
            name: '身份认同危机',
            description: '对自己是谁、要成为什么样的人感到迷茫',
            severity: 'high',
            symptoms: ['自我怀疑', '价值观混乱', '方向感缺失', '频繁改变目标', '内心冲突'],
            solutions: [
              {
                title: '自我探索',
                description: '通过反思和体验建立自我认知',
                steps: ['写自我反思日记', '尝试不同活动', '识别核心价值观', '设定人生目标']
              },
              {
                title: '寻求指导',
                description: '通过导师或咨询获得指引',
                steps: ['寻找人生导师', '职业咨询', '参加成长工作坊', '阅读传记']
              }
            ],
            cases: [
              {
                title: '找到自我',
                description: '小赵通过gap year和多方尝试，找到了人生方向',
                outcome: '明确了职业目标，内心更加坚定'
              }
            ],
            resources: [
              { title: '《身份认同》', author: '埃里克·埃里克森' },
              { title: '《人生定位》', author: '阿尔·里斯' }
            ]
          },
          {
            name: '社会角色冲突',
            description: '不同社会角色之间的冲突和压力',
            severity: 'medium',
            symptoms: ['角色超载', '不同角色要求冲突', '难以平衡', '感到分裂', '疲惫'],
            solutions: [
              {
                title: '角色管理',
                description: '有效管理多重社会角色',
                steps: ['识别所有角色', '设定优先级', '建立边界', '学会说不', '寻求支持']
              }
            ],
            cases: [
              {
                title: '平衡多重角色',
                description: '小刘通过时间管理，平衡了工作、学习和家庭角色',
                outcome: '各个角色都处理得当，生活质量提升'
              }
            ],
            resources: [
              { title: '《工作与生活平衡》', author: '斯图尔特·弗里德曼' }
            ]
          }
        ]
      },
      pressure: {
        name: '社会压力',
        description: '来自社会的各种压力和期望',
        problems: [
          {
            name: '同辈压力',
            description: '来自同龄人的比较和压力',
            severity: 'medium',
            symptoms: ['过度比较', '跟风行为', '失去自我', '焦虑', '低自尊'],
            solutions: [
              {
                title: '建立内在标准',
                description: '发展独立的价值观和目标',
                steps: ['明确个人价值观', '设定个人目标', '减少社交媒体使用', '关注自身进步']
              }
            ],
            cases: [
              {
                title: '做自己',
                description: '小周停止与他人比较，专注于自己的成长',
                outcome: '不仅更加快乐，还在自己的领域取得了突破'
              }
            ],
            resources: [
              { title: '《乌合之众》', author: '古斯塔夫·勒庞' }
            ]
          },
          {
            name: '社会期望压力',
            description: '家庭和社会对成功、婚姻的期望',
            severity: 'high',
            symptoms: ['感到被逼迫', '选择不符合内心', '焦虑', '家庭冲突', '自我否定'],
            solutions: [
              {
                title: '定义自己的成功',
                description: '建立个人对成功的定义',
                steps: ['反思真正想要的', '与家人沟通', '设定个人目标', '逐步获得独立']
              }
            ],
            cases: [
              {
                title: '走自己的路',
                description: '小吴顶住家庭压力，选择了自己热爱的职业',
                outcome: '最终获得了成功，也赢得了家人的理解'
              }
            ],
            resources: [
              { title: '《为自己而活》', author: '查理德·泰勒' }
            ]
          }
        ]
      },
      transition: {
        name: '人生转折',
        description: '人生重要转折期的适应',
        problems: [
          {
            name: '毕业焦虑',
            description: '从学生到社会人的转变困难',
            severity: 'high',
            symptoms: ['对未来恐惧', '留恋校园', '适应困难', '身份丧失感', '迷茫'],
            solutions: [
              {
                title: '过渡期准备',
                description: '提前为角色转变做准备',
                steps: ['实习体验', '建立职业网络', '学习职场技能', '逐步独立']
              },
              {
                title: '保持学习',
                description: '持续学习适应社会',
                steps: ['终身学习心态', '学习实用技能', '寻求导师', '反思成长']
              }
            ],
            cases: [
              {
                title: '顺利过渡',
                description: '小郑通过提前实习和准备，顺利适应了职场',
                outcome: '比同龄人更快适应，获得了更好的发展机会'
              }
            ],
            resources: [
              { title: '《毕业五年决定你的一生》', author: '林少波' }
            ]
          }
        ]
      }
    }
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { additionalDomains };
}

if (typeof window !== 'undefined') {
  window.additionalDomains = additionalDomains;
}
