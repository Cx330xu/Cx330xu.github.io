---
title: Personal Tech Hub
description: A bilingual personal tech site built with Astro
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

## Overview

This is **Cx330xu**'s personal tech hub, deployed on GitHub Pages.

## Background

A technical brand site to showcase projects, long-form posts, and short notes for interviewers and peers.

## Architecture

- Astro static site with Content Collections for bilingual content
- GitHub Actions build and deploy to GitHub Pages
- Pagefind static search and Giscus comments

## Key decisions

- Chose Astro over Hugo for TypeScript and component-driven UI iteration
- Separate locale routes linked via `translationKey`

## Outcome

- Bilingual site live with RSS, search, and dark mode
- Continuous UI and content iteration as the main technical output hub
