import { apiRequest, buildApiUrl } from '../config/api';

const getFallbackCategories = (lang) => {
  const isEn = lang === 'en';
  const isKg = lang === 'kg';
  return [
    { 
      id: 1, 
      name: 'academic', 
      display_name: isEn ? 'Academic' : (isKg ? 'Окутуучулук' : 'Преподавательские'), 
      icon: '', 
      description: '' 
    },
    { 
      id: 2, 
      name: 'administrative', 
      display_name: isEn ? 'Administrative' : (isKg ? 'Администрациялык' : 'Административные'), 
      icon: '', 
      description: '' 
    },
    { 
      id: 3, 
      name: 'technical', 
      display_name: isEn ? 'Technical' : (isKg ? 'Техникалык' : 'Технические'), 
      icon: '', 
      description: '' 
    },
    { 
      id: 4, 
      name: 'service', 
      display_name: isEn ? 'Support Staff' : (isKg ? 'Тейлөөчү' : 'Обслуживающие'), 
      icon: '', 
      description: '' 
    }
  ];
};

const getFallbackVacancies = (lang) => {
  const isEn = lang === 'en';
  const isKg = lang === 'kg';
  return [
    {
      id: 1,
      title: isEn ? "Anatomy Instructor" : (isKg ? "Анатомия окутуучусу" : "Преподаватель анатомии"),
      slug: "prepodavatel-anatomii",
      category: { 
        id: 1, 
        name: 'academic', 
        display_name: isEn ? 'Academic' : (isKg ? 'Окутуучулук' : 'Преподавательские') 
      },
      department: { 
        name: isEn 
          ? "Department of Fundamental Disciplines" 
          : (isKg ? "Фундаменталдык дисциплиналар кафедрасы" : "Кафедра фундаментальных дисциплин") 
      },
      location: isEn ? "Bishkek" : "Бишкек",
      employment_type: "full_time",
      experience_years: isEn ? "3+ years" : (isKg ? "3+ жыл" : "3+ года"),
      education_level: isEn ? "Master/PhD" : (isKg ? "Жогорку медициналык" : "Высшее медицинское"),
      short_description: isEn 
        ? "Conducting lectures and seminars on human anatomy, preparing teaching materials."
        : (isKg 
            ? "Адам анатомиясы боюнча лекцияларды жана семинарларды өткөрүү, методикалык материалдарды даярдоо."
            : "Ведение лекций и семинаров по анатомии человека, подготовка методических материалов."),
      tags_list: isEn 
        ? ["Teaching", "Anatomy", "Medicine"] 
        : (isKg ? ["Окутуу", "Анатомия", "Медицина"] : ["Преподавание", "Анатомия", "Медицина"]),
      posted_date: new Date().toISOString(),
      deadline: "2026-08-30",
      is_deadline_soon: false,
      is_expired: false,
      views_count: 5,
      applications_count: 0
    }
  ];
};

const careersService = {
  async getCategories(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/careers/categories/', { lang }));
      return response.results || response || getFallbackCategories(lang);
    } catch (error) {
      console.warn('Careers Categories API failed, using fallback');
      return getFallbackCategories(lang);
    }
  },

  async getVacancies(lang = 'ru', params = {}) {
    try {
      const response = await apiRequest(buildApiUrl('/careers/vacancies/', { ...params, lang }));
      return response.results || response || getFallbackVacancies(lang);
    } catch (error) {
      console.warn('Careers Vacancies API failed, using fallback');
      return getFallbackVacancies(lang);
    }
  },

  async getVacancy(id, lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl(`/careers/vacancies/${id}/`, { lang }));
      return response;
    } catch (error) {
      console.warn('Careers Vacancy Detail API failed');
      const fallbackList = getFallbackVacancies(lang);
      return fallbackList.find(v => v.id === parseInt(id)) || null;
    }
  },

  async submitApplication(formData) {
    try {
      const response = await apiRequest('/careers/applications/', {
        method: 'POST',
        body: formData,
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
