import { getCollection } from 'astro:content';

export async function GET() {
  const allPosts = await getCollection('posts');
  const posts = allPosts
    .filter((post) => !post.data.tags?.includes('Pinned'))
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const siteUrl = import.meta.env.SITE || 'https://example.com';

  const items = posts
    .map((post) => {
      const date = new Date(post.data.date);
      return `    <item>
      <title>${post.data.tags?.join(', ') || 'Post'}</title>
      <description><![CDATA[${post.data.text}]]></description>
      <pubDate>${date.toUTCString()}</pubDate>
      <link>${siteUrl}/post/${post.id}/</link>
      <guid>${siteUrl}/post/${post.id}/</guid>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Stack</title>
    <description>A build log. What I'm shipping, learning, and figuring out.</description>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
