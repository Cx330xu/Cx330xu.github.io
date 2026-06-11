---
title: Personal Tech Hub
description: Bilingual personal tech brand site with Pagefind search, Giscus comments, dark mode & RSS — auto-fetches GitHub Stars at build time
date: 2026-06-10
status: active
featured: false
github: https://github.com/Cx330xu/Cx330xu.github.io
cover: /project-tech-hub.png
demo: https://Cx330xu.github.io/
stack:
  - Astro
  - TypeScript
  - Web
tags:
  - Open Source
  - Astro
draft: false
translationKey: personal-tech-hub
---

## Situation

Needed a modern personal tech brand site that could showcase open-source projects, in-depth articles, and quick notes — all with bilingual support. The previous Hugo setup lacked TypeScript type safety and component-driven iteration.

## Task

Build a performant, bilingual, modern personal tech site with:
- Project showcase, blog, and notes sections
- Chinese/English routes with content linking
- Static search, dark mode, RSS, and GitHub activity display
- Automated CI/CD deployment to GitHub Pages

## Action

- **Framework**: Migrated from Hugo to Astro 6.x, using Content Collections for bilingual content management and Tailwind CSS 4.x for theming
- **Content Architecture**: `translationKey` linking zh↔en pairs; four content collections (blog/projects/notes/pages)
- **Integrations**: Pagefind for static search, Giscus for comments, GitHub REST/GraphQL API for star counts and contribution graph
- **CI/CD**: GitHub Actions builds the site, generates OG images, indexes Pagefind, and deploys to GitHub Pages
- **Key decisions**:
  - Astro over Hugo → TypeScript + component model for faster UI iteration
  - CSS variable theming → zero-JS dark mode, WCAG AA compliant contrast

## Result

- ✅ Bilingual site live with Lighthouse 95+ performance score, 71 pages indexed
- ✅ RSS, full-text search, dark mode, GitHub activity chart all functional
- ✅ Build time <30s (including OG image generation), FCP <1s
- 🔜 Roadmap: Plausible analytics, resume download, email newsletter
