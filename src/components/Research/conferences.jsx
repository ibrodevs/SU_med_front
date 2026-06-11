import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, BookOpen, MapPin, ExternalLink } from 'lucide-react';
import researchService from '../../services/researchService';

const Conferences = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeSection, setActiveSection] = useState('upcoming');
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        const data = await researchService.getConferences(i18n.language);
        setConferences(Array.isArray(data) ? data : (data?.results || []));
        setError(null);
      } catch (err) {
        console.error('Error fetching conferences:', err);
        setError(t('research.conferences.errorLoading', 'Ошибка загрузки конференций'));
        setConferences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConferences();
  }, [i18n.language]);

  const now = new Date();
  const isUpcoming = (c) => {
    const ref = c.end_date || c.start_date;
    return !ref || new Date(ref) >= now;
  };

  const sections = [
    { id: 'upcoming', name: t('research.conferences.tabs.upcoming', 'Предстоящие'), icon: CalendarDays },
    { id: 'archive', name: t('research.conferences.tabs.archive', 'Архив'), icon: BookOpen },
  ];

  const filtered = useMemo(() =>
    conferences.filter((c) => activeSection === 'upcoming' ? isUpcoming(c) : !isUpcoming(c)),
    [conferences, activeSection]);

  const count = (id) => conferences.filter((c) => id === 'upcoming' ? isUpcoming(c) : !isUpcoming(c)).length;

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(currentLang === 'kg' ? 'ky-KG' : currentLang === 'en' ? 'en-US' : 'ru-RU',
      { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const dateRange = (c) => {
    if (c.start_date && c.end_date) return `${formatDate(c.start_date)} — ${formatDate(c.end_date)}`;
    return formatDate(c.start_date || c.end_date);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.conferences.title', 'Научные конференции')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('research.conferences.subtitle', 'Научные мероприятия и академические события')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                {t('research.conferences.categories', 'Конференции')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveSection(s.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center justify-between ${
                          activeSection === s.id ? 'bg-slate-100 text-[#0A2647] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center"><s.icon className="w-5 h-5 mr-3" />{s.name}</span>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{count(s.id)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Контент */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">{error}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <CalendarDays className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t('research.conferences.noConferences', 'Конференции не найдены')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((conf) => (
                  <div key={conf.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                        <CalendarDays className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">{field(conf, 'title')}</h3>
                    </div>

                    <div className="space-y-1.5 text-sm text-slate-600 mb-4">
                      <div className="flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-slate-400" />{dateRange(conf)}</div>
                      {field(conf, 'location') && (
                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400" />{field(conf, 'location')}</div>
                      )}
                    </div>

                    {field(conf, 'description') && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">{field(conf, 'description')}</p>
                    )}

                    {conf.website && (
                      <a
                        href={conf.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2 bg-[#0A2647] text-white hover:bg-[#144272] transition-colors duration-200"
                      >
                        {t('research.conferences.visitWebsite', 'Перейти на сайт')} <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conferences;
