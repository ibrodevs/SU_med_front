import Parser from 'rss-parser';

export default async function handler(req, res) {
  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'contentEncoded'],
        ['media:content', 'mediaContent'],
      ],
    }
  });

  try {
    const feed = await parser.parseURL('https://salymbekov.com/ru/feed/');
    
    const items = feed.items.map(item => {
      let imageUrl = null;
      
      const content = item.contentEncoded || item.content || '';
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }

      if (!imageUrl && item.mediaContent) {
        if (Array.isArray(item.mediaContent)) {
          imageUrl = item.mediaContent[0]?.$.url;
        } else if (item.mediaContent.$) {
          imageUrl = item.mediaContent.$.url;
        }
      } 
      
      if (!imageUrl && item.enclosure && item.enclosure.url) {
        imageUrl = item.enclosure.url;
      } 

      let summary = item.contentSnippet || item.description || '';
      const footerRegex = /Сообщение.*появились сначала на/g;
      summary = summary.split(footerRegex)[0].trim();

      const slug = item.link.split('/').filter(Boolean).pop();

      return {
        id: `ext-${slug}`,
        title: item.title,
        title_ru: item.title,
        summary: summary,
        summary_ru: summary,
        content: item.contentEncoded || item.content,
        content_ru: item.contentEncoded || item.content,
        image_url: imageUrl,
        published_at: item.pubDate,
        date: item.pubDate,
        category: { name: 'Salymbekov News' },
        is_external: true,
        original_link: item.link
      };
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news feed' });
  }
}
