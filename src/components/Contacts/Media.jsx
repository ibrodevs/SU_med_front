import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Tv, Newspaper, Monitor, Radio, FileText, AlertTriangle, LayoutGrid } from 'lucide-react';

const Media = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [error, setError] = useState(null);

  // API базовый URL
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/proxy-backend') + '/api/media-coverage';

  // Функции для работы с API
  const fetchMediaArticles = async (categoryId = null) => {
    try {
      let url = `${API_BASE_URL}/articles/?page_size=20`;
      if (categoryId && categoryId !== 'all') {
        // Находим ID категории по slug
        const categoryData = categories.find(cat => cat.slug === categoryId);
        if (categoryData && categoryData.id !== 'all') {
          url += `&category=${categoryData.id}`;
        }
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке статей');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.message);
      return [];
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке категорий');
      }
      
      const data = await response.json();
      
      // Добавляем категорию "Все" в начало списка
      const allCategory = {
        id: 'all',
        slug: 'all',
        name_ru: 'Все',
        name_kg: 'Баары',
        name_en: 'All',
        icon: 'all'
      };
      
      return [allCategory, ...data.results];
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      return [];
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/`);
      if (!response.ok) {
        throw new Error('Ошибка при загрузке статистики');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError(error.message);
      return null;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Загружаем все данные параллельно
        const [articles, categoriesData, stats] = await Promise.all([
          fetchMediaArticles(selectedCategory),
          fetchCategories(),
          fetchDashboardStats()
        ]);

        setArticles(articles);
        setCategories(categoriesData);
        setDashboardStats(stats);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedCategory]);

  // Обработчик смены категории
  const handleCategoryChange = async (categorySlug) => {
    setSelectedCategory(categorySlug);
    setLoading(true);
    
    const articles = await fetchMediaArticles(categorySlug === 'all' ? null : categorySlug);
    setArticles(articles);
    setLoading(false);
  };

  const getLocalizedContent = (content) => {
    if (typeof content === 'object') {
      return content[i18n.language] || content.ru || content.en || content.kg || '';
    }
    return content;
  };

  // Получение данных статистики из дашборда
  const getStatsData = () => {
    if (dashboardStats) {
      // Подсчитываем статистику по категориям из articles_by_category
      const categoryStats = dashboardStats.articles_by_category || {};
      
      const stats = {
        tv: categoryStats['Телевидение'] || 0,
        newspaper: categoryStats['Газеты'] || 0, 
        online: categoryStats['Интернет'] || 0,
        radio: categoryStats['Радио'] || 0,
        magazine: categoryStats['Журналы'] || 0
      };
      
      return stats;
    }
    
    // Fallback данные, если API не доступен
    return { tv: 0, newspaper: 0, online: 0, radio: 0, magazine: 0 };
  };

  // Функция для получения локализованного названия категории
  const getCategoryName = (category) => {
    const lang = i18n.language;
    if (category.name_ru) {
      return category[`name_${lang}`] || category.name_ru;
    }
    return getLocalizedContent(category.name);
  };

  // Функция для получения локализованного заголовка статьи
  const getArticleTitle = (article) => {
    const lang = i18n.language;
    return article[`title_${lang}`] || article.title_ru || '';
  };

  // Функция для получения локализованного названия тега
  const getTagName = (tag) => {
    const lang = i18n.language;
    if (tag.name_ru) {
      return tag[`name_${lang}`] || tag.name_ru;
    }
    return getLocalizedContent(tag.name);
  };

  // Функция для получения локализованного описания статьи
  const getArticleDescription = (article) => {
    const lang = i18n.language;
    return article[`description_${lang}`] || article.description_ru || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, options);
  };

  const getCategoryIcon = (category) => {
    const iconClass = 'w-5 h-5';
    const slug = typeof category === 'object' ? (category.icon || category.slug) : category;
    switch (slug) {
      case 'tv': return <Tv className={iconClass} />;
      case 'newspaper': return <Newspaper className={iconClass} />;
      case 'online': return <Monitor className={iconClass} />;
      case 'radio': return <Radio className={iconClass} />;
      case 'all': return <LayoutGrid className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            {getLocalizedContent({
              ru: 'Загрузка медиа-материалов...',
              en: 'Loading media materials...',
              kg: 'Медиа материалдар жүктөлүүдө...'
            })}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-4"><AlertTriangle className="w-16 h-16 text-red-500" /></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getLocalizedContent({
              ru: 'Ошибка загрузки',
              en: 'Loading Error',
              kg: 'Жүктөө катасы'
            })}
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {getLocalizedContent({
              ru: 'Обновить страницу',
              en: 'Refresh page',
              kg: 'Барактын жаңыртуу'
            })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок страницы */}
      <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getLocalizedContent({
                ru: 'СМИ о нас',
                en: 'Media about us',
                kg: 'БМКлар биз жөнүндө'
              })}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {getLocalizedContent({
                ru: 'Узнайте, что говорят ведущие медиа-издания о Салымбековском Университете и наших достижениях в медицинском образовании',
                en: 'Learn what leading media outlets say about Salymbekov University and our achievements in medical education',
                kg: 'Алдыңкы БМК жарыялоочулар Салымбеков Университети жана медициналык билим берүүдөгү биздин жетишкендиктер жөнүндө эмне дешет'
              })}
            </p>
            <div className="flex items-center justify-center text-blue-200">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>
                {getLocalizedContent({
                  ru: `${dashboardStats?.total_articles || 30} публикаций за последний год`,
                  en: `${dashboardStats?.total_articles || 30} publications in the last year`,
                  kg: `Акыркы жылда ${dashboardStats?.total_articles || 30} жарыялоо`
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры по категориям */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug || category.id)}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === (category.slug || category.id)
                  ? 'bg-[#0A2647] text-white shadow-lg'
                  : 'bg-white text-[#334155] hover:bg-slate-50 hover:text-[#144272] shadow-sm border border-slate-200'
              }`}
            >
              <span className="mr-2">{getCategoryIcon(category)}</span>
              {getCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-[#0A2647] mb-2">{getStatsData().tv}+</div>
            <div className="text-[#64748b]">
              {getLocalizedContent({
                ru: 'ТВ сюжетов',
                en: 'TV reports',
                kg: 'ТВ репортаждар'
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-[#144272] mb-2">{getStatsData().newspaper}+</div>
            <div className="text-[#64748b]">
              {getLocalizedContent({
                ru: 'Статей в прессе',
                en: 'Press articles',
                kg: 'Басма сөздөгү макалалар'
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-[#205295] mb-2">{getStatsData().online}+</div>
            <div className="text-[#64748b]">
              {getLocalizedContent({
                ru: 'Онлайн публикаций',
                en: 'Online publications',
                kg: 'Онлайн жарыялоолор'
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm border border-slate-100">
            <div className="text-3xl font-bold text-[#2C7865] mb-2">{getStatsData().radio}+</div>
            <div className="text-[#64748b]">
              {getLocalizedContent({
                ru: 'Радио интервью',
                en: 'Radio interviews',
                kg: 'Радио маектер'
              })}
            </div>
          </div>
        </div>

        {/* Список медиа-материалов */}
        {/* Статьи */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              {/* Изображение или тип медиа */}
              {article.image ? (
                <img 
                  src={`${import.meta.env.VITE_MEDIA_BASE_URL || '/media'}${article.image}`} 
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-[#0A2647] to-[#205295] h-48 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="flex justify-center mb-2">
                      {article.outlet?.outlet_type === 'tv' && <Tv className="w-10 h-10" />}
                      {article.outlet?.outlet_type === 'newspaper' && <Newspaper className="w-10 h-10" />}
                      {article.outlet?.outlet_type === 'online' && <Monitor className="w-10 h-10" />}
                      {article.outlet?.outlet_type === 'radio' && <Radio className="w-10 h-10" />}
                      {!article.outlet?.outlet_type && <Newspaper className="w-10 h-10" />}
                    </div>
                    <div className="font-semibold text-lg">
                      {article.outlet ? getLocalizedContent({
                        ru: article.outlet.name_ru,
                        kg: article.outlet.name_kg,
                        en: article.outlet.name_en
                      }) : 'Media Outlet'}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Контент */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {getLocalizedContent({
                    ru: article.title_ru,
                    kg: article.title_kg,
                    en: article.title_en
                  })}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getLocalizedContent({
                    ru: article.description_ru,
                    kg: article.description_kg,
                    en: article.description_en
                  })}
                </p>
                
                {/* Теги */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag.id} className="px-2 py-1 bg-slate-100 text-[#144272] text-xs rounded">
                        {getTagName(tag)}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Дата публикации */}
                <div className="text-sm text-gray-500 mb-4">
                  {new Date(article.publication_date || article.created_at).toLocaleDateString(
                    i18n.language === 'ru' ? 'ru-RU' : 
                    i18n.language === 'kg' ? 'ky-KG' : 'en-US'
                  )}
                </div>
                
                {/* Кнопка просмотра */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {article.outlet ? getLocalizedContent({
                      ru: article.outlet.name_ru,
                      kg: article.outlet.name_kg,
                      en: article.outlet.name_en
                    }) : 'Источник'}
                  </span>
                  <div className="flex gap-2">
                    {article.original_url && (
                      <a 
                        href={article.original_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm"
                      >
                        <span>
                          {getLocalizedContent({
                            ru: 'Источник',
                            en: 'Source',
                            kg: 'Булак'
                          })}
                        </span>
                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
