import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Users, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || '';

const NewsEvents = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [i18n.language]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/events/`, {
        headers: { 'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language },
      });
      if (!response.ok) throw new Error(t('newsanon.loadError', 'Ошибка загрузки'));
      const data = await response.json();
      const mapped = (data.results || data).map(e => ({
        ...e,
        date: e.event_date,
        time: e.event_time,
        category: e.event_category,
        participants: e.participants_info,
        description: e.summary,
      }));
      setEvents(mapped);
    } catch (err) {
      setError(err.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 'upcoming', name: t('newsanon.filters.upcoming', 'Предстоящие') },
    { id: 'past', name: t('newsanon.filters.past', 'Прошедшие') },
    { id: 'all', name: t('newsanon.filters.all', 'Все') },
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.status === filter);

  const getImageUrl = (item) => {
    const path = item?.image_url || item?.image;
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language,
      { day: 'numeric', month: 'long', year: 'numeric' });
  };
  const formatTime = (timeString) => timeString ? timeString.substring(0, 5) : '';
  const getCategoryName = (category) => t(`newsanon.categories.${category}`, { defaultValue: t('newsanon.categories.default', 'Событие') });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t('newsanon.title', 'События')}</h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">{t('newsanon.subtitle', 'Мероприятия и события университета')}</p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f.id ? 'bg-[#0A2647] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}>
              {f.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">{error}</div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Calendar className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t('newsanon.noEvents', 'Событий не найдено')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((event) => {
              const img = getImageUrl(event);
              return (
                <div key={event.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative">
                    {img ? (
                      <img src={img} alt={event.title} className="w-full h-48 object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }} />
                    ) : null}
                    <div className={`w-full h-48 bg-slate-100 items-center justify-center text-slate-300 ${img ? 'hidden' : 'flex'}`}>
                      <ImageIcon className="w-12 h-12" />
                    </div>
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#0A2647]">
                      {getCategoryName(event.category)}
                    </span>
                    {event.status === 'upcoming' && (
                      <span className="absolute top-4 right-4 bg-[#0A2647] text-white px-2 py-1 rounded text-xs font-semibold">
                        {t('newsanon.soon', 'Скоро')}
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{event.title}</h3>
                    <div className="space-y-1.5 mb-4 text-sm text-slate-600">
                      {event.date && <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-slate-400" />{formatDate(event.date)}</div>}
                      {event.time && <div className="flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-400" />{formatTime(event.time)}</div>}
                      {event.location && <div className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-slate-400" />{event.location}</div>}
                      {event.participants != null && <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-slate-400" />{t('newsanon.participantsCount', { count: event.participants })}</div>}
                    </div>
                    {event.description && <p className="text-slate-500 text-sm line-clamp-3 mb-4">{event.description}</p>}
                    <Link to={`/news/detail/${event.slug || event.news || event.id}`}
                      className="mt-auto text-[#0A2647] hover:text-[#144272] font-medium text-sm">
                      {t('newsanon.readMore', 'Подробнее')} →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsEvents;
