# 🧠 AI Research Lab Portfolio

A stunning 3D interactive portfolio for ML Engineers, Data Scientists, and Research roles. Built with React Three Fiber, featuring an immersive "AI Research Lab" experience.

![Portfolio Preview](./docs/preview.png)

## ✨ Features

- **3D Interactive Lab** - Navigate through a virtual research lab with clickable stations
- **Real-time ML Demos** - CV and VLM demos with WebSocket streaming
- **Mobile Responsive** - Graceful 2D fallback for mobile devices
- **Performance Optimized** - Adjustable graphics settings (High/Medium/Low)
- **SEO Ready** - Full meta tags, Open Graph, and structured data
- **Accessible** - Keyboard navigation, ARIA labels, screen reader support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

## 📝 Customization

### 1. Update Personal Information

Edit `src/data/config.js` to replace placeholders:

```javascript
export const CONFIG = {
  name: "Your Name",
  tagline: "Your Tagline",
  email: "your@email.com",
  resumeUrl: "https://link-to-your-resume.pdf",
  linkedinUrl: "https://linkedin.com/in/yourprofile",
  githubUrl: "https://github.com/yourusername",
  // ... more options
}
```

### 2. Update Projects

In the same file, edit the `PROJECTS` array:

```javascript
export const PROJECTS = [
  {
    id: 'project-1',
    title: 'Your Project Title',
    shortDescription: 'Brief description',
    tags: ['Python', 'PyTorch', 'FastAPI'],
    highlightMetric: '95% accuracy',
    links: {
      github: 'https://github.com/...',
      demo: '/demos/project-1',
    },
    // ... more fields
  },
]
```

### 3. Update SEO

Edit `index.html` to replace:
- `{{NAME}}` with your name
- `{{LINKEDIN}}` and `{{GITHUB}}` with your URLs
- Update `og:image` with your preview image URL

## 🏗️ Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── three/          # 3D scene components
│   │   │   ├── LabScene.jsx
│   │   │   ├── Station.jsx
│   │   │   └── ...
│   │   ├── sections/       # Page sections
│   │   │   ├── AboutSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   └── ...
│   │   └── ui/             # UI components
│   │       ├── Navigation.jsx
│   │       ├── ProjectModal.jsx
│   │       └── ...
│   ├── data/
│   │   └── config.js       # All customizable content
│   ├── store/
│   │   └── useStore.js     # Zustand state management
│   ├── App.jsx
│   └── index.css
├── backend/                 # FastAPI backend for demos
│   ├── main.py
│   ├── requirements.txt
│   └── convert_to_onnx.py
└── README.md
```

## 🔧 Backend Setup (For Live Demos)

### 1. Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Add Your Models

Place ONNX models in `backend/models/`:
- `detector.onnx` - Object detection model
- `vlm.onnx` - Vision-language model

### 3. Convert PyTorch to ONNX

```bash
python convert_to_onnx.py --model detector --output models/detector.onnx
```

### 4. Run the Backend

```bash
uvicorn main:app --reload --port 8000
```

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Vercel:**
1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`

**Netlify:**
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Backend (Render/Heroku/AWS)

**Render:**
1. Create a new Web Service
2. Connect your repo
3. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Docker:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables

For the backend, set:
- `CORS_ORIGINS` - Comma-separated allowed origins
- `MODEL_PATH` - Path to ONNX models

## 🎨 Customizing the Theme

Edit `src/data/config.js`:

```javascript
export const CONFIG = {
  accentColor: "#00d4ff",  // Change accent color
  // ...
}
```

Edit `src/index.css` for global styles:

```css
:root {
  --accent-color: #00d4ff;
}
```

## ⚡ Performance Tips

1. **Optimize 3D Models** - Use low-poly models, texture atlases
2. **Lazy Load** - Heavy assets are lazy loaded
3. **Performance Mode** - Users can switch to Low mode
4. **Mobile Fallback** - 2D view for mobile devices

## 📊 Lighthouse Targets

- Performance: > 80
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 🔒 Privacy & Security

- Webcam data stays client-side or goes only to your demo server
- No third-party tracking by default
- CORS configured for security
- HTTPS recommended for production

## 📄 License

MIT License - feel free to use for your own portfolio!

## 🙏 Credits

Built with:
- [React](https://react.dev)
- [Three.js](https://threejs.org) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion)
- [TailwindCSS](https://tailwindcss.com)
- [FastAPI](https://fastapi.tiangolo.com)

---

**Need help?** Open an issue or reach out!
