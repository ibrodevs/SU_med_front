import { apiRequest, buildApiUrl } from '../config/api';
import { 
  foundersFallbackData, 
  aboutSectionsFallbackData, 
  achievementsFallbackData,
  partnersFallbackData
} from '../data/aboutFallbackData';

const aboutService = {
  async getAboutWithPartners(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/about-with-partners/', { lang }));
      return response;
    } catch (error) {
      console.warn('About with Partners API failed, using fallback');
      return {
        about_section: aboutSectionsFallbackData[0],
        partners: partnersFallbackData,
        partners_count: partnersFallbackData.length
      };
    }
  },

  async getAboutSections(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/about-sections/', { lang }));
      return response.results || response || aboutSectionsFallbackData;
    } catch (error) {
      console.warn('About Sections API failed, using fallback');
      return aboutSectionsFallbackData;
    }
  },

  async getFounders(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/founders/frontend/', { lang }));
      return response.results || response || foundersFallbackData;
    } catch (error) {
      console.warn('Founders API failed, using fallback');
      return foundersFallbackData;
    }
  },

  async getStructure(lang = 'ru', type = null) {
    try {
      const params = { lang };
      if (type) params.type = type;
      const response = await apiRequest(buildApiUrl('/about-section/structure/frontend/', params));
      return response.results || response || [];
    } catch (error) {
      console.warn('Structure API failed');
      return [];
    }
  },

  async getAchievements(lang = 'ru', category = 'all') {
    try {
      const params = { lang };
      if (category !== 'all') params.category = category;
      const response = await apiRequest(buildApiUrl('/about-section/achievements/frontend/', params));
      return response.results || response || achievementsFallbackData;
    } catch (error) {
      console.warn('Achievements API failed, using fallback');
      return achievementsFallbackData;
    }
  },

  async getStatistics(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/statistics/frontend/', { lang }));
      return response.results || response || [];
    } catch (error) {
      console.warn('Statistics API failed');
      return [];
    }
  },

  async getPartners(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/partners/frontend/', { lang }));
      return response.results || response || partnersFallbackData;
    } catch (error) {
      console.warn('Partners API failed, using fallback');
      return partnersFallbackData;
    }
  },

  async getCouncils(lang = 'ru') {
    try {
      // Councils are in research app but often displayed in About
      const response = await apiRequest(buildApiUrl('/research/api/councils/', { lang }));
      const councils = response.results || response || [];
      
      const sectionsData = {};
      const sectionsList = [];

      councils.forEach((council) => {
        const councilId = council.id.toString();
        
        // Map members from the response
        let members = [];
        if (Array.isArray(council.members)) {
          members = council.members;
        } else if (council.members_ru || council.members_en || council.members_kg) {
          // Handle cases where members might be localized arrays
          members = council[`members_${lang}`] || council.members_ru || [];
        }

        sectionsData[councilId] = {
          id: councilId,
          title: council.name || council.title || `Council ${councilId}`,
          description: council.description || "",
          members: members,
          documents: council.documents || [],
          responsibilities: council.responsibilities || "",
          meetingSchedule: council.meeting_schedule || "",
        };

        sectionsList.push({
          id: councilId,
          name: council.name || council.title || `Council ${councilId}`,
        });
      });

      return {
        sectionsData,
        sectionsList,
        count: councils.length
      };
    } catch (error) {
      console.warn('Councils API failed');
      return { sectionsData: {}, sectionsList: [], count: 0 };
    }
  },

  async getCouncilDetail(id, lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl(`/research/api/councils/${id}/`, { lang }));
      return response;
    } catch (error) {
      console.warn('Council Detail API failed');
      return null;
    }
  },

  async getAccreditations(type = 'all', lang = 'ru') {
    try {
      const params = { lang };
      if (type !== 'all') params.type = type;
      const response = await apiRequest(buildApiUrl('/about-section/accreditations/', params));
      return response.results || response || [];
    } catch (error) {
      console.warn('Accreditations API failed');
      return [];
    }
  },

  async getAccreditationTypes(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/about-section/accreditations/types/', { lang }));
      return response.results || response || [];
    } catch (error) {
      console.warn('Accreditation Types API failed');
      return [];
    }
  },

  async getAccreditationDetail(id, lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl(`/about-section/accreditations/${id}/`, { lang }));
      return response;
    } catch (error) {
      console.warn('Accreditation Detail API failed');
      return null;
    }
  }
};

export default aboutService;
