import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  GraduationCap, 
  Building2, 
  Calendar, 
  Mail, 
  Phone, 
  Users 
} from 'lucide-react';
import { leadershipAPI } from '../../services/leadershipService';
import { getLocalizedValue, getLocalizedArray, getCurrentLanguage } from '../../utils/localization';

const LeadershipPage = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('directorate');
  const [leadershipData, setLeadershipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch leadership data
  useEffect(() => {
    const fetchLeadershipData = async () => {
      try {
        setLoading(true);
        const response = await leadershipAPI.getAll();

        // Handle different response structures
        let data = response.data;
        if (data && data.results) {
          data = data.results; // Handle paginated response
        }

        // Ensure data is an array
        if (Array.isArray(data)) {
          setLeadershipData(data);
        } else if (data && typeof data === 'object') {
          setLeadershipData([data]); // Single object response
        } else {
          setLeadershipData([]);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching leadership data:', err);
        setError('Failed to load leadership data');
        setLeadershipData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchLeadershipData();
  }, [i18n.language]); // Добавляем зависимость от языка

  const sections = [
    { id: 'directorate', name: t('leadership.directorate'), icon: Award },
    { id: 'departmentHeads', name: t('leadership.departmentHeads'), icon: GraduationCap },
    { id: 'administration', name: t('leadership.administration'), icon: Building2 }
  ];

  // Filter directors and department heads from API data
  const directors = Array.isArray(leadershipData) ? leadershipData.filter(person => person.is_director === true) : [];
  const departmentHeads = Array.isArray(leadershipData) ? leadershipData.filter(person => person.is_director === false) : [];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderDirectorateContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4 text-blue-600">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('leadership.directorate')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directors.map((director) => (
            <div
              key={director.id}
              className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-md">
                  <img
                    src={director.image_url || "/api/placeholder/300/300"}
                    alt={getLocalizedValue(director, 'name', i18n.language)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {getLocalizedValue(director, 'name', i18n.language)}
                </h3>
                <p className="text-blue-600 font-semibold mb-2">
                  {getLocalizedValue(director, 'position', i18n.language)}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  {getLocalizedValue(director, 'degree', i18n.language)}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2.5 text-blue-500 flex-shrink-0" />
                  <span>{t('leadership.experience')}: {getLocalizedValue(director, 'experience', i18n.language)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2.5 text-blue-500 flex-shrink-0" />
                  <span>{director.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2.5 text-blue-500 flex-shrink-0" />
                  <span>{director.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                  {t('leadership.achievements')}:
                </h4>
                <ul className="space-y-2">
                  {getLocalizedArray(director, 'achievements', i18n.language)?.slice(0, 3).map((achievement, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDepartmentHeadsContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4 text-blue-600">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('leadership.departmentHeads')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentHeads.map((head) => (
            <div
              key={head.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                  <img
                    src={head.image_url || "/api/placeholder/300/300"}
                    alt={getLocalizedValue(head, 'name', i18n.language)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {getLocalizedValue(head, 'name', i18n.language)}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-1">
                    {getLocalizedValue(head, 'position', i18n.language)}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {getLocalizedValue(head, 'department', i18n.language)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-gray-600">
                  <GraduationCap className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                  <span>{getLocalizedValue(head, 'degree', i18n.language)}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                  <span>{t('leadership.experience')}: {getLocalizedValue(head, 'experience', i18n.language)}</span>
                </div>
                {head.staff_count && getLocalizedValue(head, 'staff_count', i18n.language) && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Users className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span>{getLocalizedValue(head, 'staff_count', i18n.language)}</span>
                  </div>
                )}
              </div>

              {head.specialization && getLocalizedValue(head, 'specialization', i18n.language) && (
                <div className="mb-4">
                  <p className="text-xs text-gray-700 font-semibold mb-1">
                    {t('leadership.specialization')}:
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {getLocalizedValue(head, 'specialization', i18n.language)}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center text-xs text-gray-600">
                  <Mail className="w-3.5 h-3.5 mr-2 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{head.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAdministrationContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-red-600">{error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4 text-blue-600">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('leadership.administration')}
          </h2>
        </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('leadership.administrativeStaff')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('leadership.administrativeDescription')}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                <span className="text-gray-700">{t('departments.studyDepartment')}</span>
                <span className="text-blue-600 font-semibold">8 {t('leadership.employees')}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                <span className="text-gray-700">{t('departments.scienceDepartment')}</span>
                <span className="text-blue-600 font-semibold">6 {t('leadership.employees')}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
                <span className="text-gray-700">{t('departments.internationalDepartment')}</span>
                <span className="text-blue-600 font-semibold">4 {t('leadership.employees')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'directorate':
        return renderDirectorateContent();
      case 'departmentHeads':
        return renderDepartmentHeadsContent();
      case 'administration':
        return renderAdministrationContent();
      default:
        return renderDirectorateContent();
    }
  };

  return (
    <div
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('leadership.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] p-4 text-white font-bold text-lg">
                {t('leadership.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeSection === section.id
                          ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        <section.icon className="w-5 h-5 mr-3 text-current flex-shrink-0" />
                        {section.name}
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipPage;