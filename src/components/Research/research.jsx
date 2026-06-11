import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  FileText, BookOpen, CalendarDays, Award, ArrowRight, ChevronRight,
  Microscope, FlaskConical, Landmark
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';

const Research = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [publications, setPublications] = useState([]);
  const [conferences, setConferences] = useState([]);
  const [areas, setAreas] = useState([]);
  const [stats, setStats] = useState({ publications: 0, journals: 0, conferences: 0, grants: 0 });
  const [loading, setLoading] = useState(true);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const get = async (path) => {
          const res = await fetch(`${API_BASE}/research/api/${path}`);
          if (!res.ok) throw new Error(res.status);
          const data = await res.json();
          return { list: data.results || data, count: data.count ?? (data.results || data).length };
        };
        const [pub, conf, ar, jour, gr] = await Promise.all([
          get('publications/'), get('conferences/'), get('areas/'), get('journals/'), get('grants/')
        ]);
        setPublications((pub.list || []).slice(0, 4));
        const now = new Date();
        setConferences((conf.list || [])
          .filter(c => !c.start_date || new Date(c.start_date) >= now)
          .slice(0, 3));
        setAreas((ar.list || []).slice(0, 6));
        setStats({
          publications: pub.count, journals: jour.count,
          conferences: conf.count, grants: gr.count
        });
      } catch (e) {
        console.error('Research landing load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentLang]);

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString(currentLang === 'kg' ? 'ky-KG' : currentLang === 'en' ? 'en-US' : 'ru-RU',
      { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const statCards = [
    { value: stats.publications, label: t('research.stats.publications', 'Публикации'), icon: FileText },
    { value: stats.journals, label: t('research.journals.title', 'Научные журналы'), icon: BookOpen },
    { value: stats.conferences, label: t('research.tabs.conferences', 'Конференции'), icon: CalendarDays },
    { value: stats.grants, label: t('research.grants.title', 'Гранты'), icon: Award },
  ];

  const directions = [
    {
      icon: FlaskConical,
      title: t('research.directions.d1.title', 'Научное сопровождение образования'),
      text: t('research.directions.d1.text', 'Научное обеспечение образовательного процесса, включая подготовку по лицензированным научным специальностям.')
    },
    {
      icon: Microscope,
      title: t('research.directions.d2.title', 'Прикладные и теоретические исследования'),
      text: t('research.directions.d2.text', 'Теоретические и прикладные исследования медико-биологических, естественнонаучных и гуманитарных проблем.')
    },
  ];

  const quickLinks = [
    { to: '/research/management', label: t('research.management.title', 'Научное управление'), icon: Landmark },
    { to: '/research/journals', label: t('research.journals.title', 'Научные журналы'), icon: BookOpen },
    { to: '/research/publications', label: t('research.publications.title', 'Публикации'), icon: FileText },
    { to: '/research/grants', label: t('research.grants.title', 'Гранты'), icon: Award },
    { to: '/research/conferences', label: t('research.conferences.title', 'Конференции'), icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Хлебные крошки */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center">
          <Link to="/" className="hover:text-[#0A2647] transition-colors">{t('nav.home', 'Главная')}</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-medium">{t('research.title', 'Наука')}</span>
        </nav>

        {/* Заголовок и миссия */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.title', 'Научные исследования')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            {t('research.missionText', 'Научная работа университета направлена на развитие исследовательского мышления и решение медицинских, гуманитарных и социально-экономических задач, повышающих профессиональное развитие.')}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {statCards.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] mx-auto mb-3">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-[#0A2647] mb-1">{loading ? '—' : `${s.value}+`}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Приоритетные направления */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t('research.directionsTitle', 'Приоритетные направления')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {directions.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                  <d.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{d.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Области исследований */}
        {areas.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {t('research.researchAreas.title', 'Ключевые области исследований')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {areas.map((area) => (
                <div key={area.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] mb-4">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{field(area, 'title')}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{field(area, 'description')}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Публикации и конференции */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Публикации */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">{t('research.publications.title', 'Публикации')}</h2>
              <Link to="/research/publications" className="text-[#0A2647] hover:text-[#144272] text-sm font-medium flex items-center">
                {t('research.common.showMore', 'Показать ещё')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-slate-400 text-sm py-6 text-center">{t('research.common.loading', 'Загрузка...')}</p>
              ) : publications.length === 0 ? (
                <p className="text-slate-400 text-sm py-6 text-center">{t('research.publications.noResults', 'Нет публикаций')}</p>
              ) : publications.map((pub) => (
                <div key={pub.id} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1 line-clamp-2">{field(pub, 'title')}</h3>
                  <p className="text-xs text-slate-500">{pub.authors}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {pub.journal}{pub.publication_date ? ` · ${new Date(pub.publication_date).getFullYear()}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Конференции */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">{t('research.conferences.upcoming', 'Предстоящие конференции')}</h2>
              <Link to="/research/conferences" className="text-[#0A2647] hover:text-[#144272] text-sm font-medium flex items-center">
                {t('research.common.showMore', 'Показать ещё')} <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-slate-400 text-sm py-6 text-center">{t('research.common.loading', 'Загрузка...')}</p>
              ) : conferences.length === 0 ? (
                <p className="text-slate-400 text-sm py-6 text-center">{t('research.conferences.noConferences', 'Нет конференций')}</p>
              ) : conferences.map((conf) => (
                <Link key={conf.id} to="/research/conferences" className="block p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                  <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-1">{field(conf, 'title')}</h3>
                  <p className="text-xs text-slate-500">{formatDate(conf.start_date)}</p>
                  <p className="text-xs text-slate-400 mt-1">{field(conf, 'location')}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Быстрые ссылки на разделы */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((q) => (
              <Link key={q.to} to={q.to}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-5 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647]">
                  <q.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-slate-900">{q.label}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Research;
