import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Crown, GraduationCap, Building } from 'lucide-react';
import aboutService from '../../services/aboutService';
import { getManagement } from '../../services/teachers';

const fallbackFaculties = [
  {
    name: "Высшая школа медицины",
    name_ru: "Высшая школа медицины",
    name_en: "Higher School of Medicine",
    name_kg: "Жогорку медициналык мектеби",
    head_ru: "Мамбетов Эрбол Зинкенович (Декан)",
    head_en: "Erbol Mambetov (Dean)",
    head_kg: "Мамбетов Эрбол Зинкенович (Декан)",
    departments: [
      {
        name_ru: "Кафедра Естественно-гуманитарных дисциплин (ЕГД)",
        name_en: "Department of Natural Sciences and Humanities",
        name_kg: "Табигый-гуманитардык илимдер кафедрасы"
      },
      {
        name_ru: "Кафедра клинико-морфологических дисциплин",
        name_en: "Department of Clinical and Morphological Disciplines",
        name_kg: "Клиникалык-морфологиялык илимдер кафедрасы"
      },
      {
        name_ru: "Кафедра клинических дисциплин",
        name_en: "Department of Clinical Disciplines",
        name_kg: "Клиникалык илимдер кафедрасы"
      }
    ]
  }
];

const fallbackAdministrative = [
  {
    name_ru: "Учебно-методический отдел",
    name_en: "Academic and Methodological Department",
    name_kg: "Окуу-усулдук бөлүмү",
    head_ru: "Колдошева Г. А.",
    head_en: "Koldosheva G. A.",
    head_kg: "Колдошева Г. А.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Отдел HR и качества",
    name_en: "HR and Quality Department",
    name_kg: "Адам ресурстары жана сапат бөлүмү",
    head_ru: "Абдыкадырова А. Т.",
    head_en: "Abdykadyrova A. T.",
    head_kg: "Абдыкадырова А. Т.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Планово-финансовый отдел",
    name_en: "Planning and Finance Department",
    name_kg: "Пландоо жана каржы бөлүмү",
    head_ru: "Токтогулова Н. А.",
    head_en: "Toktogulova N. A.",
    head_kg: "Токтогулова Н. А.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Отдел науки и повышения квалификации",
    name_en: "Department of Science and Professional Development",
    name_kg: "Илим жана квалификацияны жогорулатуу бөлүмү",
    head_ru: "Мамытов Т. Б.",
    head_en: "Mamytov T. B.",
    head_kg: "Мамытов Т. Б.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Международный отдел",
    name_en: "International Department",
    name_kg: "Эл аралык бөлүмү",
    head_ru: "Раимкулов А. М.",
    head_en: "Raimkulov A. M.",
    head_kg: "Раимкулов А. М.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Студенческий отдел кадров",
    name_en: "Student HR Department",
    name_kg: "Студенттик кадрлар бөлүмү",
    head_ru: "Исакова С. К.",
    head_en: "Isakova S. K.",
    head_kg: "Isakova S. K.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Центр практики и карьеры",
    name_en: "Practice and Career Development Center",
    name_kg: "Практика жана карьера борбору",
    head_ru: "Жусупов Б. Т.",
    head_en: "Zhusupov B. T.",
    head_kg: "Жусупов Б. Т.",
    phone: "+996 (312) 658-538"
  },
  {
    name_ru: "Отдел управления делами и техники безопасности",
    name_en: "Department of Operations and Safety",
    name_kg: "Чарбалык камсыздоо жана техникалык коопсуздук бөлүмү",
    head_ru: "Бакиров К. А.",
    head_en: "Bakirov H. A.",
    head_kg: "Бакиров К. А.",
    phone: "+996 (312) 658-538"
  }
];

const StructurePage = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('leadership');
  const [expandedFaculties, setExpandedFaculties] = useState([]);
  const [managementData, setManagementData] = useState(null);
  const [facultiesData, setFacultiesData] = useState([]);
  const [administrativeData, setAdministrativeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загружаем данные с API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mgmt, structRes] = await Promise.all([
          getManagement(i18n.language),
          aboutService.getStructure(i18n.language)
        ]);
        setManagementData(mgmt);
        
        const facs = structRes?.data?.faculties?.items;
        if (Array.isArray(facs) && facs.length > 0) {
          setFacultiesData(facs);
        } else {
          setFacultiesData(fallbackFaculties);
        }

        const admin = structRes?.data?.administrative?.items;
        if (Array.isArray(admin) && admin.length > 0) {
          setAdministrativeData(admin);
        } else {
          setAdministrativeData(fallbackAdministrative);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных структуры:', error);
        setFacultiesData(fallbackFaculties);
        setAdministrativeData(fallbackAdministrative);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  const sections = [
    { id: 'leadership', name: t('structure.leadership.title'), icon: Crown },
    { id: 'faculties', name: t('structure.faculties.title'), icon: GraduationCap },
    { id: 'administrative', name: t('structure.administrative.title'), icon: Building }
  ];

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    const lang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || obj[field] || '';
  };

  const structureData = {
    leadership: {
      title: t('structure.leadership.title'),
      icon: Crown,
      items: [
        {
          name: t('structure.leadership.items.rector.name'),
          head: t('structure.leadership.items.rector.head'),
        },
        {
          name: t('structure.leadership.items.academicViceRector.name'),
          head: t('structure.leadership.items.academicViceRector.head'),
        },
        {
          name: t('structure.leadership.items.researchViceRector.name'),
          head: t('structure.leadership.items.researchViceRector.head'),
        },
        {
          name: t('structure.leadership.items.clinicalViceRector.name'),
          head: t('structure.leadership.items.clinicalViceRector.head'),
        }
      ]
    },
    faculties: {
      title: t('structure.faculties.title'),
      icon: GraduationCap,
      items: [
        {
          name: t('structure.faculties.items.medical.name'),
          head: t('structure.faculties.items.medical.head'),
          departments: [
            t('structure.faculties.items.medical.departments.therapy'),
            t('structure.faculties.items.medical.departments.surgery'),
            t('structure.faculties.items.medical.departments.pediatrics'),
            t('structure.faculties.items.medical.departments.obstetrics')
          ]
        },
        {
          name: t('structure.faculties.items.pediatric.name'),
          head: t('structure.faculties.items.pediatric.head'),
          departments: [
            t('structure.faculties.items.pediatric.departments.childrenDiseases'),
            t('structure.faculties.items.pediatric.departments.neonatology'),
            t('structure.faculties.items.pediatric.departments.childrenSurgery')
          ]
        },
        {
          name: t('structure.faculties.items.dental.name'),
          head: t('structure.faculties.items.dental.head'),
          departments: [
            t('structure.faculties.items.dental.departments.therapeuticDentistry'),
            t('structure.faculties.items.dental.departments.orthopedicDentistry'),
            t('structure.faculties.items.dental.departments.surgicalDentistry')
          ]
        },
        {
          name: t('structure.faculties.items.pharmaceutical.name'),
          head: t('structure.faculties.items.pharmaceutical.head'),
          departments: [
            t('structure.faculties.items.pharmaceutical.departments.pharmaceuticalChemistry'),
            t('structure.faculties.items.pharmaceutical.departments.pharmacognosy'),
            t('structure.faculties.items.pharmaceutical.departments.drugTechnology')
          ]
        }
      ]
    },
    administrative: {
      title: t('structure.administrative.title'),
      icon: Building,
      items: [
        {
          name: t('structure.administrative.items.academicOffice.name'),
          head: t('structure.administrative.items.academicOffice.head'),
          phone: t('structure.administrative.items.academicOffice.phone')
        },
        {
          name: t('structure.administrative.items.researchOffice.name'),
          head: t('structure.administrative.items.researchOffice.head'),
          phone: t('structure.administrative.items.researchOffice.phone')
        },
        {
          name: t('structure.administrative.items.hrDepartment.name'),
          head: t('structure.administrative.items.hrDepartment.head'),
          phone: t('structure.administrative.items.hrDepartment.phone')
        },
        {
          name: t('structure.administrative.items.accounting.name'),
          head: t('structure.administrative.items.accounting.head'),
          phone: t('structure.administrative.items.accounting.phone')
        }
      ]
    }
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const toggleFaculty = (facultyName) => {
    setExpandedFaculties(prev =>
      prev.includes(facultyName)
        ? prev.filter(name => name !== facultyName)
        : [...prev, facultyName]
    );
  };

  const renderLeadershipContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block w-10 h-10 rounded-full border-2 border-slate-200 border-t-[#0A2647] animate-spin"></div>
          <p className="mt-6 text-slate-500">{t('structure.leadership.loading')}</p>
        </div>
      );
    }

    if (!managementData) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">{t('structure.leadership.notFound')}</p>
        </div>
      );
    }

    // Собираем всех сотрудников в плоский список
    let allMembers = [];
    const collectAllMembers = (node) => {
      const members = [node];
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          members.push(...collectAllMembers(child));
        });
      }
      return members;
    };

    if (Array.isArray(managementData)) {
      managementData.forEach(rootNode => {
        allMembers.push(...collectAllMembers(rootNode));
      });
    } else if (managementData) {
      allMembers = collectAllMembers(managementData);
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-8 pb-6 border-b border-slate-100">
          <div className="p-3 bg-slate-100 rounded-xl mr-4">
            <Crown className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t('structure.leadership.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-1 self-stretch rounded-full bg-[#0A2647] mr-4"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {getLocalizedText(member, 'full_name')}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {getLocalizedText(member, 'position')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFacultiesContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-8 pb-6 border-b border-slate-100">
          <div className="p-3 bg-slate-100 rounded-xl mr-4">
            <GraduationCap className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t('structure.faculties.title')}
          </h2>
        </div>

        <div className="space-y-5">
          {facultiesData.length > 0 ? facultiesData.map((faculty, index) => {
            const isExpanded = expandedFaculties.includes(faculty.name);

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="w-1 self-stretch min-h-[2.5rem] rounded-full bg-[#0A2647] mr-4"></div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {getLocalizedText(faculty, 'name')}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          <span className="font-medium">{t('structure.labels.dean')}:</span> {getLocalizedText(faculty, 'head')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFaculty(faculty.name)}
                      className="ml-4 p-2 bg-slate-50 hover:bg-slate-100 text-[#0A2647] rounded-lg transition-all duration-300"
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && faculty.departments && (
                    <div className="mt-6 pl-9">
                      <h4 className="font-semibold text-slate-800 mb-4">{t('structure.labels.departments')}:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {faculty.departments.map((department, deptIndex) => (
                          <div
                            key={deptIndex}
                            className="bg-slate-50 rounded-lg p-3 border border-slate-200"
                          >
                            <div className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-[#0A2647] rounded-full mr-3"></div>
                              <span className="text-slate-700 text-sm">{getLocalizedText(department, 'name')}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('structure.faculties.notFound')}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAdministrativeContent = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-8 pb-6 border-b border-slate-100">
          <div className="p-3 bg-slate-100 rounded-xl mr-4">
            <Building className="w-6 h-6 text-[#0A2647]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            {t('structure.administrative.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {administrativeData.length > 0 ? administrativeData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-1 self-stretch min-h-[2.5rem] rounded-full bg-[#0A2647] mr-4"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {getLocalizedText(item, 'name')}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-slate-500 text-sm flex items-center">
                      <span className="font-medium mr-2">{t('structure.labels.leader')}:</span>
                      <span className="text-slate-700">{getLocalizedText(item, 'head')}</span>
                    </p>
                    {item.phone && (
                      <p className="text-slate-500 text-sm flex items-center">
                        <span className="font-medium mr-2">{t('structure.labels.phone')}:</span>
                        <span className="text-slate-700">{item.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500">{t('structure.administrative.notFound')}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'leadership':
        return renderLeadershipContent();
      case 'faculties':
        return renderFacultiesContent();
      case 'administrative':
        return renderAdministrativeContent();
      default:
        return renderLeadershipContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 py-10 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('structure.title')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl">
            {t('structure.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                {t('structure.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${activeSection === section.id
                          ? "bg-slate-100 text-[#0A2647] font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                          }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        {(() => { const IconComp = section.icon; return <IconComp className="w-5 h-5 mr-3" />; })()}
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

export default StructurePage;