# Lina Brihoum — Portfolio & Blog

Personal portfolio and technical blog about Site Reliability Engineering, Cloud Architecture, DevSecOps and Artificial Intelligence. Live at [linabrihoum.com](https://linabrihoum.com).

The site is dark only, with a space theme: starfields, comets and a planet horizon, all drawn in the browser and paused when they scroll out of view.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 3 |
| Content | Contentlayer (`contentlayer2`) + MDX |
| Animation | Framer Motion, canvas (Vortex particles via `simplex-noise`) |
| Syntax highlighting | Shiki via `rehype-pretty-code` (github-dark theme) |
| Contact email | [Resend](https://resend.com), called from `/api/contact` |
| Tests | Vitest + Testing Library (jsdom) |
| Speed checks | Lighthouse CI, Playwright animation lag check |
| Hosting | Vercel |

There is no database: every page is built ahead of time from the files in this repo.

## Features

- MDX blog with table of contents, reading time, key takeaways and syntax-highlighted code
- Category pages at `/categories/[slug]`, with search
- RSS feed at `/feed.xml`
- Projects page with a featured project and 3D-tilt cards
- About page with scroll-drawn experience and education timelines
- One-page contact form with inline errors, a spam honeypot and keyboard shortcuts (Enter for the next field, Ctrl/⌘ + Enter to send)
- SEO: Open Graph, Twitter cards, JSON-LD structured data, canonical URLs, sitemap and robots.txt
- Respects "reduce motion" settings
- PWA manifest and icons

## Project Structure

```
portfolio_blog/
├── content/                  # Blog posts: one folder per post, <slug>/index.mdx
├── public/                   # Static assets (images, icons)
├── scripts/
│   └── check-animation-lag.mjs   # Animation stutter check (see below)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── page.js               # Home
│   │   ├── about/  projects/  contact/
│   │   ├── blogs/[slug]/         # Individual posts
│   │   ├── categories/[slug]/    # Category pages
│   │   ├── feed.xml/             # RSS feed
│   │   └── api/contact/          # Sends contact form emails through Resend
│   ├── components/           # React components, grouped by page (About, Blog, Contact, ...)
│   │   └── ui/                   # Shared space visuals: Starfield, CometField, Nebula, Vortex, ...
│   ├── styles/               # Design tokens and animation keyframes
│   └── utils/                # Site config, metadata, RSS, redirects, form validation
├── contentlayer.config.js    # MDX fields and plugins
├── lighthouserc.js           # Page speed limits
├── next.config.js            # Redirects
└── next-sitemap.config.js    # Sitemap (built after every build)
```

Tests sit next to the code they test, as `*.test.js`.

## Getting Started

### Prerequisites

- Node.js 26 (see `engines` in `package.json`). On Windows, install it with [nvm-windows](https://github.com/coreybutler/nvm-windows): `nvm install 26` then `nvm use 26`.

### Installation

```bash
git clone https://github.com/linabrihoum/portfolio_blog.git
cd portfolio_blog
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is gitignored, so keys never get committed.

| Variable | What it's for |
|---|---|
| `RESEND_API_KEY` | Lets `/api/contact` send contact form emails. Without it the rest of the site works, but the form shows an error. |

On Vercel, set the same variable under Project Settings → Environment Variables.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

The `postbuild` step generates `sitemap.xml` and `robots.txt`.

## Checks

Every pull request runs these on GitHub Actions ([.github/workflows/ci.yml](.github/workflows/ci.yml)). Run them locally before pushing:

| Command | What it checks |
|---|---|
| `npm run lint` | ESLint. Look at the exit code: it's `0` when there are no errors. |
| `npm test` | Unit and component tests (Vitest) |
| `npm run build` | The site builds, including every post's front matter |
| `npm run check:previews` | Every link preview image was built ahead of time and its fonts are bundled. Needs a build first. |
| `npm run check:speed` | Lighthouse page speed on the main pages, with mobile settings. Limits are in `lighthouserc.js`. Needs a build first. |
| `npm run check:lag` | Animation stutter: opens each page in Chrome slowed down to phone speed and fails if a page spends over 25% of its time in slow frames. Needs `npm run start` running in another terminal, and `npx playwright install chromium` once. |

## Writing Blog Posts

Add a folder under `content/` with an `index.mdx` file. The folder name becomes the URL: `content/my-new-post/` → `/blogs/my-new-post`.

```yaml
---
title: "Post Title"
description: "A short summary for search results and previews, 160 characters or less."
image: "../../public/blogs/cover-image.jpg"
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
author: "Lina Brihoum"
isPublished: true
takeaways:
  - "One thing the reader should remember."
tags:
  - SRE
  - Cloud
---
```

- `isPublished: false` keeps a post as a draft.
- Tags decide which category pages the post appears on.
- Keep `tags:` last. On Windows checkouts, a quoted value on the last front matter line can fail to parse.
- A test fails the build if a `description` is over 160 characters, since Google cuts longer ones off.

**Renaming a post** changes its URL, so add the old address to [src/utils/postRedirects.js](src/utils/postRedirects.js). Old links and search results then redirect to the new one.

## Configuration

- Site title, URL, email and social links: [src/utils/siteMetaData.js](src/utils/siteMetaData.js)
- Projects on `/projects`: [src/components/Projects/projectsData.js](src/components/Projects/projectsData.js), one entry per card
- Contact form fields and limits: [src/utils/contact.js](src/utils/contact.js), shared by the form and the API so they always agree

## Deployment

The site is hosted on Vercel. Every pull request gets a preview deployment, and merging into `main` deploys to [linabrihoum.com](https://linabrihoum.com).

The `CNAME` file is left over from when the site was on GitHub Pages.
