import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const publicationsApi = {
  // Получение публикаций с фильтрами
  getPublications: (params) => api.get('/publications/', { params }),
  
  // Получение одной публикации
  getPublication: (id) => api.get(`/publications/${id}/`),
  
  // Создание публикации
  createPublication: (data) => api.post('/publications/', data),
  
  // Обновление публикации
  updatePublication: (id, data) => api.put(`/publications/${id}/`, data),
  
  // Удаление публикации
  deletePublication: (id) => api.delete(`/publications/${id}/`),
};

export const researchCentersApi = {
  // Получение центров
  getResearchCenters: () => api.get('/research-centers/'),
};

export default api;