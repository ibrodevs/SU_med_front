import { apiRequest, buildApiUrl } from '../config/api';

const fallbackData = {
  categories: [
    { name: 'all', display_name_ru: 'Все вакансии', display_name_en: 'All Vacancies' },
    { name: 'academic', display_name_ru: 'Академический персонал', display_name_en: 'Academic Staff' },
    { name: 'administrative', display_name_ru: 'Административный персонал', display_name_en: 'Administrative Staff' }
  ],
  vacancies: [
    {
      id: 1,
      title_ru: "Преподавать анатомии",
      title_en: "Anatomy Teacher",
      department_ru: "Кафедра фундаментальных дисциплин",
      department_en: "Department of Fundamental Disciplines",
      category_name: "academic",
      salary: "По результатам собеседования",
      type: "full-time",
      deadline: "2024-08-30"
    }
  ]
};

const careersService = {
  async getCategories(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/careers/categories/', { lang }));
      return response.results || response || fallbackData.categories;
    } catch (error) {
      console.warn('Careers Categories API failed, using fallback');
      return fallbackData.categories;
    }
  },

  async getVacancies(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/careers/vacancies/', { ...params, lang }));
      return response.results || response || fallbackData.vacancies;
    } catch (error) {
      console.warn('Careers Vacancies API failed, using fallback');
      return fallbackData.vacancies;
    }
  },

  async getVacancy(id, lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl(`/careers/vacancies/${id}/`, { lang }));
      return response;
    } catch (error) {
      console.warn('Careers Vacancy Detail API failed');
      return fallbackData.vacancies.find(v => v.id === parseInt(id)) || null;
    }
  },

  async submitApplication(formData) {
    try {
      const response = await apiRequest('/careers/applications/', {
        method: 'POST',
        body: formData,
        // No Content-Type header for FormData
        headers: {}
      });
      return response;
    } catch (error) {
      console.error('Application submission failed:', error);
      throw error;
    }
  }
};

export default careersService;
