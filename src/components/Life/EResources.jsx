import React, { useState, useEffect } from 'react';
import { AlertTriangle, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  fetchEResourcesStatistics,
  fetchEResourcesCategories,
  fetchEResources
} from '../../services/eResourcesAPI';
import { getLocalizedField } from '../../utils/i18nHelpers';

const EResources = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [resourcesData, setResourcesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statisticsData, setStatisticsData] = useState({});

  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [categoriesResult, resourcesResult, statisticsResult] = await Promise.all([
          fetchEResourcesCategories(),
          fetchEResources(),
          fetchEResourcesStatistics()
        ]);

        const categoriesData = categoriesResult.results || [];
        const resources = resourcesResult.results || [];

        const allCategory = {
          id: 'all',
          name: t('eresources.categories.all') || 'Все',
          count: resources.length
        };
        const categoriesWithAll = [allCategory, ...categoriesData.map(cat => ({
          id: cat.id,
          name: getLocalizedField(cat, 'name', currentLanguage),
          count: cat.count || 0
        }))];

        setCategories(categoriesWithAll);
        setResourcesData(resources);
        setStatisticsData(statisticsResult);
      } catch (err) {
        console.error('Error loading EResources data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [t, i18n.language]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredData = resourcesData.filter(resource => {
    const title = getLocalizedField(resource, 'title', currentLanguage);
    const description = getLocalizedField(resource, 'description', currentLanguage);
    const matchesCategory = activeCategory === 'all' || resource.category === parseInt(activeCategory);
    const matchesSearch = !searchTerm ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = {
    total: statisticsData.total || 0,
    online: statisticsData.online || 0,
    users: statisticsData.total_users || 0,
    popular: statisticsData.popular || 0
  };
  const statisticsDisplay = [
    { label: t('eresources.statistics.total') || 'Всего ресурсов', value: stats.total },
    { label: t('eresources.statistics.online') || 'Онлайн', value: stats.online },
    { label: t('eresources.statistics.users') || 'Пользователей', value: `${stats.users}+` },
    { label: t('eresources.statistics.popular') || 'Популярных', value: stats.popular }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647] mb-4"></div>
          <p className="text-slate-500">{t('common.loading') || 'Загрузка...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center"><AlertTriangle className="w-14 h-14 text-amber-500" /></div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('common.error') || 'Ошибка'}</h3>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 py-10 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('eresources.hero.title', 'Электронные')} {t('eresources.hero.highlight', 'ресурсы')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('eresources.hero.description') || 'Доступ к коллекции цифровых ресурсов для обучения и исследований'}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {statisticsDisplay.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
              <div className="text-3xl font-bold text-[#0A2647] mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Поиск и категории */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder={t('eresources.search.placeholder') || 'Поиск ресурсов...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0A2647] focus:border-[#0A2647]"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${activeCategory === category.id
                    ? 'bg-[#0A2647] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {category.name}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeCategory === category.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Сетка ресурсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((resource) => {
            const title = getLocalizedField(resource, 'title', currentLanguage);
            const description = getLocalizedField(resource, 'description', currentLanguage);
            return (
              <div
                key={resource.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{description}</p>
                <a
                  href={resource.url || '#'}
                  target={resource.url ? '_blank' : undefined}
                  rel={resource.url ? 'noopener noreferrer' : undefined}
                  className={`mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center block transition-colors duration-200 ${resource.url
                      ? 'bg-[#0A2647] text-white hover:bg-[#144272]'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    }`}
                  onClick={!resource.url ? (e) => e.preventDefault() : undefined}
                >
                  {t('eresources.resources.accessButton') || 'Перейти к ресурсу'}
                </a>
              </div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('eresources.noResults.title') || 'Ничего не найдено'}</h3>
            <p className="text-slate-500">{t('eresources.noResults.description') || 'Попробуйте изменить критерии поиска'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EResources;
