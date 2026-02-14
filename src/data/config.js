// ============================================
// PORTFOLIO CONFIGURATION — Amol S. Bhalerao
// ============================================

export const CONFIG = {
  // Personal Info
  name: "Amol S. Bhalerao",
  tagline: "AI/ML Engineer | Data Scientist | VLM Researcher working with Dr. Bo Shen (Ex-CTO, Vuclip)",
  location: "California, USA",
  email: "amols.emailid@gmail.com",

  // Links
  resumeUrl: "/resume.pdf",
  linkedinUrl: "https://www.linkedin.com/in/amol-s-bhalerao/",
  githubUrl: "https://github.com/AmolBhalerao8",

  // Hero Content
  heroHeadline: "Hey, I'm Amol.",
  heroSubheadline:
    "M.S. Data Science & Analytics. Building production-ready ML systems, interpretable AI, and multimodal applications. Co-founder & CTO of ZOL.",
  zolUrl: "https://zol.vercel.app/",

  // About Section
  aboutParagraph: `
I'm a Master's student in Data Science & Analytics specializing in applied machine learning, interpretable AI, and production-ready ML systems.

My Master's project focuses on NSF-related research analyzing CalFresh participation among college students, where I developed fairness-aware and interpretable machine learning models to support data-driven policy and outreach decisions. Beyond research, I've built real-time computer vision demos, vision-language model applications, end-to-end ML pipelines, and analytics tools for data validation and visualization.

I'm also a 2× startup challenge winner and cofounder, with hands-on experience turning ideas into working products under real-world constraints. I'm passionate about building ML systems that are not only accurate, but explainable, scalable, and impactful.
  `,

  aboutHighlights: [
    "M.S. Data Science & Analytics (Applied ML Focus)",
    "Master's Project: NSF-Related Research (study3)",
    "Interpretable & Fairness-Aware Machine Learning",
    "Production ML: PyTorch → ONNX → FastAPI",
    "Computer Vision & Vision-Language Models",
    "Microsoft Azure Fundamentals Certified",
    "Power BI Dashboards & Data Quality Tooling",
    "2× Startup Challenge Winner & Cofounder",
  ],

  // Theme
  accentColor: "#00d4ff",
  accentColorRGB: "0, 212, 255",
}

// ============================================
// 3D STATIONS
// ============================================

export const STATIONS = {
  cv: {
    id: "cv",
    name: "CV Station",
    shortName: "Computer Vision",
    icon: "👁️",
    tagline: "Real-time vision systems and model internals.",
    description:
      "Interactive computer vision demos including real-time object detection, feature visualization, and interpretability tools.",
    position: [-3, 0, 0],
    color: "#ff6b6b",
  },

  vlm: {
    id: "vlm",
    name: "VLM Station",
    shortName: "Vision-Language",
    icon: "🧠",
    tagline: "Multimodal AI — images, language, and attention.",
    description:
      "Vision-language experiments combining image understanding with natural language queries and attention visualizations.",
    position: [3, 0, 0],
    color: "#4ecdc4",
  },

  data: {
    id: "data",
    name: "Data Station",
    shortName: "Data Science",
    icon: "📊",
    tagline: "Interpretable models, embeddings, and analytics.",
    description:
      "Applied data science workflows featuring interpretable ML, clustering, and interactive dashboards.",
    position: [0, 0, -3],
    color: "#ffe66d",
  },

  projects: {
    id: "projects",
    name: "Projects Wall",
    shortName: "Projects",
    icon: "🚀",
    tagline: "Research-grade and production ML projects.",
    description:
      "Curated end-to-end machine learning, data science, and AI projects with reproducible workflows.",
    position: [0, 2, 0],
    color: "#c44dff",
  },
}

// ============================================
// PROJECTS
// ============================================

export const PROJECTS = [
  // ---------- FLAGSHIP MASTER'S PROJECT ----------
  {
    id: "calfresh",
    title: "Modeling CalFresh Participation",
    subtitle: "Master’s Project · NSF-Related Research (study3)",
    shortDescription:
      "Large-scale, interpretable, and fairness-aware ML analysis of food assistance participation.",
    overview:
      "This Master’s project analyzes CalFresh participation using a large, IRB-approved dataset to uncover structural and behavioral barriers to access. The work combines rigorous data science, interpretable machine learning, and fairness evaluation to generate actionable insights.",
    problem:
      "Despite widespread food insecurity among college students, CalFresh participation remains low. Existing analyses lack interpretability and equity-focused evaluation needed for policy decisions.",
    dataset:
      "study3 survey and administrative data (~10,000+ student records, IRB approved)",
    approach:
      "Built a reproducible data pipeline with automated validation. Trained ensemble models (XGBoost, Random Forest) and applied SHAP-based interpretability. Conducted subgroup fairness analysis across demographics.",
    results:
      "Achieved ~0.85 AUC with transparent feature importance. Fairness disparities were below 5% across major demographic groups.",
    impact:
      "Supports data-driven outreach strategies and policy recommendations to improve food security and equitable access.",
    tags: [
      "Python",
      "XGBoost",
      "SHAP",
      "Fairness ML",
      "Reproducible Research",
      "Power BI",
    ],
    highlightMetric: "0.85 AUC · Fairness-Aware",
    links: {
      github: "https://github.com/AmolBhalerao8/calfresh-analysis",
      notebook: "https://github.com/AmolBhalerao8/calfresh-analysis/blob/main/analysis.ipynb",
    },
    demoType: "research",
    featured: true,
  },

  // ---------- COMPUTER VISION ----------
  {
    id: "cv-demo",
    title: "Real-Time Computer Vision Demo",
    subtitle: "Object Detection & Feature Visualization",
    shortDescription:
      "Webcam-based object detection with interactive feature map visualization.",
    overview:
      "Production-style computer vision demo showcasing real-time inference and model introspection.",
    dataset: "COCO pretrained models + live webcam feed",
    approach:
      "Converted PyTorch models to ONNX for efficient inference. Built FastAPI + WebSocket backend with Three.js overlays.",
    results:
      "Achieved ~25ms average inference latency with smooth real-time visualization.",
    impact:
      "Demonstrates production-ready ML deployment and interpretability techniques.",
    tags: ["PyTorch", "ONNX", "FastAPI", "Three.js"],
    highlightMetric: "25ms latency",
    links: {
      github: "https://github.com/AmolBhalerao8/cv-demo",
      demo: "/demos/cv",
    },
    demoType: "live",
    featured: true,
  },

  // ---------- VISION-LANGUAGE ----------
  {
    id: "vlm-playground",
    title: "VLM Playground",
    subtitle: "Multimodal Image + Text Reasoning",
    shortDescription:
      "Ask natural language questions about images and visualize attention.",
    overview:
      "Interactive playground for vision-language models with explainable attention maps.",
    dataset: "User-uploaded images with pretrained CLIP / ViT models",
    approach:
      "Integrated CLIP and ViT models with ONNX runtime and FastAPI backend.",
    results:
      "Sub-second response times with meaningful attention visualizations.",
    impact:
      "Demonstrates practical multimodal AI and interpretability.",
    tags: ["CLIP", "ViT", "ONNX", "Multimodal AI"],
    highlightMetric: "<1s response",
    links: {
      github: "https://github.com/AmolBhalerao8/vlm-playground",
      demo: "/demos/vlm",
    },
    demoType: "live",
    featured: true,
  },

  // ---------- DATA SCIENCE / ML ----------
  {
    id: "ml-pipeline",
    title: "End-to-End ML Pipeline",
    subtitle: "Applied Machine Learning",
    shortDescription:
      "Reusable ML pipeline covering data validation, modeling, and evaluation.",
    overview:
      "Built a modular ML pipeline supporting multiple datasets and experiments.",
    impact:
      "Demonstrates strong applied ML fundamentals and reproducibility.",
    tags: ["Python", "scikit-learn", "ML Pipelines"],
    highlightMetric: "End-to-end ML",
    demoType: "system",
  },

  {
    id: "data-validation",
    title: "Data Validation Tool",
    subtitle: "ETL & Data Quality Automation",
    shortDescription:
      "Automated mismatch detection and quality checks for data pipelines.",
    overview:
      "Built a configurable validation engine with CLI support.",
    results:
      "Reduced data QA time by ~40% in prototype testing.",
    tags: ["Python", "Data Quality", "ETL"],
    highlightMetric: "40% faster QA",
    links: {
      github: "https://github.com/AmolBhalerao8/data-validation-tool",
    },
    demoType: "tool",
  },

  {
    id: "powerbi",
    title: "Advanced Power BI Dashboards",
    subtitle: "Analytics & Decision Support",
    shortDescription:
      "Interactive dashboards for insight-driven decision making.",
    overview:
      "Designed dashboards translating complex datasets into actionable insights.",
    tags: ["Power BI", "DAX", "Data Visualization"],
    highlightMetric: "Insight-driven",
    demoType: "visual",
  },
]

// ============================================
// EDUCATION
// ============================================

export const EDUCATION = [
  {
    id: "ms-csuchico",
    degree: "Master of Science in Data Science & Analytics",
    school: "California State University, Chico",
    location: "Chico, CA",
    period: "2024 – 2026 (Expected)",
    highlights: [
      "Focus: Applied Machine Learning, Interpretable AI",
      "Master's Project: NSF-Related Research (study3)",
      "Relevant Coursework: Machine Learning, Data Mining, Statistical Modeling",
    ],
  },
]

// ============================================
// TECH STACK / SKILLS
// ============================================

export const SKILLS = {
  languages: {
    title: "Languages",
    items: ["Python", "SQL", "JavaScript", "R"],
  },
  mlFrameworks: {
    title: "ML & AI",
    items: ["PyTorch", "scikit-learn", "XGBoost", "ONNX", "SHAP", "Hugging Face"],
  },
  vision: {
    title: "Computer Vision",
    items: ["OpenCV", "YOLO", "CLIP", "ViT", "Feature Visualization"],
  },
  data: {
    title: "Data & Analytics",
    items: ["pandas", "NumPy", "Power BI", "DAX", "Matplotlib", "Plotly"],
  },
  backend: {
    title: "Backend & Deployment",
    items: ["FastAPI", "Flask", "Docker", "Azure", "WebSocket"],
  },
  tools: {
    title: "Tools & Practices",
    items: ["Git", "Linux", "Jupyter", "VS Code", "Reproducible Research"],
  },
}

// ============================================
// HACKATHONS & ACHIEVEMENTS
// ============================================

export const ACHIEVEMENTS = [
  {
    id: "startup-challenge",
    title: "2× Startup Challenge Winner",
    subtitle: "Cofounder",
    description:
      "Won two competitive startup challenges by leading technical execution and product development.",
    highlights: [
      "Cofounder of ZOL",
      "Cofounder of CleanNest",
      "Built and pitched MVPs under tight deadlines",
    ],
    links: {
      zol: "https://zol.ai", // replace if needed
    },
  },
]

// ============================================
// NAVIGATION
// ============================================

export const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
]
