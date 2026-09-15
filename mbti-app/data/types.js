/**
 * MBTI 16 种类型完整解析数据
 *
 * 数据结构说明：
 * - code: MBTI 类型代码 (如 "INTJ")
 * - name: 中文类型名称
 * - nickname: 英文昵称/标签
 * - description: 类型核心描述
 * - strengths: 优势列表
 * - weaknesses: 劣势列表
 * - celebrities: 代表人物
 * - careers: 职业建议
 * - group: 四大类别 (NT 理性者 / NF 理想主义者 / SJ 护卫者 / SP 艺术创造者)
 */

const MBTI_TYPES = {
  // ========== NT 理性者 ==========
  INTJ: {
    code: "INTJ",
    name: "建筑师",
    nickname: "The Architect",
    group: "NT 理性者",
    description: "富有想象力且具战略性的思考者，一切都在计划之中。你擅长看到事情的全局，并且有很强的独立性和执行力。对你来说，世界是一盘棋，而你总是在想三步之后的棋。",
    strengths: ["战略性思维强，善于长远规划", "独立自主，有强大的内在驱动力", "逻辑分析能力出色", "对自己和他人要求高标准", "遇到困难时冷静理性"],
    weaknesses: ["可能过于追求完美而忽视他人感受", "不擅长处理情感问题", "有时过于自信，听不进不同意见", "社交中容易显得冷漠疏离", "对低效和混乱缺乏耐心"],
    celebrities: ["马斯克（Elon Musk）", "尼古拉·特斯拉（Nikola Tesla）", "弗里达·卡罗（Frida Kahlo）"],
    careers: ["战略咨询师", "科学家/研究员", "投资分析师", "系统架构师", "企业高管"]
  },
  INTP: {
    code: "INTP",
    name: "逻辑学家",
    nickname: "The Logician",
    group: "NT 理性者",
    description: "具有创造力的发明家，对知识有不可抑制的渴望。你喜欢探索理论和抽象概念，追求逻辑的自洽与完美。你的大脑是一个不停运转的思想实验室。",
    strengths: ["逻辑分析能力极强", "善于发现事物的底层规律", "思维灵活，富有创造力", "对复杂问题有独到见解", "独立思考，不随波逐流"],
    weaknesses: ["容易陷入空想而缺乏行动力", "社交能力偏弱", "可能忽视实际细节", "对常规和重复性工作缺乏耐心", "情感表达不擅长"],
    celebrities: ["爱因斯坦（Albert Einstein）", "比尔·盖茨（Bill Gates）", "笛卡尔（René Descartes）"],
    careers: ["科学家/数学家", "软件工程师", "数据分析师", "大学教授", "理论研究员"]
  },
  ENTJ: {
    code: "ENTJ",
    name: "指挥官",
    nickname: "The Commander",
    group: "NT 理性者",
    description: "大胆、富有想象力且意志力强的领导者，总能找到或创造前进的道路。你天生具有领导魅力，善于组织和推动变革，对效率有极致追求。",
    strengths: ["天生的领导力", "果断高效，执行力强", "战略思维出色", "善于发现和利用机会", "自信且有感染力"],
    weaknesses: ["可能过于强势，忽视他人感受", "对低效率的人和事缺乏耐心", "容易给人压迫感", "工作狂倾向", "不太擅长情感交流"],
    celebrities: ["乔布斯（Steve Jobs）", "拿破仑（Napoleon Bonaparte）", "撒切尔夫人（Margaret Thatcher）"],
    careers: ["企业CEO/高管", "管理咨询师", "创业者", "投资银行家", "律师"]
  },
  ENTP: {
    code: "ENTP",
    name: "辩论家",
    nickname: "The Debater",
    group: "NT 理性者",
    description: "聪明好奇的思想者，无法抗拒思想上的挑战。你喜欢脑力激荡，善于从不同角度看问题，享受与别人辩论和碰撞观点的过程。",
    strengths: ["思维敏捷，反应快", "善于创新和发散思维", "适应能力强", "有出色的表达能力", "喜欢挑战传统和常规"],
    weaknesses: ["容易好辩而得罪人", "可能缺乏持续的执行力", "兴趣容易转移", "有时忽视他人情感", "不喜欢被规则束缚"],
    celebrities: ["爱迪生（Thomas Edison）", "达·芬奇（Leonardo da Vinci）", "马克·吐温（Mark Twain）"],
    careers: ["创业者", "产品经理", "律师", "创意总监", "记者/评论员"]
  },

  // ========== NF 理想主义者 ==========
  INFJ: {
    code: "INFJ",
    name: "提倡者",
    nickname: "The Advocate",
    group: "NF 理想主义者",
    description: "安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。你拥有深刻的洞察力和强烈的价值观，渴望让世界变得更好，是 MBTI 中最稀有的类型。",
    strengths: ["有远见和深刻的洞察力", "同理心强，善于理解他人", "坚定的价值观和理想", "富有创造力和写作天赋", "安静但有力量的影响力"],
    weaknesses: ["容易因关注他人而忽视自己", "过于完美主义", "可能因理想与现实落差而沮丧", "不轻易敞开心扉", "容易精疲力竭"],
    celebrities: ["甘地（Gandhi）", "特蕾莎修女（Mother Teresa）", "荣格（Carl Jung）"],
    careers: ["心理咨询师", "作家", "社会工作者", "教师/教育工作者", "非营利组织领导者"]
  },
  INFP: {
    code: "INFP",
    name: "调停者",
    nickname: "The Mediator",
    group: "NF 理想主义者",
    description: "诗意、善良的利他主义者，总是热情地为正当事业提供帮助。你内心丰富而敏感，追求真实和意义，对美好事物有天然的感知力。",
    strengths: ["富有同情心和同理心", "创造力和想象力丰富", "价值观坚定，忠于自我", "善于发现人的潜能", "谦逊而真诚"],
    weaknesses: ["容易自我怀疑和不安全", "可能过于理想化", "容易被批评伤害", "拖延倾向", "不喜欢冲突和对抗"],
    celebrities: ["莎士比亚（William Shakespeare）", "J.R.R.托尔金（J.R.R. Tolkien）", "海伦·凯勒（Helen Keller）"],
    careers: ["作家/诗人", "艺术家", "心理咨询师", "设计师", "非营利工作者"]
  },
  ENFJ: {
    code: "ENFJ",
    name: "主人公",
    nickname: "The Protagonist",
    group: "NF 理想主义者",
    description: "富有魅力、鼓舞人心的领导者，能让听众为之倾倒。你天生善于理解和影响他人，热衷于帮助别人成长，是温暖而有力的引导者。",
    strengths: ["天生的沟通者和领导者", "极强的同理心和人际感知力", "善于激励和引导他人", "有责任感和使命感", "热情而有感染力"],
    weaknesses: ["可能过于关注他人而忽视自己", "对批评敏感", "有时过于理想化", "容易自我牺牲", "决策时可能受情感影响"],
    celebrities: ["奥巴马（Barack Obama）", "奥普拉（Oprah Winfrey）", "曼德拉（Nelson Mandela）"],
    careers: ["教师/培训师", "人力资源经理", "政治家", "公关总监", "心理咨询师"]
  },
  ENFP: {
    code: "ENFP",
    name: "竞选者",
    nickname: "The Campaigner",
    group: "NF 理想主义者",
    description: "热情、有创造力、爱社交的自由灵魂，总能在事物中发现闪光点。你充满热情和好奇心，喜欢探索各种可能性，是天生的沟通者和灵感激发者。",
    strengths: ["热情洋溢，充满活力", "创造力和想象力丰富", "善于社交和建立联系", "适应力强，思维灵活", "有感染力和鼓舞力"],
    weaknesses: ["容易三分钟热度", "不喜欢日常琐事和细节", "可能缺乏条理", "容易因压力而焦虑", "有时过于乐观而忽视现实"],
    celebrities: ["罗宾·威廉姆斯（Robin Williams）", "沃尔特·迪士尼（Walt Disney）", "马克·吐温（Mark Twain）"],
    careers: ["市场营销/品牌策划", "创意总监", "记者/媒体人", "活动策划", "创业者"]
  },

  // ========== SJ 护卫者 ==========
  ISTJ: {
    code: "ISTJ",
    name: "物流师",
    nickname: "The Logistician",
    group: "SJ 护卫者",
    description: "实际且注重事实的人，可靠性不容怀疑。你做事严谨踏实，重视秩序和传统，是团队中最值得信赖的基石。",
    strengths: ["可靠负责，值得信赖", "做事严谨有条理", "重视事实和细节", "忠于职责和承诺", "脚踏实地，执行力强"],
    weaknesses: ["可能过于死板，缺乏灵活性", "不擅长情感表达", "对变化和不确定有抵触", "可能过于批判", "不善于即兴发挥"],
    celebrities: ["乔治·华盛顿（George Washington）", "安吉拉·默克尔（Angela Merkel）", "沃伦·巴菲特（Warren Buffett）"],
    careers: ["会计师/审计师", "项目经理", "军官/公务员", "工程师", "质量控制经理"]
  },
  ISFJ: {
    code: "ISFJ",
    name: "守卫者",
    nickname: "The Defender",
    group: "SJ 护卫者",
    description: "非常专注而温暖的守护者，时刻准备保护爱的人。你默默付出，细致周到，是朋友和家人最温暖的港湾。",
    strengths: ["细心体贴，善解人意", "忠诚可靠，默默奉献", "善于记忆和关注细节", "有耐心和同情心", "做事勤勉踏实"],
    weaknesses: ["可能过于谦虚，不善自我推销", "容易压抑自己的需求", "不喜欢变化和冲突", "容易因过度付出而疲惫", "可能过于保守"],
    celebrities: ["特蕾莎修女（Mother Teresa）", "凯特·米德尔顿（Kate Middleton）", "罗莎·帕克斯（Rosa Parks）"],
    careers: ["护士/护理师", "教师", "社工", "行政助理", "客户服务"]
  },
  ESTJ: {
    code: "ESTJ",
    name: "总经理",
    nickname: "The Executive",
    group: "SJ 护卫者",
    description: "出色的管理者，在管理事情或人员方面无与伦比。你天生善于组织和领导，重视秩序、效率和传统，是社会运转的中坚力量。",
    strengths: ["组织管理能力强", "果断高效，执行力出色", "责任心和可靠性强", "重视秩序和规则", "坦率直接"],
    weaknesses: ["可能过于固执和强势", "不够灵活，难以接受新事物", "可能忽视他人感受", "对不遵守规则者缺乏耐心", "有时不够敏感"],
    celebrities: ["亨利·福特（Henry Ford）", "詹姆斯·门罗（James Monroe）", "桑娅·索托马约尔（Sonia Sotomayor）"],
    careers: ["企业高管/经理", "项目经理", "军人/警察", "法官", "银行经理"]
  },
  ESFJ: {
    code: "ESFJ",
    name: "执政官",
    nickname: "The Consul",
    group: "SJ 护卫者",
    description: "极有同情心、爱交往、受欢迎的人，总是热心帮助。你重视和谐的人际关系，善于照顾他人，是社交圈中最温暖的存在。",
    strengths: ["热心肠，乐于助人", "善于社交，人缘好", "有强烈的责任感和忠诚度", "注重和谐与团队协作", "善于组织和筹办活动"],
    weaknesses: ["可能过于在意他人看法", "不擅长处理冲突", "可能过于传统和保守", "容易因批评而受伤", "有时忽视自己的需求"],
    celebrities: ["泰勒·斯威夫特（Taylor Swift）", "比尔·克林顿（Bill Clinton）", "詹妮弗·加纳（Jennifer Garner）"],
    careers: ["人力资源", "教师", "护士/医疗护理", "公关/客户经理", "活动策划"]
  },

  // ========== SP 艺术创造者 ==========
  ISTP: {
    code: "ISTP",
    name: "鉴赏家",
    nickname: "The Virtuoso",
    group: "SP 艺术创造者",
    description: "大胆而实际的实验家，擅长使用各种工具。你冷静、灵活，善于动手解决问题，在危机中保持头脑清醒，是天生的实干家。",
    strengths: ["动手能力强，善于实践", "冷静沉着，擅长应对危机", "思维灵活，适应力强", "独立自主", "善于分析机械和系统"],
    weaknesses: ["可能过于独立，不喜欢团队合作", "不善于情感表达", "容易厌倦常规", "可能冒险和鲁莽", "不喜欢长期规划和承诺"],
    celebrities: ["克林特·伊斯特伍德（Clint Eastwood）", "贝尔·格里尔斯（Bear Grylls）", "迈克尔·乔丹（Michael Jordan）"],
    careers: ["工程师/机械师", "飞行员", "外科医生", "消防员/急救员", "运动员"]
  },
  ISFP: {
    code: "ISFP",
    name: "探险家",
    nickname: "The Adventurer",
    group: "SP 艺术创造者",
    description: "灵活有魅力的艺术家，时刻准备探索和体验新事物。你审美敏锐，重视个人自由和真实表达，是安静但内心丰富的体验者。",
    strengths: ["审美能力强，富有艺术感", "温和善良，善于倾听", "灵活随性，适应力强", "有独特的个人风格", "活在当下，享受生活"],
    weaknesses: ["可能缺乏长远规划", "不擅长处理压力", "容易回避冲突", "可能过于敏感", "不喜欢被约束和规划"],
    celebrities: ["鲍勃·迪伦（Bob Dylan）", "迈克尔·杰克逊（Michael Jackson）", "弗里达·卡罗（Frida Kahlo）"],
    careers: ["艺术家/设计师", "音乐家", "摄影师", "厨师", "兽医"]
  },
  ESTP: {
    code: "ESTP",
    name: "企业家",
    nickname: "The Entrepreneur",
    group: "SP 艺术创造者",
    description: "聪明、精力充沛的感知者，享受冒险。你喜欢快节奏和高风险，天生善于抓住机会和掌控局面，是行动派中的行动派。",
    strengths: ["行动力极强，果断", "善于抓住机会", "社交能力强", "适应力强，反应快", "有冒险精神和勇气"],
    weaknesses: ["可能过于冒险", "缺乏耐心做长期规划", "容易厌倦常规和细节", "可能忽视他人感受", "有时不够考虑后果"],
    celebrities: ["麦当娜（Madonna）", "欧内斯特·海明威（Ernest Hemingway）", "唐纳德·特朗普（Donald Trump）"],
    careers: ["销售经理", "创业者", "股票交易员", "运动员/教练", "急救人员"]
  },
  ESFP: {
    code: "ESFP",
    name: "表演者",
    nickname: "The Entertainer",
    group: "SP 艺术创造者",
    description: "自发、精力充沛、热情的表演者——周围永远不无聊。你是聚会的灵魂，善于享受当下，用热情和幽默感染身边的每一个人。",
    strengths: ["热情开朗，充满活力", "善于社交，有感染力", "审美能力强", "适应力强，灵活变通", "善于享受当下，热爱生活"],
    weaknesses: ["可能缺乏长远规划", "容易厌倦理论和抽象", "不喜欢冲突和批评", "可能过于关注表面", "有时容易冲动"],
    celebrities: ["玛丽莲·梦露（Marilyn Monroe）", "埃尔顿·约翰（Elton John）", "贾米·奥利弗（Jamie Oliver）"],
    careers: ["演员/表演者", "活动策划", "销售", "导游", "美容/时尚顾问"]
  }
};
