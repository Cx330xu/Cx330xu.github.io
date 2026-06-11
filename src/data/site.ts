export const profile = {
  name: 'Cx330xu',
  title: {
    zh: 'AI Agent 研发工程师',
    en: 'AI Agent Engineer',
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

/** Hero 首屏展示的核心技能标签（tag 映射到 /tags/[tag]/ 路由） */
export const heroSkills = [
  { label: 'Python', tag: 'python' },
  { label: 'LLM', tag: 'llm' },
  { label: 'RAG', tag: 'rag' },
  { label: 'Agent', tag: 'agent' },
  { label: 'Astro', tag: 'astro' },
] as const;

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

export const stacks = [
  { id: 'python', label: 'Python' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'llm', label: 'LLM' },
  { id: 'rag', label: 'RAG' },
  { id: 'agent', label: 'Agent' },
  { id: 'web', label: 'Web' },
  { id: 'astro', label: 'Astro' },
  { id: 'devops', label: 'DevOps' },
] as const;

export const categories = [
  { id: 'ai', label: { zh: '人工智能', en: 'AI' } },
  { id: 'engineering', label: { zh: '工程实践', en: 'Engineering' } },
  { id: 'tools', label: { zh: '工具', en: 'Tools' } },
  { id: 'misc', label: { zh: '杂谈', en: 'Misc' } },
] as const;
