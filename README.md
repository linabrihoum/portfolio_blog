# Lina Brihoum — Portfolio & Blog

Personal portfolio and technical blog built with Next.js, focused on Site Reliability Engineering, Cloud Architecture, DevSecOps, and Artificial Intelligence. Live at [linabrihoum.com](https://linabrihoum.com).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 13 (App Router) |
| Styling | Tailwind CSS |
| Content | Contentlayer + MDX |
| Animation | Framer Motion |
| Backend | Supabase (view tracking) |
| Email / Newsletter | EmailJS, Mailchimp |
| Syntax Highlighting | Shiki (github-dark theme) |
| Deployment | GitHub Pages |

## Features

- MDX blog with auto-generated table of contents, reading time, and syntax-highlighted code blocks
- Blog view counter via Supabase
- Category filtering and tag pages
- 3D project cards with Framer Motion animations
- Dark / light mode (system default)
- Responsive navigation with mobile hamburger menu
- Contact form and Mailchimp newsletter subscription
- SEO: Open Graph, Twitter cards, JSON-LD structured data, auto-generated sitemap
- PWA manifest and icons

## Project Structure

```
portfolio_blog/
├── content/              # Blog posts (MDX)
│   └── <slug>/index.mdx
├── public/               # Static assets (images, icons, animations)
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.js           # Home
│   │   ├── about/            # About
│   │   ├── projects/         # Projects showcase
│   │   ├── contact/          # Contact
│   │   ├── blogs/[slug]/     # Individual blog posts
│   │   └── categories/[slug]/ # Blog categories
│   ├── components/       # React components
│   │   ├── About/
│   │   ├── Blog/
│   │   ├── Header/
│   │   ├── Home/
│   │   ├── Projects/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Elements/
│   │   ├── Hooks/
│   │   └── ui/           # Animated UI primitives
│   └── utils/
│       ├── siteMetaData.js   # Site config and social links
│       └── index.js
├── contentlayer.config.js    # MDX parsing and field definitions
├── tailwind.config.js
└── next.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/linabrihoum/portfolio_blog.git
cd portfolio_blog
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAILCHIMP_URL=your_mailchimp_subscribe_url
```

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

The `postbuild` script automatically generates `sitemap.xml`.

## Writing Blog Posts

Add a new folder under `content/` with an `index.mdx` file:

```
content/
└── my-new-post/
    └── index.mdx
```

Required front matter:

```yaml
---
title: "Post Title"
description: "A short description for SEO and previews."
image: "../../public/blogs/cover-image.jpg"
publishedAt: "2025-01-15"
updatedAt: "2025-01-15"
author: "Lina Brihoum"
isPublished: true
tags:
  - SRE
  - Cloud
---
```

Set `isPublished: false` to draft without publishing. Tags drive the category filter pages at `/categories/[slug]`.

## Configuration

Site-wide metadata (title, social links, URL) lives in [src/utils/siteMetaData.js](src/utils/siteMetaData.js).

Projects are defined in [src/components/Projects/projectsData.js](src/components/Projects/projectsData.js) — each entry maps to a card on the `/projects` page.

## Deployment

The site deploys to GitHub Pages via GitHub Actions. The `CNAME` file points the custom domain to `linabrihoum.com`. Any push to `main` triggers the workflow.
