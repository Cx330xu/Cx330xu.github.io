---
title: Personal Tech Hub
description: 基于 Astro 构建的中英双语个人技术站点
date: 2026-06-10
status: active
featured: true
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

## 项目简介

这是 **Cx330xu** 的个人技术品牌站点，部署于 GitHub Pages。

## 背景

需要一个能同时展示项目、深度文章与短笔记的技术品牌站，面向面试官与同行快速了解技术方向。

## 架构

- Astro 静态站点 + Content Collections 管理多语言内容
- GitHub Actions 构建并部署至 GitHub Pages
- Pagefind 静态搜索 + Giscus 评论

## 关键决策

- 选用 Astro 而非 Hugo，便于 TypeScript 与组件化 UI 迭代
- 中英双语独立路由，通过 `translationKey` 关联对应内容

## 结果

- 双语站点上线，支持 RSS、搜索、暗色模式
- 持续迭代 UI 与内容，作为技术输出与项目展示入口
