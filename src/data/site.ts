export const profile = {
  name: 'Cx330xu',
  title: {
    zh: 'AI Agent 研发工程师',
    en: 'AI Agent Engineer',
  },
  /** Hero 区差异化价值主张：一句话说明你解决了什么独特问题 */
  valueProposition: {
    zh: '帮助团队将 LLM 原型加速落地为生产级 Agent 系统 — 从提示词管理到 RAG 管道全覆盖',
    en: 'Turning LLM prototypes into production-grade Agent systems — from prompt infrastructure to RAG pipelines',
  },
  tagline: {
    zh: '用代码构建智能系统，用写作沉淀思考。',
    en: 'Building intelligent systems with code and clarity.',
  },
  /** Hero 打字机轮播文案（参考 readme-typing-svg 效果） */
  typingLines: {
    zh: [
      '用代码构建智能系统，用写作沉淀思考。',
      '探索 LLM · RAG · Agent 工程实践',
      '开源分享，持续迭代个人技术品牌',
    ],
    en: [
      'Building intelligent systems with code and clarity.',
      'Exploring LLM · RAG · Agent engineering',
      'Open source · Iterating my personal tech brand',
    ],
  },
  email: 'cx330xu@qq.com',
  github: 'https://github.com/Cx330xu',
  csdn: 'https://blog.csdn.net/Xu_youyaxianshen?type=blog',
  avatar: 'https://github.com/Cx330xu.png',
  ogImage: '/og-image.png',
} as const;

/** 首页 GitHub 贡献热力图：近 windowDays 天 commit ≥ minCommits 时自动显示 */
export const githubActivity = {
  username: 'Cx330xu',
  profileUrl: 'https://github.com/Cx330xu',
  windowDays: 90,
  minCommits: 5,
  /** 调试：true 强制显示，false 强制隐藏，null 按 commit 数自动判断 */
  override: null as boolean | null,
} as const;

/** 访问统计：构建时设置 PUBLIC_PLAUSIBLE_DOMAIN（如 cx330xu.github.io）后生产环境自动加载 Plausible。
 *  P2 复盘（启用后 2–4 周）：查 Top 页面/跳出率/英文占比，再决定是否做 STAR 案例(P2-1)、排版(P2-2)、静态标语(P2-4)、Demo 嵌入(P2-5)。 */
export const analytics = {
  plausibleDomainEnv: 'PUBLIC_PLAUSIBLE_DOMAIN',
} as const;

/** CSDN 渠道配置（更新文章数或同步策略时只改此处） */
export const csdn = {
  url: 'https://blog.csdn.net/Xu_youyaxianshen?type=blog',
  username: 'Xu_youyaxianshen',
  /** CSDN 已发布原创总数，有新文同步后递增 */
  postCount: 19,
  syncPolicy: {
    zh: '本站技术文章会同步发布至 CSDN；历史文章可在归档索引中查阅，新文章以本站为准。',
    en: 'Technical posts are mirrored on CSDN. See the archive for older articles; this site is the canonical source for new posts.',
  },
} as const;

export const giscus = {
  repo: 'Cx330xu/Cx330xu.github.io',
  repoId: 'R_kgDOPxfaJg',
  category: 'General',
  categoryId: 'DIC_kwDOPxfaJs4C-0bY',
  mapping: 'pathname',
  strict: '0',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  lang: 'zh-CN',
} as const;

/** 统一技能栈。featured: true 的项在 Hero 首屏展示（原 heroSkills） */
export const stacks = [
  { id: 'python', label: 'Python', featured: true },
  { id: 'typescript', label: 'TypeScript', featured: false },
  { id: 'llm', label: 'LLM', featured: true },
  { id: 'rag', label: 'RAG', featured: true },
  { id: 'agent', label: 'Agent', featured: true },
  { id: 'web', label: 'Web', featured: false },
  { id: 'astro', label: 'Astro', featured: true },
  { id: 'devops', label: 'DevOps', featured: false },
] as const;

/** Hero 区展示的精选技能（从 stacks 派生） */
export const heroSkills = stacks.filter(s => s.featured);

export const categories = [
  { id: 'ai', label: { zh: '人工智能', en: 'AI' } },
  { id: 'engineering', label: { zh: '工程实践', en: 'Engineering' } },
  { id: 'tools', label: { zh: '工具', en: 'Tools' } },
  { id: 'misc', label: { zh: '杂谈', en: 'Misc' } },
] as const;
