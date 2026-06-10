import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/ui';
import { getSlugFromId } from './content';

export type LocaleSwitchResult = {
  href: string;
  fallback: boolean;
};

type ContentItem = CollectionEntry<'blog' | 'projects' | 'notes'>;

function findCounterpartSlug(
  items: ContentItem[],
  currentSlug: string,
  currentLocale: Locale,
  targetLocale: Locale,
): string | null {
  const current = items.find((item) => item.id === `${currentLocale}/${currentSlug}`);
  if (!current) return null;

  if (items.some((item) => item.id === `${targetLocale}/${currentSlug}`)) {
    return currentSlug;
  }

  const key = current.data.translationKey;
  if (key) {
    const match = items.find(
      (item) => item.id.startsWith(`${targetLocale}/`) && item.data.translationKey === key,
    );
    if (match) return getSlugFromId(match.id);
  }

  return null;
}

function tagExistsInLocale(items: ContentItem[], tag: string, locale: Locale): boolean {
  const normalized = tag.toLowerCase();
  return items.some(
    (item) =>
      item.id.startsWith(`${locale}/`) &&
      (item.data.tags ?? []).some((t) => t.toLowerCase() === normalized),
  );
}

export function resolveLocaleSwitch(
  currentPath: string,
  currentLocale: Locale,
  targetLocale: Locale,
  collections: {
    blog: ContentItem[];
    projects: ContentItem[];
    notes: ContentItem[];
  },
): LocaleSwitchResult {
  const homeHref = `/${targetLocale}/`;

  if (currentPath === `/${currentLocale}/` || currentPath === `/${currentLocale}`) {
    return { href: homeHref, fallback: false };
  }

  const normalized = currentPath.endsWith('/') ? currentPath : `${currentPath}/`;

  const staticRoutes = [
    'about',
    'archives',
    'search',
    'blog',
    'projects',
    'notes',
    'tags',
    'categories',
  ];
  for (const route of staticRoutes) {
    if (normalized === `/${currentLocale}/${route}/`) {
      return { href: `/${targetLocale}/${route}/`, fallback: false };
    }
  }

  const detailMatch = normalized.match(/^\/(zh|en)\/(blog|projects|notes)\/([^/]+)\/$/);
  if (detailMatch) {
    const [, , section, slug] = detailMatch;
    const items = collections[section as 'blog' | 'projects' | 'notes'];
    const counterpart = findCounterpartSlug(items, slug, currentLocale, targetLocale);
    if (counterpart) {
      return { href: `/${targetLocale}/${section}/${counterpart}/`, fallback: false };
    }
    return { href: homeHref, fallback: true };
  }

  const tagMatch = normalized.match(/^\/(zh|en)\/tags\/([^/]+)\/$/);
  if (tagMatch) {
    const tag = decodeURIComponent(tagMatch[2]);
    const allItems = [...collections.blog, ...collections.notes, ...collections.projects];
    if (tagExistsInLocale(allItems, tag, targetLocale)) {
      return { href: `/${targetLocale}/tags/${tag.toLowerCase()}/`, fallback: false };
    }
    return { href: `/${targetLocale}/tags/`, fallback: true };
  }

  const categoryMatch = normalized.match(/^\/(zh|en)\/categories\/([^/]+)\/$/);
  if (categoryMatch) {
    const category = categoryMatch[2];
    const hasPosts = collections.blog.some(
      (item) => item.id.startsWith(`${targetLocale}/`) && 'category' in item.data && item.data.category === category,
    );
    if (hasPosts) {
      return { href: `/${targetLocale}/categories/${category}/`, fallback: false };
    }
    return { href: `/${targetLocale}/categories/`, fallback: true };
  }

  const swapped = normalized.replace(`/${currentLocale}/`, `/${targetLocale}/`);
  if (swapped !== normalized) {
    return { href: swapped, fallback: false };
  }

  return { href: homeHref, fallback: true };
}
