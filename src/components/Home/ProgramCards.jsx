import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Activity, Pill, Eye } from 'lucide-react';

const ProgramCards = () => {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

  // Данные программ с использованием переводов
  const programs = [
    {
      id: 1,
      icon: <Stethoscope className="w-12 h-12 text-blue-600" />,
      titleKey: 'programs.generalMedicine.title',
      levelKey: 'programs.levels.bachelor',
      durationKey: 'programs.durations.fourYears',
      link: '/HSM/programs',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    {
      id: 2,
      icon: <Activity className="w-12 h-12 text-teal-600" />,
      titleKey: 'programs.dentistry.title',
      levelKey: 'programs.levels.bachelor',
      durationKey: 'programs.durations.fiveYears',
      link: '/HSM/programs',
      color: 'from-teal-500 to-emerald-500',
      bgColor: 'bg-gradient-to-br from-teal-50 to-emerald-50'
    },
    {
      id: 3,
      icon: <Pill className="w-12 h-12 text-indigo-600" />,
      titleKey: 'programs.pharmacy.title',
      levelKey: 'programs.levels.bachelor',
      durationKey: 'programs.durations.fourYears',
      link: '/HSM/programs',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-50'
    },
    {
      id: 4,
      icon: <Eye className="w-12 h-12 text-violet-600" />,
      titleKey: 'programs.medicalOptics.title',
      levelKey: 'programs.levels.master',
      durationKey: 'programs.durations.twoYears',
      link: '/HSM/programs',
      color: 'from-violet-500 to-fuchsia-500',
      bgColor: 'bg-gradient-to-br from-violet-50 to-fuchsia-50'
    }
  ];

  // Автопрокрутка карусели
  useEffect(() => {
    if (window.innerWidth < 768) { // Только для мобильных
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === programs.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [programs.length]);

  // Функции для карусели
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === programs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? programs.length - 1 : prevIndex - 1
    );
  };

  const navigate = useNavigate();


  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            {t('programs.title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
          <p className="text-blue-700 mt-4 max-w-2xl mx-auto">
            {t('programs.subtitle')}
          </p>
        </div>

        {/* Десктопная версия - сетка 2x2 с анимациями */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className={`rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-lg ${program.bgColor} border border-white`}
              onMouseEnter={() => setIsHovered(program.id)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="p-8 relative">
                {/* Анимированный фон */}
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovered === program.id ? 'opacity-10' : ''} ${program.bgColor}`}></div>

                {/* Иконка с анимацией */}
                <div className={`flex mb-6 transform transition-all duration-500 ${isHovered === program.id ? 'scale-110 rotate-6' : ''}`}>
                  {program.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3 relative">
                  {t(program.titleKey)}
                  <span className={`absolute -bottom-2 left-0 h-1 w-12 ${isHovered === program.id ? 'w-20' : ''} bg-gradient-to-r ${program.color} transition-all duration-500`}></span>
                </h3>

                <div className="flex justify-between items-center mt-6 mb-7">
                  <span className={`bg-gradient-to-r ${program.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                    {t(program.levelKey)}
                  </span>
                  <span className="text-gray-700 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t(program.durationKey)}
                  </span>
                </div>

                <a
                  href={program.link}
                  className={`block w-full bg-gradient-to-r ${program.color} hover:shadow-lg text-white text-center font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group`}
                >
                  <span className="relative z-10">{t('programs.learnMore')}</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Мобильная версия - улучшенная карусель */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {programs.map((program) => (
                <div key={program.id} className="w-full flex-shrink-0 px-4">
                  <div className={`rounded-2xl overflow-hidden shadow-xl p-6 ${program.bgColor} border border-white`}>
                    <div className="flex justify-center mb-6 transform transition-transform duration-500" style={{ transform: `scale(${activeIndex === program.id - 1 ? 1.1 : 1})` }}>
                      {program.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                      {t(program.titleKey)}
                    </h3>

                    <div className="flex justify-between items-center mt-6 mb-7">
                      <span className={`bg-gradient-to-r ${program.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full`}>
                        {t(program.levelKey)}
                      </span>
                      <span className="text-gray-700 font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {t(program.durationKey)}
                      </span>
                    </div>

                    <a
                      href={program.link}
                      className={`block w-full bg-gradient-to-r ${program.color} text-white text-center font-medium py-3 px-6 rounded-xl transition-colors duration-300`}
                    >
                      {t('programs.learnMore')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Навигационные кнопки для карусели */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            aria-label={t('programs.previousProgram')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
            aria-label={t('programs.nextProgram')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Индикаторы карусели */}
          <div className="flex justify-center mt-6 space-x-3">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-blue-600 scale-125' : 'bg-blue-200'}`}
                aria-label={`${t('programs.goToProgram')} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Декоративный элемент внизу */}
        <div className="text-center mt-16">
          <button 
            onClick={() => navigate('/HSM/programs')} // замените на ваш путь
            className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-full shadow-md text-blue-600 font-medium group cursor-pointer hover:bg-blue-50 transition-all duration-300"
          >
            <span>{t('programs.allPrograms')}</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProgramCards;