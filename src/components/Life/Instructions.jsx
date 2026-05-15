import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import studentLifeService from '../../services/studentLifeService';
import {
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  ShareIcon,
  ClockIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const Instructions = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [savedGuides, setSavedGuides] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [instructionsData, setInstructionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to get localized value from API data
  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';

    const currentLang = i18n.language;
    if (currentLang === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (currentLang === 'ky' && item[`${fieldName}_kg`]) {
      return item[`${fieldName}_kg`];
    }
    return item[`${fieldName}_ru`] || item[fieldName] || '';
  };

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch instructions data
  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        setLoading(true);
        console.log('Fetching instructions data...');

        const data = await studentLifeService.getInstructions(i18n.language);
        console.log('Processed instructions data:', data);
        setInstructionsData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching instructions:', err);
        setError(err.message || String(err));
        setInstructionsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructions();
  }, [i18n.language]);

  // Загрузка сохраненных инструкций из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedGuides');
    if (saved) {
      setSavedGuides(JSON.parse(saved));
    }
  }, []);

  // Сохранение инструкций в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('savedGuides', JSON.stringify(savedGuides));
  }, [savedGuides]);

  const sections = [
    { id: 'all', name: t('studentLife.instructions.allInstructions'), icon: '📋' },
    { id: 'academic', name: t('studentLife.instructions.academic'), icon: '🎓' },
    { id: 'administrative', name: t('studentLife.instructions.administrative'), icon: '🏢' },
    { id: 'documents', name: t('studentLife.instructions.documents'), icon: '📄' },
    { id: 'financial', name: t('studentLife.instructions.financial'), icon: '💰' },
    { id: 'appeals', name: t('studentLife.instructions.appeals'), icon: '📝' },
    { id: 'saved', name: t('studentLife.instructions.savedInstructions'), icon: '⭐' }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const toggleSaveGuide = (guideId) => {
    if (savedGuides.includes(guideId)) {
      setSavedGuides(savedGuides.filter(id => id !== guideId));
    } else {
      setSavedGuides([...savedGuides, guideId]);
    }
  };

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'CalendarDaysIcon': CalendarDaysIcon,
      'UserGroupIcon': UserGroupIcon,
      'ClipboardDocumentListIcon': ClipboardDocumentListIcon,
      'DocumentTextIcon': DocumentTextIcon,
      'AcademicCapIcon': DocumentTextIcon,
      'BuildingOfficeIcon': DocumentTextIcon
    };
    return iconMap[iconName] || DocumentTextIcon;
  };

  const filteredInstructions = activeSection === 'saved'
    ? instructionsData.filter(guide => savedGuides.includes(guide.id))
    : activeSection === 'all'
      ? instructionsData
      : instructionsData.filter(guide => guide.category === activeSection);

  const renderAllInstructionsContent = () => {
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
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("studentLife.instructions.loadingError", "Ошибка загрузки данных")}
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("studentLife.instructions.refreshPage", "Обновить страницу")}
          </button>
        </div>
      );
    }

    if (filteredInstructions.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t("studentLife.instructions.noInstructionsFound", "Инструкции не найдены")}
          </h3>
          <p className="text-gray-600">
            {activeSection === 'saved'
              ? t("studentLife.instructions.noSavedInstructions", "У вас нет сохраненных инструкций")
              : t("studentLife.instructions.noInstructionsInCategory", "В этой категории пока нет инструкций")
            }
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {activeSection === 'all'
              ? t('studentLife.instructions.allInstructions')
              : sections.find(s => s.id === activeSection)?.name || t('studentLife.instructions.allInstructions')
            }
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInstructions.map((instruction) => {
            const IconComponent = getIconComponent(instruction.icon);
            return (
              <div
                key={instruction.id}
                className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {getLocalizedField(instruction, 'title')}
                      </h3>
                      <div className="flex items-center text-sm text-blue-600 mt-1">
                        <span className="bg-blue-100 px-2 py-1 rounded-full">
                          {instruction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleSaveGuide(instruction.id)}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    {savedGuides.includes(instruction.id) ? (
                      <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {getLocalizedField(instruction, 'description')}
                </p>

                <div className="space-y-3 mb-4">
                  {getLocalizedField(instruction, 'estimated_time') && (
                    <div className="flex items-center text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span>{t('studentLife.instructions.estimatedTime')}: {getLocalizedField(instruction, 'estimated_time')}</span>
                    </div>
                  )}
                  {getLocalizedField(instruction, 'contact_info') && (
                    <div className="flex items-center text-sm text-gray-600">
                      <PhoneIcon className="w-4 h-4 mr-2" />
                      <span>{getLocalizedField(instruction, 'contact_info')}</span>
                    </div>
                  )}
                </div>

                {instruction.requirements && instruction.requirements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {t('studentLife.instructions.requirements')}:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {instruction.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{getLocalizedField(req, 'text')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {instruction.steps && instruction.steps.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {instruction.steps.slice(0, 2).map((step, index) => (
                      <div key={index} className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                              {step.step_number}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{getLocalizedField(step, 'title')}</span>
                          </div>
                          {getLocalizedField(step, 'timeframe') && (
                            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                              {getLocalizedField(step, 'timeframe')}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {instruction.steps.length > 2 && (
                      <div className="text-center">
                        <span className="text-sm text-blue-600">
                          +{instruction.steps.length - 2} {t('studentLife.instructions.moreSteps', 'больше шагов')}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderInstructionDetail = (instruction) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            {(() => {
              const IconComponent = getIconComponent(instruction.icon);
              return <IconComponent className="w-6 h-6 text-blue-600" />;
            })()}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {getLocalizedField(instruction, 'title')}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleSaveGuide(instruction.id)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            {savedGuides.includes(instruction.id) ? (
              <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <BookmarkIcon className="w-5 h-5 text-blue-600" />
            )}
          </button>
          <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
            <ShareIcon className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {getLocalizedField(instruction, 'description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
            {t('studentLife.instructions.requirements')}
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {instruction.requirements?.map((req, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                <span>{getLocalizedField(req, 'text')}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
            {t('studentLife.instructions.timeframe')}
          </h3>
          <p className="text-sm text-gray-600">
            {getLocalizedField(instruction, 'estimated_time')}
          </p>
          {getLocalizedField(instruction, 'max_duration') && (
            <p className="text-sm text-gray-500 mt-2">
              <strong>{t('studentLife.instructions.maxDuration')}:</strong> {getLocalizedField(instruction, 'max_duration')}
            </p>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <PhoneIcon className="w-5 h-5 text-indigo-500 mr-2" />
            {t('studentLife.instructions.contacts')}
          </h3>
          <p className="text-sm text-gray-600">
            {getLocalizedField(instruction, 'contact_info')}
          </p>
        </div>
      </div>

      {instruction.steps && instruction.steps.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            {t('studentLife.instructions.steps')}
          </h3>
          {instruction.steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                    {step.step_number}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {getLocalizedField(step, 'title')}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {getLocalizedField(step, 'description')}
                    </p>
                  </div>
                </div>
                {getLocalizedField(step, 'timeframe') && (
                  <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {getLocalizedField(step, 'timeframe')}
                  </span>
                )}
              </div>

              {step.details && step.details.length > 0 && (
                <div className="pl-12">
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                        <span>{getLocalizedField(detail, 'text')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
        <div className="flex items-start">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              {t('studentLife.instructions.importantNotes')}
            </h3>
            <ul className="text-yellow-700 space-y-2 text-sm">
              <li>• {t('studentLife.instructions.notes.0')}</li>
              <li>• {t('studentLife.instructions.notes.1')}</li>
              <li>• {t('studentLife.instructions.notes.2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    // For simplicity, showing first instruction as detail view
    // In real app, you would manage selected instruction state
    const selectedInstruction = filteredInstructions[0];

    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (selectedInstruction && activeSection !== 'saved' && !error) {
      return renderInstructionDetail(selectedInstruction);
    }

    return renderAllInstructionsContent();
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('studentLife.instructions.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('studentLife.instructions.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('studentLife.instructions.categories')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const sectionCount = section.id === 'saved'
                      ? savedGuides.length
                      : section.id === 'all'
                        ? instructionsData.length
                        : instructionsData.filter(guide => guide.category === section.id).length;

                    return (
                      <li key={section.id}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${activeSection === section.id
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
                            {sectionCount}
                          </span>
                        </button>
                      </li>
                    );
                  })}
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

export default Instructions;
