---
title: Prompt System
description: 基于 FastAPI + Next.js 的提示词管理系统，支持 Linux 本地 / Docker 部署
date: 2026-03-13
status: active
featured: true
github: https://github.com/Cx330xu/prompt_system
stack:
  - Python
  - FastAPI
  - TypeScript
  - Next.js
tags:
  - LLM
  - Prompt Engineering
  - Agent
draft: false
translationKey: prompt-system
---

## 背景

在 LLM 应用开发中，提示词版本分散、难以复用与协作。需要一个可本地或容器化部署的管理系统。

## 架构

- **后端**：FastAPI（Python）
- **前端**：Next.js
- **部署**：支持 Linux 本地运行与 Docker 部署（详见仓库 `DEPLOY.md`）

## 关键决策

- 前后端分离，便于独立迭代 API 与 UI
- 提供 Docker 方案，降低环境配置成本

## 结果

- 提示词集中管理与版本维护
- 可作为 Agent / RAG 项目的提示词基础设施
