import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import socialOpportunitiesService from '../../services/socialOpportunitiesService';
import { Star, CalendarDays, Users, Rocket } from 'lucide-react';

const SocOp = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [eventsData, clubsData, projectsData] = await Promise.all([
          socialOpportunitiesService.getEvents(i18n.language),
          socialOpportunitiesService.getClubs(i18n.language),
          socialOpportunitiesService.getProjects(i18n.language)
        ]);
        setEvents(eventsData);
        setClubs(clubsData);
        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLocalizedField = (item, fieldName) => {
    const currentLang = i18n.language;
    if (currentLang === 'en' && item[`${fieldName}_en`]) return item[`${fieldName}_en`];
    if (currentLang === 'kg' && item[`${fieldName}_ky`]) return item[`${fieldName}_ky`];
    return item[fieldName] || '';
  };

  const sectionIconMap = {
    all: Star,
    events: CalendarDays,
    clubs: Users,
    projects: Rocket
  };

  const sections = [
    { id: 'all', name: t('socop.categories.all'), icon: 'all' },
    { id: 'events', name: t('socop.categories.events'), icon: 'events' },
    { id: 'clubs', name: t('socop.categories.clubs'), icon: 'clubs' },
    { id: 'projects', name: t('socop.categories.projects'), icon: 'projects' }
  ];

  const socialData = {
    events: Array.isArray(events) ? events.map(event => ({
      uniqueId: `event-${event.id}`,
      title: getLocalizedField(event, 'title'),
      description: getLocalizedField(event, 'description'),
      social_media_link: event.social_media_link,
      category: 'events'
    })) : [],
    clubs: Array.isArray(clubs) ? clubs.map(club => ({
      uniqueId: `club-${club.id}`,
      title: getLocalizedField(club, 'title'),
      description: getLocalizedField(club, 'description'),
      social_media_link: club.social_media_link,
      category: 'clubs'
    })) : [],
    projects: Array.isArray(projects) ? projects.map(project => ({
      uniqueId: `project-${project.id}`,
      title: getLocalizedField(project, 'title'),
      description: getLocalizedField(project, 'description'),
      social_media_link: project.social_media_link,
      category: 'projects'
    })) : []
  };

  const getFilteredData = () => {
    let data = activeSection === 'all'
      ? Object.values(socialData).flat()
      : socialData[activeSection];

    if (searchTerm) {
      return data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  };

  const filteredData = getFilteredData();

  const statistics = [
    { label: t('socop.statistics.members'), value: '1500+' },
    { label: t('socop.statistics.projects'), value: socialData.projects.length },
    { label: t('socop.statistics.events'), value: socialData.events.length },
    { label: t('socop.statistics.clubs'), value: socialData.clubs.length }
  ];

  const getActionButtonText = (category) => {
    const actions = {
      events: t('socop.actions.participate'),
      clubs: t('socop.actions.joinClub'),
      projects: t('socop.actions.joinProject')
    };
    return actions[category] || t('socop.actions.participate');
  };

  const sectionTitle = sections.find(s => s.id === activeSection)?.name || t('socop.categories.all');

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
                {t('socop.hero.title')}
              </h1>
              <p className="text-lg text-slate-500 max-w-3xl mx-auto">
                {t('socop.hero.description')}
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center"
                >
                  <div className="text-3xl font-bold text-[#0A2647] mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Поиск */}
            <div className="mb-6">
              <input
                type="text"
                placeholder={t('socop.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0A2647] focus:border-[#0A2647]"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Боковая навигация */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                  <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                    {t('socop.categories.title')}
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
                            {(() => { const Icon = sectionIconMap[section.icon]; return Icon ? <Icon className="w-5 h-5 mr-3" /> : null; })()}
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
                  {filteredData.length > 0 ? (
                    <>
                      <div className="flex items-center mb-8 pb-6 border-b border-slate-100">
                        <div className="p-3 bg-slate-100 rounded-lg mr-4">
                          {(() => { const Icon = sectionIconMap[activeSection] || Star; return <Icon className="w-6 h-6 text-[#0A2647]" />; })()}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{sectionTitle}</h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredData.map((item) => (
                          <div
                            key={item.uniqueId}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                                {(() => { const Icon = sectionIconMap[item.category] || Star; return <Icon className="w-6 h-6" />; })()}
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.description}</p>
                            <a
                              href={item.social_media_link || '#'}
                              target={item.social_media_link ? '_blank' : undefined}
                              rel={item.social_media_link ? 'noopener noreferrer' : undefined}
                              className={`mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center block transition-colors duration-200 ${item.social_media_link
                                  ? 'bg-[#0A2647] text-white hover:bg-[#144272]'
                                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                                }`}
                              onClick={!item.social_media_link ? (e) => e.preventDefault() : undefined}
                            >
                              {item.social_media_link ? getActionButtonText(item.category) : t('socop.comingSoon')}
                            </a>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-slate-500 text-lg">{t('socop.noResults.title')}</p>
                      <button
                        onClick={() => { setSearchTerm(''); setActiveSection('all'); }}
                        className="text-[#0A2647] hover:underline mt-2 font-medium"
                      >
                        {t('socop.noResults.clearFilters')}
                      </button>
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

export default SocOp;
