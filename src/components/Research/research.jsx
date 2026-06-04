import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Users, Award, ArrowRight, Clock, MapPin, ChevronRight, ExternalLink, BookOpen, Mic2, Heart, Brain, Microscope, Dna, Bone, Pill, Activity } from 'lucide-react';

const Research = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // 'ru', 'en', или 'kg'
  const [activeTab, setActiveTab] = useState('publications');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // State для данных из API
  const [publications, setPublications] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [researchAreas, setResearchAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функции для получения данных на текущем языке
  const getPublicationTitle = (publication) => {
    return publication[`title_${currentLang}`] || publication.title_ru || publication.title;
  };

  const getPublicationAuthors = (publication) => {
    return publication[`authors_${currentLang}`] || publication.authors_ru || publication.authors;
  };

  const getResearchCenterName = (center) => {
    if (!center) return null;
    return center[`name_${currentLang}`] || center.name_ru || center.name;
  };

  const getConferenceTitle = (conference) => {
    return conference[`title_${currentLang}`] || conference.title_ru || conference.title;
  };

  const getConferenceDescription = (conference) => {
    return conference[`description_${currentLang}`] || conference.description_ru || conference.description;
  };

  const getAreaName = (area) => {
    return area[`title_${currentLang}`] || area.title_ru || area.title;
  };

  const getAreaDescription = (area) => {
    return area[`description_${currentLang}`] || area.description_ru || area.description;
  };

  // Вспомогательные функции для обработки областей исследований
  const extractAreaFromKeywords = (publication) => {
    const keywords = publication.keywords_ru || publication.keywords_en || [];
    if (keywords.length === 0) return null;
    
    // Пытаемся определить область по ключевым словам
    const keywordString = keywords.join(' ').toLowerCase();
    
    if (keywordString.includes('кардио') || keywordString.includes('сердце') || keywordString.includes('cardio')) {
      return 'Кардиология';
    } else if (keywordString.includes('нейро') || keywordString.includes('мозг') || keywordString.includes('neuro')) {
      return 'Неврология';
    } else if (keywordString.includes('онко') || keywordString.includes('рак') || keywordString.includes('cancer')) {
      return 'Онкология';
    } else if (keywordString.includes('генет') || keywordString.includes('ген') || keywordString.includes('genetic')) {
      return 'Генетика';
    } else if (keywordString.includes('иммун') || keywordString.includes('immune')) {
      return 'Иммунология';
    } else if (keywordString.includes('фарм') || keywordString.includes('drug') || keywordString.includes('препарат')) {
      return 'Фармакология';
    }
    
    return null;
  };

  const translateArea = (areaName, targetLang) => {
    const translations = {
      'Кардиология': { en: 'Cardiology', kg: 'Кардиология' },
      'Неврология': { en: 'Neuroscience', kg: 'Нейрология' },
      'Онкология': { en: 'Oncology', kg: 'Онкология' },
      'Генетика': { en: 'Genetics', kg: 'Генетика' },
      'Иммунология': { en: 'Immunology', kg: 'Иммунология' },
      'Фармакология': { en: 'Pharmacology', kg: 'Фармакология' },
      'Общая медицина': { en: 'General Medicine', kg: 'Жалпы медицина' }
    };
    
    return translations[areaName]?.[targetLang] || areaName;
  };

  const getAreaIcon = (areaName) => {
    const icons = {
      'Кардиология': Heart,
      'Неврология': Brain,
      'Онкология': Microscope,
      'Генетика': Dna,
      'Иммунология': Bone,
      'Фармакология': Pill,
      'Общая медицина': Activity
    };
    
    return icons[areaName] || Microscope;
  };

  const getAreaColor = (areaName) => {
    const colors = {
      'Кардиология': 'red',
      'Неврология': 'blue',
      'Онкология': 'green',
      'Генетика': 'purple',
      'Иммунология': 'orange',
      'Фармакология': 'indigo',
      'Общая медицина': 'gray'
    };
    
    return colors[areaName] || 'blue';
  };

  const getColorClasses = (color) => {
    const colorClasses = {
      'red': 'bg-red-100 text-red-800',
      'blue': 'bg-blue-100 text-blue-800',
      'green': 'bg-green-100 text-green-800',
      'purple': 'bg-purple-100 text-purple-800',
      'orange': 'bg-orange-100 text-orange-800',
      'indigo': 'bg-indigo-100 text-indigo-800',
      'gray': 'bg-gray-100 text-gray-800'
    };
    
    return colorClasses[color] || 'bg-blue-100 text-blue-800';
  };

  // Функции для получения данных из API
  const fetchPublications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/proxy-backend'}/research/api/publications/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Берем только первые 5 публикаций для главной страницы
      const publicationsData = data.results || data;
      setPublications(publicationsData.slice(0, 5));
    } catch (err) {
      console.error('Error fetching publications:', err);
      setError(t('research.publications.errorLoading') || 'Ошибка загрузки публикаций');
    }
  };

  const fetchConferences = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/proxy-backend'}/research/api/conferences/upcoming/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Берем только первые 3 конференции для главной страницы
      const conferencesData = data.results || data;
      setConferences(conferencesData.slice(0, 3));
    } catch (err) {
      console.error('Error fetching conferences:', err);
      setError(t('research.conferences.errorLoading') || 'Ошибка загрузки конференций');
    }
  };

  const fetchResearchAreas = async () => {
    try {
      // Получаем все публикации для анализа
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || '/proxy-backend'}/research/api/publications/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const publicationsData = data.results || data;
      
      // Группируем публикации по областям исследований
      const areasMap = new Map();
      
      publicationsData.forEach(pub => {
        const areaName = pub.research_area?.title_ru || 
                        pub.research_area?.title_en || 
                        extractAreaFromKeywords(pub) || 
                        'Общая медицина';
        
        if (!areasMap.has(areaName)) {
          areasMap.set(areaName, {
            id: areaName,
            title_ru: pub.research_area?.title_ru || areaName,
            title_en: pub.research_area?.title_en || translateArea(areaName, 'en'),
            title_kg: pub.research_area?.title_kg || translateArea(areaName, 'kg'),
            description_ru: pub.research_area?.description_ru || `Исследования в области ${areaName.toLowerCase()}`,
            description_en: pub.research_area?.description_en || `Research in ${areaName.toLowerCase()}`,
            description_kg: pub.research_area?.description_kg || `${areaName} областындагы изилдөөлөр`,
            icon: getAreaIcon(areaName),
            color: getAreaColor(areaName),
            publications_count: 0,
            researchers_count: new Set(),
            projects_count: 0
          });
        }
        
        const area = areasMap.get(areaName);
        area.publications_count++;
        
        // Добавляем авторов (подсчет уникальных исследователей)
        if (pub.authors_ru || pub.authors_en) {
          const authors = (pub.authors_ru || pub.authors_en || '').split(',');
          authors.forEach(author => {
            if (author.trim()) {
              area.researchers_count.add(author.trim());
            }
          });
        }
      });
      
      // Преобразуем Set в число для подсчета исследователей
      const areas = Array.from(areasMap.values()).map(area => ({
        ...area,
        researchers_count: area.researchers_count.size,
        projects_count: Math.ceil(area.publications_count / 3) // Примерно 3 публикации на проект
      }));
      
      setResearchAreas(areas);
    } catch (err) {
      console.error('Error fetching research areas:', err);
      setError(t('research.areas.errorLoading') || 'Ошибка загрузки областей исследований');
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchPublications(), fetchConferences(), fetchResearchAreas()]);
      setLoading(false);
    };
    
    loadData();
  }, [currentLang]); // Перезагружаем данные при смене языка

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Статистика исследований
  const researchStats = [
    { value: '65+', label: t('research.stats.projects'), icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: '180+', label: t('research.stats.publications'), icon: Award, color: 'text-green-600', bg: 'bg-green-100' },
    { value: '120+', label: t('research.stats.researchers'), icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { value: '15+', label: t('research.stats.collaborations'), icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const formatDate = (dateString) => {
    if (!dateString) return t('research.common.noDate') || 'Дата не указана';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return t('research.common.invalidDate') || 'Неверная дата';
    
    return date.toLocaleDateString(currentLang === 'kg' ? 'ky-KG' : currentLang === 'en' ? 'en-US' : 'ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };



  // Анимированный счетчик для статистики
  const Counter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const valueNum = parseInt(value);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const end = valueNum;
        const duration = 2000; // ms
        const incrementTime = 30; // ms
        const steps = duration / incrementTime;
        const increment = end / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }
    }, [isVisible, valueNum]);

    return (
      <div className="text-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          {count}+
        </div>
        <div className="text-gray-600 mt-2">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8 flex items-center">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
            {t('nav.home')}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-800 font-medium">{t('research.title')}</span>
        </nav>

        {/* Заголовок с анимацией */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            {t('research.title')} <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('research.subtitle')}
          </p>
        </div>

        {/* Статистика с анимированными счетчиками */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {researchStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 ${stat.bg} rounded-xl mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                {isVisible && <Counter value={stat.value} label={stat.label} />}
              </div>
            </div>
          ))}
        </div>

        {/* Ключевые направления */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">{t('research.researchAreas.title')}</h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area) => (
              <div 
                key={area.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    {(() => { const IconComp = area.icon || Microscope; return typeof IconComp === 'function' ? <IconComp className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" /> : <Microscope className="w-10 h-10 text-blue-600 group-hover:scale-110 transition-transform duration-300" />; })()}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(area.color)}`}>
                      {area.projects_count || 0} {t('research.researchAreas.projects')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">{getAreaName(area)}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{getAreaDescription(area)}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xl font-bold text-gray-800">{area.publications_count || 0}</div>
                        <div className="text-sm text-gray-600">{t('research.researchAreas.publications')}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xl font-bold text-gray-800">{area.researchers_count || 0}</div>
                        <div className="text-sm text-gray-600">{t('research.researchAreas.researchers')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Последние публикации */}
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                {t('research.publications.title')}
              </h2>
              <Link to="/research/publications" className="text-blue-600 hover:text-blue-800 flex items-center text-sm group">
                {t('research.common.showMore')} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">{t('research.common.loading')}</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : publications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">{t('research.publications.noPublications')}</p>
                </div>
              ) : (
                publications.map((pub) => (
                  <div 
                    key={pub.id} 
                    className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {getResearchCenterName(pub.research_center) || t('research.publications.general')}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(pub.publication_date)}</span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                      {getPublicationTitle(pub)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{getPublicationAuthors(pub)}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{pub.journal}</span>
                      <div className="flex items-center">
                        {pub.citations_count && (
                          <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full mr-2">
                            {t('research.publications.citations')}: {pub.citations_count}
                          </span>
                        )}
                        {pub.doi && (
                          <a href='research/publications'  className="text-blue-500 hover:text-blue-700">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Ближайшие конференции */}
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Mic2 className="w-6 h-6 mr-2 text-orange-600" />
                {t('research.conferences.upcoming')}
              </h2>
              <Link to="/research/conferences" className="text-blue-600 hover:text-blue-800 flex items-center text-sm group">
                {t('research.common.showMore')} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                  <p className="text-gray-600 mt-4">{t('research.common.loading')}</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : conferences.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">{t('research.conferences.noUpcoming')}</p>
                </div>
              ) : (
                conferences.map((conf) => (
                  <Link 
                    key={conf.id}
                    to="/research/conferences"
                    className="block p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 flex-1 mr-4 group-hover:text-orange-700 transition-colors">
                        {getConferenceTitle(conf)}
                      </h3>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {conf.start_date && conf.end_date ? 
                          `${formatDate(conf.start_date)} - ${formatDate(conf.end_date)}` :
                          conf.start_date ? formatDate(conf.start_date) : t('research.common.noDate')
                        }{conf.time && `, ${conf.time}`}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {conf.location}
                      </div>
                      
                      {conf.speaker_count > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 text-purple-500" />
                          {conf.speaker_count} {t('research.conferences.speakers')}
                        </div>
                      )}
                    </div>

                    {conf.registration_deadline && (
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {t('research.conferences.registrationDeadline')}: {formatDate(conf.registration_deadline)}
                        </span>
                      </div>
                    )}
                  </Link>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Призыв к действию */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('research.common.joinResearch')}</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              {t('research.common.joinResearchDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/research/join"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {t('research.common.participateInResearch')}
              </Link>
              <Link
                to="/research/grants"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                {t('research.grants.title')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Глобальные стили для анимаций */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
};

export default Research;