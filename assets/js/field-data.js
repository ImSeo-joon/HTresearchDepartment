(function () {
  "use strict";

  var groups = [
    {
      value: "digital",
      label: { en: "Digital & information", zh: "数字与信息", fr: "Numérique et information" }
    },
    {
      value: "intelligent",
      label: { en: "Intelligence & control", zh: "智能与控制", fr: "Intelligence et contrôle" }
    },
    {
      value: "electronic",
      label: { en: "Electronic & communication", zh: "电子与通信", fr: "Électronique et communication" }
    },
    {
      value: "physical",
      label: { en: "Materials & manufacturing", zh: "材料与制造", fr: "Matériaux et fabrication" }
    },
    {
      value: "built",
      label: { en: "Built & environmental", zh: "土木与环境", fr: "Bâti et environnement" }
    },
    {
      value: "life_energy",
      label: { en: "Life & energy", zh: "生命与能源", fr: "Vie et énergie" }
    },
    {
      value: "cross",
      label: { en: "Cross-engineering", zh: "交叉工科", fr: "Ingénierie croisée" }
    }
  ];

  var fields = [
    {
      value: "ai_core",
      group: "digital",
      label: { en: "AI foundations", zh: "人工智能基础", fr: "Fondements de l’IA" },
      desc: {
        en: "Representation learning, reasoning, agents and general models.",
        zh: "表征学习、推理、智能体与通用模型。",
        fr: "Représentations, raisonnement, agents et modèles généraux."
      }
    },
    {
      value: "generative_ai",
      group: "digital",
      label: { en: "Generative AI", zh: "生成式人工智能", fr: "IA générative" },
      desc: {
        en: "Large language models, diffusion models and multimodal generation.",
        zh: "大语言模型、扩散模型与多模态生成。",
        fr: "Grands modèles de langage, diffusion et génération multimodale."
      }
    },
    {
      value: "computer_vision",
      group: "digital",
      label: { en: "Computer vision", zh: "计算机视觉", fr: "Vision par ordinateur" },
      desc: {
        en: "Images, video, 3D perception and visual foundation models.",
        zh: "图像、视频、三维感知与视觉基础模型。",
        fr: "Images, vidéo, perception 3D et modèles visuels."
      }
    },
    {
      value: "nlp",
      group: "digital",
      label: { en: "Natural language processing", zh: "自然语言处理", fr: "Traitement du langage" },
      desc: {
        en: "Understanding, generation, retrieval and language-model evaluation.",
        zh: "理解、生成、检索与语言模型评估。",
        fr: "Compréhension, génération, recherche et évaluation des modèles."
      }
    },
    {
      value: "data_science",
      group: "digital",
      label: { en: "Data science & statistics", zh: "数据科学与统计", fr: "Science des données et statistiques" },
      desc: {
        en: "Causal inference, statistical learning and data infrastructure.",
        zh: "因果推断、统计学习与数据基础设施。",
        fr: "Inférence causale, apprentissage statistique et infrastructures."
      }
    },
    {
      value: "computer_systems",
      group: "digital",
      label: { en: "Computer systems", zh: "计算机系统", fr: "Systèmes informatiques" },
      desc: {
        en: "Architecture, operating systems, distributed systems and performance.",
        zh: "体系结构、操作系统、分布式系统与性能。",
        fr: "Architecture, systèmes d’exploitation, systèmes distribués et performance."
      }
    },
    {
      value: "networks",
      group: "digital",
      label: { en: "Computer networks", zh: "计算机网络", fr: "Réseaux informatiques" },
      desc: {
        en: "Protocols, programmable networks, operations and measurement.",
        zh: "协议、可编程网络、网络运维与测量。",
        fr: "Protocoles, réseaux programmables, exploitation et mesure."
      }
    },
    {
      value: "cybersecurity",
      group: "digital",
      label: { en: "Cybersecurity", zh: "网络空间安全", fr: "Cybersécurité" },
      desc: {
        en: "Systems security, privacy, adversarial behaviour and model security.",
        zh: "系统安全、隐私、对抗行为与模型安全。",
        fr: "Sécurité des systèmes, vie privée, adversaires et sécurité des modèles."
      }
    },
    {
      value: "software_engineering",
      group: "digital",
      label: { en: "Software engineering", zh: "软件工程", fr: "Génie logiciel" },
      desc: {
        en: "Program analysis, testing, AI-assisted development and empirical studies.",
        zh: "程序分析、测试、智能开发与工程实证。",
        fr: "Analyse de programmes, tests, développement assisté par IA et études empiriques."
      }
    },
    {
      value: "hci",
      group: "digital",
      label: { en: "Human–computer interaction", zh: "人机交互", fr: "Interaction humain-machine" },
      desc: {
        en: "Interaction design, usability, collaboration and AI experience.",
        zh: "交互设计、可用性、协作与人工智能体验。",
        fr: "Conception, utilisabilité, collaboration et expérience de l’IA."
      }
    },
    {
      value: "robotics",
      group: "intelligent",
      label: { en: "Robotics & embodied AI", zh: "机器人与具身智能", fr: "Robotique et IA incarnée" },
      desc: {
        en: "Perception, manipulation, locomotion and vision-language-action models.",
        zh: "感知、操作、运动与视觉—语言—动作模型。",
        fr: "Perception, manipulation, locomotion et modèles vision-langage-action."
      }
    },
    {
      value: "control",
      group: "intelligent",
      label: { en: "Control engineering", zh: "控制科学与工程", fr: "Automatique" },
      desc: {
        en: "Learning control, safety, estimation and autonomous decision-making.",
        zh: "学习控制、安全控制、估计与自主决策。",
        fr: "Commande apprenante, sûreté, estimation et décision autonome."
      }
    },
    {
      value: "industrial",
      group: "intelligent",
      label: { en: "Industrial & systems engineering", zh: "工业与系统工程", fr: "Génie industriel et systèmes" },
      desc: {
        en: "Operations research, supply chains, manufacturing systems and human factors.",
        zh: "运筹优化、供应链、制造系统与人因。",
        fr: "Recherche opérationnelle, chaînes logistiques, fabrication et facteurs humains."
      }
    },
    {
      value: "electrical",
      group: "electronic",
      label: { en: "Electrical engineering", zh: "电气工程", fr: "Génie électrique" },
      desc: {
        en: "Power systems, machines, power electronics and grid integration.",
        zh: "电力系统、电机、电力电子与储能并网。",
        fr: "Réseaux électriques, machines, électronique de puissance et intégration au réseau."
      }
    },
    {
      value: "electronics",
      group: "electronic",
      label: { en: "Microelectronics & integrated circuits", zh: "微电子与集成电路", fr: "Microélectronique et circuits" },
      desc: {
        en: "Chip architecture, devices, packaging and compute-in-memory.",
        zh: "芯片架构、器件、封装与存算一体。",
        fr: "Architecture, dispositifs, packaging et calcul en mémoire."
      }
    },
    {
      value: "communications",
      group: "electronic",
      label: { en: "Information & communication engineering", zh: "信息与通信工程", fr: "Information et communication" },
      desc: {
        en: "Wireless, 6G, integrated sensing and communication, and network theory.",
        zh: "无线、6G、感知通信一体化与网络理论。",
        fr: "Sans fil, 6G, communication et détection intégrées, théorie des réseaux."
      }
    },
    {
      value: "photonics",
      group: "electronic",
      label: { en: "Optical & photonic engineering", zh: "光学与光子工程", fr: "Optique et photonique" },
      desc: {
        en: "Integrated photonics, optical communications, lasers and optical computing.",
        zh: "集成光子、光通信、激光与光计算。",
        fr: "Photonique intégrée, communications optiques, lasers et calcul optique."
      }
    },
    {
      value: "instrumentation",
      group: "electronic",
      label: { en: "Instrumentation science", zh: "仪器科学与技术", fr: "Science des instruments" },
      desc: {
        en: "Sensing, measurement, imaging, quantum sensing and edge perception.",
        zh: "传感、测量、成像、量子传感与边缘感知。",
        fr: "Capteurs, métrologie, imagerie, détection quantique et perception embarquée."
      }
    },
    {
      value: "materials",
      group: "physical",
      label: { en: "Materials science & engineering", zh: "材料科学与工程", fr: "Science des matériaux" },
      desc: {
        en: "Computational materials, generative design, characterisation and energy materials.",
        zh: "计算材料、生成式设计、表征与能源材料。",
        fr: "Matériaux computationnels, conception générative, caractérisation et matériaux énergétiques."
      }
    },
    {
      value: "chemical",
      group: "physical",
      label: { en: "Chemical engineering", zh: "化学工程与技术", fr: "Génie chimique" },
      desc: {
        en: "Process systems, catalysis, reaction engineering and autonomous experimentation.",
        zh: "过程系统、催化、反应工程与自主实验。",
        fr: "Systèmes de procédés, catalyse, génie de la réaction et expérimentation autonome."
      }
    },
    {
      value: "mechanical",
      group: "physical",
      label: { en: "Mechanical engineering", zh: "机械工程", fr: "Génie mécanique" },
      desc: {
        en: "Mechanics, thermofluids, computational mechanics, robotics and additive manufacturing.",
        zh: "力学、热流体、计算力学、机器人与增材制造。",
        fr: "Mécanique, thermofluides, mécanique computationnelle, robotique et fabrication additive."
      }
    },
    {
      value: "aerospace",
      group: "physical",
      label: { en: "Aerospace engineering", zh: "航空航天工程", fr: "Génie aérospatial" },
      desc: {
        en: "Vehicle design, propulsion, guidance, satellites and space systems.",
        zh: "飞行器设计、推进、制导、卫星与空间系统。",
        fr: "Conception, propulsion, guidage, satellites et systèmes spatiaux."
      }
    },
    {
      value: "nuclear",
      group: "physical",
      label: { en: "Nuclear science & technology", zh: "核科学与技术", fr: "Sciences et techniques nucléaires" },
      desc: {
        en: "Reactor physics, safety, fuel cycles and nuclear applications.",
        zh: "反应堆物理、核安全、核燃料与核技术应用。",
        fr: "Physique des réacteurs, sûreté, cycle du combustible et applications."
      }
    },
    {
      value: "civil",
      group: "built",
      label: { en: "Civil engineering", zh: "土木工程", fr: "Génie civil" },
      desc: {
        en: "Structures, geotechnics, transport, disaster resilience and digital twins.",
        zh: "结构、岩土、交通、防灾与数字孪生。",
        fr: "Structures, géotechnique, transport, résilience et jumeaux numériques."
      }
    },
    {
      value: "environmental",
      group: "built",
      label: { en: "Environmental engineering", zh: "环境科学与工程", fr: "Génie de l’environnement" },
      desc: {
        en: "Water, air, ecological monitoring and low-carbon treatment.",
        zh: "水质、空气、生态监测与低碳治理。",
        fr: "Eau, air, suivi écologique et traitement bas carbone."
      }
    },
    {
      value: "biomedical",
      group: "life_energy",
      label: { en: "Biomedical engineering", zh: "生物医学工程", fr: "Génie biomédical" },
      desc: {
        en: "Medical imaging, biomechanics, devices and health foundation models.",
        zh: "医学影像、生物力学、器械与健康基础模型。",
        fr: "Imagerie médicale, biomécanique, dispositifs et modèles de santé."
      }
    },
    {
      value: "energy",
      group: "life_energy",
      label: { en: "Energy & power engineering", zh: "能源与动力工程", fr: "Énergie et puissance" },
      desc: {
        en: "Renewables, storage, hydrogen, propulsion and decarbonisation.",
        zh: "可再生、储能、氢能、动力系统与低碳转型。",
        fr: "Renouvelables, stockage, hydrogène, propulsion et décarbonation."
      }
    },
    {
      value: "interdisciplinary_eng",
      group: "cross",
      label: { en: "Cross-engineering", zh: "交叉工科", fr: "Ingénierie croisée" },
      desc: {
        en: "Genuine integration across two or more engineering fields.",
        zh: "跨越两个或更多工科方向的真实整合。",
        fr: "Intégration réelle de deux domaines d’ingénierie ou plus."
      }
    }
  ];

  window.HTRD_ENGINEERING_GROUPS = groups;
  window.HTRD_ENGINEERING_FIELDS = fields;

  var jaGroups = {
    digital: "デジタル・情報",
    intelligent: "知能・制御",
    electronic: "電子・通信",
    physical: "材料・製造",
    built: "建設・環境",
    life_energy: "生命・エネルギー",
    cross: "横断工学"
  };

  var jaFields = {
    ai_core: ["人工知能基礎", "表現学習、推論、エージェント、汎用モデル。"],
    generative_ai: ["生成AI", "大規模言語モデル、拡散モデル、マルチモーダル生成。"],
    computer_vision: ["コンピュータビジョン", "画像、動画、3D知覚、視覚基盤モデル。"],
    nlp: ["自然言語処理", "理解、生成、検索、言語モデル評価。"],
    data_science: ["データ科学・統計", "因果推論、統計学習、データ基盤。"],
    computer_systems: ["計算機システム", "アーキテクチャ、OS、分散システム、性能。"],
    networks: ["コンピュータネットワーク", "プロトコル、プログラマブルネットワーク、運用、計測。"],
    cybersecurity: ["サイバーセキュリティ", "システムセキュリティ、プライバシー、敵対的攻撃、モデル安全性。"],
    software_engineering: ["ソフトウェア工学", "プログラム解析、テスト、AI支援開発、実証研究。"],
    hci: ["ヒューマン・コンピュータ・インタラクション", "対話設計、ユーザビリティ、協働、AI体験。"],
    robotics: ["ロボティクス・身体知能", "知覚、操作、移動、視覚言語行動モデル。"],
    control: ["制御工学", "学習制御、安全制御、推定、自律意思決定。"],
    industrial: ["産業・システム工学", "オペレーションズリサーチ、サプライチェーン、生産システム、人間要因。"],
    electrical: ["電気工学", "電力系統、電機、パワーエレクトロニクス、系統連系。"],
    electronics: ["マイクロエレクトロニクス・集積回路", "チップアーキテクチャ、デバイス、実装、存算一体。"],
    communications: ["情報通信工学", "無線、6G、通信センシング統合、ネットワーク理論。"],
    photonics: ["光学・フォトニクス", "集積フォトニクス、光通信、レーザー、光計算。"],
    instrumentation: ["計測科学技術", "センシング、計測、イメージング、量子センシング、エッジ知覚。"],
    materials: ["材料科学・工学", "計算材料、生成設計、キャラクタリゼーション、エネルギー材料。"],
    chemical: ["化学工学", "プロセスシステム、触媒、反応工学、自律実験。"],
    mechanical: ["機械工学", "力学、熱流体、計算力学、ロボティクス、積層造形。"],
    aerospace: ["航空宇宙工学", "機体設計、推進、誘導、衛星、宇宙システム。"],
    nuclear: ["核科学・技術", "炉物理、安全性、燃料サイクル、核技術応用。"],
    civil: ["土木工学", "構造、地盤、交通、防災、デジタルツイン。"],
    environmental: ["環境科学・工学", "水質、大気、生態モニタリング、低炭素処理。"],
    biomedical: ["生体医工学", "医用画像、生体力学、デバイス、健康基盤モデル。"],
    energy: ["エネルギー・動力工学", "再生可能エネルギー、蓄エネルギー、水素、動力、脱炭素。"],
    interdisciplinary_eng: ["横断工学", "二つ以上の工学分野の実質的統合。"]
  };

  groups.forEach(function (group) {
    group.label.ja = jaGroups[group.value] || group.label.en;
  });
  fields.forEach(function (field) {
    var value = jaFields[field.value];
    field.label.ja = value ? value[0] : field.label.en;
    field.desc.ja = value ? value[1] : field.desc.en;
  });

  var languages = ["en", "zh", "fr", "ja"];
  languages.forEach(function (lang) {
    if (!window.I18N) return;
    if (!window.I18N[lang]) window.I18N[lang] = {};
    if (!window.I18N[lang].studio) window.I18N[lang].studio = {};
    if (!window.I18N[lang].studio.form) window.I18N[lang].studio.form = {};
    window.I18N[lang].studio.form.engineeringGroups = groups.map(function (group) {
      return { value: group.value, label: group.label[lang] };
    });
    window.I18N[lang].studio.form.engineeringFields = fields.map(function (field) {
      return {
        value: field.value,
        label: field.label[lang],
        desc: field.desc[lang],
        group: field.group
      };
    });
    if (!window.I18N[lang].studio.charter) window.I18N[lang].studio.charter = {};
    var notes = window.I18N[lang].studio.charter.engineeringNotes || {};
    fields.forEach(function (field) {
      notes[field.value] = field.desc[lang];
    });
    window.I18N[lang].studio.charter.engineeringNotes = notes;
  });
})();
