import { apiRequest, buildApiUrl } from '../config/api';

const BASE_PATH = '/api/news';

export const getNews = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/`, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('News fetch failed');
    return [];
  }
};

export const getFeaturedNews = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/featured/`, { lang }));
    return response || [];
  } catch (error) {
    console.warn('Featured news fetch failed');
    return [];
  }
};

export const getNewsById = async (id, lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/${id}/`, { lang }));
    return response;
  } catch (error) {
    console.error(`Error fetching news ${id}:`, error);
    return null;
  }
};

const newsService = {
  getNews,
  getFeaturedNews,
  getNewsById
};

export default newsService;
