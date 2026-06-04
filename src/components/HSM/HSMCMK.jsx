import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Star, FolderOpen, RefreshCw, BarChart3, AlertTriangle } from 'lucide-react';
import {
  getQualityManagementSystem,
  incrementDocumentDownload,
  getLocalizedField
} from '../../services/qualityApi';

const HSMCMK = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загрузка данных с API
  useEffect(() => {
    const fetchQualityData = async () => {
      try {
        setLoading(true);
        const data = await getQualityManagementSystem();
        setQualityData(data);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки данных системы качества:', err);
        setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };

    fetchQualityData();
  }, []);

  // Получить текущий язык
  const getCurrentLanguage = () => {
    const lang = i18n.language;

    // Проверяем различные варианты кода языка
    if (lang === 'kg' || lang.startsWith('kg')) {
      return 'kg'; // Кыргызский язык
    }
    if (lang === 'en' || lang.startsWith('en')) {
      return 'en';
    }
    return 'ru';
  };

  const sections = [
    { id: 'about', name: t('smk.tabs.about'), icon: ClipboardList },
    { id: 'principles', name: t('smk.tabs.principles'), icon: Star },
    { id: 'documents', name: t('smk.tabs.documents'), icon: FolderOpen },
    { id: 'processes', name: t('smk.tabs.processes'), icon: RefreshCw },
    { id: 'statistics', name: t('smk.statistics.title'), icon: BarChart3 }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleDocumentDownload = async (document) => {
    try {
      await incrementDocumentDownload(document.id);
      // Если есть файл или внешняя ссылка, открываем его
      if (document.file_url || document.external_url) {
        window.open(document.file_url || document.external_url, '_blank');
      }
    } catch (error) {
      console.error('Ошибка при скачивании документа:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4"><AlertTriangle className="w-16 h-16 mx-auto" /></div>
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  const renderAboutContent = () => {
    const settings = qualityData?.settings;
    const advantages = qualityData?.advantages || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <ClipboardList className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('smk.about.title')}
          </h2>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          {settings && (
            <p>{getLocalizedField(settings, 'about_text', currentLang)}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('smk.about.advantages')}</h3>
            <ul className="space-y-3">
              {advantages.map((advantage) => (
                <li key={advantage.id} className="flex items-center text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {getLocalizedField(advantage, 'title', currentLang)}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {settings?.iso_standard || 'ISO 9001:2015'}
              </div>
              <div className="text-sm text-gray-600">{t('smk.about.standard')}</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {settings?.compliance_percentage || '100%'}
              </div>
              <div className="text-sm text-gray-600">{t('smk.about.compliance')}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPrinciplesContent = () => {
    const principles = qualityData?.principles || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <Star className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('smk.principles.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-[#0A2647]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {getLocalizedField(principle, 'title', currentLang)}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {getLocalizedField(principle, 'description', currentLang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderDocumentsContent = () => {
    const documents = qualityData?.documents || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <FolderOpen className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('smk.documents.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('smk.documents.downloads')}</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 hover:shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${doc.document_type === 'pdf' ? 'bg-rose-600' : 'bg-blue-500'
                      } flex items-center justify-center text-white font-bold text-sm`}>
                      {doc.document_type_display || doc.document_type.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {getLocalizedField(doc, 'title', currentLang)}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <span>{doc.formatted_date}</span>
                        <span>{doc.file_size}</span>
                        <span>v{doc.version}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    onClick={() => handleDocumentDownload(doc)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('smk.documents.download')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProcessesContent = () => {
    const processGroups = qualityData?.process_groups || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <RefreshCw className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('smk.processes.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><RefreshCw className="w-5 h-5 text-[#0A2647]" /></div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {getLocalizedField(group, 'title', currentLang)}
                </h3>
              </div>
              <ul className="space-y-3">
                {group.processes?.map((process) => (
                  <li key={process.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">
                      {getLocalizedField(process, 'title', currentLang)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStatisticsContent = () => {
    const statistics = qualityData?.statistics || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <BarChart3 className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('smk.statistics.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 border border-blue-100 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {getLocalizedField(stat, 'title', currentLang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return renderAboutContent();
      case 'principles':
        return renderPrinciplesContent();
      case 'documents':
        return renderDocumentsContent();
      case 'processes':
        return renderProcessesContent();
      case 'statistics':
        return renderStatisticsContent();
      default:
        return renderAboutContent();
    }
  };

  const settings = qualityData?.settings;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {settings ?
              getLocalizedField(settings, 'title', getCurrentLanguage()) :
              t('smk.hero.title')
            }
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {settings ?
              getLocalizedField(settings, 'description', getCurrentLanguage()) :
              t('smk.hero.description')
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] p-4 text-white font-bold text-lg">
                {t('smk.sections')}
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
                        <section.icon className="w-5 h-5 mr-3" />
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

export default HSMCMK;