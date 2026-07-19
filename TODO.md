# Portfolio Blog — Outstanding Fixes & Improvements

## Quick Fixes

- [ ] Fix CAP Theorem post (`content/the-CAP-theorem/index.mdx`) — expand the `description` field beyond "CAP" and add a proper `# The CAP Theorem` H1 title at the top
- [ ] Fix `becoming-a-cloud-engineer` post — the folder slug says `becoming-a-cloud-engineer` but the title is "Becoming a DevOps Architect"; make them consistent
- [ ] Replace placeholder Unsplash images in `src/components/Projects/projectsData.js` with real project screenshots
- [ ] New blog posts reuse existing images (`github-deploy-action.png`, `devops-lifecycle.jpeg`, `aws-azure.jpg`, `cloud_compute.jpeg`) — swap in dedicated cover images when available

## Structural Improvements

- [ ] Move `SkillsMarquee` component (already in `src/components/Projects/`) to the About page to visually surface your tech stack
- [ ] Add an author bio block at the bottom of each blog post — small reusable component with "Written by Lina Brihoum"
- [ ] Add client-side blog search (e.g. Fuse.js) to the `/categories/all` page
- [ ] Add pagination or infinite scroll to blog list pages

## New Blog Posts

- [x] **GitOps** — `content/gitops/index.mdx`
- [x] **Networking essentials in the cloud** (cloud agnostic) — `content/cloud-networking-essentials/index.mdx`
- [x] **The shift left approach** — `content/shift-left/index.mdx` (needs its own cover image; currently reuses devops-lifecycle.jpeg)
- [ ] **Architecture for a standard Azure enterprise tenant**
- [ ] **How to optimize cost in the cloud**
- [ ] **Cool terraform extensions** — ones that genuinely help make IaC easier to control

## Deepen Existing Posts (expertise pass)

- [x] All 12 existing posts rewritten with expert-level depth (CAP theorem, threads/processes, VMs/containers, K8s/OpenShift/Istio, Terraform vs Bicep, Terraform templates, DevOps architect, hosting/CI-CD, SOLID, tech blog build, LaTeX resume, ML trading bot)
- [ ] **How to optimize cost in the cloud**
- [ ] **The shift left approach** 
- [ ] **Cool terraform extensions** - ones that genuinely help make IaC easier to control

## Add Projects Page

- [x] Projects page rebuilt with animated featured cards + staggered grid, nav link enabled
- [ ] Add remaining projects to `src/components/Projects/projectsData.js` (see comment at top of file for the format)
