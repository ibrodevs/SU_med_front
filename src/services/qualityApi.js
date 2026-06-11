// API функции для работы с системой менеджмента качества
// Запросы идут через тот же origin (Vite-прокси /proxy-backend), чтобы не упираться в CORS.
import { buildApiUrl } from '../config/api';

const qfetch = async (path, params = {}) => {
  const response = await fetch(buildApiUrl(path, params));
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

/**
 * Получить все данные системы менеджмента качества
 */
export const getQualityManagementSystem = async () => {
  try {
    return await qfetch('/hsm/quality/system/');
  } catch (error) {
    console.error('Ошибка получения данных системы качества:', error);
    throw error;
  }
};

/**
 * Получить настройки системы качества
 */
export const getQualitySettings = async () => {
  try {
    return await qfetch('/hsm/quality/settings/');
  } catch (error) {
    console.error('Ошибка получения настроек системы качества:', error);
    throw error;
  }
};

/**
 * Получить принципы качества
 */
export const getQualityPrinciples = async () => {
  try {
    const data = await qfetch('/hsm/quality/principles/');
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения принципов качества:', error);
    throw error;
  }
};

/**
 * Получить документы качества
 */
export const getQualityDocuments = async (category = null) => {
  try {
    const data = await qfetch('/hsm/quality/documents/', category ? { category } : {});
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения документов качества:', error);
    throw error;
  }
};

/**
 * Получить документы по категориям
 */
export const getQualityDocumentsByCategory = async () => {
  try {
    return await qfetch('/hsm/quality/documents/by_category/');
  } catch (error) {
    console.error('Ошибка получения документов по категориям:', error);
    throw error;
  }
};

/**
 * Получить группы процессов качества
 */
export const getQualityProcessGroups = async () => {
  try {
    const data = await qfetch('/hsm/quality/process-groups/');
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения групп процессов качества:', error);
    throw error;
  }
};

/**
 * Получить процессы качества
 */
export const getQualityProcesses = async (groupId = null) => {
  try {
    const data = await qfetch('/hsm/quality/processes/', groupId ? { group: groupId } : {});
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения процессов качества:', error);
    throw error;
  }
};

/**
 * Получить статистику качества
 */
export const getQualityStatistics = async () => {
  try {
    const data = await qfetch('/hsm/quality/statistics/');
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения статистики качества:', error);
    throw error;
  }
};

/**
 * Получить преимущества качества
 */
export const getQualityAdvantages = async () => {
  try {
    const data = await qfetch('/hsm/quality/advantages/');
    return data.results || data;
  } catch (error) {
    console.error('Ошибка получения преимуществ качества:', error);
    throw error;
  }
};

/**
 * Увеличить счетчик скачиваний документа
 */
export const incrementDocumentDownload = async (documentId) => {
  try {
    const response = await fetch(buildApiUrl(`/hsm/quality/documents/${documentId}/download/`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка увеличения счетчика скачиваний:', error);
    throw error;
  }
};

/**
 * Функция для получения переводов в зависимости от языка
 */
export const getLocalizedField = (item, fieldName, language = 'ru') => {
  if (!item) return '';

  const fieldMap = {
    'ru': fieldName,
    'kg': `${fieldName}_kg`, // Кыргызский язык
    'en': `${fieldName}_en`
  };

  const localizedField = fieldMap[language] || fieldName;
  const result = item[localizedField] || item[fieldName] || '';

  return result;
};
