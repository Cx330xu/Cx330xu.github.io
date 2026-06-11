---
title: Personal Tech Hub
description: 中英双语个人技术品牌站，集成 Pagefind 搜索、Giscus 评论、暗色模式与 RSS，构建时自动拉取 GitHub Stars 数据
date: 2026-06-10
status: active
featured: false
github: https://github.com/Cx330xu/Cx330xu.github.io
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

## 背景 (Situation)

需要一个能同时展示开源项目、深度技术文章与短笔记的个人技术品牌站，面向面试官、招聘者与同行快速了解技术方向。之前使用 Hugo，组件化迭代和 TypeScript 支持不足。

## 任务 (Task)

构建一个现代化、中英双语、性能优良的个人技术站点，具备：
- 项目展示、博客、笔记三大内容板块
- 中英双语路由与内容关联
- 静态搜索、暗色模式、RSS 订阅
- GitHub Actions 自动部署到 GitHub Pages

## 行动 (Action)

- **框架选型**：从 Hugo 迁移至 Astro 6.x，利用其 Content Collections 管理多语言内容，Tailwind CSS 4.x 实现主题系统
- **内容架构**：`translationKey` 关联中英对应内容；`blog/projects/notes/pages` 四个集合
- **核心集成**：Pagefind 静态搜索、Giscus 评论系统、GitHub API 拉取 Star 数与贡献热力图
- **构建流程**：GitHub Actions 自动构建 + Pagefind 索引生成，推送至 GitHub Pages
- **关键决策**：
  - Astro 而非 Hugo → TypeScript 类型安全 + 组件化迭代效率显著提升
  - CSS 变量主题方案 → 暗色模式零 JS 开销，WCAG AA 对比度合规

## 结果 (Result)

- ✅ 双语站点上线，Lighthouse 性能评分 95+，71 个页面被 Pagefind 索引
- ✅ 支持 RSS、全文搜索、暗色模式、GitHub 活跃度展示
- ✅ 构建时间 <30 秒（含 OG 图片生成），首次内容绘制 <1 秒
- 🔜 持续迭代：Plausible 分析、简历下载、邮件订阅
