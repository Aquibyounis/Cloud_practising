# CloudVerse

A comprehensive cloud computing learning platform designed to help you master cloud concepts from beginner to professional level, optimized for Cognizant technical interviews.

## 🚀 Features

- **Two Learning Zones**: Zone A for exam prep, Zone B for professional mastery
- **65+ Topics**: Covering all cloud computing concepts
- **Interactive MCQs**: Practice questions with explanations
- **Quiz Engine**: Timed quizzes with adaptive difficulty
- **Progress Tracking**: IndexedDB-powered analytics
- **Previous Years Analysis**: Topic frequency trends
- **PWA Support**: Installable, works offline
- **Beautiful UI**: Glassmorphism, dark/light/night modes

## 🛠 Tech Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Recharts
- IndexedDB (idb)
- Gemini API (for dynamic quiz generation)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

Create a `.env` file with:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

## 🌐 Deployment (Netlify)

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variable: `VITE_GEMINI_API_KEY`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          # Reusable UI components
│   └── layout/      # Layout components
├── contexts/        # React contexts
├── data/           # Curriculum and topics
├── pages/          # Page components
├── services/       # API services
└── types/          # TypeScript types
```

## 📖 License

MIT
