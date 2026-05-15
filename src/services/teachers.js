import { apiRequest, buildApiUrl } from '../config/api';
import { teachersFallbackData, managementFallbackData } from '../data/teachersFallbackData';

export const getTeachers = async (lang = 'ru') => {
    try {
        const response = await apiRequest(buildApiUrl('/api/teachers/', { lang }));
        return response.results || response || teachersFallbackData;
    } catch (error) {
        console.warn("Error fetching teachers, using fallback:", error);
        return teachersFallbackData;
    }
};

export const getManagement = async (lang = 'ru') => {
    try {
        const response = await apiRequest(buildApiUrl('/api/management/', { lang }));
        return response.results || response || managementFallbackData;
    } catch (error) {
        console.warn("Error fetching management, using fallback:", error);
        return managementFallbackData;
    }
};

const teachersService = {
    getTeachers,
    getManagement
};

export default teachersService;
