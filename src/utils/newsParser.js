export const EXTERNAL_FEED_URL = 'https://salymbekov.com/ru/feed/';
export const CORS_PROXY = 'https://api.allorigins.win/get?url=';
const CORS_RAW_PROXY = 'https://api.allorigins.win/raw?url=';

const stripHtml = (html = '') => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
};

const removeWordPressFooter = (html = '') => {
  const doc = new DOMParser().parseFromString(html, 'text/html');

  doc.querySelectorAll('p').forEach((paragraph) => {
    const text = paragraph.textContent?.replace(/\s+/g, ' ').trim() || '';

    if (/^Сообщение\s+.+\s+появились сначала на/i.test(text)) {
      paragraph.remove();
    }
  });

  return doc.body.innerHTML;
};

const getTagText = (node, tagName) =>
  node.getElementsByTagName(tagName)[0]?.textContent?.trim() ||
  node.getElementsByTagName(tagName.toLowerCase())[0]?.textContent?.trim() ||
  '';

const getSlugFromLink = (link = '') => {
  try {
    const url = new URL(link);
    return url.pathname.split('/').filter(Boolean).pop() || encodeURIComponent(link);
  } catch {
    return link.split('/').filter(Boolean).pop() || String(Date.now());
  }
};

const getFirstImage = (item, content) => {
  const contentDoc = new DOMParser().parseFromString(content || '', 'text/html');
  const contentImage = contentDoc.querySelector('img')?.getAttribute('src');
  const enclosureImage = item.querySelector('enclosure[type^="image"]')?.getAttribute('url');
  const mediaContent = item.getElementsByTagName('media:content')[0];
  const mediaThumbnail = item.getElementsByTagName('media:thumbnail')[0];
  const mediaImage = mediaContent?.getAttribute('url') || mediaThumbnail?.getAttribute('url');

  return contentImage || enclosureImage || mediaImage || null;
};

export const parseRSS = (xmlString) => {
  const xml = new DOMParser().parseFromString(xmlString, 'text/xml');
  const parseError = xml.querySelector('parsererror');

  if (parseError) {
    throw new Error('Unable to parse external news feed');
  }

  return Array.from(xml.querySelectorAll('item')).map((item) => {
    const title = getTagText(item, 'title');
    const link = getTagText(item, 'link');
    const description = getTagText(item, 'description');
    const rawContent = getTagText(item, 'content:encoded') || description;
    const content = removeWordPressFooter(rawContent);
    const pubDate = getTagText(item, 'pubDate');
    const slug = getSlugFromLink(link);
    const summary = stripHtml(description || content)
      .replace(/Сообщение\s+.*?\s+появились сначала на.*$/i, '')
      .trim();

    return {
      id: `ext-${slug}`,
      slug: `ext-${slug}`,
      title,
      title_ru: title,
      summary,
      summary_ru: summary,
      content,
      content_ru: content,
      image_url: getFirstImage(item, content),
      published_at: pubDate,
      date: pubDate,
      category: { name: 'news' },
      source: 'Salymbekov University',
      is_external: true,
      original_link: link,
    };
  });
};

const fetchWithTimeout = async (url, timeout = 12000) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      cache: 'no-store',
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const fetchExternalNews = async () => {
  try {
    const proxyResponse = await fetchWithTimeout(
      `${CORS_PROXY}${encodeURIComponent(EXTERNAL_FEED_URL)}`
    ).catch(() => null);

    if (proxyResponse?.ok) {
      const data = await proxyResponse.json();
      return parseRSS(data.contents || '');
    }

    const rawResponse = await fetchWithTimeout(
      `${CORS_RAW_PROXY}${encodeURIComponent(EXTERNAL_FEED_URL)}`
    ).catch(() => null);

    if (rawResponse?.ok) {
      return parseRSS(await rawResponse.text());
    }

    if (import.meta.env.DEV) {
      const fixtureResponse = await fetchWithTimeout('/feed.xml').catch(() => null);

      if (fixtureResponse?.ok) {
        return parseRSS(await fixtureResponse.text());
      }
    }

    const localResponse = await fetchWithTimeout('/api/news').catch(() => null);

    if (!localResponse?.ok) {
      throw new Error('External news proxy request failed');
    }

    return await localResponse.json();
  } catch (error) {
    console.error('Error in fetchExternalNews:', error);
    return [];
  }
};

export const fetchExternalArticle = async (idOrSlug) => {
  const normalizedId = idOrSlug.startsWith('ext-') ? idOrSlug : `ext-${idOrSlug}`;
  const news = await fetchExternalNews();

  return news.find((item) => item.id === normalizedId || item.slug === normalizedId);
};
