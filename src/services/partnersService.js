import { buildApiUrl, apiRequest } from '../config/api';
import API_CONFIG from '../config/api';

/**
 * Partners API Service
 * Provides methods to interact with the partners backend
 */
class PartnersService {
  
  /**
   * Fetch all partners (alias for getPartners for compatibility)
   * @param {string} language - Language code (ru, en, ky)
   * @returns {Promise<Array>} Partners array
   */
  static async getAllPartners(language = 'ru') {
    try {
      const endpoint = API_CONFIG.ENDPOINTS.ABOUT_SECTION.PARTNERS_FRONTEND;
      // buildApiUrl handles the base URL and query params
      const url = buildApiUrl(endpoint, { lang: language });
      
      const response = await fetch(url, {
        headers: {
          ...API_CONFIG.DEFAULT_HEADERS,
          'Accept-Language': language,
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data || data.partners || data;
    } catch (error) {
      console.warn('Error fetching partners from API, using fallback data:', error);
      const { partnersFallbackData } = await import('../data/aboutFallbackData');
      return partnersFallbackData;
    }
  }
  
  /**
   * Fetch all active partners with optional language support
   * @param {string} language - Language code (ru, en, ky)
   * @returns {Promise<Object>} Partners data
   */
  static async getPartners(language = 'ru') {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.ABOUT_SECTION.PARTNERS_FRONTEND, {
      lang: language
    });
    
    return await apiRequest(url, {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        'Accept-Language': language,
      }
    });
  }
  
  /**
   * Fetch about section with partners data
   * @param {string} language - Language code (ru, en, ky)
   * @returns {Promise<Object>} Combined about section and partners data
   */
  static async getAboutWithPartners(language = 'ru') {
    const url = buildApiUrl(API_CONFIG.ENDPOINTS.ABOUT_SECTION.ABOUT_WITH_PARTNERS, {
      lang: language
    });
    
    return await apiRequest(url, {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        'Accept-Language': language,
      }
    });
  }
  
  /**
   * Fetch single partner details
   * @param {number} id - Partner ID
   * @param {string} language - Language code (ru, en, ky)
   * @returns {Promise<Object>} Partner data
   */
  static async getPartner(id, language = 'ru') {
    const url = buildApiUrl(`${API_CONFIG.ENDPOINTS.ABOUT_SECTION.PARTNERS}${id}/`, {
      lang: language
    });
    
    return await apiRequest(url, {
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        'Accept-Language': language,
      }
    });
  }
  
  /**
   * Get fallback partners data for offline use
   * @returns {Array} Hardcoded partners data
   */
  static getFallbackPartners() {
    return [
      { 
        id: 1, 
        nameKey: 'partners.nationalHospital', 
        name: 'National Hospital',
        icon: '🏥', 
        color: 'from-blue-500 to-indigo-600',
        glow: 'hover:shadow-blue-500/50',
        order: 1,
        description: 'Leading medical organization'
      },
      { 
        id: 2, 
        nameKey: 'partners.cityHospital', 
        name: 'City Hospital',
        icon: '🏨', 
        color: 'from-purple-500 to-pink-600',
        glow: 'hover:shadow-purple-500/50',
        order: 2,
        description: 'Main city medical hospital'
      },
      { 
        id: 3, 
        nameKey: 'partners.medicalCenters', 
        name: 'Medical Centers',
        icon: '⛑️', 
        color: 'from-green-500 to-teal-600',
        glow: 'hover:shadow-green-500/50',
        order: 3,
        description: 'Network of specialized medical centers'
      },
      { 
        id: 4, 
        nameKey: 'partners.who', 
        name: 'World Health Organization',
        icon: '🌐', 
        color: 'from-amber-500 to-orange-600',
        glow: 'hover:shadow-amber-500/50',
        order: 4,
        description: 'International health organization'
      },
      { 
        id: 5, 
        nameKey: 'partners.redCross', 
        name: 'Red Cross',
        icon: '➕', 
        color: 'from-red-500 to-rose-600',
        glow: 'hover:shadow-red-500/50',
        order: 5,
        description: 'International humanitarian organization'
      },
      { 
        id: 6, 
        nameKey: 'partners.medicalAssociation', 
        name: 'Medical Association',
        icon: '⚕️', 
        color: 'from-indigo-500 to-blue-600',
        glow: 'hover:shadow-indigo-500/50',
        order: 6,
        description: 'Professional medical association'
      },
      { 
        id: 7, 
        nameKey: 'partners.healthInstitute', 
        name: 'Health Institute',
        icon: '🔬', 
        color: 'from-pink-500 to-rose-600',
        glow: 'hover:shadow-pink-500/50',
        order: 7,
        description: 'Health research institute'
      },
      { 
        id: 8, 
        nameKey: 'partners.researchFoundation', 
        name: 'Research Foundation',
        icon: '💉', 
        color: 'from-teal-500 to-emerald-600',
        glow: 'hover:shadow-teal-500/50',
        order: 8,
        description: 'Medical research foundation'
      },
    ];
  }
  
  /**
   * Get partners with fallback handling
   * @param {string} language - Language code
   * @returns {Promise<Object>} Partners data with error handling
   */
  static async getPartnersWithFallback(language = 'ru') {
    try {
      const data = await this.getAboutWithPartners(language);
      return {
        success: true,
        partners: data.partners || [],
        aboutSection: data.about_section,
        source: 'api'
      };
    } catch (error) {
      console.error('Failed to fetch partners from API, using fallback:', error);
      return {
        success: false,
        partners: this.getFallbackPartners(),
        aboutSection: null,
        source: 'fallback',
        error: error.message
      };
    }
  }
}

export default PartnersService;
