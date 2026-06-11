import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Award, GraduationCap, BarChart3, Building2, Users } from 'lucide-react';
import { getManagement, getTeachers } from '../../services/teachers';

const AVATAR_BG = '0A2647';
const AVATAR_COLOR = 'ffffff';
const buildAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'N')}&size=256&background=${AVATAR_BG}&color=${AVATAR_COLOR}&bold=true&format=png`;

const Management = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('management');
  const [managementData, setManagementData] = useState(null);
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загружаем данные с API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Загружаем данные руководства
      const managementData = await getManagement();
      if (managementData && managementData.length > 0) {
        setManagementData(managementData[0]);
      }

      // Загружаем данные учителей
      const teachersData = await getTeachers();
      setTeachersData(teachersData);

      setLoading(false);
    };
    fetchData();
  }, []);

  const sections = [
    { id: 'management', name: t('management.organizationTitle'), icon: Award },
    { id: 'teachers', name: t('management.teachersTitle'), icon: GraduationCap },
    { id: 'statistics', name: t('management.statistics'), icon: BarChart3 }
  ];

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderManagementContent = () => {
    if (loading) {
      return (
        <div className="text-center py-16">
          <div className="inline-block w-10 h-10 rounded-full border-2 border-slate-200 border-t-[#0A2647] animate-spin"></div>
          <p className="mt-6 text-slate-500">{t('management.loadingStructure')}</p>
        </div>
      );
    }

    if (!managementData) {
      return (
        <div className="text-center py-16">
          <p className="text-slate-500">{t('structure.leadership.notFound', 'Информация о руководстве отсутствует')}</p>
        </div>
      );
    }

    const transformApiData = (apiNode) => {
      if (!apiNode) return null;
      const fullName = getLocalizedText(apiNode, 'full_name');
      return {
        id: apiNode.id.toString(),
        head: fullName,
        position: getLocalizedText(apiNode, 'position'),
        bio: getLocalizedText(apiNode, 'bio'),
        avatar: apiNode.photo || buildAvatar(fullName),
        children: apiNode.children ? apiNode.children.map(transformApiData) : []
      };
    };

    const organizationData = transformApiData(managementData);

    // Строим уровни иерархии (BFS)
    const buildLevels = (root) => {
      const levels = [];
      let queue = [{ node: root, level: 0 }];
      while (queue.length) {
        const { node, level } = queue.shift();
        if (!levels[level]) levels[level] = [];
        levels[level].push(node);
        if (node.children && node.children.length) {
          node.children.forEach((child) => queue.push({ node: child, level: level + 1 }));
        }
      }
      return levels;
    };

    const levels = buildLevels(organizationData);

    return (
      <div>
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('management.organizationTitle')}</h2>
          <p className="text-slate-500 mt-2">{t('management.organizationSubtitle')}</p>
        </div>

        <div className="space-y-8">
          {levels.map((nodes, levelIndex) => (
            <div key={levelIndex}>
              <div className="flex flex-wrap justify-center gap-5">
                {nodes.map((member) => {
                  const isHead = levelIndex === 0;
                  return (
                    <div
                      key={member.id}
                      className={`w-full sm:w-72 rounded-xl border p-6 transition-all duration-300 ${
                        isHead
                          ? 'bg-[#0A2647] border-[#0A2647] text-white shadow-md'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={member.avatar}
                          alt={member.head}
                          className={`w-20 h-20 rounded-full object-cover mb-4 ${
                            isHead ? 'ring-2 ring-white/40' : 'ring-1 ring-slate-200'
                          }`}
                        />
                        <h3 className={`text-base font-bold mb-2 ${isHead ? 'text-white' : 'text-slate-900'}`}>
                          {member.head}
                        </h3>
                        <span className={`block w-8 h-px mb-2 ${isHead ? 'bg-white/40' : 'bg-[#0A2647]/30'}`}></span>
                        <p className={`text-sm ${isHead ? 'text-blue-100' : 'text-slate-500'}`}>
                          {member.position}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTeachersContent = () => {
    const renderTeacherCard = (teacher) => {
      const name = getLocalizedText(teacher, 'full_name');
      const teacherData = {
        head: name,
        position: getLocalizedText(teacher, 'position'),
        avatar: teacher.photo || buildAvatar(name)
      };

      return (
        <div
          key={teacher.id}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:border-slate-300"
        >
          <div className="text-center">
            <img
              src={teacherData.avatar}
              alt={teacherData.head}
              className="w-20 h-20 rounded-full mx-auto ring-1 ring-slate-200 mb-3 object-cover"
            />
            <h3 className="text-base font-bold text-slate-900 mb-1">{teacherData.head}</h3>
            <p className="text-slate-500 text-sm">{teacherData.position}</p>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('management.teachersTitle')}</h2>
          <p className="text-slate-500 mt-2">{t('management.teachersSubtitle')}</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 rounded-full border-2 border-slate-200 border-t-[#0A2647] animate-spin"></div>
          </div>
        ) : teachersData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {teachersData.map(teacher => renderTeacherCard(teacher))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-500">{t('management.teachersEmpty', 'Список преподавателей пока не заполнен')}</p>
          </div>
        )}
      </div>
    );
  };

  const renderStatisticsContent = () => {
    const statistics = [
      { number: '150+', label: t('management.teachersCount'), icon: GraduationCap },
      { number: '15', label: t('management.departmentsCount'), icon: Building2 },
      { number: '5', label: t('management.facultiesCount'), icon: GraduationCap },
      { number: '2000+', label: t('management.studentsCount'), icon: Users }
    ];

    return (
      <div>
        <div className="mb-10 pb-6 border-b border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{t('management.statistics')}</h2>
          <p className="text-slate-500 mt-2">{t('management.statisticsSubtitle')}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 text-[#0A2647] flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-[#0A2647] mb-1">{stat.number}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('management.aboutUniversityTitle')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('management.aboutUniversityText')}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">{t('management.missionTitle')}</h3>
            <p className="text-slate-600 leading-relaxed">
              {t('management.missionText')}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'management':
        return renderManagementContent();
      case 'teachers':
        return renderTeachersContent();
      case 'statistics':
        return renderStatisticsContent();
      default:
        return renderManagementContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-slate-50 py-10 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('management.title')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl">
            {t('management.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                {t('management.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                          activeSection === section.id
                            ? "bg-slate-100 text-[#0A2647] font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        <section.icon className="w-5 h-5 mr-3 flex-shrink-0" />
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
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Management;
