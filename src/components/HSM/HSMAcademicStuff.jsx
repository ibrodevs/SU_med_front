import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';
import {
  GraduationCap,
  Users,
  Search,
  X,
  Mail,
  Phone,
  Building2,
  Eye,
  XCircle
} from 'lucide-react';

const FacultyCard = ({ faculty, language, onViewDetails }) => {
  const { t } = useTranslation();

  // Helper function to get localized value from API data
  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';

    if (language === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (language === 'kg' && item[`${fieldName}_kg`]) {
      return item[`${fieldName}_kg`];
    }
    return item[fieldName] || '';
  };

  const getName = () => {
    // Try to get full_name first, then construct from parts
    if (faculty.full_name) {
      return getLocalizedField(faculty, 'full_name');
    }

    switch (language) {
      case 'kg':
        return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
      case 'en':
        return `${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'last_name')}`.trim();
      default:
        return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
    }
  };

  const getPosition = () => {
    return getLocalizedField(faculty, 'position') || faculty.position_display;
  };

  const getAcademicDegree = () => {
    return getLocalizedField(faculty, 'academic_degree') || faculty.academic_degree_display;
  };

  const getAcademicTitle = () => {
    return getLocalizedField(faculty, 'academic_title');
  };

  const getSpecialization = () => {
    return getLocalizedField(faculty, 'specialization');
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <SafeImage
            src={faculty.photo_url || faculty.photo}
            alt={getName()}
            className="w-16 h-16 rounded-full object-cover mr-4"
            fallback={
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-700 font-bold text-xl mr-4">
                <Users className="w-8 h-8 text-[#144272]" />
              </div>
            }
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 mb-1">
              {getName()}
            </h3>
            <p className="text-[#144272] text-sm font-medium">
              {getPosition()}
            </p>
            {getAcademicTitle() && (
              <p className="text-[#2C7865] text-xs">
                {getAcademicTitle()}
              </p>
            )}
          </div>
        </div>

        {getAcademicDegree() && (
          <div className="mb-4">
            <span className="text-xs font-medium bg-teal-50 text-[#1B4242] px-2 py-1 rounded-full flex items-center w-fit">
              <GraduationCap className="w-3 h-3 mr-1" />
              {getAcademicDegree()}
            </span>
          </div>
        )}

        {/* Кнопка подробнее */}
        <button
          onClick={() => onViewDetails && onViewDetails(faculty)}
          className="w-full bg-gradient-to-r from-[#0A2647] to-[#144272] text-white py-2 px-4 rounded-lg hover:from-[#144272] hover:to-[#205295] transition-all duration-300 flex items-center justify-center font-medium"
        >
          <Eye className="w-4 h-4 mr-2" />
          {t('hsm.view_details', 'Подробнее')}
        </button>
      </div>
    </div>
  );
};

const FacultyDetailModal = ({ faculty, language, isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen || !faculty) return null;

  // Helper function to get localized value from API data
  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';

    if (language === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (language === 'kg' && item[`${fieldName}_kg`]) {
      return item[`${fieldName}_kg`];
    }
    return item[fieldName] || '';
  };

  const getName = () => {
    if (faculty.full_name) {
      return getLocalizedField(faculty, 'full_name');
    }

    switch (language) {
      case 'kg':
        return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
      case 'en':
        return `${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'last_name')}`.trim();
      default:
        return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
    }
  };

  const getPosition = () => {
    return getLocalizedField(faculty, 'position') || faculty.position_display;
  };

  const getAcademicDegree = () => {
    return getLocalizedField(faculty, 'academic_degree') || faculty.academic_degree_display;
  };

  const getAcademicTitle = () => {
    return getLocalizedField(faculty, 'academic_title');
  };

  const getBio = () => {
    return getLocalizedField(faculty, 'bio');
  };

  const getSpecialization = () => {
    return getLocalizedField(faculty, 'specialization');
  };

  const getEducation = () => {
    return getLocalizedField(faculty, 'education');
  };

  const getExperience = () => {
    return getLocalizedField(faculty, 'experience');
  };

  const getPublications = () => {
    return getLocalizedField(faculty, 'publications');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >

      {/* Modal wrapper */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal */}
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] px-6 py-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {t('hsm.faculty_details', 'Информация о преподавателе')}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-1"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {/* Faculty info header */}
            <div className="flex flex-col md:flex-row items-start mb-6 pb-6 border-b border-gray-200">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <SafeImage
                  src={faculty.photo_url || faculty.photo}
                  alt={getName()}
                  className="w-32 h-32 rounded-lg object-cover"
                  fallback={
                    <div className="w-32 h-32 bg-slate-200 rounded-lg flex items-center justify-center text-slate-700">
                      <Users className="w-16 h-16 text-[#144272]" />
                    </div>
                  }
                />
              </div>

              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  {getName()}
                </h4>

                <div className="space-y-2">
                  <p className="text-[#144272] font-medium text-lg">
                    {getPosition()}
                  </p>

                  {getAcademicDegree() && (
                    <div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-50 text-[#1B4242]">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {getAcademicDegree()}
                      </span>
                    </div>
                  )}

                  {getAcademicTitle() && (
                    <p className="text-[#2C7865] font-medium">
                      {getAcademicTitle()}
                    </p>
                  )}
                </div>

                {/* Contact info */}
                <div className="mt-4 space-y-2">
                  {faculty.email && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-[#144272]" />
                      <a href={`mailto:${faculty.email}`} className="hover:text-blue-600 transition-colors">
                        {faculty.email}
                      </a>
                    </div>
                  )}

                  {faculty.phone && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-[#2C7865]" />
                      <a href={`tel:${faculty.phone}`} className="hover:text-green-600 transition-colors">
                        {faculty.phone}
                      </a>
                    </div>
                  )}

                  {faculty.office && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="w-4 h-4 mr-2 text-[#205295]" />
                      <span>{faculty.office}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details sections */}
            <div className="space-y-6">
              {getBio() && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('hsm.biography', 'Биография')}
                  </h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {getBio()}
                  </div>
                </div>
              )}

              {getSpecialization() && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('hsm.specialization', 'Специализация')}
                  </h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {getSpecialization()}
                  </div>
                </div>
              )}

              {getEducation() && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('hsm.education', 'Образование')}
                  </h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {getEducation()}
                  </div>
                </div>
              )}

              {getExperience() && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('hsm.experience', 'Опыт работы')}
                  </h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {getExperience()}
                  </div>
                </div>
              )}

              {getPublications() && (
                <div>
                  <h5 className="text-lg font-semibold text-gray-900 mb-3">
                    {t('hsm.publications', 'Публикации')}
                  </h5>
                  <div className="text-gray-700 whitespace-pre-line">
                    {getPublications()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('common.close', 'Закрыть')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HSMAcademicStuff = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [facultyByPosition, setFacultyByPosition] = useState({});
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activePosition, setActivePosition] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to get localized value from API data
  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';

    const currentLang = i18n.language;
    if (currentLang === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (currentLang === 'kg' && item[`${fieldName}_kg`]) {
      return item[`${fieldName}_kg`];
    }
    return item[fieldName] || '';
  };

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching faculty data...');

        // First get all faculty data
        const facultyResponse = await hsmService.getFaculty();
        console.log('Faculty response:', facultyResponse);

        // Handle response structure - it might be paginated
        let facultyList = [];
        if (Array.isArray(facultyResponse)) {
          facultyList = facultyResponse;
        } else if (facultyResponse && facultyResponse.results) {
          facultyList = facultyResponse.results;
        } else if (facultyResponse && typeof facultyResponse === 'object') {
          facultyList = [facultyResponse];
        }

        console.log('Processed faculty list:', facultyList);
        setAllFaculty(facultyList);

        // Try to get faculty by position, but if it fails, group manually
        try {
          const byPositionResponse = await hsmService.getFacultyByPosition();
          console.log('Faculty by position response:', byPositionResponse);
          setFacultyByPosition(byPositionResponse || {});
        } catch (positionError) {
          console.log('Faculty by position endpoint failed, grouping manually:', positionError);
          // Group faculty by position manually
          const grouped = facultyList.reduce((acc, faculty) => {
            const position = faculty.position || 'other';
            if (!acc[position]) {
              acc[position] = {
                name: faculty.position_display || faculty.position || 'Другие',
                name_en: faculty.position_en || faculty.position_display || faculty.position || 'Others',
                name_kg: faculty.position_kg || faculty.position_display || faculty.position || 'Башкалар',
                faculty: []
              };
            }
            acc[position].faculty.push(faculty);
            return acc;
          }, {});
          setFacultyByPosition(grouped);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError(err.message || String(err));
        // Set empty data on error
        setAllFaculty([]);
        setFacultyByPosition({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get positions list for navigation
  const positionsList = Object.keys(facultyByPosition).map(code => {
    const group = facultyByPosition[code];
    if (!group) return null;

    return {
      id: code,
      name: getLocalizedField(group, 'name'),
      count: Array.isArray(group.faculty) ? group.faculty.length : 0
    };
  }).filter(Boolean); // Remove null entries

  // Add "All" option
  const allPositionsList = [
    { id: 'all', name: t('hsm.all_positions', 'Все должности'), count: allFaculty.length },
    ...positionsList
  ];

  // Get current position data
  const getCurrentPositionData = () => {
    if (activePosition === 'all') {
      return {
        title: t('hsm.all_faculty', 'Весь преподавательский состав'),
        description: t('hsm.all_faculty_description', 'Все преподаватели Высшей медицинской школы'),
        faculty: Array.isArray(allFaculty) ? allFaculty : []
      };
    }

    const group = facultyByPosition[activePosition];
    if (!group) return { title: '', description: '', faculty: [] };

    return {
      title: getLocalizedField(group, 'name'),
      description: t('hsm.position_description', 'Преподаватели данной категории'),
      faculty: Array.isArray(group.faculty) ? group.faculty : []
    };
  };

  const currentPositionData = getCurrentPositionData();

  // Filter faculty based on search
  const filteredFaculty = currentPositionData.faculty.filter(faculty => {
    if (!search) return true;

    // Helper to get faculty name for search
    const getFacultyName = (faculty) => {
      // Try to get full_name first, then construct from parts
      if (faculty.full_name) {
        return getLocalizedField(faculty, 'full_name');
      }

      const currentLang = i18n.language;
      switch (currentLang) {
        case 'kg':
          return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
        case 'en':
          return `${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'last_name')}`.trim();
        default:
          return `${getLocalizedField(faculty, 'last_name')} ${getLocalizedField(faculty, 'first_name')} ${getLocalizedField(faculty, 'middle_name')}`.trim();
      }
    };

    const name = getFacultyName(faculty).toLowerCase();
    const query = search.toLowerCase();

    return name.includes(query);
  });

  // Функции для модального окна
  const handleViewDetails = (faculty) => {
    setSelectedFaculty(faculty);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFaculty(null);
  };

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("hsm.loading_error", "Ошибка загрузки данных")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("hsm.refresh_page", "Обновить страницу")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("hsm.faculty_title", "Профессорско-преподавательский состав")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("hsm.faculty_description", "Высококвалифицированные преподаватели и исследователи Высшей медицинской школы")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] p-4 text-white font-bold text-lg">
                {t("hsm.positions", "Должности")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {allPositionsList.map((position) => (
                    <li key={position.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center ${activePosition === position.id
                          ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => {
                          setActivePosition(position.id);
                          setSearch('');
                        }}
                      >
                        <span>{position.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {position.count}
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
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentPositionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentPositionData.description}
                </p>
              </div>

              {/* Поиск */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('hsm.search_faculty', 'Поиск преподавателей...')}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Результаты */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.faculty_members", "Преподаватели")}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {t("hsm.results_count", "Найдено {{count}} преподавателей", { count: filteredFaculty.length })}
                  </span>
                </div>

                {filteredFaculty.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                      {filteredFaculty.map((faculty, index) => (
                        <motion.div
                          key={faculty.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <FacultyCard
                            faculty={faculty}
                            language={i18n.language}
                            onViewDetails={handleViewDetails}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {t("hsm.no_faculty_found", "Преподаватели не найдены")}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {search
                        ? t("hsm.try_different_search", "Попробуйте изменить поисковый запрос")
                        : t("hsm.no_faculty_in_category", "В этой категории пока нет преподавателей")
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно с детальной информацией */}
      <FacultyDetailModal
        faculty={selectedFaculty}
        language={i18n.language}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default HSMAcademicStuff;