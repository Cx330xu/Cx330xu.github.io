import type { Locale } from '../i18n/ui';

export function getLocaleFromId(id: string): Locale {
  return id.startsWith('en/') ? 'en' : 'zh';
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

export function switchLocalePath(path: string, target: Locale): string {
  if (path.startsWith('/zh/') || path === '/zh/') {
    return path.replace(/^\/zh/, `/${target}`);
  }
  if (path.startsWith('/en/') || path === '/en/') {
    return path.replace(/^\/en/, `/${target}`);
  }
  return `/${target}/`;
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
