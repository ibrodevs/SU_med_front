import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchExternalNews } from '../../utils/newsParser';

const API_BASE_URL = import.meta.env.DEV 
  ? '/proxy-backend/api' 
  : (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_BASE_URL || '/proxy-backend');
const MEDIA_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_MEDIA_BASE_URL || '/media');

const News = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [newsData, setNewsData] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
    fetchFeaturedNews();
  }, [i18n.language]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      const localNewsRequest = async () => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 10000);

        try {
          const response = await fetch(`${API_BASE_URL}/news`, {
            headers: {
              'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
              'Content-Type': 'application/json'
            },
            signal: controller.signal,
          });

          if (!response.ok) {
            return [];
          }

          const data = await response.json();
          return data.results || data;
        } finally {
          window.clearTimeout(timeoutId);
        }
      };

      const [localResult, externalResult] = await Promise.allSettled([
        localNewsRequest(),
        fetchExternalNews(),
      ]);

      const localNews = localResult.status === 'fulfilled' ? localResult.value : [];
      const externalNews = externalResult.status === 'fulfilled' ? externalResult.value : [];

      // Merge and sort
      const allNews = [...localNews, ...externalNews].sort((a, b) => {
        const dateA = new Date(a.published_at || a.date);
        const dateB = new Date(b.published_at || b.date);
        return dateB - dateA;
      });

      setNewsData(allNews);
    } catch (err) {
      console.error("Local news fetch failed:", err);
      // Try to at least show external news if local fails
      const externalNews = await fetchExternalNews();
      setNewsData(externalNews);
      if (externalNews.length > 0) {
        setError(null);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/featured`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFeaturedNews(data);
      }
    } catch (err) {
      console.error(t('news.featuredError'), err);
      setFeaturedNews([]); // Показываем пустой массив при ошибке
    }
  };

  const filteredNews = activeTab === 'all' 
    ? newsData 
    : newsData.filter(item => item.category?.name === activeTab);

  const displayFeaturedNews = featuredNews.length > 0 ? featuredNews : newsData.filter(item => item.is_featured);

  const getLocalizedTitle = (item) => {
    const currentLang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return item[`title_${currentLang}`] || item.title_ru || item.title || 'Без названия';
  };

  const getLocalizedSummary = (item) => {
    const currentLang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return item[`summary_${currentLang}`] || item.summary_ru || item.summary || 'Краткое описание недоступно';
  };

  const getImageUrl = (item) => {
    if (!item) return null;
    const path = item.image_url || item.image;
    if (!path) return '/placeholder-news.jpg';
    
    if (item.is_external && path.startsWith('http')) {
      return path;
    }

    if (path.startsWith('http')) {
      // Используем прокси для обхода защиты от хотлинкинга
      return `https://images.weserv.nl/?url=${encodeURIComponent(path)}&w=800`;
    }
    
    return `${MEDIA_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryName = (category) => {
    const categoryKey = category?.name || category;
    return t(`news.categories.${categoryKey}`, categoryKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('news.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('news.error')}: {error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchNews();
              fetchFeaturedNews();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('news.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  // Если нет данных и нет загрузки и нет ошибки
  if (!loading && newsData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('news.title')}
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                {t('news.subtitle')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="mb-8">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-4">Новостей пока нет</h3>
            <p className="text-gray-500 mb-6">В данный момент нет опубликованных новостей. Проверьте позже.</p>
            <button 
              onClick={() => {
                fetchNews();
                fetchFeaturedNews();
              }}
              className="bg-[#0A2647] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#144272] transition-colors"
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('news.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured News Section */}
        {displayFeaturedNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {t('news.featured')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {displayFeaturedNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/news/detail/${item.slug || item.id}`}
                  state={{ article: item }}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      {getImageUrl(item) ? (
                        <img 
                          src={getImageUrl(item)} 
                          alt={getLocalizedTitle(item)}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-gray-500"
                        style={{ display: getImageUrl(item) ? 'none' : 'flex' }}
                      >
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-[#0A2647] text-white px-3 py-1 rounded text-sm font-semibold">
                          {t('news.important')}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(item.published_at || item.date)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {getLocalizedTitle(item)}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {getLocalizedSummary(item)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/detail/${item.slug || item.id}`}
                state={{ article: item }}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    {getImageUrl(item) ? (
                      <img 
                        src={getImageUrl(item)} 
                        alt={getLocalizedTitle(item)}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400"
                      style={{ display: getImageUrl(item) ? 'none' : 'flex' }}
                    >
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">
                        {formatDate(item.published_at || item.date)}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        (item.category?.name || item.category) === 'news' ? 'bg-sky-50 text-[#144272]' :
                        (item.category?.name || item.category) === 'events' ? 'bg-teal-50 text-[#1B4242]' :
                        'bg-slate-100 text-[#334155]'
                      }`}>
                        {getCategoryName(item.category?.name || item.category)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {getLocalizedTitle(item)}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {getLocalizedSummary(item)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {activeTab === 'all' ? 'Новостей пока нет' : `Нет новостей в категории "${t(`news.tabs.${activeTab}`)}"`}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'all' 
                ? 'В данный момент нет опубликованных новостей.' 
                : 'Попробуйте выбрать другую категорию или посмотрите все новости.'
              }
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-[#0A2647] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#144272] transition-colors">
            {t('news.loadMore')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
