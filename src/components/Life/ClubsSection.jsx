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

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const getLocalizedField = (item, fieldName) => {
    const currentLang = i18n.language;
    if (currentLang === 'en' && item[`${fieldName}_en`]) return item[`${fieldName}_en`];
    if (currentLang === 'kg' && item[`${fieldName}_ky`]) return item[`${fieldName}_ky`];
    return item[fieldName] || '';
  };

  const processedClubs = clubs.map(club => ({
    id: club.id,
    name: getLocalizedField(club, 'title'),
    description: getLocalizedField(club, 'description'),
    category: club.category,
    social_media_link: club.social_media_link
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

  const filteredClubs = activeSection === 'all'
    ? processedClubs
    : processedClubs.filter(club => club.category === activeSection);

  const sectionTitle = sections.find(s => s.id === activeSection)?.name || t('clubs.categories.all');

  return (
    <div
      className={`min-h-screen bg-slate-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
            <p className="mt-4 text-slate-500">{t('common.loading', 'Загрузка...')}</p>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 inline-block">
              {error}
            </div>
            <div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#0A2647] text-white px-4 py-2 rounded-lg hover:bg-[#144272]"
              >
                {t('common.retry', 'Попробовать снова')}
              </button>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Заголовок */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {t('clubs.title')}
              </h1>
              <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                {t('clubs.subtitle')}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Боковая навигация */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                  <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                    {t('clubs.categories.title')}
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
                            onClick={() => setActiveSection(section.id)}
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
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
                  <div className="flex items-center mb-8 pb-6 border-b border-slate-100">
                    <div className="p-3 bg-slate-100 rounded-lg mr-4">
                      {(() => { const Icon = sectionIcons[activeSection] || Star; return <Icon className="w-6 h-6 text-[#0A2647]" />; })()}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{sectionTitle}</h2>
                  </div>

                  {filteredClubs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredClubs.map((club) => (
                        <div
                          key={club.id}
                          className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                              <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 leading-snug">{club.name}</h3>
                          </div>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{club.description}</p>
                          <a
                            href={club.social_media_link || '#'}
                            target={club.social_media_link ? '_blank' : undefined}
                            rel={club.social_media_link ? 'noopener noreferrer' : undefined}
                            className={`mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center block transition-colors duration-200 ${club.social_media_link
                                ? 'bg-[#0A2647] text-white hover:bg-[#144272]'
                                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              }`}
                            onClick={!club.social_media_link ? (e) => e.preventDefault() : undefined}
                          >
                            {club.social_media_link ? t('clubs.joinButton') : t('clubs.comingSoon')}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500 text-lg">{t('clubs.comingSoon', 'Скоро')}</p>
                    </div>
                  )}
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
