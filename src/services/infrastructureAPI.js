import axios from 'axios';
import API_CONFIG from '../config/api';
import { 
  hospitalsFallbackData, 
  startupsFallbackData, 
  classroomsFallbackData 
} from '../data/infrastructureFallbackData';

const baseURL = API_CONFIG.BASE_URL + '/api/infrastructure';

export const infrastructureAPI = axios.create({
    baseURL,
    timeout: 5000, // Reduced timeout for faster fallback
    headers: {
        'Content-Type': 'application/json',
    },
});

infrastructureAPI.interceptors.request.use((config) => {
    const language = localStorage.getItem('i18nextLng') || 'ru';
    config.params = { ...config.params, lang: language };
    return config;
});

// Classrooms
export const getClassroomsForFrontend = async (language = 'ru') => {
    try {
        const response = await infrastructureAPI.get('/classrooms/frontend/');
        return response;
    } catch (error) {
        console.warn('Using fallback classrooms data');
        return { data: classroomsFallbackData };
    }
};

// Startups
export const getStartupsForFrontend = async (language = 'ru') => {
    try {
        const response = await infrastructureAPI.get('/startups/frontend/');
        return response;
    } catch (error) {
        console.warn('Using fallback startups data');
        return { data: startupsFallbackData };
    }
};

// Hospitals (Generic fetch for component)
export const getHospitals = async () => {
    try {
        const response = await infrastructureAPI.get('/hospitals/');
        return response.data.results || response.data;
    } catch (error) {
        console.warn('Using fallback hospitals data');
        return hospitalsFallbackData;
    }
};

const infrastructureService = {
    getClassroomsForFrontend,
    getStartupsForFrontend,
    getHospitals,
};

export default infrastructureService;