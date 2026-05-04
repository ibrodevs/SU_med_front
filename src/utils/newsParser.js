import Parser from 'rss-parser';

export const fetchExternalNews = async () => {
  const parser = new Parser({
    customFields: {
      item: [
        ['content:encoded', 'contentEncoded'],
        ['media:content', 'mediaContent'],
      ],
    }
  });

  try {
    // Пытаемся сначала через локальный API (если запущен vercel dev)
    let feed;
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        return await response.json();
      }
    } catch (e) {
      // Игнорируем и идем к запасному плану
    }

    // ЗАПАСНОЙ ПЛАН: Прямой запрос через публичный CORS прокси
    const RSS_URL = 'https://salymbekov.com/ru/feed/';
    const PROXY_URL = `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`;
    
    const response = await fetch(PROXY_URL);
    if (!response.ok) throw new Error('CORS proxy failed');
    const xml = await response.text();
    feed = await parser.parseString(xml);
    
    return feed.items.map(item => {
      let imageUrl = null;
      const content = item.contentEncoded || item.content || '';
      const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
      if (imgMatch) imageUrl = imgMatch[1];

      if (!imageUrl && item.mediaContent) {
        if (Array.isArray(item.mediaContent)) imageUrl = item.mediaContent[0]?.$.url;
        else if (item.mediaContent.$) imageUrl = item.mediaContent.$.url;
      }

      // Применяем облачный прокси для картинок
      if (imageUrl && imageUrl.startsWith('http')) {
        imageUrl = `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&w=800`;
      }

      let summary = item.contentSnippet || item.description || '';
      summary = summary.split(/Сообщение.*появились сначала на/g)[0].trim();

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
  } catch (error) {
    console.error('Error in fetchExternalNews:', error);
    return [];
  }
};

export const fetchExternalArticle = async (id) => {
  const news = await fetchExternalNews();
  return news.find(item => item.id === id);
};
