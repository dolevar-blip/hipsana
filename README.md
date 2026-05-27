# Hipsana

HIPAA & cybersecurity for solo practices.

This is the Next.js 14 (App Router) skeleton for hipsana.com.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Google Fonts via `next/font` (Fraunces + DM Sans)

## Local development

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Deployment

This project is configured to deploy to Vercel from a connected GitHub repository. No environment variables are required for the v1 skeleton.

## Project structure

```
hipsana/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with fonts, header, footer
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Tailwind base + custom styles
│   ├── about/
│   ├── disclosure/
│   └── contact/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
├── postcss.config.js
└── .gitignore
```

## Legal disclosures

Per `00b-CONSTRAINTS.md` Sections 5 and 11.4, the footer of every page includes:

1. FTC-compliant affiliate disclosure
2. YMYL educational-content disclaimer

These must remain visible on all pages.
