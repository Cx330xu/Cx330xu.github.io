---
title: Prompt System
description: Prompt management system built with FastAPI and Next.js, deployable locally or via Docker
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

## Background

Prompts in LLM apps are often scattered across repos. This project provides centralized prompt management.

## Architecture

- **Backend**: FastAPI (Python)
- **Frontend**: Next.js
- **Deploy**: Linux local or Docker (see `DEPLOY.md` in the repo)

## Key decisions

- Decoupled frontend and backend for independent iteration
- Docker support to reduce environment setup friction

## Outcome

- Centralized prompt storage and versioning
- Reusable prompt infrastructure for Agent / RAG projects
