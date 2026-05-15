import { apiRequest, buildApiUrl } from '../config/api';
import {
  researchCentersFallbackData,
  scientificJournalsFallbackData,
  grantsFallbackData,
  conferencesFallbackData,
  publicationsFallbackData
} from '../data/researchFallbackData';

const BASE_PATH = '/api/research';

export const getResearchCenters = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/centers/`, { lang }));
    return response.results || response || researchCentersFallbackData;
  } catch (error) {
    console.warn('Research centers fetch failed, using fallback');
    return researchCentersFallbackData;
  }
};

export const getScientificJournals = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/journals/`, { lang }));
    return response.results || response || scientificJournalsFallbackData;
  } catch (error) {
    console.warn('Scientific journals fetch failed, using fallback');
    return scientificJournalsFallbackData;
  }
};

export const getGrants = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/grants/`, { lang }));
    return response.results || response || grantsFallbackData;
  } catch (error) {
    console.warn('Grants fetch failed, using fallback');
    return grantsFallbackData;
  }
};

export const getConferences = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/conferences/`, { lang }));
    return response.results || response || conferencesFallbackData;
  } catch (error) {
    console.warn('Conferences fetch failed, using fallback');
    return conferencesFallbackData;
  }
};

export const getPublications = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(`${BASE_PATH}/publications/`, { lang }));
    return response.results || response || publicationsFallbackData;
  } catch (error) {
    console.warn('Publications fetch failed, using fallback');
    return publicationsFallbackData;
  }
};

const researchService = {
  getResearchCenters,
  getScientificJournals,
  getGrants,
  getConferences,
  getPublications
};

export const researchAPI = {
  getManagementByType: async (lang = 'ru') => ({ data: [] }),
  getScientificCouncils: async (lang = 'ru') => ({ data: [] }),
  getCommissionsByType: async (lang = 'ru') => ({ data: [] }),
  getJournalDetails: async (journalId, lang = 'ru') => {
    const journals = await getScientificJournals(lang);
    return journals.find((journal) => String(journal.id) === String(journalId)) || null;
  },
  getJournalIssuesByJournal: async () => []
};

export default researchService;
