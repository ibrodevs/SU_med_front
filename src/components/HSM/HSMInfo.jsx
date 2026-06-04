import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getHSMInfo, getLocalizedText } from '../../data/hsmData';
import hsmService from '../../services/hsmService';
import { 
  GraduationCap, 
  Users, 
  FileCheck, 
  BarChart3,
  ExternalLink,
  Heart,
  ShieldCheck,
  Star,
  Clock,
  Building2,
  Stethoscope,
  Microscope,
  Globe
} from 'lucide-react';

const HSMInfo = () => {
  const { t, i18n } = useTranslation();
  const [hsmInfo, setHsmInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      let data = null;
      try {
        const res = await hsmService.getHSMInfo(i18n.language);
        if (res && res.title) data = res; // данные с backend
      } catch {
        // игнорируем — используем статический резерв ниже
      }
      if (!data) data = getHSMInfo(); // статический резерв
      if (!data) {
        setError('Failed to load HSM data');
      } else {
        setHsmInfo(data);
      }
      setLoading(false);
    };

    loadData();
  }, [i18n.language]);

  const localizedData = useMemo(() => {
    if (!hsmInfo) return null;
    
    return {
      title: getLocalizedText(hsmInfo, 'title', i18n.language),
      description: getLocalizedText(hsmInfo, 'description', i18n.language),
      history: getLocalizedText(hsmInfo, 'history', i18n.language),
      mainDirections: getLocalizedText(hsmInfo, 'main_directions', i18n.language)
    };
  }, [hsmInfo, i18n.language]);

  useEffect(() => {
    if (localizedData?.title) {
      document.title = `${localizedData.title} - Салымбеков Университет`;
    }
  }, [localizedData?.title]);

  // Автоматическая смена секций
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const medicalStats = [
    { icon: <Users className="w-8 h-8" />, value: "500+", label: t('hsm.students', 'Студентов') },
    { icon: <GraduationCap className="w-8 h-8" />, value: "50+", label: t('hsm.professors', 'Профессоров') },
    { icon: <ShieldCheck className="w-8 h-8" />, value: "95%", label: t('hsm.success_rate', 'Успеваемость') },
    { icon: <Heart className="w-8 h-8" />, value: "1000+", label: t('hsm.patients', 'Пациентов в год') }
  ];

  const quickLinks = [
    {
      href:'/hsm/programs',
      icon: <GraduationCap className="w-6 h-6" />,
      title: t('hsm.programs', 'Программы'),
      description: t('hsm.view_programs', 'Ознакомьтесь с нашими образовательными программами'),
      gradient: "from-[#0A2647] to-[#144272]"
    },
    {
      href: "/hsm/AS",
      icon: <Users className="w-6 h-6" />,
      title: t('hsm.faculty', 'Преподаватели'),
      description: t('hsm.meet_faculty', 'Познакомьтесь с нашими преподавателями'),
      gradient: "from-[#1B4242] to-[#2C7865]"
    },
    {
      href: "/hsm/accreditation",
      icon: <FileCheck className="w-6 h-6" />,
      title: t('hsm.accreditation', 'Аккредитация'),
      description: t('hsm.view_accreditation', 'Наши аккредитации и сертификаты'),
      gradient: "from-[#205295] to-[#144272]"
    },
    {
      href: "/hsm/learning-goals",
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('hsm.learning_goals', 'Цели обучения'),
      description: t('hsm.view_goals', 'Цели и результаты обучения'),
      gradient: "from-[#0891b2] to-[#0d9488]"
    }
  ];

  const medicalFeatures = [
    {
      icon: Building2,
      title: t('hsm.modern_equipment', 'Современное оборудование'),
      description: t('hsm.modern_equipment_desc', 'Оснащение последними медицинскими технологиями')
    },
    {
      icon: Stethoscope,
      title: t('hsm.practice', 'Практическая подготовка'),
      description: t('hsm.practice_desc', 'Реальная практика в лучших клиниках')
    },
    {
      icon: Globe,
      title: t('hsm.international', 'Международные стандарты'),
      description: t('hsm.international_desc', 'Обучение по мировым стандартам медицины')
    },
    {
      icon: Microscope,
      title: t('hsm.research', 'Научные исследования'),
      description: t('hsm.research_desc', 'Участие в передовых медицинских исследованиях')
    }
  ];

  const renderFormattedText = (text) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      if (paragraph.trim().startsWith('•')) {
        return (
          <motion.div 
            key={index} 
            className="flex items-start mb-3"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">{paragraph.replace('•', '').trim()}</span>
          </motion.div>
        );
      }
      
      if (paragraph.trim().endsWith(':')) {
        return (
          <motion.p 
            key={index} 
            className="mb-4 font-semibold text-gray-900 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {paragraph}
          </motion.p>
        );
      }
      
      return (
        <motion.p 
          key={index} 
          className="mb-4 text-gray-700 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {paragraph}
        </motion.p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-96">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
              ></motion.div>
              <motion.p 
                className="text-gray-600 text-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {t('common.loading', 'Загрузка медицинских данных...')}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hsmInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto border-l-4 border-red-500">
              <motion.div
                animate={{ pulse: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('hsm.error', 'Ошибка загрузки')}</h2>
              <p className="text-gray-600 mb-6">{t('hsm.no_data', 'Не удалось загрузить информацию о медицинской школе')}</p>
              <motion.button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('common.try_again', 'Попробовать снова')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24">
      {/* Hero Section с медицинской тематикой */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-medical-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {localizedData.title}
            </motion.h1>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-8"
              initial={{ width: 0 }}
              animate={{ width: 128 }}
              transition={{ delay: 0.5, duration: 1 }}
            ></motion.div>
            <motion.p 
              className="text-xl text-blue-100 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {t('hsm.hero_subtitle', 'Готовим будущих лидеров медицины с инновационным подходом к образованию')}
            </motion.p>
          </motion.div>
        </div>

        {/* Subtle floating medical icons */}
        <motion.div
          className="absolute top-10 left-10 opacity-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Building2 className="w-12 h-12 text-white" />
        </motion.div>
        <motion.div
          className="absolute top-20 right-20 opacity-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        >
          <Heart className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-20 opacity-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          <Stethoscope className="w-8 h-8 text-white" />
        </motion.div>
      </motion.section>

      {/* Статистика */}
      <section className="relative -mt-10 z-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {medicalStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 text-center border border-gray-100"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-blue-600 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Особенности медицинского образования */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('hsm.why_choose', 'Почему выбирают нашу медицинскую школу?')}
            </motion.h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300 border border-gray-100"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0A2647] to-[#144272] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Основной контент с табами */}
        <motion.section
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Навигация по табам */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {['about', 'history', 'directions'].map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(index)}
                  className={`flex-1 min-w-0 px-6 py-4 text-lg font-medium transition-all duration-300 ${
                    activeSection === index
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {t(`hsm.${tab}`, 
                    tab === 'about' ? 'О школе' : 
                    tab === 'history' ? 'История' : 'Направления'
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Контент табов */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="prose prose-lg max-w-none"
              >
                {activeSection === 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('hsm.about_hsm', 'О Высшей медицинской школе')}</h3>
                    {renderFormattedText(localizedData.description)}
                  </div>
                )}
                {activeSection === 1 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('hsm.history', 'История школы')}</h3>
                    {renderFormattedText(localizedData.history)}
                  </div>
                )}
                {activeSection === 2 && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('hsm.main_directions', 'Основные направления')}</h3>
                    {renderFormattedText(localizedData.mainDirections)}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Быстрые ссылки */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('hsm.quick_access', 'Быстрый доступ')}
            </h2>
            <p className="text-gray-600 text-lg">
              {t('hsm.quick_access_desc', 'Вся необходимая информация в одном месте')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative p-6 z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${link.gradient} rounded-xl flex items-center justify-center mb-4 text-white`}>
                    {link.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    {link.title}
                    <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Стили для медицинского паттерна */}
      <style jsx>{`
        .bg-medical-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default HSMInfo;