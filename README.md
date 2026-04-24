# Vishnu Muthukumar — UI Developer Portfolio

A high-performance, design-centric personal portfolio built with Next.js and animated using Framer Motion. This project reflects a "Sophisticated Dark Mode" aesthetic, prioritizing interactive motion, physics-based animations, and rich glassmorphism UI components.

## 🚀 Live Demo
**[vishnumuthukumar.com](https://vishnu-git-main-vishnus-projects-b11287f0.vercel.app)**

## ✨ Key Features
- **Highly Interactive Hero Canvas**: Custom 90-node constellation network that reacts to mouse movement via `requestAnimationFrame`.
- **Fluid Spring Animations**: Utilizes `framer-motion` springs for natural, bounce-driven interactions instead of rigid linear fades.
- **Micro-interactions**: Magnetic hover buttons, word-by-word scroll reveal triggers, and animated electric scrollbars.
- **Glassmorphism Design System**: Layered blurred surfaces, thin semi-transparent neon borders, and deep premium navy backgrounds (`#050510`).
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop viewing without sacrificing visual fidelity.

## 🛠 Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Styling**: Vanilla CSS with custom utility classes & CSS variables
- **Motion Engine**: [Framer Motion](https://www.framer.com/motion/)
- **Graphics & Logic**: React hooks, Web APIs (Canvas, IntersectionObserver)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure
```text
src/
├── app/
│   ├── layout.jsx        # Root HTML wrapper & smooth scroll context
│   ├── page.jsx          # Main landing index pulling all components
│   └── globals.css       # Design tokens, keyframes, and utilities
├── components/           # Main UI sections (Landing, About, Timeline, Project, etc.)
└── common/               # Shared logic (ConstellationCanvas, Cursor, SmoothScroll)
```

## 💻 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Viki2601/Vishnu.git
   cd vishnu
   ```

2. **Install dependencies:**
   *(Ensure you have Next.js and Framer Motion installed)*
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design Philosophy
The UI was explicitly crafted to bridge the gap between engineering rigour and modern premium design. Taking inspiration from top-tier digital agencies and enterprise analytics platforms (e.g., Bodaghee Consulting), it opts for deep navy tones over pure black, electric cyan accents over generic blues, and relies on subtle spatial depth (borders/shadows) over flat blocks.

## 🤝 Let's Connect
- **LinkedIn**: [Vishnu Muthukumar](https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/)
- **GitHub**: [Viki2601](https://github.com/Viki2601)

---
*Built with passion and pixel-perfect precision.*
