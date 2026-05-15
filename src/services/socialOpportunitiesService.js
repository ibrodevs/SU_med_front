import { apiRequest, buildApiUrl } from '../config/api';

const fallbackData = {
  events: [
    {
      id: 1,
      title_ru: "День открытых дверей",
      title_en: "Open Day",
      description_ru: "Приглашаем всех желающих познакомиться с университетом",
      description_en: "We invite everyone to get to know the university",
      location_ru: "Главный корпус",
      location_en: "Main Building",
      organizer_ru: "Приемная комиссия",
      organizer_en: "Admissions Committee",
      date: "2024-05-20",
      registration: "open"
    }
  ],
  clubs: [
    {
      id: 1,
      title_ru: "Медицинский клуб",
      title_en: "Medical Club",
      description_ru: "Обсуждение актуальных вопросов медицины",
      description_en: "Discussion of current issues in medicine",
      members: 50,
      meetings_ru: "Каждый четверг",
      meetings_en: "Every Thursday",
      leader_ru: "Иванов И.И.",
      leader_en: "Ivanov I.I."
    }
  ],
  projects: [
    {
      id: 1,
      title_ru: "Волонтеры-медики",
      title_en: "Medical Volunteers",
      description_ru: "Помощь в медицинских учреждениях",
      description_en: "Assistance in medical institutions",
      team: 30,
      progress: 75
    }
  ]
};

const socialOpportunitiesService = {
  async getEvents(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/social-opportunities/events/', { lang }));
      return response.results || response || fallbackData.events;
    } catch (error) {
      console.warn('Social Opportunities Events API failed, using fallback');
      return fallbackData.events;
    }
  },

  async getClubs(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/social-opportunities/clubs/', { lang }));
      return response.results || response || fallbackData.clubs;
    } catch (error) {
      console.warn('Social Opportunities Clubs API failed, using fallback');
      return fallbackData.clubs;
    }
  },

  async getProjects(lang = 'ru') {
    try {
      const response = await apiRequest(buildApiUrl('/social-opportunities/projects/', { lang }));
      return response.results || response || fallbackData.projects;
    } catch (error) {
      console.warn('Social Opportunities Projects API failed, using fallback');
      return fallbackData.projects;
    }
  }
};

export default socialOpportunitiesService;
