// insights RSS 피드 생성기 -> feed.xml
// 사용: node scripts/gen-feed.mjs (새 글 게시 때마다 실행, 파이프라인 5절)
// 데이터: insights/posts.js(목록) + 각 글 HTML의 meta description과 article:published_time
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const pjs = fs.readFileSync(path.join(ROOT, 'insights/posts.js'), 'utf8');
const posts = [...pjs.matchAll(/slug: '([a-z0-9-]+)'.*?topic: '([^']+)'.*?title: '([^']+)'/g)].map((m) => {
  const [, slug, topic, title] = m;
  const html = fs.readFileSync(path.join(ROOT, 'insights', slug + '.html'), 'utf8');
  const desc = html.match(/<meta name="description" content="([^"]+)"/)[1];
  const pub = html.match(/article:published_time" content="([^"]+)"/)[1];
  return { slug, topic, title, desc, pub: new Date(pub) };
}).sort((a, b) => b.pub - a.pub);

const items = posts.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>https://ahn-partners.net/insights/${p.slug}.html</link>
      <guid>https://ahn-partners.net/insights/${p.slug}.html</guid>
      <pubDate>${p.pub.toUTCString()}</pubDate>
      <category>${esc(p.topic)}</category>
      <description>${esc(p.desc)}</description>
    </item>`).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ahn Partners Insights</title>
    <link>https://ahn-partners.net/insights.html</link>
    <atom:link href="https://ahn-partners.net/feed.xml" rel="self" type="application/rss+xml"/>
    <description>AI 전환, 기술경영, 조직 운영에 대한 실무 통찰. 매주 화요일과 목요일 뉴스레터로도 보내드립니다.</description>
    <language>ko</language>
${items}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(ROOT, 'feed.xml'), rss);
console.log('feed.xml 생성:', posts.length, 'items');
