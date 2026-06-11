import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Building2, Microscope, School, Rocket } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';

const Infrastructure = () => {
  const { t, i18n } = useTranslation();
  const lang = ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  const [counts, setCounts] = useState({ hospitals: null, laboratories: null, classrooms: null, startups: null });

  useEffect(() => {
    const load = async () => {
      try {
        const safe = async (path, pick) => {
          try {
            const res = await fetch(`${API_BASE}${path}`);
            const data = await res.json();
            return pick(data);
          } catch { return null; }
        };
        const [h, l, c, s] = await Promise.all([
          safe(`/api/infrastructure/hospitals/?lang=${lang}`, d => (d.results || d).length),
          safe(`/api/infrastructure/laboratories/?lang=${lang}`, d => (d.results || d).length),
          safe(`/api/infrastructure/classrooms/frontend/?lang=${lang}`, d => (d.data?.classrooms || []).length),
          safe(`/api/infrastructure/startups/frontend/?lang=${lang}`, d => (d.data?.startups || []).length),
        ]);
        setCounts({ hospitals: h, laboratories: l, classrooms: c, startups: s });
      } catch (e) { console.error('Infra counts error:', e); }
    };
    load();
  }, [lang]);

  const items = [
    {
      to: '/infrastructure/hospitals', icon: Building2,
      title: t('hospitals.title', 'Больницы и клиники'),
      description: t('infrastructure.items.hospitals', 'Университетские клиники для практики студентов с современным оборудованием.'),
      count: counts.hospitals, unit: t('infrastructure.stats.hospitals', 'Больницы'),
    },
    {
      to: '/infrastructure/laboratories', icon: Microscope,
      title: t('laboratories.title', 'Лаборатории'),
      description: t('infrastructure.items.laboratories', 'Современные лаборатории по биохимии, анатомии, фармацевтике и микробиологии.'),
      count: counts.laboratories, unit: t('infrastructure.stats.laboratories', 'Лаборатории'),
    },
    {
      to: '/infrastructure/audience', icon: School,
      title: t('classrooms.title', 'Учебные аудитории'),
      description: t('infrastructure.items.classrooms', 'Лекционные залы и практические кабинеты с современным оснащением.'),
      count: counts.classrooms, unit: t('classrooms.rooms', 'аудиторий'),
    },
    {
      to: '/infrastructure/startups', icon: Rocket,
      title: t('startups.title', 'Стартапы'),
      description: t('infrastructure.items.startups', 'Центр медицинских инноваций и поддержки студенческих стартапов.'),
      count: counts.startups, unit: t('startups.activeStartups', 'Стартапы'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('infrastructure.title', 'Инфраструктура университета')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('infrastructure.subtitle', 'Современная образовательная среда для качественной подготовки медицинских специалистов')}
          </p>
        </div>

        {/* Карточки разделов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] mb-4">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.description}</p>
              {item.count != null && (
                <div className="mt-auto pt-4 border-t border-slate-100 text-sm">
                  <span className="text-2xl font-bold text-[#0A2647] mr-2">{item.count}</span>
                  <span className="text-slate-500">{item.unit}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
