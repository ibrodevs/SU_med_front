import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell, Calendar, ExternalLink, Pin, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';
const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL || '';

const NewsAnnouncements = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [i18n.language]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/announcements/`, {
        headers: { 'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language },
      });
      if (!response.ok) throw new Error(t('news.announcements.loadError', 'Ошибка загрузки'));
      const data = await response.json();
      const mapped = (data.results || data).map(a => ({
        ...a,
        date: a.published_at,
        type: a.announcement_type,
        description: a.summary,
        pinned: a.is_pinned,
      }));
      setAnnouncements(mapped);
    } catch (err) {
      setError(err.message);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 'all', name: t('news.announcements.filters.all', 'Все') },
    { id: 'academic', name: t('news.announcements.filters.academic', 'Учебные') },
    { id: 'scholarship', name: t('news.announcements.filters.scholarship', 'Стипендии') },
    { id: 'competition', name: t('news.announcements.filters.competition', 'Конкурсы') },
  ];

  const filtered = filter === 'all' ? announcements : announcements.filter(i => i.type === filter);
  const pinned = announcements.filter(i => i.pinned);
  const regular = filtered.filter(i => !i.pinned);

  const getImageUrl = (item) => {
    const path = item?.image_url || item?.image;
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const formatDate = (d) => {
    if (!d) return t('news.announcements.noDate', 'Дата не указана');
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language,
      { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getTypeName = (type) => t(`news.announcements.types.${type}`, { defaultValue: t('news.announcements.types.academic', 'Объявление') });

  const Card = ({ item, large }) => {
    const img = getImageUrl(item);
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 overflow-hidden md:flex">
        <div className="md:w-1/4 relative">
          {img ? (
            <img src={img} alt={item.title} className="w-full h-48 md:h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }} />
          ) : null}
          <div className={`w-full h-48 md:h-full min-h-[160px] bg-slate-100 items-center justify-center text-slate-300 ${img ? 'hidden' : 'flex'}`}>
            <ImageIcon className="w-10 h-10" />
          </div>
        </div>
        <div className="md:w-3/4 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-[#0A2647]">{getTypeName(item.type)}</span>
            {item.pinned && (
              <span className="flex items-center text-xs text-slate-500"><Pin className="w-3.5 h-3.5 mr-1" />{t('news.announcements.pinned', 'Закреплено')}</span>
            )}
          </div>
          <h3 className={`font-bold text-slate-900 mb-2 ${large ? 'text-xl' : 'text-lg'}`}>{item.title}</h3>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2">{item.description}</p>
          <div className="mt-auto flex items-center justify-between">
            <span className="flex items-center text-sm text-slate-400"><Calendar className="w-4 h-4 mr-2" />{formatDate(item.date)}</span>
            <Link to={`/news/detail/${item.id}`} className="flex items-center text-[#0A2647] hover:text-[#144272] text-sm font-medium">
              <ExternalLink className="w-4 h-4 mr-1" />{t('news.announcements.details', 'Подробнее')}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{t('news.announcements.title', 'Объявления')}</h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">{t('news.announcements.subtitle', 'Важные объявления и информация для студентов')}</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500">{error}</div>
        ) : (
          <>
            {/* Закреплённые */}
            {pinned.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center">
                  <Pin className="w-5 h-5 mr-2 text-[#0A2647]" />{t('news.announcements.pinned', 'Закреплённые')}
                </h2>
                <div className="space-y-4">
                  {pinned.map((item) => <Card key={item.id} item={item} large />)}
                </div>
              </div>
            )}

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

            {/* Список */}
            {regular.length > 0 ? (
              <div className="space-y-4">
                {regular.map((item) => <Card key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <Bell className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t('news.announcements.noAnnouncements', 'Объявлений нет')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsAnnouncements;
