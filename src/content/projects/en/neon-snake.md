---
title: Neon Snake · AI-Powered Web Game
description: A browser-based Snake game featuring AI autopilot, power-up system, progressive stages, and turbo batch statistics — AI peak score ~2000
date: 2026-06-25
status: active
featured: true
github: https://github.com/Cx330xu/Cx330xu.github.io/blob/main/public/games/snake.html
demo: https://Cx330xu.github.io/games/snake.html
stack:
  - JavaScript
  - HTML
  - Canvas
tags:
  - Game
  - AI
  - JavaScript
  - Open Source
draft: false
translationKey: neon-snake
---

## Situation

I wanted a "not-too-simple" web-based Snake game — with neon aesthetics, smooth animations, and deep mechanics (dynamic obstacles, power-ups, progressive stages). I also wanted to test how high an AI could score on a grid with accumulating obstacles.

## Task

Build a fully-featured single-file Snake game from scratch:

- Smooth interpolated movement (lerp between grid cells, not jumpy)
- Multiple food types (normal + golden bonus) + 3 timed power-ups (Slow / Shrink / Double Score)
- Dynamic obstacles that scale with level, capped at 30, plus smart food spawning to prevent dead corners
- Stage clearance: snake length milestones clear all obstacles + award bonus points, turning "inevitable death" into "how many stages cleared"
- AI autopilot (BFS pathfinding + survival check + longest survival path), with turbo batch statistics

## Action

- **Rendering**: Canvas 2D with rAF loop, interpolated snake body (manual lerp), directional eyes on the head
- **AI Algorithm**: Five-layer fallback decision — ① BFS shortest path to food → ② Simulate body after eating → ③ Survival check (strong: reach tail; weak: reachable space ≥ body length) → ④ Longest survival path (flood from tail, pick furthest direction) → ⑤ Max reachable space as last resort
- **Game Systems**: Dynamic obstacles (soft cap 30) + smart food (BFS reachability + flood fill fallback) + stage milestones every 50 snake length
- **Power-ups**: 3 timed types (🐌 Slow 5s / − Shrink -3 segments / 🔥 Double Score 6s), with countdown rings and HUD indicators
- **Batch Stats**: Turbo mode skips rendering, `setTimeout` chunking prevents UI blocking, outputs max/avg/median/cause distribution
- **Key Decisions**:
  - Weak survival check (reachable space) eliminated corner-food deadlocks (stall rate: 50% → 3%)
  - Longest survival path replaces shortest tail-chase → body layout evolves fully (max score: 920 → 1990)
  - Obstacle soft cap instead of hard removal → maintains tension while preventing grid exhaustion

## Result

- ✅ Single 59KB file, zero dependencies — double-click to play, mobile swipe + keyboard dual control
- ✅ AI 60-game turbo benchmark: peak ~2000, average 1100+, 2 stage milestones cleared
- ✅ Stall deadlocks reduced from 50% to 3.3%, obstacle deaths from 53% to 33%
- ✅ Power-up system + obstacle-free mode + stage clearance all verified end-to-end
- 🔜 Next: Hamilton cycle hybrid strategy, AI power-up decision-making, seeded randomness for debugging
