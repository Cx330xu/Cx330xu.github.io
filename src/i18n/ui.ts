export type Locale = 'zh' | 'en';

export const ui = {
  zh: {
    nav: {
      home: '首页',
      projects: '项目',
      blog: '博客',
      notes: '笔记',
      archives: '归档',
      about: '关于',
    },
    home: {
      viewProjects: '查看项目',
      readBlog: '阅读博客',
      featuredProjects: '精选项目',
      allProjects: '查看全部项目',
      latestPosts: '最新文章',
      latestNotes: '最新笔记',
      exploreTags: '探索标签',
      allTags: '全部标签',
      allCategories: '全部分类',
    },
    projects: {
      title: '项目',
      subtitle: '开源与技术实践作品',
      filterAll: '全部',
      filterFeatured: '精选',
      github: 'GitHub',
      status: { active: '活跃', wip: '进行中', archived: '已归档' },
      empty: '暂无项目',
    },
    blog: {
      title: '博客',
      subtitle: '深度技术文章与实践记录',
      all: '全部',
      readMore: '阅读全文',
      minRead: '分钟阅读',
    },
    notes: {
      title: '笔记',
      subtitle: '短笔记、测试记录与灵感',
      empty: '暂无笔记',
    },
    archives: {
      title: '归档',
      subtitle: '按时间浏览全部内容',
      posts: '文章',
      notes: '笔记',
    },
    tags: {
      title: '标签',
      subtitle: '按主题浏览内容',
    },
    categories: {
      title: '分类',
      subtitle: '按类别浏览文章',
    },
    about: {
      title: '关于',
    },
    footer: {
      builtWith: '基于 Astro 构建',
    },
    theme: {
      light: '浅色',
      dark: '深色',
    },
    rss: 'RSS',
    comments: '评论',
    relatedTags: '相关标签',
    translationPending: '译文待补充',
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      blog: 'Blog',
      notes: 'Notes',
      archives: 'Archives',
      about: 'About',
    },
    home: {
      viewProjects: 'View Projects',
      readBlog: 'Read Blog',
      featuredProjects: 'Featured Projects',
      allProjects: 'View All Projects',
      latestPosts: 'Latest Posts',
      latestNotes: 'Latest Notes',
      exploreTags: 'Explore Tags',
      allTags: 'All Tags',
      allCategories: 'All Categories',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Open source and technical work',
      filterAll: 'All',
      filterFeatured: 'Featured',
      github: 'GitHub',
      status: { active: 'Active', wip: 'WIP', archived: 'Archived' },
      empty: 'No projects yet',
    },
    blog: {
      title: 'Blog',
      subtitle: 'In-depth articles and practice notes',
      all: 'All',
      readMore: 'Read more',
      minRead: 'min read',
    },
    notes: {
      title: 'Notes',
      subtitle: 'Short notes, tests, and ideas',
      empty: 'No notes yet',
    },
    archives: {
      title: 'Archives',
      subtitle: 'Browse everything by date',
      posts: 'Posts',
      notes: 'Notes',
    },
    tags: {
      title: 'Tags',
      subtitle: 'Browse by topic',
    },
    categories: {
      title: 'Categories',
      subtitle: 'Browse posts by category',
    },
    about: {
      title: 'About',
    },
    footer: {
      builtWith: 'Built with Astro',
    },
    theme: {
      light: 'Light',
      dark: 'Dark',
    },
    rss: 'RSS',
    comments: 'Comments',
    relatedTags: 'Related Tags',
    translationPending: 'Translation pending',
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}
