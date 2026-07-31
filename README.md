# Drisyant -- Visuals

A single-page 3D creator portfolio built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/sections/` -- the five page sections (Hero, Marquee, About, Services, Projects), rendered in that order in `App.tsx`.
- `src/components/` -- reusable pieces: `FadeIn` (scroll/mount reveal), `Magnet` (cursor-following hover), `AnimatedText` (per-character scroll reveal), `ContactButton`, `LiveProjectButton`.
- `src/index.css` -- global reset, dark background, Kanit font, and the `.hero-heading` gradient-text utility class.

All images are pulled from the external URLs specified in the brief (Figma Site, motionsites.ai preview GIFs, and Higgs/CloudFront-hosted CDN images) -- no local assets are bundled.
