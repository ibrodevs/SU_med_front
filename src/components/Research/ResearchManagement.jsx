import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Users, Scale, FlaskConical, ChevronRight } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/proxy-backend';

const ResearchManagement = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [activeSection, setActiveSection] = useState('bodies');
  const [councils, setCouncils] = useState([]);
  const [loading, setLoading] = useState(true);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/research/api/councils/`);
        const data = await res.json();
        setCouncils(data.results || data || []);
      } catch (e) {
        console.error('Councils load error:', e);
        setCouncils([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentLang]);

  // Органы управления наукой (по данным официального сайта)
  const bodies = [
    {
      icon: FlaskConical,
      name: t('research.bodies.stc.name', 'Научно-технический совет'),
      description: t('research.bodies.stc.desc', 'Определяет стратегию научной деятельности университета и координирует исследовательские программы.')
    },
    {
      icon: Scale,
      name: t('research.bodies.bioethics.name', 'Биоэтический комитет'),
      description: t('research.bodies.bioethics.desc', 'Обеспечивает соблюдение этических норм при проведении научных и клинических исследований.')
    },
    {
      icon: Users,
      name: t('research.bodies.youngScientists.name', 'Совет молодых учёных'),
      description: t('research.bodies.youngScientists.desc', 'Поддерживает начинающих исследователей, аспирантов и студентов в научной работе.')
    },
    {
      icon: Landmark,
      name: t('research.bodies.department.name', 'Отдел науки и перспективных исследований'),
      description: t('research.bodies.department.desc', 'Координирует научную деятельность, организует конференции и сопровождает публикации.')
    },
  ];

  const sections = [
    { id: 'bodies', name: t('research.bodiesTab', 'Органы управления'), icon: Landmark },
    { id: 'councils', name: t('research.management.tabs.councils', 'Научные советы'), icon: Users },
  ];

  const Card = ({ icon: Icon, title, description, footer }) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
      <div className="flex items-start gap-4 mb-3">
        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
      </div>
      {description && <p className="text-slate-500 text-sm leading-relaxed">{description}</p>}
      {footer}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.management.title', 'Научное управление')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('research.management.subtitle', 'Структура научного управления университета')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
              <div className="bg-[#0A2647] px-5 py-4 text-white font-semibold">
                {t('research.management.sections', 'Разделы')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => setActiveSection(s.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 flex items-center ${
                          activeSection === s.id ? 'bg-slate-100 text-[#0A2647] font-semibold' : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <s.icon className="w-5 h-5 mr-3" />
                        {s.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Контент */}
          <div className="lg:w-3/4">
            {activeSection === 'bodies' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bodies.map((b, i) => (
                  <Card key={i} icon={b.icon} title={b.name} description={b.description} />
                ))}
              </div>
            )}

            {activeSection === 'councils' && (
              loading ? (
                <div className="text-center py-16">
                  <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
                </div>
              ) : councils.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <p className="text-slate-500">{t('research.management.noData.councils', 'Нет данных о научных советах')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {councils.map((c) => (
                    <Card
                      key={c.id}
                      icon={Users}
                      title={field(c, 'name')}
                      description={field(c, 'description')}
                      footer={
                        field(c, 'chairman') ? (
                          <div className="mt-4 pt-4 border-t border-slate-100 text-sm flex items-center text-slate-600">
                            <ChevronRight className="w-4 h-4 mr-1 text-[#0A2647]" />
                            <span className="font-medium mr-1">{t('research.management.councils.chairman', 'Председатель')}:</span>
                            {field(c, 'chairman')}
                          </div>
                        ) : null
                      }
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchManagement;
