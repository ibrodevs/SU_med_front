import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2 } from 'lucide-react';
import infrastructureService from '../../services/infrastructureService';
import { hospitalsFallbackData } from '../../data/infrastructureFallbackData';


const Hospitals = () => {
  const { t, i18n } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('departments');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedHospital, setExpandedHospital] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

const fetchHospitals = async () => {
  try {
    setLoading(true);
    setError(null);

    const apiData = await infrastructureService.getHospitals();
    
    if (apiData && apiData.length > 0) {
      setHospitals(apiData);
    } else {
      setHospitals(hospitalsFallbackData);
    }
  } catch (err) {
    console.warn('Hospitals fetch failed, using fallback:', err);
    setHospitals(hospitalsFallbackData);
  } finally {
    setLoading(false);
  }
};




 

  const getCurrentLanguage = () => {
    return ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  };

  // Helper function to get translated field value
  const getTranslatedField = (obj, fieldPrefix) => {
    if (!obj) return '';
    
    const lang = getCurrentLanguage();
    
    // Check for direct field names with language suffix (backend format)
    const directField = `${fieldPrefix}_${lang}`;
    if (obj[directField]) return obj[directField];
    
    // Check for nested object format (legacy mock data)
    if (obj[fieldPrefix] && typeof obj[fieldPrefix] === 'object' && obj[fieldPrefix][lang]) {
      return obj[fieldPrefix][lang];
    }
    
    // Fallback to Russian if current language not available
    const fallbackField = `${fieldPrefix}_ru`;
    if (obj[fallbackField]) return obj[fallbackField];
    
    // Fallback to nested Russian
    if (obj[fieldPrefix] && typeof obj[fieldPrefix] === 'object' && obj[fieldPrefix]['ru']) {
      return obj[fieldPrefix]['ru'];
    }
    
    // Last resort - return the field itself if it's a string
    return obj[fieldPrefix] || '';
  };

  const toggleHospitalDetails = (hospitalId) => {
    if (expandedHospital === hospitalId) {
      setExpandedHospital(null);
      setSelectedHospital(null);
    } else {
      setExpandedHospital(hospitalId);
      setSelectedHospital(hospitalId);
      setActiveTab('departments');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">{t('error', 'Ошибка')}: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button 
            onClick={fetchHospitals}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('retry', 'Попробовать снова')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('hospitals.title', 'Больницы и клиники')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('hospitals.subtitle', 'Клинические базы для практической подготовки студентов-медиков')}
          </p>
          
          {/* Debug info */}
         
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="bg-white rounded-lg p-1 shadow-md flex">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.length}</div>
              <div className="text-sm opacity-90">{t('hospitals.hospitals', 'Больниц')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.reduce((sum, h) => sum + (h.departments?.length || 0), 0)}</div>
              <div className="text-sm opacity-90">{t('hospitals.departments', 'Отделений')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm opacity-90">{t('hospitals.availability', 'Доступность')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.filter(h => h.is_active).length}</div>
              <div className="text-sm opacity-90">{t('hospitals.active', 'Активных')}</div>
            </div>
          </div>
        </div>

        {/* Hospitals Grid/List View */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${expandedHospital === hospital.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className={viewMode === 'list' ? 'flex' : ''}>
                <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                  <div className="relative">
                    <img
                      src={hospital.photo_url || `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(getTranslatedField(hospital, 'name'))}`}
                      alt={getTranslatedField(hospital, 'name')}
                      className={`w-full ${viewMode === 'list' ? 'h-48' : 'h-48'} object-cover`}
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {hospital.departments?.length || 0} {t('hospitals.departmentsShort', 'отд.')}
                    </div>
                  </div>
                </div>
                
                <div className={viewMode === 'list' ? 'w-2/3 p-5' : 'p-5'}>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {getTranslatedField(hospital, 'name')}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {getTranslatedField(hospital, 'description')}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">{getTranslatedField(hospital, 'address')}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleHospitalDetails(hospital.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {expandedHospital === hospital.id
                        ? t('hospitals.hideDetails', 'Скрыть детали')
                        : t('hospitals.showDetails', 'Подробнее')
                      }
                      <svg className={`w-4 h-4 ml-1 transform ${expandedHospital === hospital.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {hospital.contact_phone && (
                      <a 
                        href={`tel:${hospital.contact_phone}`}
                        className="text-gray-500 hover:text-blue-600 flex items-center"
                        title={t('hospitals.call', 'Позвонить')}
                      >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {hospital.contact_phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details - Fixed to properly display */}
              {expandedHospital === hospital.id && (
                <div className="border-t border-gray-100 p-5 animate-fadeIn">
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'departments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('departments')}
                    >
                      {t('hospitals.departments', 'Отделения')}
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('practice')}
                    >
                      {t('hospitals.practice', 'Практика')}
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('info')}
                    >
                      {t('hospitals.info', 'Информация')}
                    </button>
                  </div>

                  {activeTab === 'departments' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {hospital.departments && hospital.departments.length > 0 ? (
                        hospital.departments.map((dept, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start">
                            <Building2 className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800">
                                {getTranslatedField(dept, 'name')}
                              </h4>
                              <p className="text-gray-600 text-sm mt-1">
                                {getTranslatedField(dept, 'description')}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 text-center py-8">
                          <p className="text-gray-500">{t('hospitals.noDepartments', 'Информация об отделениях не доступна')}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'practice' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.practiceOpportunities', 'Возможности для практики')}
                        </h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700">
                            {getTranslatedField(hospital, 'practice_opportunities') ||
                              t('hospitals.defaultPractice', 'Возможности для практики в данной больнице')}
                          </p>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            {t('hospitals.practiceFeatures', 'Особенности практики')}
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature1', 'Работа с реальными пациентами')}
                            </li>
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature2', 'Наблюдение операций')}
                            </li>
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature3', 'Супервизия опытных врачей')}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.specialties', 'Специализации')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {hospital.specialties && hospital.specialties.length > 0 ? (
                            hospital.specialties.map((specialty, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                {specialty}
                              </span>
                            ))
                          ) : (
                            <div className="text-gray-500">
                              {t('hospitals.noSpecialties', 'Информация о специализациях не доступна')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'info' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.contactInfo', 'Контактная информация')}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{getTranslatedField(hospital, 'address')}</span>
                          </div>
                          {hospital.contact_phone && (
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span>{hospital.contact_phone}</span>
                            </div>
                          )}
                          {hospital.contact_email && (
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span>{hospital.contact_email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.statistics', 'Статистика')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-blue-600">{hospital.departments?.length || 0}</div>
                            <div className="text-sm text-gray-600">{t('hospitals.departments', 'Отделений')}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-green-600">{hospital.is_active ? t('hospitals.active', 'Активна') : t('hospitals.inactive', 'Неактивна')}</div>
                            <div className="text-sm text-gray-600">{t('hospitals.status', 'Статус')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Practice Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">
              {t('hospitals.practiceInfo', 'Информация о практике')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('hospitals.schedule', 'График практики')}
                </h3>
                <p>{t('hospitals.scheduleText', 'Практика проводится согласно учебному плану, обычно 4-6 часов в день')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t('hospitals.requirements', 'Требования')}
                </h3>
                <p>{t('hospitals.requirementsText', 'Медицинская книжка, белый халат, сменная обувь, студенческий билет')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('hospitals.duration', 'Продолжительность')}
                </h3>
                <p>{t('hospitals.durationText', 'От 2 недель до 2 месяцев в зависимости от курса и специализации')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t('hospitals.coordination', 'Координация')}
                </h3>
                <p>{t('hospitals.coordinationText', 'Практика организуется деканатом совместно с администрацией больниц')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Hospitals;