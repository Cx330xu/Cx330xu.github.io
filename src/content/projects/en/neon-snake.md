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
techChallenges: |
  **Core Challenge: Keeping AI alive on a grid with accumulating obstacles**

  1. **Corner Food Deadlock**
     Food lands in dead zones (surrounded by body + obstacles). AI's BFS finds a path, but the survival check says "I'll get trapped after eating" → skip → tail-chase → food stays put → infinite loop.
     *Solved by:* Adding a "reachable space ≥ body length" weak guarantee alongside the "can reach tail" strong guarantee. Stall deaths: 50% → 3.3%.

  2. **Unbounded Obstacle Growth**
     One permanent obstacle per level means available space shrinks linearly. At ~90 segments, 53% of games end via obstacle collision.
     *Solved by:* Soft cap (30 obstacles, FIFO eviction) + stage milestones that clear all obstacles.

  3. **Batch Stats Without UI Freeze**
     Turbo mode runs 2000+ sync BFS steps per game. 200 consecutive games freezes the page.
     *Solved by:* `await setTimeout(0)` per game to yield the main thread, plus `onProgress` callback for live updates. Turbo skips rendering, particles, DOM writes, and audio — single game: 10s → 0.3s.

  4. **State Boundaries in Single-File Architecture**
     Game, AI, and UI layers all live in one IIFE closure. Batch stats need logic-only execution.
     *Solved by:* `window.__game` exposes read-only state + diagnostics API. `ai.turbo` flag controls loop branching (normal rAF+render vs sync while-loop). `muted` flag silences audio.
techDecisions: |
  **Key Trade-offs & Decisions**

  1. **Survival Check: Single vs Dual Criterion**
     *Option A:* BFS to tail only (strong guarantee) → always false for corner food → deadlock.
     *Option B:* Reachable space ≥ length only (weak) → occasionally wrong but alive.
     *Chosen:* Dual OR combination — strong first, weak as fallback. Keeps reliability while covering dead corners. **Verified:** stall 50% → 3%.

  2. **Tail Chase: Shortest vs Longest Path**
     *Shortest:* BFS head→tail step 1, tight circles, body layout static, food safety never changes → stuck.
     *Longest:* Flood distance map from tail, head picks furthest valid neighbor, wide loops, body layout fully evolves → food safety window opens.
     *Chosen:* Switched to longest survival path. **Max score:** 920 → 1990 (+116%).

  3. **Obstacle Handling: Infinite vs Hard-Delete vs Soft Cap**
     *Infinite:* Grid eventually fills — mathematical inevitability.
     *Hard delete (clear all):* Late-game suddenly easy, jarring experience.
     *Soft cap (30, FIFO replace):* Maintains tension with a ceiling.
     *Chosen:* **Soft cap + stage clear** (every +50 segments). Alternates tension and payoff.

  4. **Power-up AI: Target vs Passively Eat**
     *Target:* AI routes to power-ups, adds computation, needs cost-benefit analysis.
     *Passive:* Power-ups spawn randomly, AI eats them naturally in motion, zero extra computation.
     *Chosen:* Default "passive eat". `chaseBonus` toggle available for golden bonus targeting. Power-ups don't affect AI benchmarks.
techArchitecture: |
  **Single-File Three-Layer Architecture + Turbo Dual Mode**

  ```
  ┌─────────────────────────────────────────────┐
  │                  snake.html                  │
  ├─────────────────┬───────────────────────────┤
  │  Render Layer    │  rAF loop → Canvas 2D      │
  │  (visual)        │  Body lerp / particles /   │
  │                  │  countdown rings / HUD     │
  ├─────────────────┼───────────────────────────┤
  │  Game Logic      │  step() / reset() / spawn  │
  │  (game logic)    │  Collision / food / power  │
  │                  │  Stages / levels / double   │
  ├─────────────────┼───────────────────────────┤
  │  AI Decision     │  aiDecide() 5-tier cascade │
  │  (ai core)       │  ①→②→③→④→⑤             │
  │                  │  BFS / simulate / survive / │
  │                  │  longest path / flood fill  │
  ├─────────────────┴───────────────────────────┤
  │  window.__game API                            │
  │  Turbo: skip render → sync while → batch stats│
  │  Visible: rAF + render → watch AI decide      │
  └─────────────────────────────────────────────┘
  ```

  **Data Flow (per logic tick)**
  `aiDecide()` → `applyAiDir()` → `dir` update → `step()` collision/eat/stage → `updateHUD()` → next frame

  **Turbo Mode State Machine**
  Normal: `state=playing` + `ai.turbo=false` → rAF loop advances 1 step/frame + render
  Turbo: `batchRun()` → sets `ai.turbo=true` + `muted=true` → `runOneGame()` sync `while(state=='playing') turboStep()` → 0.3s/game → `await setTimeout(0)` yield
