import type { Locale } from '../i18n/ui';

export function getLocaleFromId(id: string): Locale {
  return id.startsWith('en/') ? 'en' : 'zh';
}

/** Pagefind 索引语言键（与 html lang 及 data-pagefind-filter 一致） */
export function getPagefindLanguage(locale: Locale): 'zh-cn' | 'en' {
  return locale === 'zh' ? 'zh-cn' : 'en';
}

export function getSlugFromId(id: string): string {
  return id.replace(/^(zh|en)\//, '');
}

export function filterByLocale<T extends { id: string }>(items: T[], locale: Locale): T[] {
  return items.filter((item) => item.id.startsWith(`${locale}/`));
}

export function sortByDate<T extends { data: { date: Date } }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

const DETAIL_PREFIXES = ['/blog/', '/projects/', '/notes/'] as const;

export function switchLocalePath(path: string, target: Locale): string {
  let next = path;
  if (path.startsWith('/zh/') || path === '/zh/') {
    next = path.replace(/^\/zh/, `/${target}`);
  } else if (path.startsWith('/en/') || path === '/en/') {
    next = path.replace(/^\/en/, `/${target}`);
  } else {
    return `/${target}/`;
  }

  const isDetail = DETAIL_PREFIXES.some((prefix) => {
    const match = next.match(new RegExp(`^/${target}${prefix.replace(/\//g, '\\/')}([^/]+)/?$`));
    return Boolean(match);
  });

  if (isDetail) {
    return `/${target}/`;
  }

  return next.endsWith('/') ? next : `${next}/`;
}

export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRelativeDate(date: Date, locale: Locale): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (locale === 'zh') {
    if (diffDays <= 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays} 天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} 周前`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} 个月前`;
    return `${Math.floor(diffDays / 365)} 年前`;
  }

  if (diffDays <= 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function groupByYearMonth<T extends { data: { date: Date } }>(
  items: T[],
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const d = item.data.date;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }
  return map;
}

export function collectTags(items: { data: { tags?: string[] } }[]): string[] {
  const set = new Set<string>();
  for (const item of items) {
    for (const tag of item.data.tags ?? []) set.add(tag);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getInitials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return title.slice(0, 2).toUpperCase();
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase();
}
