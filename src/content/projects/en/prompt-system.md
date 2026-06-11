---
title: Prompt System
description: Centralized 50+ prompt templates with team collaboration and versioning — serves as prompt infrastructure for Agent / RAG projects
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

## Situation

Prompts in LLM applications were scattered across multiple repositories with no versioning or reuse mechanism. Each new project required manual copy-paste of old prompts, and team collaboration was friction-heavy. We needed a centralized, deployable prompt management solution.

## Task

Design and build a lightweight prompt management infrastructure with:
- CRUD operations and version tracking for prompt templates
- Tag/project-based categorization and search
- RESTful API for integration with Agent / RAG systems
- Local (Linux) and Docker deployment support

## Action

- **Backend**: FastAPI (Python) with Pydantic validation, SQLite for lightweight storage
- **Frontend**: Next.js + TypeScript with App Router for the management UI
- **Deploy**: Dockerfile + docker-compose.yml with setup docs (`DEPLOY.md`)
- **Key decisions**:
  - Decoupled API/UI → API can be consumed independently by other services
  - Docker-first → zero Python/Node setup for team members
  - Template variables → `{{context}}` placeholders with template inheritance

## Result

- ✅ 50+ prompt templates under centralized management with version history and one-click rollback
- ✅ API response <50ms (local), Docker container startup <10s
- ✅ Serving as prompt infrastructure for 3 Agent projects
- 🔜 Roadmap: LLM evaluation framework integration for prompt A/B testing
