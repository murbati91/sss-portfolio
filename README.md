# SSS Portfolio

![Live Site](https://img.shields.io/badge/Live-sss.bahrain--ai.com-blue?style=for-the-badge&logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Salahuddin Softtech Solutions** - Corporate Portfolio Website

> A modern, static portfolio showcasing 26+ projects with Progressive Web App (PWA) capabilities and offline support.

---

## 🚀 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

- **Frontend**: React compiled to static HTML/CSS/JS
- **Build Tool**: Vite (for development)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (CDN) + Digital Ocean (Backup)
- **PWA**: Service Worker with offline caching

---

## ✨ Features

- 📱 **Progressive Web App** - Installable on mobile and desktop
- 🌐 **Offline Support** - Full functionality without internet
- 🎨 **26+ Projects Showcase** - Interactive project gallery
- ⚡ **Lightning Fast** - Static site optimized for performance
- 🔒 **Secure** - Served via HTTPS with Cloudflare CDN
- 📊 **Portfolio Categories** - Web apps, APIs, Infrastructure projects
- 🌍 **Multi-Domain** - Accessible via sss.bahrain-ai.com

---

## 📂 Project Structure

```
/opt/sss-projects/portfolio-site/
├── index.html              # Main landing page
├── projects.html           # Projects showcase (26 projects)
├── projects-new.html       # Updated projects template
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker for offline support
├── package.json            # Project metadata
├── .gitignore              # Git ignore rules
├── assets/                 # CSS, JS, images
├── icons/                  # Favicon and app icons
├── sss-icon-*.png          # PWA icons (72x72 to 512x512)
└── sss-icon-*.svg          # Vector icons
```

---

## 🛠️ Local Development

### Prerequisites

- Node.js 16+ (optional, for local server)
- Any static file server (e.g., `serve`, `http-server`)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/murbati91/sss-portfolio.git
cd sss-portfolio

# Install dependencies (optional)
npm install

# Run local development server
npm run dev
# OR use any static server:
npx serve .
python -m http.server 8000

# Open browser
# http://localhost:3000 (serve)
# http://localhost:8000 (python)
```

### Testing PWA

1. Open Chrome DevTools → Application → Service Workers
2. Enable Update on reload
3. Test offline mode by toggling Offline in Network tab

---

## 🌐 Deployment

### Production Servers

| Environment | URL | Hosting |
|-------------|-----|---------|
| **Primary** | [sss.bahrain-ai.com](https://sss.bahrain-ai.com) | Vercel CDN |
| **Backup** | Digital Ocean (104.248.23.145) | Nginx @ /opt/sss-projects/portfolio-site/ |

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
npm run deploy
# OR
vercel --prod
```

### Server Deployment (Digital Ocean)

```bash
# SSH to server
ssh root@104.248.23.145

# Navigate to project
cd /opt/sss-projects/portfolio-site

# Pull latest changes
git pull origin main

# Reload Nginx (if needed)
sudo systemctl reload nginx
```

---

## 🏢 About SSS

**Salahuddin Softtech Solutions (SSS)** is a technology consultancy specializing in:

- 🌐 Web Application Development
- 🤖 AI Integration & Analytics
- ☁️ Cloud Infrastructure (27+ domains managed)
- 🎟️ Event Ticketing Systems (KFM Platform)
- 💼 Digital Business Cards (DsCard)
- 📊 Business Intelligence (AI Analytics)

### Portfolio Highlights

- **InfraPanel** - Infrastructure Control Center
- **KFM Ticketing** - AI-powered event platform
- **DsCard** - Digital business card platform
- **AI Studio** - AI app builder
- **AI Analytics** - Business intelligence dashboard
- **23+ more projects** across web, mobile, and infrastructure

---

## 📄 License

MIT License - Copyright (c) 2025 Salahuddin Softtech Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

---

## 🤝 Contact

- **Website**: [sss.bahrain-ai.com](https://sss.bahrain-ai.com)
- **Organization**: Salahuddin Softtech Solutions
- **Location**: Bahrain

---

**Built with ❤️ by SSS Team**
