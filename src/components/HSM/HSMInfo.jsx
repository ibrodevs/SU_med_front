import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Users, 
  FileCheck, 
  Heart, 
  ShieldCheck, 
  Building2, 
  Stethoscope, 
  Microscope, 
  Globe,
  ExternalLink,
  BookOpen,
  Activity,
  HeartPulse,
  Award,
  ChevronRight
} from 'lucide-react';

const HSMInfo = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = `${t('nav.HSM')} - ${t('hsm.University_name')}`;
  }, [i18n.language, t]);

  const studyBaseItems = [
    { key: 'item_1', icon: <HeartPulse className="w-6 h-6 text-blue-600" /> },
    { key: 'item_2', icon: <Microscope className="w-6 h-6 text-indigo-600" /> },
    { key: 'item_3', icon: <Activity className="w-6 h-6 text-cyan-600" /> },
    { key: 'item_4', icon: <ShieldCheck className="w-6 h-6 text-teal-600" /> },
    { key: 'item_5', icon: <Building2 className="w-6 h-6 text-emerald-600" /> },
    { key: 'item_6', icon: <BookOpen className="w-6 h-6 text-sky-600" /> },
    { key: 'item_7', icon: <Stethoscope className="w-6 h-6 text-red-500" /> },
    { key: 'item_8', icon: <GraduationCap className="w-6 h-6 text-violet-600" /> },
    { key: 'item_9', icon: <Globe className="w-6 h-6 text-blue-500" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 text-sm font-medium text-blue-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t('hsm.University_name')}
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('nav.HSM')}
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('hsm.subtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://www.su-medical-school.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-950 font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t('nav.HSM')}
              <ExternalLink className="w-4 h-4 text-blue-900" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Sections List */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Section 1: About Faculty */}
            <motion.section 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                  <Building2 className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('hsm.about_faculty_title')}
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-base md:text-lg font-normal">
                <p>{t('hsm.about_faculty_text_1')}</p>
                <p className="border-l-4 border-blue-500 pl-4 bg-blue-50/40 py-2 rounded-r-xl">
                  {t('hsm.about_faculty_text_2')}
                </p>
              </div>
            </motion.section>

            {/* Section 2: Staff and Teachers */}
            <motion.section 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                  <Users className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('hsm.staff_teachers_title')}
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg mb-6">
                {t('hsm.staff_teachers_text')}
              </p>
              
              {/* Stat highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">20+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Докторов / Кандидатов наук</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">5-6 лет</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Срок обучения</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">Врач</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Квалификация</div>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Training Base */}
            <motion.section 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600">
                  <Microscope className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('hsm.study_base_title')}
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg mb-6">
                {t('hsm.study_base_text_1')}
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 mb-4">
                {t('hsm.study_base_text_2')}
              </h3>

              {/* Training facilities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {studyBaseItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:bg-white hover:shadow-md hover:border-slate-200/50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2.5 bg-white rounded-xl shadow-sm">
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold text-slate-700 leading-snug">
                      {t(`hsm.study_base_${item.key}`)}
                    </span>
                  </motion.div>
                ))}
              </div>

              <p className="text-slate-700 leading-relaxed text-sm md:text-base bg-slate-50 p-5 rounded-2xl border-l-4 border-cyan-500">
                {t('hsm.study_base_extra')}
              </p>
            </motion.section>

            {/* Section 4: Our Values */}
            <motion.section 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-2xl text-red-500">
                  <Heart className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('hsm.our_values_title')}
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base md:text-lg border-l-4 border-red-400 pl-4">
                {t('hsm.our_values_text')}
              </p>
            </motion.section>

            {/* Section 5: University Policy */}
            <motion.section 
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {t('hsm.uni_policy_title')}
                </h2>
              </div>
              <div className="space-y-4 text-slate-700 leading-relaxed text-base md:text-lg">
                <p>{t('hsm.uni_policy_text_1')}</p>
                <p>{t('hsm.uni_policy_text_2')}</p>
              </div>
            </motion.section>

          </div>

          {/* Right Column: Quick Links & Accreditations Info */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Quick Links Menu */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-200">
                <Award className="w-5 h-5" />
                {t('hsm.quick_access', 'Быстрый доступ')}
              </h3>
              
              <div className="space-y-3">
                <a 
                  href="/hsm/programs" 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="font-semibold text-sm">{t('hsm.programs')}</span>
                  <ChevronRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/hsm/AS" 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="font-semibold text-sm">{t('hsm.faculty')}</span>
                  <ChevronRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/hsm/accreditation" 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="font-semibold text-sm">{t('hsm.accreditation')}</span>
                  <ChevronRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/hsm/learning-goals" 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="font-semibold text-sm">{t('hsm.learning_goals')}</span>
                  <ChevronRight className="w-4 h-4 text-blue-300 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Quality Standard Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-800 mb-2">
                {t('hsm.quality_first')}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                {t('hsm.quality_description')}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HSMInfo;