import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import studentLifeService from '../../services/studentLifeService';
import { Star, GraduationCap, Trophy, Theater, Users } from 'lucide-react';

const ClubsSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загрузка данных с API
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await studentLifeService.getClubs(i18n.language);
        setClubs(data);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError('Ошибка загрузки данных клубов');
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, [i18n.language]);

  // Функция для получения правильного поля в зависимости от языка
  const getLocalizedField = (item, fieldName) => {
    const currentLang = i18n.language;

    if (currentLang === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (currentLang === 'kg' && item[`${fieldName}_ky`]) {
      return item[`${fieldName}_ky`];
    }

    return item[fieldName] || '';
  };

  // Функция для обработки массивов переводов
  const getLocalizedArray = (item, fieldName) => {
    const currentLang = i18n.language;

    if (currentLang === 'en' && item[`${fieldName}_en`] && Array.isArray(item[`${fieldName}_en`])) {
      return item[`${fieldName}_en`];
    } else if (currentLang === 'kg' && item[`${fieldName}_ky`] && Array.isArray(item[`${fieldName}_ky`])) {
      return item[`${fieldName}_ky`];
    }

    return Array.isArray(item[fieldName]) ? item[fieldName] : [];
  };

  // Обработка данных клубов с локализацией
  const processedClubs = clubs.map(club => ({
    ...club,
    name: getLocalizedField(club, 'title'), // API использует 'title', а компонент ожидает 'name'
    description: getLocalizedField(club, 'description'),
    leader: getLocalizedField(club, 'leader'),
    schedule: getLocalizedField(club, 'meetings'), // API использует 'meetings', а компонент ожидает 'schedule'
    achievements: getLocalizedArray(club, 'achievements'),
    icon: club.image || null, // API использует 'image', а компонент ожидает 'icon'
    location: getLocalizedField(club, 'location') || t('clubs.defaultLocation', 'Университет'), // fallback location
    social_media_link: club.social_media_link // Ссылка на социальные сети
  }));

  const sectionIcons = {
    all: Star,
    academic: GraduationCap,
    sports: Trophy,
    cultural: Theater,
    social: Users
  };

  const sections = [
    { id: 'all', name: t('clubs.categories.all'), icon: 'all' },
    { id: 'academic', name: t('clubs.categories.academic'), icon: 'academic' },
    { id: 'sports', name: t('clubs.categories.sports'), icon: 'sports' },
    { id: 'cultural', name: t('clubs.categories.cultural'), icon: 'cultural' },
    { id: 'social', name: t('clubs.categories.social'), icon: 'social' }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const filteredClubs = activeSection === 'all'
    ? processedClubs
    : processedClubs.filter(club => club.category === activeSection);

  const renderAllClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-slate-100 rounded-lg mr-4">
          <Star className="w-6 h-6 text-[#0A2647]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.all')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#0A2647]/10 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#0A2647]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {club.name}
                  </h3>
                  <div className="flex items-center text-sm text-[#205295]">
                    <span className="bg-[#205295]/10 px-2 py-1 rounded-full">
                      {club.members} {t('clubs.members')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.leader')}:</span>
                <span>{club.leader}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.schedule')}:</span>
                <span>{club.schedule}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.location')}:</span>
                <span>{club.location}</span>
              </div>
            </div>

            <a
              href={club.social_media_link || '#'}
              target={club.social_media_link ? '_blank' : '_self'}
              rel={club.social_media_link ? 'noopener noreferrer' : ''}
              className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors duration-300 font-medium text-center block ${club.social_media_link
                  ? 'bg-[#0A2647] text-white hover:bg-[#144272] cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
            >
              {club.social_media_link ? t('clubs.joinButton') : t('clubs.comingSoon')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAcademicClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-slate-100 rounded-lg mr-4">
          <GraduationCap className="w-6 h-6 text-[#0A2647]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.academic')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#0A2647] rounded-lg flex items-center justify-center mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">
                    {club.members} {t('clubs.members')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{t('clubs.leader')}:</span> {club.leader}
              </div>
              <a
                href={club.social_media_link || '#'}
                target={club.social_media_link ? '_blank' : '_self'}
                rel={club.social_media_link ? 'noopener noreferrer' : ''}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${club.social_media_link
                    ? 'bg-[#0A2647] text-white hover:bg-[#144272] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
              >
                {club.social_media_link ? t('clubs.joinButton') : t('clubs.comingSoon')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSportsClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-slate-100 rounded-lg mr-4">
          <Trophy className="w-6 h-6 text-[#0A2647]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.sports')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#2C7865] rounded-lg flex items-center justify-center mr-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                  <div className="flex items-center text-sm text-[#0A2647]">
                    <span className="bg-[#0A2647]/10 px-2 py-1 rounded-full">
                      {club.members} {t('clubs.members')}
                    </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{t('clubs.schedule')}:</span>
                <span className="font-medium">{club.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('clubs.location')}:</span>
                <span className="font-medium">{club.location}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={club.social_media_link || '#'}
                target={club.social_media_link ? '_blank' : '_self'}
                rel={club.social_media_link ? 'noopener noreferrer' : ''}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${club.social_media_link
                    ? 'bg-[#0A2647] text-white hover:bg-[#144272] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
              >
                {club.social_media_link ? t('clubs.joinButton') : t('clubs.comingSoon')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCulturalClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-slate-100 rounded-lg mr-4">
          <Theater className="w-6 h-6 text-[#0A2647]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.cultural')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#0A2647] rounded-lg flex items-center justify-center mr-4">
                <Theater className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                  <div className="flex items-center text-sm text-[#0A2647]">
                    <span className="bg-[#0A2647]/10 px-2 py-1 rounded-full">
                      {club.members} {t('clubs.members')}
                    </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{t('clubs.leader')}:</span> {club.leader}
              </div>
              <a
                href={club.social_media_link || '#'}
                target={club.social_media_link ? '_blank' : '_self'}
                rel={club.social_media_link ? 'noopener noreferrer' : ''}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${club.social_media_link
                    ? 'bg-[#0A2647] text-white hover:bg-[#144272] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
              >
                {club.social_media_link ? t('clubs.detailsButton') : t('clubs.comingSoon')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-slate-100 rounded-lg mr-4">
          <Users className="w-6 h-6 text-[#0A2647]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.social')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="bg-white rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#0A2647] rounded-lg flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{t('clubs.schedule')}:</span>
                <span className="font-medium">{club.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('clubs.location')}:</span>
                <span className="font-medium">{club.location}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <a
                href={club.social_media_link || '#'}
                target={club.social_media_link ? '_blank' : '_self'}
                rel={club.social_media_link ? 'noopener noreferrer' : ''}
                className={`px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium ${club.social_media_link
                    ? 'bg-[#205295] text-white hover:bg-[#144272] cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
              >
                {club.social_media_link ? t('clubs.joinButton') : t('clubs.comingSoon')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'all':
        return renderAllClubsContent();
      case 'academic':
        return renderAcademicClubsContent();
      case 'sports':
        return renderSportsClubsContent();
      case 'cultural':
        return renderCulturalClubsContent();
      case 'social':
        return renderSocialClubsContent();
      default:
        return renderAllClubsContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#f8fafc] py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Loading состояние */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">{t('common.loading', 'Загрузка...')}</p>
          </div>
        )}

        {/* Error состояние */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {t('common.retry', 'Попробовать снова')}
            </button>
          </div>
        )}

        {/* Основной контент */}
        {!loading && !error && (
          <>
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('clubs.title')}
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                {t('clubs.subtitle')}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Боковая навигация */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
                  <div className="bg-[#0A2647] p-4 text-white font-bold text-lg">
                    {t('clubs.categories.title')}
                  </div>
                  <nav className="p-2">
                    <ul className="space-y-1">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <button
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeSection === section.id
                                ? "bg-[#0A2647]/10 text-[#0A2647] font-medium shadow-sm"
                                : "text-gray-700 hover:bg-gray-100"
                              }`}
                            onClick={() => changeActiveSection(section.id)}
                          >
                            {(() => { const Icon = sectionIcons[section.icon]; return Icon ? <Icon className="w-5 h-5 mr-3" /> : null; })()}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ClubsSection;