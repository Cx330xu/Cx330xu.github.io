import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { filterByLocale, sortByDate, getSlugFromId } from '../../utils/content';

export async function GET(context: { site: URL | undefined }) {
  const locale = 'en';
  const posts = sortByDate(
    filterByLocale(
      await getCollection('blog', ({ data }) => !data.draft),
      locale,
    ),
  );

  return rss({
    title: 'Cx330xu · Personal Tech Hub',
    description: 'Technical practice · AI · Agent · Open Source',
    site: context.site ?? 'https://Cx330xu.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/en/blog/${getSlugFromId(post.id)}/`,
    })),
    customData: `<language>en-US</language>`,
  });
}
