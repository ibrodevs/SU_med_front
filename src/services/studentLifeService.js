import { apiRequest, buildApiUrl } from '../config/api';
import {
  instructionsFallbackData,
  clubsFallbackData,
  eventsFallbackData,
  galleryFallbackData
} from '../data/studentLifeFallbackData';

const BASE_PATH = '/api/student-life';

export const getInstructions = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/instructions/`, { lang }));
    return response.results || response || instructionsFallbackData;
  } catch (error) {
    console.warn('Instructions fetch failed, using fallback');
    return instructionsFallbackData;
  }
};

export const getClubs = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`/api/social-opportunities/clubs/`, { lang }));
    return response.results || response || clubsFallbackData;
  } catch (error) {
    console.warn('Clubs fetch failed, using fallback');
    return clubsFallbackData;
  }
};

export const getEvents = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/events/`, { lang }));
    return response.results || response || eventsFallbackData;
  } catch (error) {
    console.warn('Events fetch failed, using fallback');
    return eventsFallbackData;
  }
};

export const getGallery = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/gallery/`, { lang }));
    return response || galleryFallbackData;
  } catch (error) {
    console.warn('Gallery fetch failed, using fallback');
    return galleryFallbackData;
  }
};

export const getMobility = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/mobility/`, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('Mobility fetch failed');
    return [];
  }
};

export const getInternships = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/internships/`, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('Internships fetch failed');
    return [];
  }
};

export const getLifeOverview = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/overview/`, { lang }));
    return response || { photo_urls: [], video_data: [], stats: [] };
  } catch (error) {
    console.warn('Life overview fetch failed');
    return { photo_urls: [], video_data: [], stats: [] };
  }
};

const studentLifeService = {
  getInstructions,
  getClubs,
  getEvents,
  getGallery,
  getMobility,
  getInternships,
  getLifeOverview
};

export const studentLifeAPI = {
  getAcademicMobilityData: async (lang = 'ru') => {
    const data = await getMobility(lang);
    return { data };
  },
  getInstructionsData: async (lang = 'ru') => {
    const data = await getInstructions(lang);
    return { data };
  },
  getEventsData: async (lang = 'ru') => {
    const data = await getEvents(lang);
    return { data };
  },
  getGalleryData: async (lang = 'ru') => {
    const data = await getGallery(lang);
    return { data };
  }
};

export default studentLifeService;
