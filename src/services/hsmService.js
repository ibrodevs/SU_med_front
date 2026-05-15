import { apiRequest, buildApiUrl } from '../config/api';

const fallbackData = {
  info: {
    title_ru: "Высшая школа медицины",
    title_en: "Higher School of Medicine",
    description_ru: "Ведущий образовательный центр",
    description_en: "Leading educational center"
  },
  programs: [],
  faculty: [],
  accreditations: [],
  learningGoals: []
};

class HSMService {
  async getHSMInfo(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/hsm/info/', { lang }));
      return response.results || response || fallbackData.info;
    } catch (error) {
      console.warn('HSM Info API failed, using fallback');
      return fallbackData.info;
    }
  }

  async getPrograms(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/hsm/programs/', { ...params, lang }));
      return response.results || response || fallbackData.programs;
    } catch (error) {
      console.warn('HSM Programs API failed, using fallback');
      return fallbackData.programs;
    }
  }

  async getFaculty(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/hsm/faculty/', { ...params, lang }));
      return response.results || response || fallbackData.faculty;
    } catch (error) {
      console.warn('HSM Faculty API failed, using fallback');
      return fallbackData.faculty;
    }
  }

  async getAccreditations(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/hsm/accreditations/', { ...params, lang }));
      return response.results || response || fallbackData.accreditations;
    } catch (error) {
      console.warn('HSM Accreditations API failed, using fallback');
      return fallbackData.accreditations;
    }
  }

  async getLearningGoals(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/hsm/learning-goals/', { ...params, lang }));
      return response.results || response || fallbackData.learningGoals;
    } catch (error) {
      console.warn('HSM Learning Goals API failed, using fallback');
      return fallbackData.learningGoals;
    }
  }

  async getHSMStats(lang = 'ru') {
    try {
      const [programs, faculty, accreditations] = await Promise.all([
        this.getPrograms(lang),
        this.getFaculty(lang),
        this.getAccreditations(lang)
      ]);

      return {
        totalPrograms: programs.length,
        bachelorPrograms: programs.filter(p => p.program_type === 'bachelor').length,
        masterPrograms: programs.filter(p => p.program_type === 'master').length,
        totalFaculty: faculty.length,
        professors: faculty.filter(f => f.position === 'professor').length,
        totalAccreditations: accreditations.length,
        validAccreditations: accreditations.filter(a => a.is_valid).length
      };
    } catch (error) {
      console.error('Error fetching HSM stats:', error);
      return {
        totalPrograms: 0,
        bachelorPrograms: 0,
        masterPrograms: 0,
        totalFaculty: 0,
        professors: 0,
        totalAccreditations: 0,
        validAccreditations: 0
      };
    }
  }
}

const hsmService = new HSMService();
export default hsmService;
