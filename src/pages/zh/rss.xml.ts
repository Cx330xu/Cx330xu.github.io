import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { filterByLocale, sortByDate, getSlugFromId } from '../../utils/content';

export async function GET(context: { site: URL | undefined }) {
  const locale = 'zh';
  const posts = sortByDate(
    filterByLocale(
      await getCollection('blog', ({ data }) => !data.draft),
      locale,
    ),
  );

  return rss({
    title: 'Cx330xu · Personal Tech Hub',
    description: '计算机行业技术实践 · AI · Agent · 开源',
    site: context.site ?? 'https://Cx330xu.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/zh/blog/${getSlugFromId(post.id)}/`,
    })),
    customData: `<language>zh-CN</language>`,
  });
}
