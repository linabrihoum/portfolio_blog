# Portfolio Blog — Outstanding Fixes & Improvements

Items tagged *(Comet redesign)* are being handled by the redesign in progress, and get checked off when it goes live.

## Quick Fixes

- [x] Fix CAP Theorem post (`content/the-CAP-theorem/index.mdx`) — expand the `description` field beyond "CAP" and add a proper `# The CAP Theorem` H1 title at the top
- [x] Fix `becoming-a-cloud-engineer` post (renamed to `becoming-a-devsecops-architect`, old address redirects) — the folder slug says `becoming-a-cloud-engineer` but the title is now "Becoming a DevSecOps Architect"; make them consistent (renaming the slug needs a redirect from the old URL) *(Comet redesign)*
- [ ] Fix duplicate H1s — the post page already shows the title as the H1, so posts that also start with `# Title` (like the CAP Theorem fix above) end up with two *(Comet redesign)*
- [ ] Replace placeholder Unsplash images in `src/components/Projects/projectsData.js` with real project screenshots
- [x] New blog posts reuse existing images (`github-deploy-action.png`, `devops-lifecycle.jpeg`, `aws-azure.jpg`, `cloud_compute.jpeg`) — swap in dedicated cover images when available
- [ ] Custom social-share (Open Graph) images per post — today each post's cover photo is used

## Structural Improvements

- [x] ~~Move `SkillsMarquee` to the About page~~ Dropped: the About page doesn't need a skills strip, so the component was deleted *(Comet redesign)*
- [ ] Add an author bio block at the bottom of each blog post — small reusable component with "Written by Lina Brihoum" *(Comet redesign)*
- [ ] Add client-side blog search (e.g. Fuse.js) to the `/categories/all` page *(Comet redesign)*
- [ ] Add pagination or infinite scroll to blog list pages
- [ ] Add a newsletter signup (Mailchimp) — the redesign builds the signup component but leaves where to place it for later

## Speed

- [ ] After the redesign, check the speed of every page (`npm run check:speed` and `npm run check:lag`) and fix anything slow. Known today: the Contact page's particle background stutters at phone speed, and the home page is slow to show its main content on phones *(Comet redesign)*

## New Blog Posts

- [x] **GitOps** — `content/gitops/index.mdx`
- [x] **Networking essentials in the cloud** (cloud agnostic) — `content/cloud-networking-essentials/index.mdx`
- [x] **The shift left approach** — `content/shift-left/index.mdx`
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
