---
title: Prompt System
description: 集中管理 50+ 提示词模板，支持多人协作与版本回溯，已作为 Agent / RAG 项目的提示词基础设施
date: 2026-03-13
status: active
featured: true
github: https://github.com/Cx330xu/prompt_system
cover: /project-prompt-system.png
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

## 背景 (Situation)

在 LLM 应用开发中，提示词版本分散在多个项目、团队成员间难以复用与协作。每次新项目启动都需要手动复制粘贴旧的提示词，缺乏版本回溯能力。团队需要一个可本地或容器化部署的集中式提示词管理系统。

## 任务 (Task)

设计并实现一套轻量级提示词管理基础设施，具备以下能力：
- 提示词的 CRUD 与版本管理
- 支持按标签/项目分类检索
- 提供 RESTful API 供 Agent / RAG 系统集成
- 支持 Linux 本地运行与 Docker 一键部署

## 行动 (Action)

- **后端**：选择 FastAPI（Python）作为 API 层，利用 Pydantic 进行提示词结构校验，SQLite 作为轻量存储
- **前端**：Next.js + TypeScript 构建管理 UI，采用 App Router 架构
- **部署**：编写 Dockerfile 与 docker-compose.yml，提供 `DEPLOY.md` 说明文档
- **关键决策**：
  - 前后端分离 → API 可独立被其他服务调用，UI 可独立迭代
  - Docker 优先部署 → 降低团队成员的 Python/Node 环境配置成本
  - 提示词模板化 → 支持变量占位符 `{{context}}` 与模板继承

## 结果 (Result)

- ✅ 集中管理 50+ 提示词模板，支持版本历史与一键回滚
- ✅ API 响应延迟 <50ms（本地），Docker 容器启动 <10 秒
- ✅ 已作为 3 个 Agent 项目的提示词基础设施使用
- 🔜 规划：接入 LLM 评估框架，实现提示词 A/B 测试
