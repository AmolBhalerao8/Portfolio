export const SITE = {
  name: "Amol Bhalerao",
  role: "AI Engineer • Founder • Multimodal Systems Builder",
  location: "California, USA",
  email: "amols.emailid@gmail.com",
  linkedin: "https://www.linkedin.com/in/amol-s-bhalerao/",
  github: "https://github.com/AmolBhalerao8",
  resumeUrl: "/resume.pdf",
  profileImage: "/profile.jpg",
  aiHeroImage: "/ai-hero-portrait.png",
  /** Premium AI-generated hero portrait (default) */
  useAiHeroImage: true,
  /** Set true + add profile.jpg to use your real photo instead */
  useProfilePhoto: false,
  tagline:
    "Building intelligent systems that merge AI, automation, voice, vision, and real-world execution.",
  secondaryLine:
    "YC-backed startup engineer. Co-founder. Multimodal AI architect.",
  bio: "I design and ship AI systems that combine reasoning, automation, multimodal intelligence, and scalable infrastructure - transforming ambitious ideas into products founders and enterprises can bet on.",
  founderStory:
    "I started in industrial robotics at Tata Motors, learned enterprise data engineering at Infosys, then went all-in on AI - co-founding ZOL and ZAZ LABS, building for a YC-backed startup, and shipping systems that generate real revenue. I don't build demos. I build agents, voice pipelines, and MVPs that survive contact with customers.",
} as const;

export const ROTATING_TITLES = [
  "AI Engineer",
  "Founder",
  "Multimodal AI Builder",
  "Voice AI Architect",
  "Data Scientist",
  "Startup MVP Builder",
] as const;

export const CREDIBILITY_CHIPS = [
  { label: "4x Startup Competition Winner", icon: "trophy" },
  { label: "$7K Competition Prizes", icon: "dollar" },
  { label: "YC Startup MVP Builder", icon: "rocket" },
  { label: "$12K ARR Built", icon: "chart" },
  { label: "5,000+ AI Interactions", icon: "zap" },
  { label: "$9K+ Revenue Recovered", icon: "dollar" },
] as const;

export const COMMAND_METRICS = [
  { label: "AI Interactions", value: "5,247", delta: "+12%", unit: "" },
  { label: "ARR Generated", value: "$12K", delta: "Live", unit: "" },
  { label: "Revenue Recovered", value: "$9.2K", delta: "2 mo", unit: "" },
  { label: "Agents Deployed", value: "8", delta: "+3", unit: "" },
  { label: "LLM Workflows", value: "24", delta: "Active", unit: "" },
  { label: "Uptime", value: "99.7", delta: "", unit: "%" },
] as const;

export const TERMINAL_COMMANDS = [
  { cmd: "amol init --founder-mode", output: "✓ Neural orchestration online" },
  { cmd: "deploy agent --voice --vision", output: "✓ Multimodal stack: Gemini + Deepgram + ElevenLabs" },
  { cmd: "zol status --revenue", output: "✓ $12K ARR | 5,247 interactions | $9.2K recovered" },
  { cmd: "yc mvp --accelerate", output: "✓ 0 → production MVP pipeline ready" },
  { cmd: "research clip --align", output: "✓ Embedding alignment: 0.94 cosine similarity" },
] as const;

export const COMPETITION_WINS = [
  {
    id: "win-1",
    title: "ZOL - 1st Place",
    subtitle: "Chico State Startup Challenge",
    image: "/competitions/win-1.png",
    placement: "1st",
  },
  {
    id: "win-2",
    title: "ZAZ Labs - 2nd Place",
    subtitle: "Catalyst Startup Challenge",
    image: "/competitions/win-2.png",
    placement: "2nd",
  },
  {
    id: "win-3",
    title: "ZOL - Live Pitch",
    subtitle: "AI Valley / Entrepreneur Event",
    image: "/competitions/win-3.png",
    placement: "Pitch",
  },
  {
    id: "win-4",
    title: "Competition Award",
    subtitle: "Sunstone Startup Challenge",
    image: "/competitions/win-4.png",
    placement: "Winner",
  },
] as const;

export const ACHIEVEMENTS = [
  { title: "4x Startup Competition Winner", year: "$7K total prizes" },
  { title: "YC Startup MVP Builder", year: "2024" },
  { title: "$12K ARR - ZOL", year: "2025" },
  { title: "5,000+ AI Interactions", year: "2025" },
  { title: "Manus-Level Multimodal Agent", year: "2024" },
] as const;

export const HACKATHONS = [
  "SFHacks",
  "LAHacks",
  "CalHacks",
  "Afore Capital Hackathon",
  "TreeHacks (Stanford Hackathon)",
  "YC Hackathon",
  "and many more",
] as const;

export const EXPERIENCES = [
  {
    id: "zol",
    company: "ZOL",
    role: "Co-founder & CTO",
    website: "https://tryzol.com",
    period: "2025 - Present",
    accent: "cyan",
    highlight: true,
    description:
      "Built agentic AI automation for calls, scheduling, quoting, and shop operations end-to-end.",
    achievements: [
      "Reached ~$12K ARR with paying customers",
      "Processed 5,000+ interactions",
      "Recovered $9K+ revenue in first 2 months",
      "Backed by KOINZ CAPITAL",
      "Architected multi-step AI orchestration across sales & ops",
      "Built scalable automation infrastructure from zero",
    ],
    tech: ["Voice AI", "AI Agents", "LLM Orchestration", "Automation", "Backend"],
  },
  {
    id: "yc-startup",
    company: "YC-Backed Startup",
    role: "Founding AI Engineer [MVP development]",
    period: "2024 - 2025",
    accent: "orange",
    highlight: true,
    description:
      "Helped an early-stage YC-backed startup build and accelerate its AI-powered MVP from 0 → production.",
    achievements: [
      "Built scalable AI workflows and LLM integrations",
      "Designed backend systems and automation infrastructure",
      "Collaborated with founders on product strategy & execution",
      "Rapidly transformed ideas into production-ready systems",
    ],
    tech: ["LLM Workflows", "MVP Architecture", "Backend", "Automation"],
  },
  {
    id: "zaz-labs",
    company: "ZAZ LABS",
    role: "Co-founder",
    period: "2024 - 2025",
    accent: "purple",
    highlight: true,
    description:
      "Built a Manus-level multimodal AI agent with symbolic reasoning, contextual memory, and perceptual grounding.",
    achievements: [
      "Gemini, Groq, Deepgram, OpenAI, ElevenLabs integration",
      "Voice, vision, and local app control",
      "Symbolic reasoning & contextual memory systems",
      "Multimodal orchestration at production scale",
    ],
    tech: ["Gemini", "Groq", "Deepgram", "OpenAI", "ElevenLabs", "Multimodal"],
  },
  {
    id: "chc",
    company: "Center for Healthy Communities",
    role: "Data Science Intern",
    period: "2024 - 2025",
    accent: "green",
    highlight: false,
    description:
      "CalFresh analytics, Power BI dashboards, Azure pipelines, and public health insights.",
    achievements: [
      "Equity gap analysis in food assistance access",
      "Power BI dashboards for policy stakeholders",
      "Azure-based reporting pipelines",
    ],
    tech: ["Power BI", "Azure", "Python", "XGBoost"],
  },
  {
    id: "infosys",
    company: "Infosys",
    role: "Data Engineer",
    period: "2022 - 2024",
    accent: "blue",
    highlight: false,
    description:
      "ML pipelines, enterprise datasets, Power BI, Azure, Databricks for UBS/Credit Suisse projects.",
    achievements: [
      "Automated data validation pipelines",
      "Strategic analytics for UBS & Credit Suisse",
      "Databricks & Azure workflow optimization",
    ],
    tech: ["Azure", "Databricks", "Power BI", "ML Pipelines", "Python"],
  },
  {
    id: "tata",
    company: "Tata Motors",
    role: "Engineer",
    period: "2021 - 2022",
    accent: "slate",
    highlight: false,
    description:
      "KUKA/FANUC robotics programming, PLC integration, and manufacturing automation.",
    achievements: [
      "Programmed KUKA and FANUC industrial robots",
      "PLC integration & automation optimization",
      "Reduced downtime through system improvements",
    ],
    tech: ["KUKA", "FANUC", "PLC", "Industrial Automation"],
  },
] as const;

export const PROJECTS = [
  {
    id: "ai-agent",
    title: "AI Agent Platform",
    description:
      "Multimodal AI assistant with reasoning, voice, vision, local execution, and workflow automation.",
    longDescription:
      "A production-grade agent platform combining LLM orchestration, vector memory, voice interfaces, and tool-use for real-world task execution.",
    tech: ["OpenAI", "Gemini", "Deepgram", "ElevenLabs", "Vector DBs", "FastAPI"],
    github: "https://github.com/AmolBhalerao8",
    demo: null,
    featured: true,
    size: "large" as const,
    gradient: "from-violet-600/40 via-purple-500/25 to-fuchsia-600/40",
    metrics: ["12+ agents", "Multimodal", "Tool-use"],
  },
  {
    id: "voice-ai",
    title: "Voice AI Automation System",
    description:
      "AI-powered business automation for calls, scheduling, quoting, and intelligent customer routing.",
    longDescription:
      "End-to-end voice AI stack powering ZOL - handling inbound/outbound calls, CRM sync, and revenue recovery workflows.",
    tech: ["Voice AI", "LLM", "Twilio", "Automation"],
    github: "https://github.com/AmolBhalerao8",
    demo: "https://zol.vercel.app",
    featured: true,
    size: "medium" as const,
    gradient: "from-cyan-600/40 via-blue-500/25 to-indigo-600/40",
    metrics: ["5K+ calls", "$12K ARR", "Live"],
  },
  {
    id: "calfresh",
    title: "CalFresh Analytics Platform",
    description:
      "Public health analytics with Power BI, Azure pipelines, and equity-focused insights.",
    longDescription:
      "Analyzed CalFresh participation data to surface equity gaps and deliver policy-relevant dashboards for stakeholders.",
    tech: ["Power BI", "Azure", "Python", "XGBoost"],
    github: "https://github.com/AmolBhalerao8/calfresh-analysis",
    demo: null,
    featured: false,
    size: "medium" as const,
    gradient: "from-emerald-600/40 via-green-500/25 to-teal-600/40",
    metrics: ["Policy insights", "Azure", "Equity"],
  },
  {
    id: "orchestration",
    title: "AI Orchestration Engine",
    description:
      "Multi-agent workflow routing and execution for complex AI task coordination.",
    longDescription:
      "Routes tasks across specialized agents with retry logic, state management, and observability for production AI systems.",
    tech: ["LLM", "Agents", "Python", "FastAPI"],
    github: "https://github.com/AmolBhalerao8",
    demo: null,
    featured: false,
    size: "small" as const,
    gradient: "from-orange-600/40 via-amber-500/25 to-yellow-600/40",
    metrics: ["Multi-agent", "Routing", "State"],
  },
  {
    id: "vlm-research",
    title: "VLM Research Platform",
    description:
      "CLIP, BLIP, embedding alignment, image-text retrieval, and visual reasoning experiments.",
    longDescription:
      "Research sandbox for contrastive learning, cross-modal alignment, and zero-shot multimodal tasks.",
    tech: ["CLIP", "BLIP", "PyTorch", "Hugging Face"],
    github: "https://github.com/AmolBhalerao8/vlm-playground",
    demo: null,
    featured: true,
    size: "large" as const,
    gradient: "from-rose-600/40 via-pink-500/25 to-fuchsia-600/40",
    metrics: ["CLIP", "BLIP", "Retrieval"],
  },
  {
    id: "yc-mvp",
    title: "YC Startup MVP Systems",
    description:
      "0 → MVP infrastructure for YC-backed startup: LLM workflows, backend, and automation.",
    longDescription:
      "Architected and shipped production AI infrastructure enabling rapid MVP iteration for an early-stage YC company.",
    tech: ["LLM", "Backend", "Automation", "MVP"],
    github: "https://github.com/AmolBhalerao8",
    demo: null,
    featured: true,
    size: "medium" as const,
    gradient: "from-indigo-600/40 via-violet-500/25 to-purple-600/40",
    metrics: ["YC", "0→MVP", "Production"],
  },
] as const;

export const SKILL_CATEGORIES = [
  {
    title: "AI/ML",
    color: "#a855f7",
    skills: ["PyTorch", "Transformers", "RAG", "RL", "OpenCV", "NLP", "Hugging Face", "Generative AI"],
  },
  {
    title: "Programming",
    color: "#22d3ee",
    skills: ["Python", "TypeScript", "SQL", "R", "JavaScript"],
  },
  {
    title: "Cloud",
    color: "#6366f1",
    skills: ["Azure", "AWS", "GCP", "Databricks", "Vector DBs"],
  },
  {
    title: "AI Systems",
    color: "#f97316",
    skills: ["Voice AI", "AI Agents", "Multimodal", "LLM Orchestration", "MCP", "Automation"],
  },
  {
    title: "Tools",
    color: "#10b981",
    skills: ["Git", "FastAPI", "Power BI", "Linux", "Flask"],
  },
] as const;

export const RESEARCH_TOPICS = [
  {
    title: "CLIP & BLIP",
    description: "Contrastive and bootstrapped language-image pre-training for zero-shot tasks.",
    tags: ["CLIP", "BLIP", "Zero-shot"],
    status: "Active",
  },
  {
    title: "Multimodal Foundation Models",
    description: "Unified architectures bridging vision, language, and reasoning.",
    tags: ["Foundation Models", "Multimodal"],
    status: "Exploring",
  },
  {
    title: "Contrastive Learning",
    description: "Aligned representations via contrastive objectives and hard negatives.",
    tags: ["Contrastive", "Embeddings"],
    status: "Active",
  },
  {
    title: "Embedding Alignment",
    description: "Cross-modal latent space alignment for retrieval and reasoning.",
    tags: ["Alignment", "Retrieval"],
    status: "Active",
  },
  {
    title: "Visual Reasoning",
    description: "Combining visual perception with logical reasoning for VQA tasks.",
    tags: ["VQA", "Reasoning"],
    status: "Exploring",
  },
  {
    title: "Image-Text Retrieval",
    description: "Bidirectional retrieval at scale with embedding search.",
    tags: ["Retrieval", "Search"],
    status: "Shipped",
  },
] as const;

export const EDUCATION = [
  {
    id: "csu-chico",
    school: "California State University, Chico",
    degree: "Master's in Data Science and Analytics",
    period: "2024 - 2026",
    highlights: [
      "VLM Researcher",
      "Grader and embedded tutor for math and statistics",
    ],
  },
] as const;

export const ARCHITECTURE_LAYERS = [
  { name: "Interface", items: ["Voice", "Vision", "Web", "API"] },
  { name: "Orchestration", items: ["Agent Router", "Workflow Engine", "Memory"] },
  { name: "Models", items: ["GPT-4", "Gemini", "Groq", "Embeddings"] },
  { name: "Infrastructure", items: ["Azure", "Vector DB", "FastAPI", "Webhooks"] },
] as const;

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Story" },
  { id: "command", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "research", label: "Research" },
  { id: "contact", label: "Contact" },
] as const;

export type Project = (typeof PROJECTS)[number];
export type Experience = (typeof EXPERIENCES)[number];
