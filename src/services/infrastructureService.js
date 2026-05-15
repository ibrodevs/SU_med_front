// Infrastructure API Service
import { apiRequest, buildApiUrl } from '../config/api';
import { 
  hospitalsFallbackData, 
  startupsFallbackData, 
  classroomsFallbackData 
} from '../data/infrastructureFallbackData';

// Infrastructure API endpoints
const INFRASTRUCTURE_ENDPOINTS = {
  CLASSROOMS: {
    FRONTEND: '/api/infrastructure/classrooms/frontend/',
    LIST: '/api/infrastructure/classrooms/',
    CATEGORIES: '/api/infrastructure/classrooms/categories/',
    DETAIL: (id) => `/api/infrastructure/classrooms/${id}/`,
  },
  STARTUPS: {
    FRONTEND: '/api/infrastructure/startups/frontend/',
    LIST: '/api/infrastructure/startups/',
    CATEGORIES: '/api/infrastructure/startups/categories/',
    DETAIL: (id) => `/api/infrastructure/startups/${id}/`,
  },
  HOSPITALS: {
    LIST: '/api/infrastructure/hospitals/',
    DETAIL: (id) => `/api/infrastructure/hospitals/${id}/`,
  },
  ACADEMIC_BUILDINGS: {
    LIST: '/api/infrastructure/academic-buildings/',
    DETAIL: (id) => `/api/infrastructure/academic-buildings/${id}/`,
  },
  LABORATORIES: {
    LIST: '/api/infrastructure/laboratories/',
    DETAIL: (id) => `/api/infrastructure/laboratories/${id}/`,
  },
  DORMITORIES: {
    LIST: '/api/infrastructure/dormitories/',
    DETAIL: (id) => `/api/infrastructure/dormitories/${id}/`,
  }
};

export const getAcademicBuildings = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(INFRASTRUCTURE_ENDPOINTS.ACADEMIC_BUILDINGS.LIST, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('Error fetching academic buildings, returning empty');
    return [];
  }
};

export const getLaboratories = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(INFRASTRUCTURE_ENDPOINTS.LABORATORIES.LIST, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('Error fetching laboratories, returning empty');
    return [];
  }
};

export const getDormitories = async (lang = 'ru') => {
  try {
    const response = await apiRequest(buildApiUrl(INFRASTRUCTURE_ENDPOINTS.DORMITORIES.LIST, { lang }));
    return response.results || response || [];
  } catch (error) {
    console.warn('Error fetching dormitories, returning empty');
    return [];
  }
};

export const getHospitals = async (language = 'ru') => {
    try {
        const response = await apiRequest(
            buildApiUrl(INFRASTRUCTURE_ENDPOINTS.HOSPITALS.LIST, { lang: language })
        );
        return response.results || response || [];
    } catch (error) {
        console.warn('Error fetching hospitals, using fallback:', error);
        return hospitalsFallbackData;
    }
};

export const getHospitalById = async (id, language = 'ru') => {
    try {
        const response = await apiRequest(
            buildApiUrl(INFRASTRUCTURE_ENDPOINTS.HOSPITALS.DETAIL(id), { lang: language })
        );
        return response;
    } catch (error) {
        console.warn('Error fetching hospital details, using fallback:', error);
        return hospitalsFallbackData.find(h => h.id === parseInt(id)) || null;
    }
};

// Classrooms API
export const classroomsAPI = {
  getAllForFrontend: async (lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.FRONTEND, { lang })
      );
      return response;
    } catch (error) {
      console.warn('Error fetching classrooms for frontend, using fallback:', error);
      return classroomsFallbackData;
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.CLASSROOMS.LIST, params)
      );
      return response;
    } catch (error) {
      console.warn('Error fetching classrooms, using fallback:', error);
      return classroomsFallbackData.data.classrooms;
    }
  }
};

// Startups API
export const startupsAPI = {
  getAllForFrontend: async (lang = 'ru') => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.STARTUPS.FRONTEND, { lang })
      );
      return response;
    } catch (error) {
      console.warn('Error fetching startups for frontend, using fallback:', error);
      return startupsFallbackData;
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await apiRequest(
        buildApiUrl(INFRASTRUCTURE_ENDPOINTS.STARTUPS.LIST, params)
      );
      return response;
    } catch (error) {
      console.warn('Error fetching startups, using fallback:', error);
      return startupsFallbackData.data.startups;
    }
  }
};

// Helper functions
const infrastructureHelpers = {
  transformClassroomData: (apiData, currentLanguage = 'ru') => {
    if (!apiData || !apiData.data) return { categories: [], classrooms: [] };
    const { categories = [], classrooms = [] } = apiData.data;
    return {
      categories: categories.map(cat => ({
        id: cat.id, name: cat.name, icon: cat.icon, count: cat.count
      })),
      classrooms: classrooms.map(room => ({
        id: room.id, name: room.name, category: room.category_name, categoryId: room.category,
        description: room.description, capacity: room.capacity, floor: room.floor, size: room.size,
        image: room.image, equipment: room.equipment, features: room.features
      }))
    };
  },

  transformStartupData: (apiData, currentLanguage = 'ru') => {
    if (!apiData || !apiData.data) return { categories: [], startups: [], statistics: {} };
    const { categories = [], startups = [], statistics = {} } = apiData.data;
    return {
      categories: categories.map(cat => ({
        id: cat.id, name: cat.name, icon: cat.icon, count: cat.count
      })),
      startups: startups.map(startup => ({
        id: startup.id, name: startup.name, category: startup.category_name, categoryId: startup.category,
        stage: startup.stage_display, description: startup.description, fullDescription: startup.full_description,
        image: startup.image, team: startup.team, achievements: startup.achievements,
        funding: startup.funding, investors: startup.investors, status: startup.status_display, year: startup.year
      })),
      statistics
    };
  }
};

export { infrastructureHelpers };

export default {
  classroomsAPI,
  startupsAPI,
  infrastructureHelpers,
  INFRASTRUCTURE_ENDPOINTS,
  getHospitals,
  getHospitalById,
  getAcademicBuildings,
  getLaboratories,
  getDormitories,
};