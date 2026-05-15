import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VacancyCard from './VacancyCard';
import careersService from '../../services/careersService';
import './About.css';

const CareersMain = () => {
  const { t, i18n } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Добавляем небольшую задержку для обновления языка
    const timer = setTimeout(() => {
      loadInitialData();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [i18n.language]); // Добавляем зависимость от языка

  useEffect(() => {
    // Загружаем вакансии только после того, как категории загружены
    if (categories.length > 0) {
      loadVacancies();
    }
  }, [filterCategory, i18n.language]); // Добавляем зависимость от языка

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      const [categoriesData, vacanciesData] = await Promise.all([
        careersService.getCategories(i18n.language),
        careersService.getVacancies(i18n.language)
      ]);
      
      setCategories([
        { name: 'all', display_name: t('careers.categories.all') },
        ...categoriesData
      ]);
      
      setVacancies(vacanciesData);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err.message);
      setCategories([
        { name: 'all', display_name: t('careers.categories.all') }
      ]);
      setVacancies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadVacancies = async () => {
    try {
      const params = filterCategory === 'all' ? {} : { category: filterCategory };
      const data = await careersService.getVacancies(i18n.language, params);
      setVacancies(data);
    } catch (err) {
      console.error('Error loading vacancies:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('careers.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('careers.error')}</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadInitialData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('careers.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-blue-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">{t('careers.breadcrumbs.home')}</Link>
            <span className="mx-2">→</span>
            <Link to="/about" className="hover:text-blue-600">{t('careers.breadcrumbs.about')}</Link>
            <span className="mx-2">→</span>
            <span className="text-blue-600">{t('careers.breadcrumbs.careers')}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            {t('careers.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careers.subtitle')}
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">{t('careers.filters.title')}</span>
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setFilterCategory(category.name)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  filterCategory === category.name
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.display_name}
              </button>
            ))}
            <div className="ml-auto text-sm text-gray-600">
              {t('careers.filters.found')} <span className="font-semibold">{vacancies.length}</span>
            </div>
          </div>
        </div>

        {/* Vacancies Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>

        {/* No Results */}
        {vacancies.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center mb-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('careers.no_results.title')}</h3>
            <p className="text-gray-500">{t('careers.no_results.description')}</p>
          </div>
        )}

        {/* Why Join Us Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            {t('careers.benefits.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{t('careers.benefits.development.title')}</h3>
              <p className="text-gray-600">{t('careers.benefits.development.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{t('careers.benefits.team.title')}</h3>
              <p className="text-gray-600">{t('careers.benefits.team.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{t('careers.benefits.stability.title')}</h3>
              <p className="text-gray-600">{t('careers.benefits.stability.description')}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{t('careers.benefits.prestige.title')}</h3>
              <p className="text-gray-600">{t('careers.benefits.prestige.description')}</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{t('careers.contact.title')}</h2>
            <p className="text-blue-200 mb-6">
              {t('careers.contact.description')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${t('careers.contact.email')}`} className="hover:text-blue-200">
                  {t('careers.contact.email')}
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${t('careers.contact.phone')}`} className="hover:text-blue-200">
                  {t('careers.contact.phone')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersMain;
