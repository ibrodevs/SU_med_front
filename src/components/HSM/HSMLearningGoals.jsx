import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getLearningGoals, getLocalizedText } from '../../data/hsmData';

// Компонент модального окна с горизонтальной анимацией
const HorizontalModal = ({ isOpen, onClose, goal, language }) => {
  const { t } = useTranslation();
  
  const title = useMemo(() => getLocalizedText(goal, 'title', language), [goal, language]);
  const description = useMemo(() => getLocalizedText(goal, 'description', language), [goal, language]);
  const competencies = useMemo(() => getLocalizedText(goal, 'competencies', language), [goal, language]);
  const careerProspects = useMemo(() => getLocalizedText(goal, 'career_prospects', language), [goal, language]);

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Блокировка скролла
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Затемнение фона */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Модальное окно */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 30, 
              stiffness: 300 
            }}
            className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-50 shadow-2xl"
          >
            {/* Заголовок модалки */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label={t('common.close')}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Контент модалки */}
            <div className="h-full overflow-y-auto pb-20">
              <div className="p-6 space-y-6">
                {/* Description */}
                {description && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="p-2 rounded-full bg-blue-100">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {t('hsm.description', 'Описание')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed ml-11">
                      {description}
                    </p>
                  </motion.div>
                )}

                {/* Competencies */}
                {competencies && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="p-2 rounded-full bg-green-100">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {t('hsm.competencies', 'Компетенции')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed ml-11">
                      {competencies}
                    </p>
                  </motion.div>
                )}

                {/* Career Prospects */}
                {careerProspects && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <div className="p-2 rounded-full bg-teal-50">
                        <svg className="w-5 h-5 text-[#2C7865]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                      </div>
                      {t('hsm.career_prospects', 'Карьерные перспективы')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed ml-11">
                      {careerProspects}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Кнопка закрытия внизу */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white to-transparent">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                {t('common.close', 'Закрыть')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Упрощенная карточка для карусели
const LearningGoalCard = ({ goal, language, index, isActive, onOpenModal }) => {
  const { t } = useTranslation();
  
  const title = useMemo(() => getLocalizedText(goal, 'title', language), [goal, language]);
  const description = useMemo(() => getLocalizedText(goal, 'description', language), [goal, language]);

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border-2 ${
        isActive ? 'border-[#144272] scale-105' : 'border-gray-100 scale-95'
      } overflow-hidden flex-shrink-0 w-80 lg:w-96 mx-4 cursor-pointer`}
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => onOpenModal(goal)}
    >
      {/* Заголовок */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 pr-4">
          {title}
        </h3>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Краткое описание */}
      {description && (
        <p className="text-gray-600 line-clamp-3 mb-4">
          {description}
        </p>
      )}

      {/* Кнопка для открытия модалки */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(goal);
        }}
        className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mt-auto"
      >
        {t('common.learn_more', 'Узнать больше')}
        <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  );
};

// Компоненты CarouselControls и остальные остаются без изменений
const CarouselControls = ({ currentIndex, totalItems, onNext, onPrev, onDotClick }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        disabled={currentIndex === 0}
        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>

      <div className="flex gap-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
};

const HSMLearningGoals = () => {
  const { t, i18n } = useTranslation();
  const [learningGoals, setLearningGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        const data = getLearningGoals();
        setLearningGoals(data);
      } catch (error) {
        console.error('Error loading learning goals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredGoals = useMemo(() => {
    return learningGoals.filter(goal => {
      return searchQuery === '' || 
        getLocalizedText(goal, 'title', i18n.language).toLowerCase().includes(searchQuery.toLowerCase()) ||
        getLocalizedText(goal, 'description', i18n.language).toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [learningGoals, searchQuery, i18n.language]);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev === filteredGoals.length - 1 ? prev : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev === 0 ? prev : prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-b-2 border-blue-600"
            ></motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hsm.learning_goals_title', 'Цели и результаты обучения')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('hsm.learning_goals_description', 'Узнайте о компетенциях, которые вы получите, и карьерных возможностях после окончания наших программ')}
          </motion.p>
        </motion.div>

        {/* Поиск */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('hsm.search_placeholder', 'Поиск целей обучения...')}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#144272] focus:border-[#144272] bg-white shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
            />
          </div>
        </motion.div>

        {/* Горизонтальная карусель */}
        {filteredGoals.length > 0 ? (
          <div className="relative">
            <motion.div 
              className="flex overflow-x-visible pb-8 px-4 justify-center"
            >
              <AnimatePresence>
                {filteredGoals.map((goal, index) => (
                  <LearningGoalCard 
                    key={goal.id} 
                    goal={goal} 
                    language={i18n.language}
                    index={index}
                    isActive={index === currentIndex}
                    onOpenModal={openModal}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            <CarouselControls
              currentIndex={currentIndex}
              totalItems={filteredGoals.length}
              onNext={nextSlide}
              onPrev={prevSlide}
              onDotClick={goToSlide}
            />

            <div className="text-center mt-4 text-gray-600">
              {currentIndex + 1} / {filteredGoals.length}
            </div>
          </div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_learning_goals', 'Цели обучения не найдены')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('hsm.no_learning_goals_description', 'Попробуйте изменить параметры поиска')}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('hsm.clear_filters', 'Сбросить фильтры')}
              </button>
            </div>
          </motion.div>
        )}

        

        {/* Модальное окно */}
        <HorizontalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          goal={selectedGoal}
          language={i18n.language}
        />
      </div>
    </div>
  );
};

export default HSMLearningGoals;