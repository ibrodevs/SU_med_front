import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Target, CalendarDays, CheckCircle2, Award } from 'lucide-react';
import researchService from '../../services/researchService';

const STATUS_CONFIG = {
  active: { color: 'bg-green-50 text-green-700 border border-green-200', key: 'research.grants.statusLabels.active' },
  upcoming: { color: 'bg-blue-50 text-blue-700 border border-blue-200', key: 'research.grants.statusLabels.upcoming' },
  closed: { color: 'bg-slate-100 text-slate-600 border border-slate-200', key: 'research.grants.statusLabels.closed' },
};

const Grants = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeSection, setActiveSection] = useState('all');
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        setLoading(true);
        const data = await researchService.getGrants(i18n.language);
        setGrants(Array.isArray(data) ? data : (data?.results || []));
        setError(null);
      } catch (err) {
        console.error('Error fetching grants:', err);
        setError(t('research.grants.errorLoading', 'Ошибка загрузки грантов'));
        setGrants([]);
      } finally {
        setLoading(false);
      }
    };
    fetchGrants();
  }, [i18n.language]);

  const sections = [
    { id: 'all', name: t('research.grants.tabs.all', 'Все гранты'), icon: Star },
    { id: 'active', name: t('research.grants.tabs.active', 'Активные'), icon: Target },
    { id: 'upcoming', name: t('research.grants.tabs.upcoming', 'Предстоящие'), icon: CalendarDays },
    { id: 'closed', name: t('research.grants.tabs.closed', 'Завершённые'), icon: CheckCircle2 },
  ];

  const filtered = useMemo(() =>
    activeSection === 'all' ? grants : grants.filter((g) => g.status === activeSection),
    [grants, activeSection]);

  const count = (id) => id === 'all' ? grants.length : grants.filter((g) => g.status === id).length;

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(currentLang === 'kg' ? 'ky-KG' : currentLang === 'en' ? 'en-US' : 'ru-RU');
  };

  const statusBadge = (status) => {
    const c = STATUS_CONFIG[status] || { color: 'bg-slate-100 text-slate-600', key: '' };
    return { color: c.color, text: c.key ? t(c.key) : status };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.grants.title', 'Исследовательские гранты')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('research.grants.subtitle', 'Возможности финансирования научных исследований')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                {t('research.grants.tabs.all', 'Гранты')}
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
                <Award className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">{t('research.grants.noGrants', 'Нет доступных грантов')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filtered.map((grant) => {
                  const badge = statusBadge(grant.status);
                  return (
                    <div key={grant.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>{badge.text}</span>
                        {grant.amount && <span className="font-bold text-[#0A2647]">{grant.amount}</span>}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">{field(grant, 'title')}</h3>

                      <div className="space-y-1.5 text-sm text-slate-600 mb-5">
                        {field(grant, 'organization') && (
                          <div><span className="font-medium text-slate-500">{t('research.grants.organization', 'Организация')}:</span> {field(grant, 'organization')}</div>
                        )}
                        {grant.deadline && (
                          <div><span className="font-medium text-slate-500">{t('research.grants.deadline', 'Дедлайн')}:</span> {formatDate(grant.deadline)}</div>
                        )}
                        {grant.duration && (
                          <div><span className="font-medium text-slate-500">{t('research.grants.duration', 'Продолжительность')}:</span> {grant.duration}</div>
                        )}
                      </div>

                      <a
                        href={grant.application_url || '#'}
                        target={grant.application_url ? '_blank' : undefined}
                        rel={grant.application_url ? 'noopener noreferrer' : undefined}
                        onClick={!grant.application_url ? (e) => e.preventDefault() : undefined}
                        className={`mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center block transition-colors duration-200 ${
                          grant.application_url ? 'bg-[#0A2647] text-white hover:bg-[#144272]' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {t('research.grants.apply', 'Подать заявку')}
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;
