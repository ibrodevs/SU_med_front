import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BookOpen, Microscope, BarChart3, Video, Monitor, FileText } from 'lucide-react';

const Resources = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Resources data organized by sections
  const sectionsData = {
    all: {
      title: t('resources.allTitle', 'Все образовательные ресурсы'),
      description: t('resources.allDesc', 'Полный доступ ко всем доступным образовательным ресурсам'),
      resources: [
        {
          id: 1,
          icon: BookOpen,
          key: 'library',
          link: 'https://su-e-library.vercel.app/',
          status: 'online',
          section: 'library',
          color: 'from-[#0A2647] to-[#144272]',
          bgColor: 'bg-blue-50 border-blue-200',
          title: t('resources.libTitle', 'Электронная библиотека'),
          description: t('resources.libDesc', 'Доступ к учебной литературе и научным публикациям'),
          features: [
            t('resources.libFeature1', '10,000+ электронных книг'),
            t('resources.libFeature2', 'Научные журналы'),
            t('resources.libFeature3', 'Учебные пособия')
          ],
          linkText: t('resources.libLink', 'Перейти в библиотеку')
        },
        {
          id: 2,
          icon: Microscope,
          key: 'databases',
          links: [
            { 
              name: 'pubmed', 
              url: 'https://pubmed.ncbi.nlm.nih.gov/', 
              external: true,
              displayName: t('resources.dbPubMed', 'PubMed')
            },
            { 
              name: 'scopus', 
              url: 'https://www.scopus.com/', 
              external: true,
              displayName: t('resources.dbScopus', 'Scopus')
            },
            { 
              name: 'web_of_science', 
              url: 'https://www.webofscience.com/', 
              external: true,
              displayName: t('resources.dbWebScience', 'Web of Science')
            }
          ],
          status: 'external',
          section: 'databases',
          color: 'from-[#205295] to-[#144272]',
          bgColor: 'bg-purple-50 border-purple-200',
          title: t('resources.dbTitle', 'Научные базы данных'),
          description: t('resources.dbDesc', 'Доступ к международным научным базам данных'),
          features: [
            t('resources.dbFeature1', 'PubMed'),
            t('resources.dbFeature2', 'Scopus'),
            t('resources.dbFeature3', 'Web of Science')
          ],
          linkText: t('resources.dbLink', 'Открыть базу данных')
        },
        {
          id: 3,
          icon: BarChart3,
          key: 'materials',
          status: 'download',
          section: 'materials',
          color: 'from-[#1B4242] to-[#2C7865]',
          bgColor: 'bg-slate-50 border-slate-200',
          title: t('resources.materialsTitle', 'Учебные материалы'),
          description: t('resources.materialsDesc', 'Методические пособия и учебные материалы'),
          features: [
            t('resources.materialsFeature1', 'Лекции'),
            t('resources.materialsFeature2', 'Презентации'),
            t('resources.materialsFeature3', 'Лабораторные работы')
          ],
          linkText: t('resources.materialsLink', 'Скачать материалы')
        },
        {
          id: 4,
          icon: Video,
          key: 'video',
          link: '#video-resources',
          status: 'online',
          section: 'multimedia',
          color: 'from-[#2C7865] to-[#0d9488]',
          bgColor: 'bg-green-50 border-green-200',
          title: t('resources.videoTitle', 'Видеоресурсы'),
          description: t('resources.videoDesc', 'Обучающие видео и видеолекции'),
          features: [
            t('resources.videoFeature1', 'Видеолекции'),
            t('resources.videoFeature2', 'Вебинары'),
            t('resources.videoFeature3', 'Обучающие курсы')
          ],
          linkText: t('resources.videoLink', 'Смотреть видео')
        },
        {
          id: 5,
          icon: Monitor,
          key: 'moodle',
          status: 'login',
          section: 'platforms',
          color: 'from-[#144272] to-[#205295]',
          bgColor: 'bg-blue-50 border-slate-200',
          title: t('resources.moodleTitle', 'Moodle система'),
          description: t('resources.moodleDesc', 'Система дистанционного обучения'),
          features: [
            t('resources.moodleFeature1', 'Онлайн-курсы'),
            t('resources.moodleFeature2', 'Тесты и задания'),
            t('resources.moodleFeature3', 'Общение с преподавателями')
          ],
          linkText: t('resources.moodleLink', 'Войти в систему')
        },
        {
          id: 6,
          icon: FileText,
          key: 'research',
          link: '#research-portal',
          status: 'online',
          section: 'research',
          color: 'from-[#0891b2] to-[#0d9488]',
          bgColor: 'bg-teal-50 border-teal-200',
          title: t('resources.researchTitle', 'Научные ресурсы'),
          description: t('resources.researchDesc', 'Ресурсы для научной работы и исследований'),
          features: [
            t('resources.researchFeature1', 'Научные журналы'),
            t('resources.researchFeature2', 'Исследовательские данные'),
            t('resources.researchFeature3', 'Библиографические менеджеры')
          ],
          linkText: t('resources.researchLink', 'Научные ресурсы')
        }
      ]
    },
    library: {
      title: t('resources.sectionLib', 'Электронная библиотека'),
      description: t('resources.sectionLibDesc', 'Электронные книги, учебники и научные публикации'),
      resources: []
    },
    databases: {
      title: t('resources.sectionDb', 'Научные базы данных'),
      description: t('resources.sectionDbDesc', 'Международные индексы и научные публикации'),
      resources: []
    },
    platforms: {
      title: t('resources.sectionPlatforms', 'Образовательные платформы'),
      description: t('resources.sectionPlatformsDesc', 'Системы дистанционного обучения и онлайн-курсы'),
      resources: []
    },
    multimedia: {
      title: t('resources.sectionMedia', 'Мультимедийные ресурсы'),
      description: t('resources.sectionMediaDesc', 'Видео, аудио и интерактивные материалы'),
      resources: []
    },
    research: {
      title: t('resources.sectionResearch', 'Научные ресурсы'),
      description: t('resources.sectionResearchDesc', 'Ресурсы для исследовательской работы'),
      resources: []
    },
    materials: {
      title: t('resources.sectionMaterials', 'Учебные материалы'),
      description: t('resources.sectionMaterialsDesc', 'Методические пособия и учебные материалы'),
      resources: []
    }
  };

  // Filter resources for each section
  Object.keys(sectionsData).forEach(section => {
    if (section !== 'all') {
      sectionsData[section].resources = sectionsData.all.resources.filter(
        resource => resource.section === section
      );
    }
  });

  // Sections list for navigation
  const sectionsList = [
    { id: 'all', name: t('resources.navAll', 'Все ресурсы'), count: sectionsData.all.resources.length },
    { id: 'library', name: t('resources.navLibrary', 'Библиотека'), count: sectionsData.library.resources.length },
    { id: 'databases', name: t('resources.navDatabases', 'Базы данных'), count: sectionsData.databases.resources.length },
    { id: 'platforms', name: t('resources.navPlatforms', 'Платформы'), count: sectionsData.platforms.resources.length },
    { id: 'multimedia', name: t('resources.navMultimedia', 'Мультимедиа'), count: sectionsData.multimedia.resources.length },
    { id: 'research', name: t('resources.navResearch', 'Наука'), count: sectionsData.research.resources.length },
    { id: 'materials', name: t('resources.navMaterials', 'Материалы'), count: sectionsData.materials.resources.length }
  ];

  // Get current section data
  const getCurrentSectionData = () => {
    return sectionsData[activeSection] || sectionsData.all;
  };

  const currentSectionData = getCurrentSectionData();

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("resources.title", "Образовательные Ресурсы")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("resources.subtitle", "Доступ к электронным ресурсам, научным базам данных и учебным материалам")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] p-4 text-white font-bold text-lg">
                {t("resources.categories", "Категории")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sectionsList.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                          activeSection === section.id
                            ? "bg-slate-100 text-[#0A2647] font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <span>{section.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {section.count}
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
                  {currentSectionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentSectionData.description}
                </p>
              </div>

              {/* Ресурсы */}
              <div className="space-y-6">
                {currentSectionData.resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionData.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
                      >
                        <div className="flex items-start gap-4 mb-5">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center flex-shrink-0`}>
                            {resource.icon && <resource.icon className="w-6 h-6 text-white" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-slate-900">
                              {resource.title}
                            </h3>
                            <p className="text-slate-500 text-sm mt-1 leading-relaxed">
                              {resource.description}
                            </p>
                          </div>
                        </div>

                        {/* Ссылка */}
                        <div className="mt-auto">
                          {resource.links ? (
                            <div className="space-y-2">
                              {resource.links.map((link, idx) => (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center bg-[#0A2647] hover:bg-[#144272] text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                                >
                                  {t('resources.goTo', 'Перейти в')} {link.displayName}
                                </a>
                              ))}
                            </div>
                          ) : (
                            <a
                              href={resource.link || '#'}
                              target={resource.link && resource.link.startsWith('http') ? '_blank' : undefined}
                              rel={resource.link && resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="flex items-center justify-center bg-[#0A2647] hover:bg-[#144272] text-white py-2.5 px-4 rounded-lg transition-colors duration-200 font-medium text-sm"
                            >
                              {resource.linkText}
                              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
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
                      {t("resources.noResources", "Ресурсы не найдены")}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {t("resources.noResourcesDesc", "В этой категории пока нет доступных ресурсов")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;