function paperEntry(id, field, date, type, title, authors, short, venue, url, tags, note, featured) {
  return {
    id: id,
    field: field,
    date: date,
    year: Number(date.slice(0, 4)),
    type: type,
    title: title,
    authors: authors,
    short: short,
    venue: venue,
    url: url,
    tags: tags,
    note: { en: note[0], zh: note[1], fr: note[2] },
    featured: Boolean(featured)
  };
}

window.PAPER_INDEX = [
  paperEntry(
    "deepseek-r1", "ai_core", "2025-01-22", "method",
    "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
    "DeepSeek-AI, Guo, D., Yang, D., et al.",
    "DeepSeek-AI et al.", "arXiv",
    "https://arxiv.org/abs/2501.12948",
    ["reasoning", "reinforcement learning", "LLM"],
    [
      "A transparent account of how reinforcement learning can elicit long-form reasoning; read it for the training recipe, the evaluation design and the limits of benchmark gains.",
      "一份关于强化学习如何激发长链推理的透明记录。重点读训练配方、评估设计，以及基准提升的边界。",
      "Un compte rendu transparent de l’apprentissage par renforcement du raisonnement long ; lisez la recette, l’évaluation et les limites des gains de benchmark."
    ], true
  ),
  paperEntry(
    "mamba", "ai_core", "2023-12-02", "method",
    "Mamba: Linear-Time Sequence Modeling with Selective State Spaces",
    "Gu, A., & Dao, T.",
    "Gu & Dao", "COLM 2024",
    "https://arxiv.org/abs/2312.00752",
    ["state space models", "sequence modelling", "efficiency"],
    [
      "A selective state-space alternative to attention with linear-time sequence modelling. Read it as an architecture argument, not a settled replacement for transformers.",
      "用选择性状态空间实现线性时间序列建模的注意力替代方案。应把它当作架构论证来读，而不是已定论的 Transformer 替代品。",
      "Une alternative aux espaces d’état sélectifs pour la modélisation linéaire des séquences ; à lire comme un argument d’architecture, non comme un remplacement établi."
    ]
  ),
  paperEntry(
    "llm-agents", "ai_core", "2023-08-22", "survey",
    "A Survey on Large Language Model based Autonomous Agents",
    "Wang, L., Ma, C., Feng, X., et al.",
    "Wang et al.", "Frontiers of Computer Science",
    "https://arxiv.org/abs/2308.11432",
    ["agents", "planning", "tool use"],
    [
      "A useful map of agent architectures, planning loops and tool use. Read it to compare designs, and keep its optimistic framing in view.",
      "一份智能体架构、规划循环与工具使用的实用地图。适合比较不同设计，同时留意其偏乐观的叙事框架。",
      "Une carte utile des architectures d’agents, des boucles de planification et de l’usage d’outils ; gardez son cadrage optimiste à l’esprit."
    ]
  ),
  paperEntry(
    "llama3", "generative_ai", "2024-08-01", "method",
    "The Llama 3 Herd of Models",
    "Grattafiori, A., Dubey, A., Jauhri, A., et al. (Llama Team)",
    "Llama Team", "arXiv",
    "https://arxiv.org/abs/2407.21783",
    ["LLM", "pre-training", "post-training"],
    [
      "A detailed industrial account of data, scaling, post-training and evaluation for a model family. Read for the pipeline and the choices that remain proprietary.",
      "一份关于模型家族的数据、扩展、后训练与评估的工业级详述。重点读流水线，以及仍然不透明的关键选择。",
      "Un compte rendu industriel détaillé des données, du passage à l’échelle, du post-entraînement et de l’évaluation ; lisez le pipeline et ce qui reste propriétaire."
    ], true
  ),
  paperEntry(
    "latent-diffusion", "generative_ai", "2021-12-21", "method",
    "High-Resolution Image Synthesis with Latent Diffusion Models",
    "Rombach, R., Blattmann, A., Lorenz, D., et al.",
    "Rombach et al.", "CVPR 2022",
    "https://arxiv.org/abs/2112.10752",
    ["diffusion", "image synthesis", "latent space"],
    [
      "The paper that made diffusion practical at high resolution by moving the generative process into a compressed latent space. Read the trade-offs between fidelity, compute and control.",
      "把扩散过程移入压缩潜空间，使高分辨率生成变得可行的论文。重点读保真度、算力与控制力之间的取舍。",
      "L’article qui a rendu la diffusion pratique en haute résolution grâce à un espace latent compressé ; lisez les compromis entre fidélité, calcul et contrôle."
    ]
  ),
  paperEntry(
    "dpo", "generative_ai", "2023-05-30", "method",
    "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
    "Rafailov, R., Sharma, A., Mitchell, E., et al.",
    "Rafailov et al.", "NeurIPS 2023",
    "https://arxiv.org/abs/2305.18290",
    ["alignment", "preference learning", "RLHF"],
    [
      "A clean reformulation that turns preference alignment into a supervised objective. Read it for the derivation and for what it assumes about preference data.",
      "把偏好对齐改写为监督目标的简洁工作。重点读推导过程，以及它对偏好数据所作的假设。",
      "Une reformulation élégante de l’alignement par préférences en objectif supervisé ; lisez la dérivation et ses hypothèses sur les données."
    ]
  ),
  paperEntry(
    "llm-eval", "generative_ai", "2024-01-23", "survey",
    "A Survey on Evaluation of Large Language Models",
    "Chang, Y., Wang, X., Wang, J., et al.",
    "Chang et al.", "ACM TIST",
    "https://doi.org/10.1145/3641289",
    ["evaluation", "benchmarks", "LLM"],
    [
      "A broad inventory of what LLM evaluation covers and where it breaks down. Use it to design an evaluation argument rather than to pick a leaderboard.",
      "系统盘点大模型评估覆盖了什么、又在哪里失效。适合用来设计评估论证，而不是挑选排行榜。",
      "Un inventaire large de l’évaluation des LLM et de ses angles morts ; pour construire un argument d’évaluation, pas pour choisir un classement."
    ]
  ),
  paperEntry(
    "sam", "computer_vision", "2023-04-06", "method",
    "Segment Anything",
    "Kirillov, A., Mintun, E., Ravi, N., et al.",
    "Kirillov et al.", "ICCV 2023",
    "https://arxiv.org/abs/2304.02643",
    ["segmentation", "foundation models", "prompting"],
    [
      "A promptable segmentation model and a data engine for scaling masks. Read it for the task formulation and the assumptions baked into the dataset.",
      "可提示分割模型与规模化掩码数据引擎。重点读任务形式化，以及数据集内嵌的假设。",
      "Un modèle de segmentation promptable et un moteur de données pour les masques ; lisez la formulation de la tâche et les hypothèses du jeu de données."
    ], true
  ),
  paperEntry(
    "sam2", "computer_vision", "2024-08-01", "method",
    "SAM 2: Segment Anything in Images and Videos",
    "Ravi, N., Gabeur, V., Hu, Y.-T., et al.",
    "Ravi et al.", "arXiv",
    "https://arxiv.org/abs/2408.00714",
    ["video segmentation", "memory", "streaming"],
    [
      "Extends promptable segmentation to video with a streaming memory. Read for the memory design and the cost of maintaining object identity over time.",
      "用流式记忆把可提示分割扩展到视频。重点读记忆设计，以及跨时间维持目标身份的成本。",
      "Étend la segmentation promptable à la vidéo grâce à une mémoire en flux ; lisez la conception de la mémoire et le coût de l’identité temporelle."
    ]
  ),
  paperEntry(
    "dinov2", "computer_vision", "2023-04-14", "method",
    "DINOv2: Learning Robust Visual Features without Supervision",
    "Oquab, M., Darcet, T., Moutakanni, T., et al.",
    "Oquab et al.", "TMLR",
    "https://arxiv.org/abs/2304.07193",
    ["self-supervised learning", "visual features", "transfer"],
    [
      "A careful recipe for self-supervised visual features that transfer across tasks. Read for data curation, distillation and the evaluation breadth.",
      "一套可跨任务迁移的自监督视觉特征配方。重点读数据治理、蒸馏与评估广度。",
      "Une recette soignée de représentations visuelles auto-supervisées transférables ; lisez la curation des données, la distillation et l’évaluation."
    ]
  ),
  paperEntry(
    "rag", "nlp", "2020-05-23", "method",
    "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    "Lewis, P., Perez, E., Piktus, A., et al.",
    "Lewis et al.", "NeurIPS 2020",
    "https://arxiv.org/abs/2005.11401",
    ["retrieval", "generation", "knowledge"],
    [
      "The canonical retrieval-augmented generation formulation. Read it for the separation between parametric memory and retrieved evidence, and for the evaluation limits.",
      "检索增强生成的经典表述。重点读参数记忆与检索证据的分工，以及评估上的边界。",
      "La formulation canonique de la génération augmentée par recherche ; lisez la séparation entre mémoire paramétrique et preuves retrouvées."
    ]
  ),
  paperEntry(
    "cot", "nlp", "2022-01-28", "method",
    "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    "Wei, J., Wang, X., Schuurmans, D., et al.",
    "Wei et al.", "NeurIPS 2022",
    "https://arxiv.org/abs/2201.11903",
    ["reasoning", "prompting", "evaluation"],
    [
      "Shows that intermediate reasoning traces can improve performance on multi-step tasks. Read for the conditions and the difference between traces and explanations.",
      "表明中间推理轨迹能提升多步任务表现。重点读成立条件，以及推理轨迹与解释之间的差别。",
      "Montre que des traces de raisonnement améliorent les tâches multi-étapes ; lisez les conditions et la différence entre trace et explication."
    ]
  ),
  paperEntry(
    "lora", "nlp", "2021-06-18", "method",
    "LoRA: Low-Rank Adaptation of Large Language Models",
    "Hu, E. J., Shen, Y., Wallis, P., et al.",
    "Hu et al.", "ICLR 2022",
    "https://arxiv.org/abs/2106.09685",
    ["fine-tuning", "parameter efficiency", "adaptation"],
    [
      "A low-rank adaptation method that changed the economics of fine-tuning. Read for the rank trade-off and the limits of adapter-based evaluation.",
      "改变微调经济学的低秩适配方法。重点读秩的取舍，以及适配器评估的边界。",
      "Une adaptation de bas rang qui a changé l’économie du fine-tuning ; lisez le compromis de rang et les limites de l’évaluation."
    ]
  ),
  paperEntry(
    "tabular-trees", "data_science", "2022-07-18", "survey",
    "Why do tree-based models still outperform deep learning on typical tabular data?",
    "Grinsztajn, L., Oyallon, E., & Varoquaux, G.",
    "Grinsztajn et al.", "NeurIPS D&B 2022",
    "https://arxiv.org/abs/2207.08815",
    ["tabular data", "tree models", "benchmarking"],
    [
      "A systematic benchmark that explains why tree ensembles remain strong on tabular tasks. Read for the dataset design and the limits of the benchmark.",
      "系统解释树集成为何在表格任务上仍然强势的基准研究。重点读数据集设计与基准边界。",
      "Un benchmark systématique expliquant la force des ensembles d’arbres sur les données tabulaires ; lisez la conception et les limites."
    ]
  ),
  paperEntry(
    "causal-ml", "data_science", "2025-06-15", "survey",
    "Causal Machine Learning: A Survey and Open Problems",
    "Kaddour, J., Lynch, A., Liu, Q., et al.",
    "Kaddour et al.", "Foundations and Trends in ML",
    "https://doi.org/10.1561/2400000052",
    ["causal inference", "machine learning", "identification"],
    [
      "A broad survey connecting causal identification with machine learning practice. Read for the taxonomy of assumptions and the open problems that remain.",
      "把因果识别与机器学习实践连接起来的综述。重点读假设分类与仍然开放的问题。",
      "Une vaste revue reliant identification causale et apprentissage automatique ; lisez la taxonomie des hypothèses et les problèmes ouverts."
    ]
  ),
  paperEntry(
    "tabnet", "data_science", "2019-08-20", "method",
    "TabNet: Attentive Interpretable Tabular Learning",
    "Arik, S. O., & Pfister, T.",
    "Arik & Pfister", "AAAI 2021",
    "https://arxiv.org/abs/1908.07442",
    ["tabular data", "attention", "interpretability"],
    [
      "An attention-based tabular architecture with built-in feature selection. Read it alongside stronger tree baselines before treating interpretability claims as settled.",
      "带内置特征选择的注意力表格架构。请与更强的树模型基线一起读，不要把可解释性主张当作定论。",
      "Une architecture tabulaire attentionnelle avec sélection de variables ; à lire avec de solides bases d’arbres avant de conclure sur l’interprétabilité."
    ]
  ),
  paperEntry(
    "vllm", "computer_systems", "2023-09-12", "method",
    "Efficient Memory Management for Large Language Model Serving with PagedAttention",
    "Kwon, W., Li, Z., Zhuang, S., et al.",
    "Kwon et al.", "SOSP 2023",
    "https://arxiv.org/abs/2309.06180",
    ["LLM serving", "memory management", "systems"],
    [
      "PagedAttention turns KV-cache memory into a paging problem. Read for the systems abstraction and the throughput story it enables.",
      "PagedAttention 把 KV 缓存内存管理转化为分页问题。重点读系统抽象，以及它带来的吞吐叙事。",
      "PagedAttention transforme le cache KV en problème de pagination ; lisez l’abstraction système et le débit obtenu."
    ], true
  ),
  paperEntry(
    "ring-attention", "computer_systems", "2023-10-03", "method",
    "Ring Attention with Blockwise Transformers for Near-Infinite Context",
    "Liu, H., Zaharia, M., & Abbeel, P.",
    "Liu et al.", "ICLR 2024",
    "https://arxiv.org/abs/2310.01889",
    ["long context", "distributed training", "attention"],
    [
      "Distributes sequence blocks around a ring to scale context length. Read for the communication pattern and the practical meaning of near-infinite context.",
      "用环形分布序列块来扩展上下文长度。重点读通信模式，以及近无限上下文的实际含义。",
      "Distribue des blocs de séquence en anneau pour étendre le contexte ; lisez le schéma de communication et le sens pratique du contexte quasi infini."
    ]
  ),
  paperEntry(
    "mooncake", "computer_systems", "2025-11-15", "method",
    "Mooncake: A KVCache-centric Disaggregated Architecture for LLM Serving",
    "Qin, R., Li, Z., He, W., et al.",
    "Qin et al.", "ACM TOCS",
    "https://doi.org/10.1145/3773772",
    ["LLM serving", "disaggregation", "KV cache"],
    [
      "A production-oriented architecture that separates prefill, decode and KV-cache storage. Read for the scheduling assumptions and the cost model.",
      "面向生产环境的解耦架构，分离预填充、解码与 KV 缓存存储。重点读调度假设与成本模型。",
      "Une architecture de production séparant prefill, décodage et stockage du cache KV ; lisez les hypothèses d’ordonnancement et le modèle de coût."
    ], true
  ),
  paperEntry(
    "flashattention2", "computer_systems", "2023-07-18", "method",
    "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning",
    "Dao, T.",
    "Dao", "ICLR 2024",
    "https://arxiv.org/abs/2307.08691",
    ["attention", "GPU kernels", "performance"],
    [
      "A kernel-level account of attention performance. Read for work partitioning and memory traffic, and for how much of model speed is systems work.",
      "从内核层面解释注意力性能。重点读工作划分与内存流量，以及模型速度中有多少其实来自系统工作。",
      "Une analyse au niveau du noyau de la performance d’attention ; lisez le partitionnement et le trafic mémoire."
    ]
  ),
  paperEntry(
    "llm-network-ops", "networks", "2025-01-07", "survey",
    "A Survey on Intelligent Network Operations and Performance Optimization Based on Large Language Models",
    "Long, S., Tan, J., Mao, B., et al.",
    "Long et al.", "IEEE COMST",
    "https://doi.org/10.1109/COMST.2025.3526606",
    ["network operations", "LLM", "optimisation"],
    [
      "A current map of LLM use in network operations, from telemetry to configuration. Read for the evaluation gap between demos and operational trust.",
      "关于大模型在网络运维中应用的最新地图，从遥测到配置。重点读演示效果与运维信任之间的评估缺口。",
      "Une carte récente des LLM pour l’exploitation des réseaux ; lisez l’écart d’évaluation entre démonstrations et confiance opérationnelle."
    ]
  ),
  paperEntry(
    "ai-packet-forwarding", "networks", "2022-11-04", "survey",
    "AI-Driven Packet Forwarding With Programmable Data Plane: A Survey",
    "Quan, W., Xu, Z., Liu, M., et al.",
    "Quan et al.", "IEEE COMST",
    "https://doi.org/10.1109/COMST.2022.3217613",
    ["programmable data plane", "packet forwarding", "AI"],
    [
      "Connects learned forwarding decisions to programmable data planes. Read for the latency and deployability constraints that shape the design space.",
      "把学习式转发决策连接到可编程数据平面。重点读塑造设计空间的时延与可部署性约束。",
      "Relie les décisions d’acheminement apprises aux plans de données programmables ; lisez les contraintes de latence et de déploiement."
    ]
  ),
  paperEntry(
    "intent-networking", "networks", "2022-11-03", "survey",
    "A Survey on Intent-Based Networking",
    "Leivadeas, A., & Falkner, M.",
    "Leivadeas & Falkner", "IEEE COMST",
    "https://doi.org/10.1109/COMST.2022.3215919",
    ["intent-based networking", "automation", "policy"],
    [
      "A structured account of intent translation, verification and assurance. Read for the gap between declarative intent and reliable enforcement.",
      "系统梳理意图翻译、验证与保障。重点读声明式意图与可靠执行之间的落差。",
      "Une synthèse de la traduction, vérification et assurance d’intentions ; lisez l’écart entre intention déclarative et application fiable."
    ]
  ),
  paperEntry(
    "prompt-injection", "cybersecurity", "2023-10-19", "method",
    "Formalizing and Benchmarking Prompt Injection Attacks and Defenses",
    "Liu, Y., Jia, Y., Geng, R., et al.",
    "Liu et al.", "USENIX Security 2024",
    "https://arxiv.org/abs/2310.12815",
    ["prompt injection", "LLM security", "benchmarking"],
    [
      "Formalises prompt injection and compares defences under a common benchmark. Read for the threat model and the ease of adaptive bypass.",
      "形式化提示注入并在统一基准上比较防御。重点读威胁模型，以及自适应绕过有多容易。",
      "Formalise l’injection de prompt et compare les défenses ; lisez le modèle de menace et la facilité des contournements adaptatifs."
    ], true
  ),
  paperEntry(
    "extracting-training-data", "cybersecurity", "2020-12-15", "applied",
    "Extracting Training Data from Large Language Models",
    "Carlini, N., Tramèr, F., Wallace, E., et al.",
    "Carlini et al.", "USENIX Security 2021",
    "https://arxiv.org/abs/2012.07805",
    ["privacy", "memorisation", "LLM"],
    [
      "Demonstrates that language models can memorise and emit training data. Read for the extraction method and what it implies for data governance.",
      "证明语言模型会记忆并输出训练数据。重点读抽取方法及其对数据治理的含义。",
      "Montre que les modèles mémorisent et restituent des données d’entraînement ; lisez la méthode et ses conséquences pour la gouvernance."
    ]
  ),
  paperEntry(
    "membership-inference", "cybersecurity", "2021-12-07", "method",
    "Membership Inference Attacks From First Principles",
    "Carlini, N., Chien, S., Nasr, M., et al.",
    "Carlini et al.", "IEEE S&P 2022",
    "https://arxiv.org/abs/2112.03570",
    ["membership inference", "privacy", "evaluation"],
    [
      "A principled membership-inference attack that exposes weaknesses in earlier evaluations. Read for the likelihood-ratio framing.",
      "从第一性原理出发的成员推断攻击，揭示早期评估的弱点。重点读似然比框架。",
      "Une attaque d’inférence d’appartenance fondée sur les principes ; lisez le cadrage par ratio de vraisemblance."
    ]
  ),
  paperEntry(
    "llm-se-review", "software_engineering", "2023-08-21", "survey",
    "Large Language Models for Software Engineering: A Systematic Literature Review",
    "Hou, X., Zhao, Y., Liu, Y., et al.",
    "Hou et al.", "ACM TOSEM",
    "https://arxiv.org/abs/2308.10620",
    ["software engineering", "LLM", "systematic review"],
    [
      "A systematic map of LLM applications across the software lifecycle. Read for task categories, evidence quality and the many evaluation gaps.",
      "系统梳理大模型在软件生命周期各阶段的应用。重点读任务分类、证据质量与大量评估缺口。",
      "Une cartographie systématique des LLM dans le cycle logiciel ; lisez les tâches, la qualité des preuves et les lacunes d’évaluation."
    ]
  ),
  paperEntry(
    "swe-bench", "software_engineering", "2023-10-11", "applied",
    "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
    "Jimenez, C. E., Yang, J., Wettig, A., et al.",
    "Jimenez et al.", "ICLR 2024",
    "https://arxiv.org/abs/2310.06770",
    ["agents", "software engineering", "benchmark"],
    [
      "A benchmark built from real repository issues and tests. Read for how the task is constructed and what it does not measure.",
      "由真实仓库 issue 与测试构建的基准。重点读任务如何构造，以及它没有测量什么。",
      "Un benchmark construit à partir d’issues et de tests réels ; lisez sa construction et ce qu’il ne mesure pas."
    ], true
  ),
  paperEntry(
    "llm-test-failure", "software_engineering", "2026-09-18", "applied",
    "Supporting Industrial Test-Failure Analysis with LLM-Based Systems: An Experience Report",
    "Jansson, E., Strandberg, P. E., & Sörensen, T.",
    "Jansson et al.", "arXiv",
    "https://arxiv.org/abs/2609.21843",
    ["test analysis", "industrial deployment", "LLM"],
    [
      "An experience report on using LLM systems in industrial test-failure analysis. Read for deployment friction, human review and the limits of a single case.",
      "关于在工业测试失败分析中使用大模型系统的经验报告。重点读部署摩擦、人审环节与单案例的边界。",
      "Un rapport d’expérience sur l’analyse industrielle des échecs de tests avec des LLM ; lisez les frictions, la revue humaine et les limites du cas."
    ]
  ),
  paperEntry(
    "ai-chains", "hci", "2022-04-28", "method",
    "AI Chains: Transparent and Controllable Human-AI Interaction by Chaining Large Language Model Prompts",
    "Wu, T., Terry, M. A., & Cai, C. J.",
    "Wu et al.", "CHI 2022",
    "https://doi.org/10.1145/3491102.3517582",
    ["human-AI interaction", "prompt chaining", "control"],
    [
      "Shows how decomposing a task into visible prompt steps can improve control and review. Read for the interaction design, not only the prompting trick.",
      "展示如何把任务拆成可见的提示步骤，以提升控制与复核。重点读交互设计，而不只是提示技巧。",
      "Montre comment décomposer une tâche en étapes visibles améliore contrôle et revue ; lisez la conception d’interaction."
    ]
  ),
  paperEntry(
    "har-foundation", "hci", "2026-06-15", "survey",
    "Foundation Models Defining a New Era in Sensor-based Human Activity Recognition: A Survey and Outlook",
    "Bian, S., Liu, M., Ray, L. S. S., et al.",
    "Bian et al.", "ACM Computing Surveys",
    "https://doi.org/10.1145/3810230",
    ["human activity recognition", "foundation models", "wearables"],
    [
      "Maps foundation models onto wearable sensing and activity recognition. Read for data heterogeneity, personalisation and evaluation ethics.",
      "梳理基础模型在可穿戴传感与活动识别中的应用。重点读数据异质性、个性化与评估伦理。",
      "Cartographie les modèles de fondation pour les capteurs portables ; lisez l’hétérogénéité des données, la personnalisation et l’éthique."
    ]
  ),
  paperEntry(
    "oversight-chatbot", "hci", "2026-05-01", "applied",
    "Verification Without Distrust: Reframing User-Side Oversight as Routine Epistemic Governance in Everyday Human–Chatbot Interaction",
    "Pyae, A.",
    "Pyae", "IEEE ICTechEd 2026",
    "https://doi.org/10.1109/ICTechEd69022.2026.11682826",
    ["oversight", "chatbots", "epistemic governance"],
    [
      "Reframes everyday verification of chatbot output as a governance practice. Read for the design implications and the limits of a single-study account.",
      "把日常核查聊天机器人输出重新表述为一种治理实践。重点读设计启示与单研究叙事的边界。",
      "Reformule la vérification quotidienne des réponses de chatbots comme une pratique de gouvernance ; lisez les implications et les limites de l’étude."
    ]
  ),
  paperEntry(
    "gemini-robotics", "robotics", "2025-03-26", "method",
    "Gemini Robotics: Bringing AI into the Physical World",
    "Gemini Robotics Team",
    "Gemini Robotics Team", "arXiv",
    "https://arxiv.org/abs/2503.20020",
    ["vision-language-action", "robot learning", "generalisation"],
    [
      "A large-scale vision-language-action system for physical control. Read for the generalisation claims, the safety layer and the evaluation environments.",
      "面向物理控制的大规模视觉—语言—动作系统。重点读泛化主张、安全层与评估环境。",
      "Un système vision-langage-action à grande échelle pour le contrôle physique ; lisez les affirmations de généralisation, la sûreté et l’évaluation."
    ], true
  ),
  paperEntry(
    "pi0", "robotics", "2024-11-01", "method",
    "π0: A Vision-Language-Action Flow Model for General Robot Control",
    "Black, K., Brown, N., Driess, D., et al.",
    "Black et al.", "arXiv",
    "https://arxiv.org/abs/2410.24164",
    ["robot control", "flow matching", "VLA"],
    [
      "Combines a pretrained vision-language model with action flow matching. Read for the data mixture and the gap between generalist claims and task coverage.",
      "把预训练视觉语言模型与动作流匹配结合。重点读数据混合，以及通用性主张与任务覆盖之间的差距。",
      "Combine un modèle vision-langage pré-entraîné et un flux d’actions ; lisez le mélange de données et l’écart avec les promesses généralistes."
    ]
  ),
  paperEntry(
    "openvla", "robotics", "2024-06-13", "method",
    "OpenVLA: An Open-Source Vision-Language-Action Model",
    "Kim, M. J., Pertsch, K., Karamcheti, S., et al.",
    "Kim et al.", "CoRL 2024",
    "https://arxiv.org/abs/2406.09246",
    ["open source", "VLA", "manipulation"],
    [
      "An open vision-language-action model with reproducible training and evaluation. Read for the data, parameter-efficiency choices and deployment constraints.",
      "可复现训练与评估的开源视觉—语言—动作模型。重点读数据、参数效率选择与部署约束。",
      "Un modèle vision-langage-action ouvert et reproductible ; lisez les données, l’efficacité des paramètres et les contraintes de déploiement."
    ]
  ),
  paperEntry(
    "rt2", "robotics", "2023-07-29", "method",
    "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control",
    "Brohan, A., Brown, N., Carbajal, J., et al.",
    "Brohan et al.", "CoRL 2023",
    "https://arxiv.org/abs/2307.15818",
    ["VLA", "transfer", "robot learning"],
    [
      "Transfers web-scale vision-language knowledge into robot actions. Read for the co-fine-tuning strategy and the limits of semantic generalisation.",
      "把网络规模的视觉语言知识迁移到机器人动作。重点读联合微调策略与语义泛化的边界。",
      "Transfère des connaissances vision-langage à l’action robotique ; lisez la stratégie de co-ajustement et les limites sémantiques."
    ]
  ),
  paperEntry(
    "state-wise-safe-rl", "control", "2023-08-01", "survey",
    "State-wise Safe Reinforcement Learning: A Survey",
    "Zhao, W., He, T., Chen, R., et al.",
    "Zhao et al.", "IJCAI 2023",
    "https://doi.org/10.24963/ijcai.2023/763",
    ["safe RL", "constraints", "control"],
    [
      "Organises safety methods by where constraints enter the learning problem. Read for the assumptions that make a safety guarantee meaningful.",
      "按约束进入学习问题的位置来整理安全方法。重点读让安全保证真正有意义的假设。",
      "Organise les méthodes de sûreté selon l’endroit où les contraintes entrent dans l’apprentissage ; lisez les hypothèses des garanties."
    ]
  ),
  paperEntry(
    "cbf-survey", "control", "2024-04-22", "survey",
    "Learning Control Barrier Functions and their Application in Reinforcement Learning: A Survey",
    "Guerrier, M., Fouad, H., & Beltrame, G.",
    "Guerrier et al.", "arXiv",
    "https://arxiv.org/abs/2404.16879",
    ["control barrier functions", "safe learning", "verification"],
    [
      "A survey of learned barrier functions and their use in safe reinforcement learning. Read for the separation between empirical safety and formal guarantees.",
      "综述学习式障碍函数及其在安全强化学习中的应用。重点读经验安全与形式化保证之间的区别。",
      "Une revue des fonctions de barrière apprises en RL sûr ; lisez la distinction entre sûreté empirique et garanties formelles."
    ]
  ),
  paperEntry(
    "llm-supply-chain", "industrial", "2023-07-08", "applied",
    "Large Language Models for Supply Chain Optimization",
    "Li, B., Mellou, K., Zhang, B., et al.",
    "Li et al.", "arXiv",
    "https://arxiv.org/abs/2307.03875",
    ["supply chain", "optimisation", "LLM agents"],
    [
      "Uses LLMs to translate natural-language supply-chain problems into optimisation models. Read for the tool loop and the verification burden.",
      "用大模型把自然语言供应链问题转化为优化模型。重点读工具循环与验证负担。",
      "Utilise des LLM pour traduire des problèmes de chaîne logistique en modèles d’optimisation ; lisez la boucle d’outils et la charge de vérification."
    ]
  ),
  paperEntry(
    "foundation-decision", "industrial", "2023-03-08", "survey",
    "Foundation Models for Decision Making: Problems, Methods, and Opportunities",
    "Yang, S., Nachum, O., Du, Y., et al.",
    "Yang et al.", "arXiv",
    "https://arxiv.org/abs/2303.04129",
    ["decision making", "foundation models", "planning"],
    [
      "Frames decision-making as a foundation-model problem. Read for the proposed interface between representation, planning and action.",
      "把决策问题表述为基础模型问题。重点读表征、规划与行动之间的接口设想。",
      "Cadre la décision comme un problème de modèle de fondation ; lisez l’interface proposée entre représentation, planification et action."
    ]
  ),
  paperEntry(
    "graph-power", "electrical", "2026-08-17", "survey",
    "Graph Machine Learning: An Opportunity for Power Systems",
    "Sadric, M., Pütz, S., & Nauck, C.",
    "Sadric et al.", "arXiv",
    "https://arxiv.org/abs/2608.16494",
    ["graph learning", "power systems", "grid"],
    [
      "Argues that grid topology makes graph learning a natural fit for power systems. Read for the modelling choices and the data-access realities.",
      "论证电网拓扑使图学习成为电力系统的自然选择。重点读建模选择与数据获取现实。",
      "Soutient que la topologie du réseau rend l’apprentissage sur graphes naturel ; lisez les choix de modélisation et l’accès aux données."
    ], true
  ),
  paperEntry(
    "spatiotemporal-dl-power", "electrical", "2024-01-01", "survey",
    "Spatiotemporal Deep Learning for Power System Applications: A Survey",
    "Saffari, M., & Khodayar, M.",
    "Saffari & Khodayar", "IEEE Access",
    "https://doi.org/10.1109/ACCESS.2024.3424854",
    ["spatiotemporal learning", "power systems", "forecasting"],
    [
      "A survey of spatiotemporal learning for forecasting, stability and control. Read for data quality, topology shift and operational validation.",
      "综述面向预测、稳定与控制的时空学习。重点读数据质量、拓扑变化与运行验证。",
      "Une revue de l’apprentissage spatio-temporel pour la prévision, la stabilité et la commande ; lisez la qualité des données et la validation."
    ]
  ),
  paperEntry(
    "grid-converter-stability", "electrical", "2020-07-03", "survey",
    "Power System Stability with Power-Electronic Converter Interfaced Renewable Power Generation: Present Issues and Future Trends",
    "Meegahapola, L., Sguarezi Filho, A. J., & Bryant, J. S.",
    "Meegahapola et al.", "Energies",
    "https://doi.org/10.3390/en13133441",
    ["power electronics", "stability", "renewables"],
    [
      "Explains how converter-interfaced generation changes classical stability categories. Read for the physical mechanism behind the control problem.",
      "解释变流器接口发电如何改变经典稳定分类。重点读控制问题背后的物理机制。",
      "Explique comment la production à convertisseurs modifie les catégories classiques de stabilité ; lisez le mécanisme physique."
    ]
  ),
  paperEntry(
    "ai-datacenter-hardware", "electronics", "2026-09-21", "survey",
    "Balancing Generality and Specialization: A Survey on AI Datacenter Hardware Architecture",
    "Gu, Y., Wang, J., & Das, R.",
    "Gu et al.", "arXiv",
    "https://arxiv.org/abs/2609.26829",
    ["datacenter", "accelerators", "architecture"],
    [
      "Maps the trade-off between general-purpose and specialised AI datacenter hardware. Read for memory hierarchy, interconnection and utilisation.",
      "梳理通用与专用 AI 数据中心硬件之间的取舍。重点读存储层级、互连与利用率。",
      "Cartographie le compromis entre matériel généraliste et spécialisé pour l’IA ; lisez la hiérarchie mémoire, l’interconnexion et l’utilisation."
    ], true
  ),
  paperEntry(
    "on-device-llm", "electronics", "2024-08-26", "survey",
    "On-Device Language Models: A Comprehensive Review",
    "Xu, J., Li, Z., Chen, W., et al.",
    "Xu et al.", "arXiv",
    "https://arxiv.org/abs/2409.00088",
    ["edge AI", "quantisation", "on-device inference"],
    [
      "Reviews the compression, hardware and deployment stack for on-device language models. Read for the energy and memory constraints behind the claims.",
      "综述端侧语言模型的压缩、硬件与部署栈。重点读相关主张背后的能耗与内存约束。",
      "Passe en revue compression, matériel et déploiement des modèles embarqués ; lisez les contraintes d’énergie et de mémoire."
    ]
  ),
  paperEntry(
    "chiplet-survey", "electronics", "2025-11-24", "survey",
    "Survey of Chiplet Technology: SoC Architecture, Interconnect, EDA, and Advanced Packaging",
    "Liu, H., Du, Y., Pu, B., et al.",
    "Liu et al.", "IEEE JETCAS",
    "https://doi.org/10.1109/JETCAS.2025.3636408",
    ["chiplets", "packaging", "interconnect"],
    [
      "A current survey of chiplet architecture, interconnect, EDA and packaging. Read for the co-design constraints that make chiplets an economic choice.",
      "关于芯粒架构、互连、EDA 与先进封装的最新综述。重点读使芯粒成为经济选择的协同设计约束。",
      "Une revue récente des chiplets : architecture, interconnexion, EDA et packaging ; lisez les contraintes de co-conception."
    ]
  ),
  paperEntry(
    "compute-in-memory-quant", "electronics", "2025-11-01", "survey",
    "Model Quantization for Computing-in-Memory: A Survey",
    "Sun, S., Bai, J., Chen, H., et al.",
    "Sun et al.", "Science China Information Sciences",
    "https://doi.org/10.1007/s11432-024-4522-8",
    ["compute-in-memory", "quantisation", "accelerators"],
    [
      "Connects quantisation methods with the physical constraints of compute-in-memory arrays. Read for accuracy, noise and device variation.",
      "把量化方法与存算一体阵列的物理约束连接起来。重点读精度、噪声与器件波动。",
      "Relie quantification et contraintes physiques du calcul en mémoire ; lisez précision, bruit et variabilité des dispositifs."
    ]
  ),
  paperEntry(
    "isac-6g", "communications", "2026-09-15", "survey",
    "Integrated Sensing and Communications: A Tutorial on Mathematical Foundations, Signal Processing and System Design for 6G",
    "Ekin, S.",
    "Ekin", "arXiv",
    "https://arxiv.org/abs/2609.22314",
    ["ISAC", "6G", "signal processing"],
    [
      "A tutorial that builds the signal-processing foundations for integrated sensing and communication. Read for the waveform and trade-off assumptions.",
      "为感知通信一体化搭建信号处理基础的教程。重点读波形与权衡假设。",
      "Un tutoriel sur les fondations du traitement du signal pour la détection et communication intégrées ; lisez les formes d’onde et compromis."
    ], true
  ),
  paperEntry(
    "ris-cognitive-radio", "communications", "2026-08-21", "survey",
    "Reconfigurable Intelligent Surfaces for Cognitive Radio Networks: Design, Optimization, and Emerging Trends",
    "Galappaththige, D., Tellambura, C., & Kulathunga, R.",
    "Galappaththige et al.", "arXiv",
    "https://arxiv.org/abs/2608.21669",
    ["RIS", "cognitive radio", "optimisation"],
    [
      "Examines reconfigurable surfaces in cognitive radio settings. Read for channel estimation, interference control and the gap to field deployment.",
      "考察可重构表面在认知无线电场景中的应用。重点读信道估计、干扰控制与现场部署差距。",
      "Examine les surfaces reconfigurables en radio cognitive ; lisez l’estimation de canal, le contrôle des interférences et le déploiement."
    ]
  ),
  paperEntry(
    "digital-twin-6g", "communications", "2026-08-12", "survey",
    "Digital Twin Networks for 6G Wireless Systems: Architecture, Enabling Technologies, Intelligent Control, and Open Challenges",
    "Oikonomidis, C., Michailidis, E. T., & Miridakis, N. I.",
    "Oikonomidis et al.", "arXiv",
    "https://arxiv.org/abs/2608.12267",
    ["digital twin", "6G", "network control"],
    [
      "Frames digital twins as a control layer for 6G networks. Read for synchronisation, fidelity and the assumptions behind closed-loop optimisation.",
      "把数字孪生表述为 6G 网络的控制层。重点读同步、保真度与闭环优化背后的假设。",
      "Cadre les jumeaux numériques comme couche de contrôle 6G ; lisez synchronisation, fidélité et hypothèses de l’optimisation en boucle."
    ]
  ),
  paperEntry(
    "photonic-memories", "photonics", "2026-06-01", "survey",
    "Emerging Non-Volatile Opto-electronic Resistive Memories for Next-Generation Photonic Integrated Circuits",
    "Kumar, S., et al.",
    "Kumar et al.", "arXiv",
    "https://arxiv.org/abs/2606.01463",
    ["photonic memory", "integrated photonics", "non-volatile"],
    [
      "Reviews non-volatile opto-electronic memories for photonic integrated circuits. Read for material trade-offs, endurance and integration complexity.",
      "综述用于光子集成电路的非易失光电子存储器。重点读材料取舍、耐久性与集成复杂度。",
      "Passe en revue les mémoires optoélectroniques non volatiles pour circuits photoniques ; lisez les compromis de matériaux et d’intégration."
    ]
  ),
  paperEntry(
    "photonic-tensor-core", "photonics", "2021-01-06", "method",
    "Parallel Convolutional Processing Using an Integrated Photonic Tensor Core",
    "Feldmann, J., Youngblood, N., Karpov, M., et al.",
    "Feldmann et al.", "Nature",
    "https://doi.org/10.1038/s41586-020-03070-1",
    ["optical computing", "tensor core", "convolution"],
    [
      "Demonstrates parallel convolution with an integrated photonic tensor core. Read for the physical mechanism and the precision, calibration and scaling limits.",
      "演示集成光子张量核的并行卷积。重点读物理机制，以及精度、标定与扩展边界。",
      "Démontre une convolution parallèle avec un cœur tensoriel photonique ; lisez le mécanisme, la précision, la calibration et les limites d’échelle."
    ]
  ),
  paperEntry(
    "event-vision", "instrumentation", "2019-04-18", "survey",
    "Event-based Vision: A Survey",
    "Gallego, G., Delbruck, T., Orchard, G., et al.",
    "Gallego et al.", "IEEE TPAMI",
    "https://arxiv.org/abs/1904.08405",
    ["event cameras", "neuromorphic sensing", "vision"],
    [
      "The standard entry point to event-based sensing. Read for the sensor model, the processing pipeline and the mismatch with frame-based benchmarks.",
      "事件相机感知的标准入口。重点读传感器模型、处理流水线，以及与帧式基准的不匹配。",
      "Le point d’entrée standard sur la vision événementielle ; lisez le modèle de capteur, le pipeline et l’écart avec les benchmarks d’images."
    ]
  ),
  paperEntry(
    "quantum-sensing-consumer", "instrumentation", "2026-01-01", "survey",
    "Quantum Sensing Applications in Consumer Electronics: Emerging Methods and Near-Term Use Cases",
    "Bhowmik, S., & Thapliyal, H.",
    "Bhowmik & Thapliyal", "IEEE Consumer Electronics Magazine",
    "https://doi.org/10.1109/MCE.2026.3737069",
    ["quantum sensing", "consumer electronics", "metrology"],
    [
      "Surveys near-term quantum sensing use cases in consumer devices. Read for the gap between laboratory sensitivity and manufacturable instrumentation.",
      "综述量子传感在消费设备中的近期用例。重点读实验室灵敏度与可制造仪器之间的差距。",
      "Passe en revue les usages proches de la détection quantique grand public ; lisez l’écart entre laboratoire et instrumentation fabricable."
    ]
  ),
  paperEntry(
    "quantum-optical-biomed", "instrumentation", "2026-10-08", "survey",
    "From Solid-State Spin Defects to Fluorescent Proteins: A Perspective on Quantum Optical Sensing Platforms for Biomedical Applications",
    "Parhi, J., Majumder, A., & Saha, K.",
    "Parhi et al.", "arXiv",
    "https://arxiv.org/abs/2610.11644",
    ["quantum sensing", "biomedical imaging", "spin defects"],
    [
      "Compares quantum optical sensing platforms for biomedical use. Read for the biological constraints that determine whether a platform can leave the lab.",
      "比较面向生物医学的量子光学传感平台。重点读决定平台能否走出实验室的生物约束。",
      "Compare les plateformes de détection optique quantique pour la biomédecine ; lisez les contraintes biologiques d’usage."
    ]
  ),
  paperEntry(
    "mattergen", "materials", "2023-12-07", "method",
    "MatterGen: A Generative Model for Inorganic Materials Design",
    "Zeni, C., Pinsler, R., Zügner, D., et al.",
    "Zeni et al.", "arXiv",
    "https://arxiv.org/abs/2312.03687",
    ["generative design", "materials", "diffusion"],
    [
      "A generative model for inorganic crystal design with property conditioning. Read for the representation, the evaluation pipeline and the synthesis gap.",
      "带性质条件的无机晶体生成设计模型。重点读表征、评估流水线与合成验证差距。",
      "Un modèle génératif de cristaux inorganiques conditionné par propriétés ; lisez la représentation, l’évaluation et l’écart avec la synthèse."
    ], true
  ),
  paperEntry(
    "chgnet", "materials", "2023-02-28", "method",
    "CHGNet: Pretrained Universal Neural Network Potential for Charge-Informed Atomistic Modeling",
    "Deng, B., Zhong, P., Jun, K., et al.",
    "Deng et al.", "Nature Machine Intelligence",
    "https://arxiv.org/abs/2302.14231",
    ["interatomic potentials", "atomistic simulation", "machine learning"],
    [
      "A charge-informed universal interatomic potential. Read for the training data, transfer tests and the limits of a learned energy surface.",
      "电荷感知的通用原子间势。重点读训练数据、迁移测试与学习式能量面的边界。",
      "Un potentiel interatomique universel informé par la charge ; lisez les données, les tests de transfert et les limites de la surface d’énergie."
    ]
  ),
  paperEntry(
    "inverse-materials-review", "materials", "2026-06-02", "survey",
    "Towards Automated Discovery: A Review of Generative Models, Multimodal Learning and Closed-Loop Workflows in Inverse Materials Design",
    "Babu, A., Gouvêa, R. A., & Rignanese, G.-M.",
    "Babu et al.", "arXiv",
    "https://arxiv.org/abs/2606.02507",
    ["inverse design", "multimodal learning", "autonomous labs"],
    [
      "Connects generative materials models with multimodal learning and closed-loop experimentation. Read for the data and validation bottlenecks.",
      "把生成式材料模型与多模态学习、闭环实验连接起来。重点读数据与验证瓶颈。",
      "Relie modèles génératifs, apprentissage multimodal et expérimentation en boucle ; lisez les goulots de données et de validation."
    ]
  ),
  paperEntry(
    "process-control-ml", "chemical", "2025-03-12", "survey",
    "Accelerating Process Control and Optimization via Machine Learning: A Review",
    "Mitrai, I., & Daoutidis, P.",
    "Mitrai & Daoutidis", "Reviews in Chemical Engineering",
    "https://doi.org/10.1515/revce-2024-0060",
    ["process control", "optimisation", "machine learning"],
    [
      "Reviews learning methods for process control and optimisation. Read for the safety, data and model-maintenance constraints of plant deployment.",
      "综述过程控制与优化中的学习方法。重点读工厂部署中的安全、数据与模型维护约束。",
      "Une revue des méthodes d’apprentissage pour le contrôle et l’optimisation des procédés ; lisez sûreté, données et maintenance des modèles."
    ]
  ),
  paperEntry(
    "autonomous-chemistry", "chemical", "2023-12-20", "applied",
    "Autonomous Chemical Research with Large Language Models",
    "Boiko, D. A., MacKnight, R., Kline, B., et al.",
    "Boiko et al.", "Nature",
    "https://doi.org/10.1038/s41586-023-06792-0",
    ["autonomous labs", "LLM agents", "chemistry"],
    [
      "A system that plans and executes chemical experiments through LLM agents and laboratory tools. Read for the scope, human oversight and reproducibility questions.",
      "通过大模型智能体与实验工具规划并执行化学实验的系统。重点读范围、人审与可复现性问题。",
      "Un système qui planifie et exécute des expériences via des agents LLM ; lisez le périmètre, la supervision humaine et la reproductibilité."
    ], true
  ),
  paperEntry(
    "drl-process-design", "chemical", "2024-03-14", "survey",
    "Deep Reinforcement Learning for Process Design: Review and Perspective",
    "Gao, Q., & Schweidtmann, A. M.",
    "Gao & Schweidtmann", "Current Opinion in Chemical Engineering",
    "https://doi.org/10.1016/j.coche.2024.101012",
    ["process design", "reinforcement learning", "optimisation"],
    [
      "Reviews reinforcement learning for process design. Read for the mismatch between episodic benchmarks and continuous plant operation.",
      "综述强化学习在过程设计中的应用。重点读回合式基准与连续工厂运行之间的错位。",
      "Une revue du RL pour la conception de procédés ; lisez l’écart entre benchmarks épisodiques et exploitation continue."
    ]
  ),
  paperEntry(
    "pinn", "mechanical", "2017-11-29", "method",
    "Physics Informed Deep Learning (Part I): Data-driven Solutions of Nonlinear Partial Differential Equations",
    "Raissi, M., Perdikaris, P., & Karniadakis, G. E.",
    "Raissi et al.", "Journal of Computational Physics",
    "https://arxiv.org/abs/1711.10561",
    ["physics-informed learning", "PDEs", "scientific computing"],
    [
      "The foundational physics-informed neural network formulation. Read for the loss construction, the inverse-problem framing and the training difficulties.",
      "物理信息神经网络的基础表述。重点读损失构造、反问题框架与训练困难。",
      "La formulation fondatrice des réseaux informés par la physique ; lisez la perte, le problème inverse et les difficultés d’entraînement."
    ]
  ),
  paperEntry(
    "fno", "mechanical", "2020-10-18", "method",
    "Fourier Neural Operator for Parametric Partial Differential Equations",
    "Li, Z., Kovachki, N., Azizzadenesheli, K., et al.",
    "Li et al.", "ICLR 2021",
    "https://arxiv.org/abs/2010.08895",
    ["neural operators", "PDEs", "simulation"],
    [
      "Learns solution operators rather than single solutions. Read for resolution generalisation and the assumptions about the function space.",
      "学习解算子而不是单个解。重点读分辨率泛化与函数空间假设。",
      "Apprend des opérateurs de solution plutôt que des solutions ; lisez la généralisation en résolution et les hypothèses d’espace fonctionnel."
    ]
  ),
  paperEntry(
    "pikan", "mechanical", "2025-03-11", "survey",
    "From PINNs to PIKANs: Recent Advances in Physics-Informed Machine Learning",
    "Toscano, J. D., Oommen, V., Varghese, A. J., et al.",
    "Toscano et al.", "Discover Applied Sciences",
    "https://doi.org/10.1007/s44379-025-00015-1",
    ["physics-informed ML", "KAN", "PDEs"],
    [
      "A recent tour of physics-informed learning beyond the original PINN. Read for the comparisons, implementation costs and unresolved evaluation issues.",
      "超越最初 PINN 的物理信息学习近期综述。重点读方法比较、实现成本与未解决的评估问题。",
      "Un tour récent de l’apprentissage informé par la physique au-delà des PINN ; lisez les comparaisons, coûts et problèmes d’évaluation."
    ]
  ),
  paperEntry(
    "data-driven-aerospace", "aerospace", "2021-07-20", "survey",
    "Data-Driven Aerospace Engineering: Reframing the Industry with Machine Learning",
    "Brunton, S. L., Kutz, J. N., & Manohar, K.",
    "Brunton et al.", "AIAA Journal",
    "https://doi.org/10.2514/1.J060131",
    ["aerospace", "data-driven engineering", "design"],
    [
      "Frames where machine learning can change aerospace design and operations. Read for the certification and data-scarcity constraints.",
      "勾勒机器学习可能改变航空航天设计与运维的位置。重点读认证与数据稀缺约束。",
      "Cadre les apports du machine learning à l’aérospatial ; lisez les contraintes de certification et de rareté des données."
    ]
  ),
  paperEntry(
    "aircraft-performance-ml", "aerospace", "2023-04-23", "survey",
    "Improving Aircraft Performance Using Machine Learning: A Review",
    "Le Clainche, S., Ferrer, E., & Gibson, S.",
    "Le Clainche et al.", "Aerospace Science and Technology",
    "https://doi.org/10.1016/j.ast.2023.108354",
    ["aircraft", "performance", "machine learning"],
    [
      "Reviews machine learning for aircraft performance across design and operation. Read for the validation standards behind aerodynamic claims.",
      "综述机器学习在飞行器设计与运行性能中的应用。重点读气动主张背后的验证标准。",
      "Une revue du machine learning pour la performance des aéronefs ; lisez les standards de validation des affirmations aérodynamiques."
    ]
  ),
  paperEntry(
    "cubesat-ids", "aerospace", "2026-03-26", "applied",
    "Toward Resilient Intrusion Detection in CubeSats: Challenges, TinyML Solutions, and Future Directions",
    "Fayyaz, Y., Yang, L., & El-Khatib, K.",
    "Fayyaz et al.", "IEEE Aerospace and Electronic Systems Magazine",
    "https://doi.org/10.1109/MAES.2026.3677755",
    ["CubeSat", "intrusion detection", "TinyML"],
    [
      "Examines intrusion detection under the compute and communication limits of CubeSats. Read for the threat model and the cost of resilience.",
      "考察立方星算力与通信限制下的入侵检测。重点读威胁模型与韧性的代价。",
      "Examine la détection d’intrusion sous contraintes CubeSat ; lisez le modèle de menace et le coût de la résilience."
    ]
  ),
  paperEntry(
    "nuclear-ml", "nuclear", "2026-09-30", "survey",
    "Advancing Nuclear Physics with Machine Learning and Artificial Intelligence",
    "He, W., Li, Q., et al.",
    "He et al.", "arXiv",
    "https://arxiv.org/abs/2609.38711",
    ["nuclear physics", "machine learning", "experiment"],
    [
      "A current survey of machine learning across nuclear physics experiment and theory. Read for uncertainty quantification and the domain-specific validation.",
      "关于机器学习在核物理实验与理论中应用的最新综述。重点读不确定性量化与领域专用验证。",
      "Une revue récente du machine learning en physique nucléaire ; lisez la quantification des incertitudes et la validation de domaine."
    ]
  ),
  paperEntry(
    "nuclear-hep-ml", "nuclear", "2026-10-08", "survey",
    "Machine Learning Meets High-Energy Nuclear Physics: From Pattern Recognition to Physics-Integrated Discovery",
    "Chen, X., Ke, W., et al.",
    "Chen et al.", "arXiv",
    "https://arxiv.org/abs/2610.12293",
    ["high-energy physics", "pattern recognition", "physics-informed ML"],
    [
      "Maps the movement from pattern recognition to physics-integrated learning in high-energy nuclear physics. Read for the detector and simulation constraints.",
      "梳理高能核物理中从模式识别走向物理融合学习的趋势。重点读探测器与模拟约束。",
      "Cartographie le passage de la reconnaissance de motifs à l’apprentissage informé par la physique ; lisez les contraintes de détecteur et de simulation."
    ]
  ),
  paperEntry(
    "generative-shm", "civil", "2026-04-22", "survey",
    "Deep Generative Models in Condition and Structural Health Monitoring: Opportunities, Limitations and Future Outlook",
    "Yang, X., Fang, C., & Liao, Y.",
    "Yang et al.", "Mechanical Systems and Signal Processing",
    "https://doi.org/10.1016/j.ymssp.2026.114277",
    ["structural health monitoring", "generative models", "damage detection"],
    [
      "Reviews generative models for damage detection and condition monitoring. Read for data scarcity, anomaly definition and false-alarm costs.",
      "综述生成模型在损伤检测与状态监测中的应用。重点读数据稀缺、异常定义与误报代价。",
      "Une revue des modèles génératifs pour le suivi de santé structurelle ; lisez la rareté des données, l’anomalie et le coût des fausses alarmes."
    ], true
  ),
  paperEntry(
    "civil-digital-twins", "civil", "2024-08-07", "survey",
    "Digital Twins and Civil Engineering Phases: Reorienting Adoption Strategies",
    "Adebiyi, T. A., Ajenifuja, N. A., & Zhang, R.",
    "Adebiyi et al.", "ASME JCISE",
    "https://doi.org/10.1115/1.4066181",
    ["digital twin", "civil engineering", "lifecycle"],
    [
      "Reorients digital-twin adoption around civil-engineering project phases. Read for data handover, model ownership and lifecycle value.",
      "围绕土木工程项目阶段重新定位数字孪生的采用策略。重点读数据交接、模型所有权与全生命周期价值。",
      "Réoriente l’adoption des jumeaux numériques selon les phases du génie civil ; lisez le transfert de données, la propriété et la valeur du cycle de vie."
    ]
  ),
  paperEntry(
    "water-quality-som", "environmental", "2025-12-11", "survey",
    "Self-organizing Maps for Water Quality Assessment in Reservoirs and Lakes: A Systematic Literature Review",
    "Almegdadi, O., Marcelino, J., & Fakhreddine, S.",
    "Almegdadi et al.", "Ecological Informatics",
    "https://doi.org/10.1016/j.ecoinf.2025.103542",
    ["water quality", "self-organizing maps", "monitoring"],
    [
      "A systematic review of self-organising maps for lake and reservoir water quality. Read for preprocessing choices and the interpretation of clusters.",
      "关于自组织映射用于湖库水质评估的系统综述。重点读预处理选择与聚类解释。",
      "Une revue systématique des cartes auto-organisées pour la qualité de l’eau ; lisez le prétraitement et l’interprétation des clusters."
    ]
  ),
  paperEntry(
    "water-resources-ml", "environmental", "2025-01-01", "survey",
    "Time Series Predictions in Unmonitored Sites: A Survey of Machine Learning Techniques in Water Resources",
    "Willard, J., Varadharajan, C., Jia, X., et al.",
    "Willard et al.", "Environmental Data Science",
    "https://doi.org/10.1017/eds.2024.14",
    ["water resources", "time series", "prediction"],
    [
      "Surveys prediction at unmonitored water sites. Read for transfer, missing data and the difference between interpolation and extrapolation.",
      "综述无监测站点的水资源预测。重点读迁移、缺失数据，以及插值与外推的区别。",
      "Une revue de la prévision sur sites non instrumentés ; lisez le transfert, les données manquantes et la différence interpolation/extrapolation."
    ]
  ),
  paperEntry(
    "aquaculture-monitoring", "environmental", "2023-06-14", "survey",
    "Feeding Control and Water Quality Monitoring in Aquaculture Systems: Opportunities and Challenges",
    "Aljehani, F., N’Doye, I., & Laleg-Kirati, T.-M.",
    "Aljehani et al.", "arXiv",
    "https://arxiv.org/abs/2306.09920",
    ["aquaculture", "water quality", "control"],
    [
      "Connects feeding control with water-quality monitoring in aquaculture. Read for sensor reliability, biological variability and control delays.",
      "把水产养殖中的投喂控制与水质监测连接起来。重点读传感器可靠性、生物变异与控制时滞。",
      "Relie contrôle de l’alimentation et qualité de l’eau en aquaculture ; lisez la fiabilité des capteurs, la variabilité biologique et les délais."
    ]
  ),
  paperEntry(
    "alphafold3", "biomedical", "2024-05-08", "method",
    "Accurate Structure Prediction of Biomolecular Interactions with AlphaFold 3",
    "Abramson, J., Adler, J., Dunger, J., et al.",
    "Abramson et al.", "Nature",
    "https://doi.org/10.1038/s41586-024-07487-w",
    ["protein structure", "biomolecular interaction", "deep learning"],
    [
      "Extends structure prediction to complexes and biomolecular interactions. Read for the architecture, the confidence measures and the experimental validation gap.",
      "把结构预测扩展到复合物与生物分子相互作用。重点读架构、置信度度量与实验验证差距。",
      "Étend la prédiction de structure aux complexes ; lisez l’architecture, les mesures de confiance et l’écart avec la validation expérimentale."
    ], true
  ),
  paperEntry(
    "retinal-foundation", "biomedical", "2023-09-13", "applied",
    "A Foundation Model for Generalizable Disease Detection from Retinal Images",
    "Zhou, Y., Chia, M. A., Wagner, S. K., et al.",
    "Zhou et al.", "Nature",
    "https://doi.org/10.1038/s41586-023-06555-x",
    ["retinal imaging", "foundation models", "clinical validation"],
    [
      "A retinal foundation model evaluated across disease detection tasks. Read for the cohort design, external validation and deployment claims.",
      "跨疾病检测任务评估的视网膜基础模型。重点读队列设计、外部验证与部署主张。",
      "Un modèle de fondation rétinien évalué sur plusieurs maladies ; lisez les cohortes, la validation externe et les promesses de déploiement."
    ]
  ),
  paperEntry(
    "sam-medical", "biomedical", "2024-01-22", "applied",
    "Segment Anything in Medical Images",
    "Ma, J., He, Y., Li, F., et al.",
    "Ma et al.", "Nature Communications",
    "https://doi.org/10.1038/s41467-024-44824-z",
    ["medical imaging", "segmentation", "foundation models"],
    [
      "Adapts promptable segmentation to medical images across modalities. Read for the annotation protocol, modality shift and clinician-in-the-loop evaluation.",
      "把可提示分割适配到多模态医学影像。重点读标注协议、模态偏移与临床医生参与评估。",
      "Adapte la segmentation promptable à l’imagerie médicale ; lisez le protocole d’annotation, le changement de modalité et l’évaluation clinique."
    ]
  ),
  paperEntry(
    "rl-sustainable-energy", "energy", "2024-07-26", "survey",
    "Reinforcement Learning for Sustainable Energy: A Survey",
    "Ponse, K., Kleuker, F., Fejér, M., et al.",
    "Ponse et al.", "arXiv",
    "https://arxiv.org/abs/2407.18597",
    ["reinforcement learning", "energy systems", "sustainability"],
    [
      "Maps reinforcement learning across sustainable-energy applications. Read for simulator fidelity, constraint handling and the evaluation of real-world impact.",
      "梳理强化学习在可持续能源中的应用。重点读仿真保真度、约束处理与真实影响评估。",
      "Cartographie le RL pour l’énergie durable ; lisez la fidélité des simulateurs, les contraintes et l’évaluation d’impact."
    ]
  ),
  paperEntry(
    "grid-battery-review", "energy", "2023-05-27", "survey",
    "Grid-Connected Battery Energy Storage System: A Review on Application and Integration",
    "Zhao, C., Andersen, P. B., & Træholt, C.",
    "Zhao et al.", "Renewable and Sustainable Energy Reviews",
    "https://doi.org/10.1016/j.rser.2023.113400",
    ["battery storage", "grid integration", "energy systems"],
    [
      "Reviews grid-connected battery storage applications and integration choices. Read for degradation, market design and system-level constraints.",
      "综述并网电池储能的应用与集成选择。重点读退化、市场设计与系统级约束。",
      "Une revue des applications et de l’intégration du stockage batterie au réseau ; lisez dégradation, marché et contraintes système."
    ]
  ),
  paperEntry(
    "ai-scientist", "interdisciplinary_eng", "2024-08-13", "method",
    "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery",
    "Lu, C., Lu, C., Lange, R. T., et al.",
    "Lu et al.", "arXiv",
    "https://arxiv.org/abs/2408.06292",
    ["automated research", "agents", "scientific discovery"],
    [
      "An end-to-end attempt at automated research ideation, experimentation and writing. Read for the evaluation problem and the risk of optimising for plausible papers.",
      "对研究构思、实验与写作端到端自动化的尝试。重点读评估难题，以及优化“看起来合理的论文”的风险。",
      "Une tentative de recherche automatisée de bout en bout ; lisez le problème d’évaluation et le risque d’optimiser des articles plausibles."
    ], true
  ),
  paperEntry(
    "scientific-discovery-ai", "interdisciplinary_eng", "2023-08-02", "survey",
    "Scientific Discovery in the Age of Artificial Intelligence",
    "Wang, H., Fu, T., Du, Y., et al.",
    "Wang et al.", "Nature",
    "https://doi.org/10.1038/s41586-023-06221-2",
    ["AI for science", "scientific discovery", "research practice"],
    [
      "A cross-domain account of AI in scientific discovery. Read for the distinction between prediction, explanation and genuinely new hypothesis generation.",
      "跨领域梳理人工智能在科学发现中的作用。重点读预测、解释与真正的新假设生成之间的区别。",
      "Un compte rendu transdisciplinaire de l’IA pour la découverte ; lisez la distinction entre prédiction, explication et nouvelle hypothèse."
    ]
  ),
  paperEntry(
    "deepseek-v3", "ai_core", "2024-12-27", "method",
    "DeepSeek-V3 Technical Report",
    "DeepSeek-AI, Liu, A., Feng, B., et al.",
    "DeepSeek-AI et al.", "arXiv",
    "https://arxiv.org/abs/2412.19437",
    ["mixture of experts", "pre-training", "LLM"],
    [
      "A detailed technical report on a large mixture-of-experts model, including training infrastructure, data and evaluation. Read for the engineering choices and the limited disclosure of data.",
      "一份关于大规模混合专家模型的技术报告，涵盖训练基础设施、数据与评估。重点读工程选择，以及数据披露的边界。",
      "Un rapport technique détaillé sur un grand modèle à mélange d’experts ; lisez l’infrastructure, les données et les limites de divulgation."
    ], true
  ),
  paperEntry(
    "qwen25", "generative_ai", "2024-12-19", "method",
    "Qwen2.5 Technical Report",
    "Qwen Team, Yang, A., et al.",
    "Qwen Team", "arXiv",
    "https://arxiv.org/abs/2412.15115",
    ["LLM", "multilingual", "post-training"],
    [
      "A model-family report focused on data scaling, multilingual coverage and post-training. Read for the evaluation portfolio and the gaps that remain in reproducibility.",
      "面向数据扩展、多语言覆盖与后训练的模型家族报告。重点读评估组合，以及可复现性上的缺口。",
      "Un rapport de famille de modèles sur les données, le multilingue et le post-entraînement ; lisez l’évaluation et les limites de reproductibilité."
    ]
  ),
  paperEntry(
    "gemma2", "generative_ai", "2024-07-31", "method",
    "Gemma 2: Improving Open Language Models at a Practical Size",
    "Gemma Team, Rivière, M., Pathak, S., et al.",
    "Gemma Team", "arXiv",
    "https://arxiv.org/abs/2408.00118",
    ["open models", "efficiency", "LLM"],
    [
      "An open-model report balancing capability and inference cost. Read for the architectural choices, the safety evaluation and the meaning of “practical size”.",
      "在能力与推理成本之间取得平衡的开放模型报告。重点读架构选择、安全评估，以及“实用规模”的含义。",
      "Un rapport de modèle ouvert équilibrant capacité et coût d’inférence ; lisez l’architecture, la sûreté et la notion de taille pratique."
    ]
  ),
  paperEntry(
    "self-rag", "nlp", "2023-10-17", "method",
    "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
    "Asai, A., Wu, Z., Wang, Y., et al.",
    "Asai et al.", "ICLR 2024",
    "https://arxiv.org/abs/2310.11511",
    ["retrieval", "self-reflection", "generation"],
    [
      "Trains a model to decide when to retrieve and to critique its own evidence use. Read for the control tokens and the difficulty of evaluating self-critique.",
      "训练模型决定何时检索，并批判性地检查自身对证据的使用。重点读控制标记与自评的评估难题。",
      "Entraîne un modèle à décider quand chercher et à critiquer son usage des preuves ; lisez les jetons de contrôle et l’évaluation de l’auto-critique."
    ]
  ),
  paperEntry(
    "grounding-dino", "computer_vision", "2024-11-22", "method",
    "Grounding DINO: Marrying DINO with Grounded Pre-Training for Open-Set Object Detection",
    "Liu, S., Zeng, Z., Ren, T., et al.",
    "Liu et al.", "ECCV 2024",
    "https://doi.org/10.1007/978-3-031-72970-6_3",
    ["open-set detection", "vision-language", "grounding"],
    [
      "Combines a DINO detector with language grounding for open-set detection. Read for the fusion design and the gap between benchmark phrases and messy real-world language.",
      "把 DINO 检测器与语言 grounding 结合，实现开放集检测。重点读融合设计，以及基准短语与真实语言之间的差距。",
      "Combine un détecteur DINO et un ancrage linguistique pour la détection ouverte ; lisez la fusion et l’écart avec le langage réel."
    ]
  ),
  paperEntry(
    "llava", "computer_vision", "2023-04-17", "method",
    "Visual Instruction Tuning",
    "Liu, H., Li, C., Wu, Q., & Lee, Y. J.",
    "Liu et al.", "NeurIPS 2023",
    "https://arxiv.org/abs/2304.08485",
    ["multimodal", "instruction tuning", "vision-language"],
    [
      "Introduces visual instruction tuning for multimodal assistants. Read for the data-generation recipe and the evaluation limits of a small set of multimodal tasks.",
      "为多模态助手引入视觉指令微调。重点读数据生成配方，以及小规模多模态任务评估的边界。",
      "Introduit l’ajustement par instructions visuelles ; lisez la recette de données et les limites de l’évaluation multimodale."
    ]
  ),
  paperEntry(
    "florence2", "computer_vision", "2024-06-16", "method",
    "Florence-2: Advancing a Unified Representation for a Variety of Vision Tasks",
    "Xiao, B., Wu, H., Xu, W., et al.",
    "Xiao et al.", "CVPR 2024",
    "https://doi.org/10.1109/CVPR52733.2024.00461",
    ["vision foundation model", "multitask", "unified representation"],
    [
      "A unified vision model trained across detection, captioning and grounding tasks. Read for the task formulation and the price of one model for many objectives.",
      "跨检测、描述与 grounding 任务训练的统一视觉模型。重点读任务形式化，以及一个模型承担多目标的代价。",
      "Un modèle visuel unifié pour détection, légendage et ancrage ; lisez la formulation des tâches et le coût de l’unification."
    ]
  ),
  paperEntry(
    "distserve", "computer_systems", "2024-01-18", "method",
    "DistServe: Disaggregating Prefill and Decoding for Goodput-optimized Large Language Model Serving",
    "Zhong, Y., Liu, S., Chen, J., et al.",
    "Zhong et al.", "OSDI 2024",
    "https://arxiv.org/abs/2401.09670",
    ["LLM serving", "disaggregation", "goodput"],
    [
      "Separates prefill and decoding to optimise serving goodput. Read for the scheduling model and the communication cost of disaggregation.",
      "分离预填充与解码以优化服务有效吞吐。重点读调度模型与解耦带来的通信成本。",
      "Sépare prefill et décodage pour optimiser le goodput ; lisez l’ordonnancement et le coût de communication."
    ]
  ),
  paperEntry(
    "sglang", "computer_systems", "2023-12-12", "method",
    "SGLang: Efficient Execution of Structured Language Model Programs",
    "Zheng, L., Yin, L., Xie, Z., et al.",
    "Zheng et al.", "SIGCOMM 2024",
    "https://arxiv.org/abs/2312.07104",
    ["structured generation", "runtime", "LLM serving"],
    [
      "A runtime for structured language-model programs with prefix reuse. Read for the programming model and the assumptions about repeated prompts.",
      "面向结构化语言模型程序、支持前缀复用的运行时。重点读编程模型与对重复提示的假设。",
      "Un runtime pour programmes structurés de modèles de langage avec réutilisation de préfixes ; lisez le modèle de programmation."
    ]
  ),
  paperEntry(
    "llumnix", "computer_systems", "2024-06-05", "method",
    "Llumnix: Dynamic Scheduling for Large Language Model Serving",
    "Sun, B., Huang, Z., Zhao, H., et al.",
    "Sun et al.", "OSDI 2024",
    "https://arxiv.org/abs/2406.03243",
    ["scheduling", "LLM serving", "latency"],
    [
      "Adds dynamic request migration and scheduling to LLM serving. Read for the latency objective and the operational complexity it introduces.",
      "为大模型服务加入动态请求迁移与调度。重点读时延目标，以及它引入的运维复杂度。",
      "Ajoute migration et ordonnancement dynamiques au service de LLM ; lisez l’objectif de latence et la complexité opérationnelle."
    ]
  ),
  paperEntry(
    "llm-net-mgmt", "networks", "2025-04-25", "survey",
    "A Survey on Large Language Models for Communication, Network, and Service Management",
    "Boateng, G. O., Sami, H., Alagha, A., et al.",
    "Boateng et al.", "IEEE COMST",
    "https://doi.org/10.1109/COMST.2025.3564333",
    ["network management", "service management", "LLM"],
    [
      "Maps LLM applications across communication and network service management. Read for the operational data and trust barriers that remain.",
      "梳理大模型在通信与网络服务管理中的应用。重点读仍然存在的运维数据与信任障碍。",
      "Cartographie les LLM pour la gestion des réseaux et services ; lisez les obstacles de données et de confiance."
    ]
  ),
  paperEntry(
    "llm-net-security", "cybersecurity", "2025-06-26", "survey",
    "The Dual Role of Large Language Models in Network Security: Survey and Research Trends",
    "Liu, H., Xue, J., Zhao, S., et al.",
    "Liu et al.", "ACM SIGCOMM 2025",
    "https://doi.org/10.1145/3733965.3733972",
    ["network security", "LLM", "threat models"],
    [
      "Examines LLMs as both security tools and attack surfaces. Read for the dual-use framing and the evaluation gap between laboratory and network operations.",
      "把大模型同时视为安全工具与攻击面。重点读双用途框架，以及实验室与网络运维之间的评估差距。",
      "Examine les LLM comme outils et surfaces d’attaque ; lisez le cadrage dual et l’écart d’évaluation avec les opérations."
    ]
  ),
  paperEntry(
    "universal-adversarial", "cybersecurity", "2023-07-27", "method",
    "Universal and Transferable Adversarial Attacks on Aligned Language Models",
    "Zou, A., Wang, Z., Kolter, J. Z., & Fredrikson, M.",
    "Zou et al.", "arXiv",
    "https://arxiv.org/abs/2307.15043",
    ["adversarial attacks", "alignment", "transfer"],
    [
      "Demonstrates transferable adversarial suffixes against aligned models. Read for the threat model, the optimisation method and the limits of a mitigation-only response.",
      "展示可迁移的对抗后缀能够攻击对齐模型。重点读威胁模型、优化方法与仅靠缓解措施应对的局限。",
      "Démontre des suffixes adversariaux transférables contre des modèles alignés ; lisez la menace, l’optimisation et les limites des mitigations."
    ], true
  ),
  paperEntry(
    "codellama", "software_engineering", "2023-08-24", "method",
    "Code Llama: Open Foundation Models for Code",
    "Rozière, B., Gehring, J., Gloeckle, F., et al.",
    "Rozière et al.", "arXiv",
    "https://arxiv.org/abs/2308.12950",
    ["code generation", "open models", "infilling"],
    [
      "An open code-model family with infilling and long-context variants. Read for the training data, the benchmark choices and the licence and safety constraints.",
      "具备填充与长上下文变体的开放代码模型家族。重点读训练数据、基准选择，以及许可与安全约束。",
      "Une famille ouverte de modèles de code avec remplissage et contexte long ; lisez les données, les benchmarks et les contraintes de licence."
    ]
  ),
  paperEntry(
    "guidelines-hai", "hci", "2019-04-29", "applied",
    "Guidelines for Human-AI Interaction",
    "Amershi, S., Weld, D. S., Vorvoreanu, M., et al.",
    "Amershi et al.", "CHI 2019",
    "https://doi.org/10.1145/3290605.3300233",
    ["human-AI interaction", "design guidelines", "evaluation"],
    [
      "A validated set of interaction guidelines for AI systems. Read as a design checklist, and ask which guidelines your evaluation actually tests.",
      "一套经过验证的人工智能交互准则。适合作为设计清单，并追问你的评估真正检验了哪些准则。",
      "Un ensemble validé de principes d’interaction pour l’IA ; utilisez-le comme liste de conception et interrogez votre évaluation."
    ]
  ),
  paperEntry(
    "open-x-embodiment", "robotics", "2023-10-13", "applied",
    "Open X-Embodiment: Robotic Learning Datasets and RT-X Models",
    "Open X-Embodiment Collaboration, O’Neill, A., Rehman, A., et al.",
    "Open X-Embodiment Collaboration", "arXiv",
    "https://arxiv.org/abs/2310.08864",
    ["robot learning", "datasets", "cross-embodiment"],
    [
      "A cross-institution dataset and model effort for cross-embodiment robot learning. Read for data standardisation and the limits of aggregate benchmarks.",
      "跨机构的数据集与模型计划，面向跨具身机器人学习。重点读数据标准化与聚合基准的边界。",
      "Un effort multi-institutions de données et de modèles pour l’apprentissage robotique multi-corps ; lisez la standardisation et les limites des benchmarks."
    ]
  ),
  paperEntry(
    "aloha", "robotics", "2023-07-10", "method",
    "Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware",
    "Zhao, T. Z., Kumar, V., Levine, S., & Finn, C.",
    "Zhao et al.", "RSS 2023",
    "https://doi.org/10.15607/RSS.2023.XIX.016",
    ["bimanual manipulation", "imitation learning", "low-cost hardware"],
    [
      "Shows that low-cost bimanual hardware plus imitation learning can perform fine manipulation. Read for the hardware assumptions and the data-collection burden.",
      "证明低成本双臂硬件配合模仿学习可以完成精细操作。重点读硬件假设与数据采集负担。",
      "Montre qu’un matériel bimanuel low-cost et l’imitation permettent une manipulation fine ; lisez les hypothèses et le coût des données."
    ]
  ),
  paperEntry(
    "optimus", "industrial", "2024-02-15", "method",
    "OptiMUS: Scalable Optimization Modeling with (MI)LP Solvers and Large Language Models",
    "AhmadiTeshnizi, A., Gao, W., & Udell, M.",
    "AhmadiTeshnizi et al.", "arXiv",
    "https://arxiv.org/abs/2402.10172",
    ["optimisation modelling", "LLM agents", "MILP"],
    [
      "An LLM agent that formulates and debugs optimisation models with solvers. Read for the verification loop and the cost of a wrong formulation.",
      "用求解器建立并调试优化模型的大模型智能体。重点读验证回路，以及错误建模的代价。",
      "Un agent LLM qui formule et débogue des modèles d’optimisation ; lisez la boucle de vérification et le coût d’une mauvaise formulation."
    ]
  ),
  paperEntry(
    "photonic-dnn", "photonics", "2022-06-01", "method",
    "An On-Chip Photonic Deep Neural Network for Image Classification",
    "Ashtiani, F., Geers, A. J., & Aflatouni, F.",
    "Ashtiani et al.", "Nature",
    "https://doi.org/10.1038/s41586-022-04714-0",
    ["optical computing", "deep learning", "integrated photonics"],
    [
      "Demonstrates an integrated photonic deep network for image classification. Read for the optical architecture and the precision, calibration and scaling constraints.",
      "演示用于图像分类的集成光子深度网络。重点读光学架构，以及精度、标定与扩展约束。",
      "Démontre un réseau profond photonique intégré pour la classification d’images ; lisez l’architecture, la précision et les contraintes d’échelle."
    ]
  ),
  paperEntry(
    "mace", "materials", "2022-06-15", "method",
    "MACE: Higher Order Equivariant Message Passing Neural Networks for Fast and Accurate Force Fields",
    "Batatia, I., Kovács, D. P., Simm, G. N. C., et al.",
    "Batatia et al.", "NeurIPS 2022",
    "https://arxiv.org/abs/2206.07697",
    ["equivariant models", "force fields", "molecular simulation"],
    [
      "An equivariant message-passing model for accurate and fast force fields. Read for the symmetry argument and the cost of higher-order interactions.",
      "用于高精度、快速力场的高阶等变消息传递模型。重点读对称性论证与高阶相互作用的成本。",
      "Un modèle équivariant de passage de messages pour champs de force précis ; lisez l’argument de symétrie et le coût des interactions."
    ]
  ),
  paperEntry(
    "m3gnet", "materials", "2022-11-28", "method",
    "A Universal Graph Deep Learning Interatomic Potential for the Periodic Table",
    "Chen, C., & Ong, S. P.",
    "Chen & Ong", "Nature Computational Science",
    "https://doi.org/10.1038/s43588-022-00349-3",
    ["interatomic potentials", "graph networks", "materials"],
    [
      "A universal graph-network potential spanning the periodic table. Read for the training distribution and the transfer limits outside it.",
      "覆盖元素周期表的通用图网络势函数。重点读训练分布，以及分布之外的迁移边界。",
      "Un potentiel universel sur graphes couvrant le tableau périodique ; lisez la distribution d’entraînement et les limites de transfert."
    ]
  ),
  paperEntry(
    "chemcrow", "chemical", "2023-04-11", "applied",
    "ChemCrow: Augmenting Large-Language Models with Chemistry Tools",
    "Bran, A. M., Cox, S., Schilter, O., et al.",
    "Bran et al.", "arXiv",
    "https://arxiv.org/abs/2304.05376",
    ["chemistry", "tool use", "LLM agents"],
    [
      "Connects a language model to chemistry tools for planning and synthesis tasks. Read for the tool interface, safety controls and the evaluation of scientific validity.",
      "把语言模型连接到化学工具以完成规划与合成任务。重点读工具接口、安全控制与科学有效性评估。",
      "Relie un modèle de langage à des outils chimiques ; lisez l’interface, les contrôles de sûreté et l’évaluation de validité."
    ]
  ),
  paperEntry(
    "graph-physics", "mechanical", "2020-02-21", "method",
    "Learning to Simulate Complex Physics with Graph Networks",
    "Sánchez-González, A., Godwin, J., Pfaff, T., et al.",
    "Sánchez-González et al.", "ICML 2020",
    "https://arxiv.org/abs/2002.09405",
    ["graph networks", "physics simulation", "particles"],
    [
      "Learns particle-based physics simulation with graph networks. Read for the inductive bias and the gap between rollout stability and physical validity.",
      "用图网络学习基于粒子的物理模拟。重点读归纳偏置，以及长期推演稳定性与物理有效性之间的差距。",
      "Apprend la simulation physique par particules avec des réseaux de graphes ; lisez le biais inductif et la stabilité des rollouts."
    ]
  ),
  paperEntry(
    "med-palm2", "biomedical", "2023-05-16", "applied",
    "Towards Expert-Level Medical Question Answering with Large Language Models",
    "Singhal, K., Tu, T., Gottweis, J., et al.",
    "Singhal et al.", "arXiv",
    "https://arxiv.org/abs/2305.09617",
    ["medical QA", "clinical evaluation", "LLM"],
    [
      "Evaluates a medical language model against expert-written questions and clinician review. Read for the evaluation design and the distance from clinical deployment.",
      "以专家题目与临床医生评审评估医学语言模型。重点读评估设计，以及距离临床部署的距离。",
      "Évalue un modèle médical avec des questions d’experts et une revue clinique ; lisez l’évaluation et l’écart avec le déploiement clinique."
    ]
  )
];

window.PAPER_I18N = {
  en: {
    hero: {
      eyebrow: "The Paper Index",
      title: "A living index of engineering ideas.",
      lead: "Recent, load-bearing papers across 28 engineering subfields. Newest work first; read the source, add it to your literature matrix, and follow the argument into your own work.",
      note: "Curated and continuously revised. Preprints are labelled by venue; read the source, not only the note."
    },
    stats: {
      papers: "papers",
      fields: "engineering subfields",
      latest: "latest year",
      recent: "since 2024"
    },
    filters: {
      search: "Search",
      searchPlaceholder: "Search titles, authors, venues, tags…",
      field: "Subfield",
      allFields: "All engineering subfields",
      type: "Type",
      allTypes: "All types",
      era: "Years",
      allYears: "All years",
      since2024: "2024–2026",
      from2020: "2020–2023",
      before2020: "Before 2020",
      sort: "Sort",
      newest: "Newest first",
      oldest: "Oldest first",
      title: "Title A–Z",
      export: "Export CSV",
      count: "{n} papers",
      reset: "Reset filters"
    },
    types: { foundational: "Foundational", method: "Method", survey: "Survey", applied: "Applied" },
    card: {
      new: "New",
      readSource: "Read source",
      details: "Details",
      addMatrix: "Add to matrix",
      added: "Added to matrix",
      copyCitation: "Copy citation",
      citationCopied: "Citation copied",
      year: "Year",
      field: "Subfield"
    },
    dialog: {
      why: "Why it matters",
      tags: "Tags",
      citation: "Citation",
      readSource: "Read source",
      addMatrix: "Add to matrix",
      copyCitation: "Copy citation",
      close: "Close"
    },
    empty: "No papers match these filters.",
    home: { selected: "Latest selected entries" }
  },
  zh: {
    hero: {
      eyebrow: "论文索引",
      title: "一张持续生长的工科思想索引。",
      lead: "覆盖 28 个工科细分方向的近年承重论文。新论文优先；读原文，加入文献矩阵，再让论证进入你自己的研究。",
      note: "经过筛选并持续修订。预印本会标注出处；请读原文，而不只读注释。"
    },
    stats: {
      papers: "篇论文",
      fields: "个工科细分方向",
      latest: "最新年份",
      recent: "2024 年以来"
    },
    filters: {
      search: "搜索",
      searchPlaceholder: "搜索标题、作者、期刊、标签……",
      field: "细分方向",
      allFields: "全部工科细分方向",
      type: "类型",
      allTypes: "全部类型",
      era: "年份",
      allYears: "全部年份",
      since2024: "2024–2026",
      from2020: "2020–2023",
      before2020: "2020 年以前",
      sort: "排序",
      newest: "最新优先",
      oldest: "最早优先",
      title: "标题 A–Z",
      export: "导出 CSV",
      count: "{n} 篇",
      reset: "重置筛选"
    },
    types: { foundational: "奠基", method: "方法", survey: "综述", applied: "应用" },
    card: {
      new: "新",
      readSource: "读原文",
      details: "详情",
      addMatrix: "加入文献矩阵",
      added: "已加入矩阵",
      copyCitation: "复制引用",
      citationCopied: "引用已复制",
      year: "年份",
      field: "细分方向"
    },
    dialog: {
      why: "为何重要",
      tags: "标签",
      citation: "引用",
      readSource: "读原文",
      addMatrix: "加入文献矩阵",
      copyCitation: "复制引用",
      close: "关闭"
    },
    empty: "没有符合这些筛选条件的论文。",
    home: { selected: "最新精选条目" }
  },
  fr: {
    hero: {
      eyebrow: "L’index des articles",
      title: "Un index vivant des idées en ingénierie.",
      lead: "Des articles récents et structurants dans 28 sous-domaines d’ingénierie. Les plus récents d’abord ; lisez la source, ajoutez-la à votre matrice et poursuivez l’argument.",
      note: "Une sélection révisée en continu. Les prépublications sont signalées ; lisez la source, pas seulement la note."
    },
    stats: {
      papers: "articles",
      fields: "sous-domaines",
      latest: "année la plus récente",
      recent: "depuis 2024"
    },
    filters: {
      search: "Rechercher",
      searchPlaceholder: "Rechercher titres, auteurs, revues, tags…",
      field: "Sous-domaine",
      allFields: "Tous les sous-domaines",
      type: "Type",
      allTypes: "Tous les types",
      era: "Années",
      allYears: "Toutes les années",
      since2024: "2024–2026",
      from2020: "2020–2023",
      before2020: "Avant 2020",
      sort: "Trier",
      newest: "Plus récents",
      oldest: "Plus anciens",
      title: "Titre A–Z",
      export: "Exporter CSV",
      count: "{n} articles",
      reset: "Réinitialiser"
    },
    types: { foundational: "Fondateur", method: "Méthode", survey: "Revue", applied: "Appliqué" },
    card: {
      new: "Nouveau",
      readSource: "Lire la source",
      details: "Détails",
      addMatrix: "Ajouter à la matrice",
      added: "Ajouté à la matrice",
      copyCitation: "Copier la citation",
      citationCopied: "Citation copiée",
      year: "Année",
      field: "Sous-domaine"
    },
    dialog: {
      why: "Pourquoi il compte",
      tags: "Tags",
      citation: "Citation",
      readSource: "Lire la source",
      addMatrix: "Ajouter à la matrice",
      copyCitation: "Copier la citation",
      close: "Fermer"
    },
    empty: "Aucun article ne correspond à ces filtres.",
    home: { selected: "Dernières entrées sélectionnées" }
  }
};

(function mergePaperTranslations() {
  const languages = Object.keys(window.PAPER_I18N);
  languages.forEach(function (lang) {
    if (!window.I18N[lang]) window.I18N[lang] = {};
    window.I18N[lang].papers = Object.assign({}, window.I18N[lang].papers || {}, window.PAPER_I18N[lang]);
  });
})();
