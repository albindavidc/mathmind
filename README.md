# 🔢 **MathMind – Standard Calculator**

A modern **Standard Calculator** built with **React, TypeScript, and Vite**.

MathMind combines speed, clarity, and beautiful design—perfect for students, engineers, and anyone working with numbers.

---

## 🚀 **Live Demo**

**GitHub Pages Deployment:**
https://albindavidc.github.io/MathMind/

---

## ✨ **Features**

### 🧮 **Standard Calculator**

* Fast, responsive scientific keypad
* Real-time arithmetic with operator chaining
* Clean, monospace display
* Error handling & input sanitization

### 📜 **History Sidebar**

* Stores calculations
* Timestamped logs
* One-click clear

### ✨ **Beautiful UI & Animations**

* Neon-themed dark design
* Glassmorphism cards
* Animated splash screen
* Smooth transitions
* Fully responsive

---

## 📁 **Project Structure**

```
albindavidc-mathmind/
│── App.tsx
│── index.tsx
│── index.html
│── package.json
│── tsconfig.json
│── vite.config.ts
│── constants.ts
│── types.ts
│── metadata.json
│
├── components/
│   ├── Calculator.tsx
│   ├── HistorySidebar.tsx
│   └── SplashScreen.tsx
│
├── services/
│   └── geminiService.ts
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## ⚙️ **Tech Stack**

### **Frontend**

* React 19
* TypeScript
* TailwindCSS
* Vite
* PWA

### **Deployment**

* GitHub Actions
* GitHub Pages

---

## 🧩 **Local Development**

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

### 3️⃣ Build for production

```bash
npm run build
```

### 4️⃣ Preview production build

```bash
npm run preview
```

---

## 🚀 **Automatic Deployment (GitHub Actions)**

This repo includes:

```
.github/workflows/deploy.yml
```

Deployment happens when you:

* Push to **main**
* Or manually trigger from Actions

The output is automatically published to **GitHub Pages**.

To enable Pages:

1. Go to **Settings → Pages**
2. Set **Source = GitHub Actions**

Done. Every push updates the live site.

---

## 🧼 **Code Quality**

Configured with:

* `"strict": true` in TypeScript
* `"noUnusedLocals": true`
* `"noUnusedParameters": true`
* Modular components
* Clean service layers

---

## 🤝 **Contributing**

Pull requests are welcome!
Open issues, submit improvements, or request features.

---

## 📄 **License**

MIT License
Free to use, modify, and improve.

---

## 👨‍💻 **Author**

**Albin David C**
Building modern, intelligent, beautifully-designed web applications.
