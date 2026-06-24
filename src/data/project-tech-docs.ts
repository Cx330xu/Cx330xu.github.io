// 项目技术文档数据 — key 为 translationKey，嵌套 zh/en 下分三个面板
// 内容为 HTML 字符串，由 ProjectTechDoc.astro 通过 set:html 渲染

export interface TechDocLocale {
  techChallenges: string;
  techDecisions: string;
  techArchitecture: string;
}

export type TechDocEntry = { zh: TechDocLocale; en: TechDocLocale };
export type TechDocData = Record<string, TechDocEntry>;

const zhChallenges = `<h3>核心挑战：在动态障碍物棋盘上让 AI 活下去</h3>
<p><strong>1. 角落食物死循环</strong><br>
食物随机落在死角（被蛇身+障碍物包围），AI 的 BFS 寻路能找到路径，但逃生检查判定&ldquo;吃完会困死&rdquo; &rarr; 放弃 &rarr; 尾随拖延 &rarr; 食物不动 &rarr; 永远循环。<br>
<em>解决：</em>引入&ldquo;可达空间 &ge; 蛇长&rdquo;弱保判据，与&ldquo;能到尾巴&rdquo;强保形成双重检查。实测 stall 死因从 50% 降至 3.3%。</p>
<p><strong>2. 障碍物无限累积</strong><br>
每升一级永久 +1 障碍物，棋盘可用空位线性缩小。蛇长到 ~90 节时 53% 的局因撞障碍而死。<br>
<em>解决：</em>障碍物软上限（30 个，超出时替换最旧）+ 阶段闯关（蛇长里程碑清空全部障碍）。</p>
<p><strong>3. 批量统计不阻塞 UI</strong><br>
极速模式下每局 2000+ 步同步 BFS 循环，连续跑 200 局会卡死页面。<br>
<em>解决：</em>每局后 <code>await setTimeout(0)</code> 让出主线程，<code>onProgress</code> 回调实时更新进度条。turbo 下跳过渲染、粒子、DOM 写和音效，单局从 10 秒降至 0.3 秒。</p>
<p><strong>4. 单文件架构的状态边界</strong><br>
游戏、AI、UI 三层全在一个 IIFE 闭包内，批量统计需同时只跑逻辑不跑渲染。<br>
<em>解决：</em><code>window.__game</code> 暴露只读状态 + 诊断 API，<code>ai.turbo</code> 标志控制 loop 分支（正常 rAF + render vs 同步 while 循环），<code>muted</code> 标志静音叠加层。</p>`;

const zhDecisions = `<h3>关键选型与权衡</h3>
<p><strong>1. 逃生检查：单判据 vs 双判据</strong><br>
<em>选项 A：</em>仅 BFS 到尾（强保证）&rarr; 对角落食物永远 False，死循环。<br>
<em>选项 B：</em>仅可达空间 &ge; 蛇长（弱保证）&rarr; 偶尔误判但能活。<br>
<em>选择：</em>双判据 OR 组合：强保证优先，弱保证兜底。既保留强保证的可靠性，又覆盖死角场景。<strong>实测验证</strong>：stall 50% &rarr; 3%。</p>
<p><strong>2. 尾随策略：最短 vs 最长到尾巴路径</strong><br>
<em>最短路径：</em>BFS 头&rarr;尾第一步，绕小圈，蛇身布局重复，食物路径安全性不变 &rarr; 卡死。<br>
<em>最长路径：</em>从尾 flood 距离图，头每步选离尾最远的合法方向，绕大圈，布局充分变化 &rarr; 食物安全窗口打开。<br>
<em>选择：</em>改为最长生存路径。<strong>max 分</strong>从 920 &rarr; 1990（+116%）。</p>
<p><strong>3. 障碍物处理：无限累积 vs 硬删除 vs 软上限</strong><br>
<em>无限累积：</em>终局必然被填死。<br>
<em>硬删除（清空）：</em>后期突然变简单，玩家体验断裂。<br>
<em>软上限（30 个，FIFO 替换）：</em>保留紧张感，但上限可控。<br>
<em>选择：</em><strong>软上限 + 阶段闯关</strong>（蛇长每 +50 节清空一次）。紧张与爽感交替。</p>
<p><strong>4. 道具 AI：纳入目标 vs 路过吃</strong><br>
<em>纳入目标：</em>AI 会绕路抢道具，增加计算量。<br>
<em>路过吃：</em>道具随机生成，AI 自然行进中吃到，零额外计算。<br>
<em>选择：</em>默认&ldquo;路过吃&rdquo;，保留 <code>chaseBonus</code> 开关扩展金色奖励决策。</p>`;

const zhArchitecture = `<h3>单文件三层架构 + 极速双模</h3>
<pre>┌─────────────────────────────────────────────┐
│                  snake.html                  │
├─────────────────┬───────────────────────────┤
│  渲染层          │  rAF loop → Canvas 2D      │
│  (visual)        │  蛇身 lerp 插值 / 粒子 /    │
│                  │  进度环 / HUD DOM 更新      │
├─────────────────┼───────────────────────────┤
│  游戏逻辑层       │  step() / reset() / spawn  │
│  (game logic)    │  碰撞 / 食物 / 道具 / 障碍  │
│                  │  闯关 / 等级 / 双倍分        │
├─────────────────┼───────────────────────────┤
│  AI 决策层       │  aiDecide() 五层降级        │
│  (ai core)       │  ①→②→③→④→⑤             │
│                  │  BFS / 模拟 / 逃生 / 最长路径│
├─────────────────┴───────────────────────────┤
│  window.__game 暴露接口                       │
│  极速模式：skip render → 同步 while → 批量统计 │
│  可见模式：rAF + render → 可视化 AI 决策      │
└─────────────────────────────────────────────┘</pre>
<p><strong>数据流（每逻辑步）</strong><br>
<code>aiDecide()</code> &rarr; <code>applyAiDir()</code> &rarr; <code>dir</code> 更新 &rarr; <code>step()</code> 碰撞/吃东西/闯关 &rarr; <code>updateHUD()</code> &rarr; 下一帧</p>
<p><strong>极速模式状态切换</strong><br>
正常：<code>state=playing</code> + <code>ai.turbo=false</code> &rarr; rAF loop 每帧推进 1 步 + render<br>
极速：<code>batchRun()</code> &rarr; 设置 <code>ai.turbo=true</code> + <code>muted=true</code> &rarr; <code>runOneGame()</code> 内同步 <code>while(state==playing) turboStep()</code> &rarr; 单局 0.3s 完成 &rarr; <code>await setTimeout(0)</code> 让出主线程</p>`;

// ── English ──

const enChallenges = `<h3>Core Challenge: Keeping AI alive on a grid with accumulating obstacles</h3>
<p><strong>1. Corner Food Deadlock</strong><br>
Food lands in dead zones (surrounded by body + obstacles). AI's BFS finds a path, but the survival check says &ldquo;I&rsquo;ll get trapped after eating&rdquo; &rarr; skip &rarr; tail-chase &rarr; food stays put &rarr; infinite loop.<br>
<em>Solved by:</em> Adding a &ldquo;reachable space &ge; body length&rdquo; weak guarantee alongside the &ldquo;can reach tail&rdquo; strong guarantee. Stall deaths: 50% &rarr; 3.3%.</p>
<p><strong>2. Unbounded Obstacle Growth</strong><br>
One permanent obstacle per level means available space shrinks linearly. At ~90 segments, 53% of games end via obstacle collision.<br>
<em>Solved by:</em> Soft cap (30 obstacles, FIFO eviction) + stage milestones that clear all obstacles.</p>
<p><strong>3. Batch Stats Without UI Freeze</strong><br>
Turbo mode runs 2000+ sync BFS steps per game. 200 consecutive games freezes the page.<br>
<em>Solved by:</em> <code>await setTimeout(0)</code> per game to yield the main thread, plus <code>onProgress</code> callback for live updates. Turbo skips rendering, particles, DOM writes, and audio &mdash; single game: 10s &rarr; 0.3s.</p>
<p><strong>4. State Boundaries in Single-File Architecture</strong><br>
Game, AI, and UI layers all live in one IIFE closure. Batch stats need logic-only execution.<br>
<em>Solved by:</em> <code>window.__game</code> exposes read-only state + diagnostics API. <code>ai.turbo</code> flag controls loop branching (normal rAF+render vs sync while-loop). <code>muted</code> flag silences audio.</p>`;

const enDecisions = `<h3>Key Trade-offs &amp; Decisions</h3>
<p><strong>1. Survival Check: Single vs Dual Criterion</strong><br>
<em>Option A:</em> BFS to tail only (strong guarantee) &rarr; always false for corner food &rarr; deadlock.<br>
<em>Option B:</em> Reachable space &ge; length only (weak) &rarr; occasionally wrong but alive.<br>
<em>Chosen:</em> Dual OR combination &mdash; strong first, weak as fallback. Keeps reliability while covering dead corners. <strong>Verified:</strong> stall 50% &rarr; 3%.</p>
<p><strong>2. Tail Chase: Shortest vs Longest Path</strong><br>
<em>Shortest:</em> BFS head&rarr;tail step 1, tight circles, body layout static, food safety never changes &rarr; stuck.<br>
<em>Longest:</em> Flood distance map from tail, head picks furthest valid neighbor, wide loops, body layout fully evolves &rarr; food safety window opens.<br>
<em>Chosen:</em> Switched to longest survival path. <strong>Max score:</strong> 920 &rarr; 1990 (+116%).</p>
<p><strong>3. Obstacle Handling: Infinite vs Hard-Delete vs Soft Cap</strong><br>
<em>Infinite:</em> Grid eventually fills &mdash; mathematical inevitability.<br>
<em>Hard delete (clear all):</em> Late-game suddenly easy, jarring experience.<br>
<em>Soft cap (30, FIFO replace):</em> Maintains tension with a ceiling.<br>
<em>Chosen:</em> <strong>Soft cap + stage clear</strong> (every +50 segments). Alternates tension and payoff.</p>
<p><strong>4. Power-up AI: Target vs Passively Eat</strong><br>
<em>Target:</em> AI routes to power-ups, adds computation, needs cost-benefit analysis.<br>
<em>Passive:</em> Power-ups spawn randomly, AI eats them naturally in motion, zero extra computation.<br>
<em>Chosen:</em> Default &ldquo;passive eat&rdquo;. <code>chaseBonus</code> toggle available for golden bonus targeting.</p>`;

const enArchitecture = `<h3>Single-File Three-Layer Architecture + Turbo Dual Mode</h3>
<pre>┌─────────────────────────────────────────────┐
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
└─────────────────────────────────────────────┘</pre>
<p><strong>Data Flow (per logic tick)</strong><br>
<code>aiDecide()</code> &rarr; <code>applyAiDir()</code> &rarr; <code>dir</code> update &rarr; <code>step()</code> collision/eat/stage &rarr; <code>updateHUD()</code> &rarr; next frame</p>
<p><strong>Turbo Mode State Machine</strong><br>
Normal: <code>state=playing</code> + <code>ai.turbo=false</code> &rarr; rAF loop advances 1 step/frame + render<br>
Turbo: <code>batchRun()</code> &rarr; sets <code>ai.turbo=true</code> + <code>muted=true</code> &rarr; <code>runOneGame()</code> sync <code>while(state==playing) turboStep()</code> &rarr; 0.3s/game &rarr; <code>await setTimeout(0)</code> yield</p>`;

export const projectTechDocs: TechDocData = {
  'neon-snake': {
    zh: { techChallenges: zhChallenges, techDecisions: zhDecisions, techArchitecture: zhArchitecture },
    en: { techChallenges: enChallenges, techDecisions: enDecisions, techArchitecture: enArchitecture },
  },
};
