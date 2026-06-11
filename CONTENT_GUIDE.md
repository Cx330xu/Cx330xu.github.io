# 📝 Content Update Guide

How to add, update, and maintain content on `cx330xu.github.io`. Everything is markdown-driven — no database, no CMS. Edit files locally or directly on GitHub, push, and the site auto-deploys.

---

## Quick Reference

| Action | Where | Deploy |
|--------|-------|--------|
| New blog post | `src/content/blog/{zh,en}/new-post.md` | `git push` |
| New project | `src/content/projects/{zh,en}/new-project.md` | `git push` |
| New note | `src/content/notes/{zh,en}/new-note.md` | `git push` |
| Update "Now" page | `src/content/pages/{zh,en}/now.md` | `git push` |
| Update About page | `src/content/pages/{zh,en}/about.md` | `git push` |
| Update profile/name/skills | `src/data/site.ts` | `git push` |
| Update CSDN post count | `src/data/site.ts` → `csdn.postCount` | `git push` |

---

## 1. Blog Posts

### File Location

```
src/content/blog/
├── zh/                         # Chinese posts
│   ├── my-new-post.md
│   └── ...
└── en/                         # English posts
    ├── my-new-post.md          # Same filename = paired translation
    └── ...
```

### Frontmatter Template

Create `src/content/blog/zh/my-new-post.md`:

```yaml
---
title: 你的文章标题
description: 1-2 句话描述，用于 SEO 和卡片预览
date: 2026-06-15
category: ai                     # ai | engineering | tools | misc
tags:
  - LLM
  - RAG
  - Agent
difficulty: advanced             # beginner | intermediate | advanced
featured: false                  # true = pin to top of blog list
cover: /images/covers/my-post.png  # optional, 16:9 recommended
draft: false                     # true = hidden from production
translationKey: my-new-post      # MUST match the en counterpart
---
```

Then create `src/content/blog/en/my-new-post.md` with **the same `translationKey`**:

```yaml
---
title: Your Post Title
description: 1-2 sentence description for SEO and card previews
date: 2026-06-15
category: ai
tags:
  - LLM
  - RAG
  - Agent
difficulty: advanced
featured: false
draft: false
translationKey: my-new-post      # Same key as zh version
---
```

### Fields Explained

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | Post title |
| `description` | ✅ | Meta description + card preview |
| `date` | ✅ | `YYYY-MM-DD` format |
| `category` | ✅ | Must be one of: `ai`, `engineering`, `tools`, `misc` |
| `tags` | — | Array of strings, used for tag pages and related posts |
| `difficulty` | — | `beginner` / `intermediate` / `advanced` (default: `intermediate`) |
| `featured` | — | `true` pins post above non-featured ones |
| `cover` | — | Path to cover image in `public/` |
| `draft` | — | `true` = excluded from production build |
| `translationKey` | — | **Critical for bilingual**: same key across zh/en links them |

### Content Body

Standard Markdown. Code blocks get automatic copy buttons. Example:

```markdown
## 背景

介绍问题的背景...

## 解决方案

```python
def hello():
    print("world")
```

## 总结

关键要点...
```

---

## 2. Projects

### File Location

```
src/content/projects/
├── zh/my-project.md
└── en/my-project.md
```

### Frontmatter Template

```yaml
---
title: 项目名称
description: 1-2 句话描述项目做什么
date: 2026-05-01
status: active                  # active | wip | archived
featured: true                  # true = shows on homepage
github: https://github.com/Cx330xu/repo-name
demo: https://demo.example.com  # optional, leave empty string if none
cover: /images/projects/cover.png  # optional, shown on project card
stack:
  - Python
  - FastAPI
  - LangChain
tags:
  - RAG
  - Agent
draft: false
translationKey: my-project
---
```

### Fields Explained

| Field | Required | Notes |
|-------|----------|-------|
| `title` | ✅ | Project name |
| `description` | ✅ | Short summary |
| `date` | ✅ | `YYYY-MM-DD` |
| `status` | — | `active` / `wip` / `archived` (default: `active`) |
| `featured` | — | `true` = shown on homepage featured section |
| `github` | ✅ | Full GitHub URL |
| `demo` | — | Live demo URL, or `""` |
| `cover` | — | Path in `public/`, shown as thumbnail |
| `stack` | — | Array of tech names, displayed as chips |
| `tags` | — | Used for tag pages |
| `draft` | — | Hide from production |
| `translationKey` | — | Link zh/en versions |

### Project Detail Pages

Each project has a dedicated page at `/{locale}/projects/{slug}/`. The markdown body serves as the project README. Additionally, the `ProjectTechDoc` component renders three collapsible panels (Technical Challenges, Solution Comparison, Architecture Design) — populate these by editing the panel content in `src/components/ProjectTechDoc.astro` (currently placeholder text).

---

## 3. Notes (Micro-blog)

### File Location

```
src/content/notes/
├── zh/short-note.md
└── en/short-note.md
```

### Frontmatter Template

```yaml
---
title: 可选的标题         # optional for notes
date: 2026-06-11
tags:
  - quick-tip
draft: false
translationKey: short-note
---
```

Notes are lightweight — `title` is optional, and they appear in the "Latest Notes" sidebar on the homepage. Good for quick tips, experiment logs, or WIP updates.

---

## 4. Static Pages (Now, About)

### File Location

```
src/content/pages/
├── zh/
│   ├── now.md      # "What I'm doing now"
│   └── about.md    # About page
└── en/
    ├── now.md
    └── about.md
```

### Frontmatter

```yaml
---
title: Now
description: What I'm working on right now  # optional
---
```

Edit the markdown body directly. No `translationKey` needed — files are matched by name.

### When to Update `now.md`

- You start learning a new technology
- You change jobs or focus areas
- A major project ships or is archived
- Recommended cadence: every 2-4 weeks

---

## 5. Site Configuration

File: `src/data/site.ts`

### Update Your Profile

```typescript
export const profile = {
  name: 'Cx330xu',                    // Display name
  title: { zh: '...', en: '...' },    // Job title
  valueProposition: { zh: '...', en: '...' },  // Hero subtitle
  email: 'cx330xu@qq.com',
  github: 'https://github.com/Cx330xu',
  // ...
}
```

### Update Skills/Tech Stack

```typescript
export const stacks = [
  { id: 'python', label: 'Python', featured: true },
  // featured: true  → shows on homepage hero chips
  // featured: false → listed elsewhere but not in hero
]
```

### Update CSDN Post Count

After syncing a new post to CSDN:

```typescript
export const csdn = {
  postCount: 20,  // ← increment this
  // ...
}
```

### Toggle GitHub Activity Heatmap

```typescript
export const githubActivity = {
  windowDays: 90,
  minCommits: 5,
  override: null,  // true=always show, false=always hide, null=auto
}
```

### Newsletter Provider

```typescript
export const newsletter = {
  provider: 'buttondown',       // 'buttondown' or 'rss-only'
  buttondownUsername: 'cx330xu',
}
```

---

## 6. Local Development

```bash
# Install dependencies (first time only)
npm install

# Start dev server (hot reload at http://localhost:4321)
npm run dev

# Build production site
npm run build

# Preview production build locally
npm run preview
```

**Tip:** Run `npm run build` before pushing to catch frontmatter errors early. The build will fail with clear error messages if a required field is missing or a `category` doesn't match the allowed enum.

---

## 7. Deploy

The site deploys automatically via **GitHub Actions** on every push to `main`.

```bash
git add .
git commit -m "content: new post about XYZ"
git push origin main
```

- Build takes ~30-60 seconds
- Monitor progress: [GitHub Actions tab](https://github.com/Cx330xu/Cx330xu.github.io/actions)
- Live within 2-3 minutes of push

### Deployment Architecture

```
Push to main
  → GitHub Actions (.github/workflows/deploy.yml)
    → npm ci
    → npx astro build
    → Deploy to GitHub Pages (gh-pages branch)
      → https://cx330xu.github.io
```

---

## 8. Image Assets

Place images in the `public/` directory:

```
public/
├── images/
│   ├── covers/       # Blog/project cover images (16:9, ~800px wide)
│   ├── projects/     # Project screenshots
│   └── og-image.png  # Default Open Graph image
```

Reference them with absolute paths from root:

```yaml
cover: /images/covers/my-post.png
```

---

## 9. Bilingual Content Checklist

When creating bilingual content, follow this checklist:

- [ ] Create `zh/` version with frontmatter
- [ ] Create `en/` version with **same `translationKey`** value
- [ ] Both have `draft: false` (or both `true`)
- [ ] Both have the same `category`, `tags`, `difficulty`, `featured` values
- [ ] `date` can differ slightly (zh first, en later is fine)
- [ ] Run `npm run build` — no errors

If only one language is ready, set `draft: true` on the unfinished one. The translation link will show "译文待补充" / "Translation pending".

---

## 10. Common Recipes

### Add a new blog post (both languages)

```bash
# 1. Create files
touch src/content/blog/zh/my-post.md
touch src/content/blog/en/my-post.md

# 2. Fill frontmatter (see template above) + markdown body

# 3. Build check
npm run build

# 4. Deploy
git add src/content/
git commit -m "content: add my-post (zh+en)"
git push
```

### Quick one-language note

```bash
# Create note (zh only, en draft)
echo '---
date: 2026-06-11
tags: [quick-tip]
translationKey: quick-tip-001
---
今天学到的一个小技巧...' > src/content/notes/zh/quick-tip-001.md

# en version as draft
echo '---
date: 2026-06-11
tags: [quick-tip]
draft: true
translationKey: quick-tip-001
---
Translation coming soon.' > src/content/notes/en/quick-tip-001.md
```

### Update "Now" page

```bash
# Edit directly
vim src/content/pages/zh/now.md
vim src/content/pages/en/now.md
git add src/content/pages/
git commit -m "content: update now page"
git push
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Build error: `category must be...` | Category doesn't match allowed enum | Use `ai`, `engineering`, `tools`, or `misc` |
| Post not showing | `draft: true` or missing locale | Check `draft: false` and file is in correct `zh/`/`en/` folder |
| Translation link broken | Missing or mismatched `translationKey` | Ensure both zh/en files have the same `translationKey` value |
| GitHub heatmap not appearing | `minCommits` not met | Check your GitHub contribution count, or set `override: true` |
| Star count shows 0 | GitHub API rate limit | Stars are fetched at build time; wait and rebuild |
