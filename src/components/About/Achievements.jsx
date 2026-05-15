// components/AchievementsPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import aboutService from '../../services/aboutService';

// Компонент карточки достижения (вынесен из основного компонента для исправления Hook ordering)
const AchievementCard = ({ achievement, index, getBorderColor, t }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } hover:scale-105 hover:shadow-xl border-l-4 ${getBorderColor(achievement.category)}`}
    >
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className={`p-3 rounded-full ${achievement.iconColor} text-white mr-4 flex-shrink-0`}>
            <span className="text-xl">{achievement.icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
            <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {achievement.year}
          </span>
          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
            {t(`achievement.categories.${achievement.category}`)}
          </span>
        </div>
      </div>
    </div>
  );
};

// Компонент статистики (вынесен из основного компонента для исправления Hook ordering)
const StatItem = ({ number, label, suffix, index, visibleStats }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (visibleStats) {
      const duration = 2000;
      const steps = 60;
      const stepValue = number / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCount(Math.min(Math.floor(stepValue * currentStep), number));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [visibleStats, number]);

  return (
    <div
      className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <div className="text-4xl font-bold text-blue-600 mb-2">
        {count}{suffix}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const AchievementsPage = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleStats, setVisibleStats] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch achievements and statistics from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map language codes for API
        const langMapping = {
          'ru': 'ru',
          'kg': 'kg',
          'en': 'en'
        };
        const apiLang = langMapping[i18n.language] || 'ru';

        // Fetch achievements and statistics in parallel
        const [achievementsData, statisticsData] = await Promise.all([
          aboutService.getAchievements(i18n.language),
          aboutService.getStatistics(i18n.language)
        ]);

        setAchievements(achievementsData);
        setStatistics(statisticsData);

      } catch (err) {
        console.error('Error fetching achievements data:', err);
        setError(err.message);
        // Set empty data on error
        setAchievements([]);
        setStatistics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  // Анимация появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleStats(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  // For backward compatibility, convert statistics to old format
  const stats = statistics.map(stat => ({
    number: parseInt(stat.value) || 0,
    label: stat.name,
    suffix: stat.unit || ""
  }));

  // Display loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  // Display error state
  if (error && achievements.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">❌</div>
        </div>
      </section>
    );
  }

  // Фильтрация достижений
  const filteredAchievements = activeFilter === 'all'
    ? achievements
    : achievements.filter(achievement => achievement.category === activeFilter);

  // Функция для получения цвета границы по категории
  const getBorderColor = (category) => {
    const colors = {
      education: 'border-yellow-400',
      science: 'border-red-400',
      international: 'border-blue-400',
      infrastructure: 'border-green-400'
    };
    return colors[category] || 'border-gray-400';
  };

  // Категории для фильтров из переводов
  const categories = [
    { id: 'all', name: t('achievement.filters.all') },
    { id: 'education', name: t('achievement.filters.education') },
    { id: 'science', name: t('achievement.filters.science') },
    { id: 'international', name: t('achievement.filters.international') },
    { id: 'infrastructure', name: t('achievement.filters.infrastructure') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t('achievement.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('achievement.subtitle')}
          </p>
        </div>

        {/* Статистика */}
        <section id="stats-section" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                number={stat.number}
                label={stat.label}
                suffix={stat.suffix}
                index={index}
                visibleStats={visibleStats}
              />
            ))}
          </div>
        </section>

        {/* Фильтры */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Сетка достижений */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
                getBorderColor={getBorderColor}
                t={t}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AchievementsPage;