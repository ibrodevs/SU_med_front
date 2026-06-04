import { apiRequest } from '../config/api';

let cachedContent = null;

export const fetchOfficialContent = async (lang = 'ru') => {
  if (cachedContent) {
    return cachedContent[lang] || cachedContent['ru'];
  }
  
  try {
    const data = await apiRequest('/admissions/official-content/');
    if (data && data.success && data.data) {
      const rawContent = data.data; // Structure: { footer: { ru: {...}, en: {...}, kg: {...} }, ... }
      
      // Transform to language-keyed structure matching officialSiteContent
      const transformed = {
        ru: {},
        en: {},
        kg: {}
      };
      
      Object.keys(rawContent).forEach(sectionKey => {
        const sectionData = rawContent[sectionKey];
        if (sectionData) {
          transformed.ru[sectionKey] = sectionData.ru || {};
          transformed.en[sectionKey] = sectionData.en || {};
          transformed.kg[sectionKey] = sectionData.kg || {};
        }
      });
      
      cachedContent = transformed;
      return cachedContent[lang] || cachedContent['ru'];
    }
  } catch (error) {
    console.warn('Failed to fetch official content from backend, using static fallback:', error);
  }
  
  // Fallback to static file if backend fails or doesn't return data
  try {
    const { officialSiteContent } = await import('../data/officialSiteContent');
    return officialSiteContent[lang] || officialSiteContent['ru'];
  } catch (err) {
    console.error('Error importing static fallback data:', err);
    return {};
  }
};
