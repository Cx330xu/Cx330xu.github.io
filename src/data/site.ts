export const profile = {
  name: 'Cx330xu',
  title: {
    zh: '软件工程师 · AI 爱好者',
    en: 'Software Engineer · AI Enthusiast',
  },
  tagline: {
    zh: '用代码构建智能系统，用写作沉淀思考。',
    en: 'Building intelligent systems with code and clarity.',
  },
  email: 'cx330xu@qq.com',
  github: 'https://github.com/Cx330xu',
  avatar: 'https://github.com/Cx330xu.png',
  ogImage: '/og-image.svg',
} as const;

/** Hero 首屏展示的核心技能标签 */
export const heroSkills = ['Python', 'LLM', 'RAG', 'Agent', 'Astro'] as const;

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
