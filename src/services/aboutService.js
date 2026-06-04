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
      const response = await apiRequest(buildApiUrl('/about-section/university-founders/', { lang }));
      const data = response.results || response;
      return (Array.isArray(data) && data.length) ? data : foundersFallbackData;
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

  // Миссия университета (mission_section app)
  async getMission(lang = 'ru') {
    try {
      const r = await apiRequest(buildApiUrl('/mission/api/complete/', { lang }));
      const m = r.mission || {};
      return {
        mission: {
          subtitle: m.display_subtitle || m.subtitle || '',
          title: m.display_title || m.title || '',
          text: m.display_mission_text || m.mission_text || '',
          vision_title: m.display_vision_title || m.vision_title || '',
          vision_text: m.display_vision_text || m.vision_text || '',
        },
        strategicGoals: (r.priorities || []).map((p, i) => ({
          id: p.id ?? i,
          icon: p.icon_class || 'SparklesIcon',
          title: p.display_text || p.text || '',
          description: '',
        })),
        history: (r.history || []).map((h) => ({
          year: h.year,
          title: h.display_title || h.title || '',
          description: h.display_description || h.description || '',
        })),
        values: (r.values || []).map((v) => ({
          title: v.display_title || v.title || '',
          description: v.display_description || v.description || '',
        })),
      };
    } catch (error) {
      console.warn('Mission API failed, using fallback');
      return null;
    }
  },

  async getCouncils(lang = 'ru') {
    try {
      // Councils are in research app but often displayed in About
      const response = await apiRequest(buildApiUrl('/research/api/councils/', { lang }));
      const councils = response.results || response || [];

      const L = lang === 'kg' ? 'kg' : lang === 'en' ? 'en' : 'ru';
      // Локализованное поле с fallback на русский
      const loc = (council, field) =>
        council[`${field}_${L}`] || council[`${field}_ru`] || council[field] || '';

      // Бэкенд отдаёт участников строками "ФИО - должность" — разбираем в объекты
      const parseMembers = (council) => {
        const raw = council[`members_${L}`] || council.members_ru || council.members || [];
        const list = (Array.isArray(raw) ? raw : []).map((m, i) => {
          if (m && typeof m === 'object') return m;
          const [name, ...rest] = String(m).split(' - ');
          return { id: `m-${i}`, name: (name || '').trim(), position: rest.join(' - ').trim() };
        });
        // Председатель и секретарь — тоже часть состава
        const chairman = loc(council, 'chairman');
        const secretary = loc(council, 'secretary');
        const head = [];
        if (chairman) head.push({ id: 'chair', name: chairman, position: 'Председатель' });
        if (secretary) head.push({ id: 'secretary', name: secretary, position: 'Секретарь' });
        return [...head, ...list];
      };

      const sectionsData = {};
      const sectionsList = [];

      councils.forEach((council) => {
        const councilId = council.id.toString();
        const name = loc(council, 'name') || council.title || `Совет №${councilId}`;

        sectionsData[councilId] = {
          id: councilId,
          title: name,
          description: loc(council, 'description'),
          members: parseMembers(council),
          documents: council.documents || [],
          responsibilities: loc(council, 'responsibilities'),
          meetingSchedule: loc(council, 'meeting_schedule'),
        };

        sectionsList.push({ id: councilId, name });
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
