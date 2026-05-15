import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import researchService from '../../services/researchService';

// Константы для переиспользования
const SECTION_CONFIG = {
  all: { icon: '🌟', gradient: 'from-blue-50 to-indigo-50' },
  active: { icon: '🎯', gradient: 'from-green-50 to-emerald-50' },
  upcoming: { icon: '📅', gradient: 'from-blue-50 to-indigo-50' },
  closed: { icon: '✅', gradient: 'from-gray-50 to-slate-50' }
};

const STATUS_CONFIG = {
  active: { color: 'bg-green-100 text-green-800', textKey: 'research.grants.statusLabels.active' },
  upcoming: { color: 'bg-blue-100 text-blue-800', textKey: 'research.grants.statusLabels.upcoming' },
  closed: { color: 'bg-red-100 text-red-800', textKey: 'research.grants.statusLabels.closed' }
};

const Grants = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGrant, setSelectedGrant] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Мемоизированные секции
  const sections = useMemo(() => [
    { id: 'all', name: t('research.grants.tabs.all'), icon: '🌟' },
    { id: 'active', name: t('research.grants.tabs.active'), icon: '🎯' },
    { id: 'upcoming', name: t('research.grants.tabs.upcoming'), icon: '📅' },
    { id: 'closed', name: t('research.grants.tabs.closed'), icon: '✅' }
  ], [t]);

  // Получение данных
  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async (status = 'all') => {
    try {
      setLoading(true);
      let data;

      if (status === 'active') {
        data = await researchService.getActiveGrants(i18n.language);
      } else if (status === 'upcoming') {
        data = await researchService.getUpcomingGrants(i18n.language);
      } else {
        data = await researchService.getGrants(i18n.language);
      }

      setGrants(data);
      setError(null);
    } catch (err) {
      setError(t('research.grants.errorLoading') || 'Ошибка загрузки');
      setGrants([]);
    } finally {
      setLoading(false);
    }
  };

  const changeActiveSection = useCallback((sectionId) => {
    setActiveSection(sectionId);

    const endpointMap = {
      'active': 'grants/active',
      'upcoming': 'grants/upcoming',
      'all': 'grants',
      'closed': 'grants'
    };

    fetchGrants(endpointMap[sectionId]);
  }, []);

  // Helper function for consistent multilingual field access
  const getFieldByLanguage = useCallback((obj, field) => {
    if (!obj) return '';

    const currentLang = i18n.language;
    const langSuffix = currentLang === 'en' ? '_en' : (currentLang === 'ky' || currentLang === 'kg') ? '_kg' : '_ru';

    return obj[`${field}${langSuffix}`] || obj[`${field}_ru`] || obj[field] || '';
  }, [i18n.language]);

  // Мемоизированные отфильтрованные гранты
  const filteredGrants = useMemo(() => {
    if (activeSection === 'all') return grants;
    return grants.filter(grant => grant.status === activeSection);
  }, [grants, activeSection]);

  const getStatusBadge = useCallback((status) => {
    const config = STATUS_CONFIG[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    return { ...config, text: t(config.textKey) || config.text };
  }, [t]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const currentLang = i18n.language;
    const locales = {
      'ru': 'ru-RU',
      'kg': 'ky-KG',
      'ky': 'ky-KG',
      'en': 'en-US'
    };
    return date.toLocaleDateString(locales[currentLang] || 'en-US');
  }, [i18n.language]);

  // Общий компонент карточки гранта
  const GrantCard = ({ grant, variant = 'default' }) => {
    const statusBadge = getStatusBadge(grant.status);
    const sectionConfig = SECTION_CONFIG[activeSection];
    
    const cardClasses = {
      default: "bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg",
      active: "bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg",
      upcoming: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg",
      closed: "bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg"
    };

    return (
      <div className={`${cardClasses[variant]} transition-all duration-300`}>
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
            {statusBadge.text}
          </span>
          <span className={`font-bold text-lg ${
            variant === 'active' ? 'text-green-600' : 
            variant === 'upcoming' ? 'text-blue-600' : 
            variant === 'closed' ? 'text-gray-600' : 'text-blue-600'
          }`}>
            {grant.amount}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {getFieldByLanguage(grant, 'title')}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {variant === 'active' 
            ? `${getFieldByLanguage(grant, 'description')?.substring(0, 150)}...`
            : getFieldByLanguage(grant, 'organization')
          }
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">
              {t('research.grants.organization')}:
            </span>
            <span>{getFieldByLanguage(grant, 'organization')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium mr-2">
              {activeSection === 'upcoming' ? t('research.grants.expectedOpening') :
               activeSection === 'closed' ? t('research.grants.closingDate') : 
               t('research.grants.deadline')}:
            </span>
            <span className={variant === 'active' ? 'text-red-600 font-medium' : ''}>
              {formatDate(grant.deadline)}
            </span>
          </div>
          {grant.duration && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">{t('research.grants.duration')}:</span>
              <span>{grant.duration}</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedGrant(grant)}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
              variant === 'active' ? 'bg-green-500 hover:bg-green-600' :
              variant === 'closed' ? 'bg-gray-500 hover:bg-gray-600' :
              'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {t('research.grants.viewDetails')}
          </button>
          {grant.status === 'active' && (
            <button
              onClick={() => grant.application_url && window.open(grant.application_url, '_blank')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              {t('research.grants.apply')}
            </button>
          )}
        </div>
      </div>
    );
  };

  // Общий компонент секции
  const SectionHeader = ({ section }) => (
    <div className="flex items-center mb-6">
      <div className="p-3 bg-blue-100 rounded-xl mr-4">
        <span className="text-2xl">{SECTION_CONFIG[section].icon}</span>
      </div>
      <h2 className="text-3xl font-bold text-gray-900">
        {t(`research.grants.tabs.${section}`)}
      </h2>
    </div>
  );

  // Рендер контента для разных секций
  const renderSectionContent = (grants, gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3") => (
    <div className="space-y-6">
      <SectionHeader section={activeSection} />
      <div className={`grid ${gridCols} gap-6`}>
        {grants.map((grant) => (
          <GrantCard 
            key={grant.id} 
            grant={grant} 
            variant={activeSection}
          />
        ))}
      </div>
    </div>
  );

  const renderGrantDetail = (grant) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {getFieldByLanguage(grant, 'title')}
          </h2>
        </div>
        <button
          onClick={() => setSelectedGrant(null)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {getFieldByLanguage(grant, 'description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">{t('research.grants.organization')}</h3>
          <p className="text-gray-600">{getFieldByLanguage(grant, 'organization')}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">{t('research.grants.amount')}</h3>
          <p className="text-gray-600">{grant.amount}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">{t('research.grants.deadline')}</h3>
          <p className="text-gray-600">{formatDate(grant.deadline)}</p>
        </div>
      </div>

      {grant.contact && (
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('research.grants.contacts')}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {grant.contact}
            </p>
            {grant.website && (
              <p className="text-gray-600">
                <span className="font-medium">{t('research.grants.website')}:</span> {grant.website}
              </p>
            )}
          </div>
        </div>
      )}

      {grant.status === 'active' && (
        <div className="flex justify-end">
          <button
            onClick={() => grant.application_url && window.open(grant.application_url, '_blank')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            {t('research.grants.apply')}
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (selectedGrant) {
      return renderGrantDetail(selectedGrant);
    }

    const gridConfig = {
      all: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      active: "grid-cols-1 md:grid-cols-2",
      upcoming: "grid-cols-1 md:grid-cols-2", 
      closed: "grid-cols-1 md:grid-cols-2"
    };

    return renderSectionContent(filteredGrants, gridConfig[activeSection]);
  };

  // Подсчет количества грантов по секциям
  const getSectionCount = useCallback((sectionId) => {
    const counts = {
      'all': grants.length,
      'active': grants.filter(grant => grant.status === 'active').length,
      'upcoming': grants.filter(grant => grant.status === 'upcoming').length,
      'closed': grants.filter(grant => grant.status === 'closed').length
    };
    return counts[sectionId];
  }, [grants]);

  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('research.grants.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('research.grants.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{section.icon}</span>
                          {section.name}
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {getSectionCount(section.id)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {filteredGrants.length > 0 ? (
                renderContent()
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('research.grants.noGrants')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;