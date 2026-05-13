# Shinas AR — Portfolio

Dark, motion-heavy portfolio site for [Shinas AR](https://linkedin.com/in/shinas-ar) — AI Engineer & Automation Specialist, Dubai.

**Live:** [shinasar.vercel.app](https://shinasar.vercel.app) *(deploy to fill in)*

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- [motion](https://motion.dev) (Framer Motion) for animation
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Custom cursor (CSS + ref-based interpolation)
- Instrument Serif + Inter via `next/font/google`

## Run locally
```bash
npm install
npm run dev
```
Opens at http://localhost:3000

## Deploy to Vercel
1. Push to GitHub
2. Go to https://vercel.com/new
3. Import the repo
4. Vercel auto-detects Next.js — click **Deploy**
5. Live in ~60 seconds at `<repo>.vercel.app`

## Structure
```
app/
  layout.tsx       — fonts, metadata, smooth-scroll wrapper, cursor
  page.tsx         — composition
  globals.css      — base, gradients, cursor styles, grid background
components/
  Navbar.tsx       — sticky nav with mix-blend-difference
  Hero.tsx         — animated SHINAS AR name + intro
  About.tsx        — staggered reveal paragraph + meta grid
  Projects.tsx     — 6 project cards with status badges
  Stack.tsx        — marquee of tools
  Contact.tsx      — big mailto + footer
  Cursor.tsx       — custom cursor (dot + lerp ring)
  SmoothScroll.tsx — Lenis wrapper
data/
  projects.ts      — single source of truth for project cards
```

## Edit project cards
All projects live in [`data/projects.ts`](data/projects.ts). Edit there, hot-reload picks it up.
