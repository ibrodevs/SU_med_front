import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  GraduationCap, 
  FlaskConical, 
  Users, 
  Sparkles,
  Cpu,
  Languages
} from 'lucide-react';

const LearningGoals = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const objectives = [
    { icon: Cpu, key: 'effective', color: 'bg-[#0A2647]' },
    { icon: Rocket, key: 'dual', color: 'bg-[#144272]' },
    { icon: Languages, key: 'multilingual', color: 'bg-[#205295]' },
    { icon: FlaskConical, key: 'hybrid', color: 'bg-[#2C7865]' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            {t('learningGoals.subtitle')}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
            {t('learningGoals.title')}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-[#0A2647] to-[#144272] mx-auto rounded-full"></div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 shadow-2xl shadow-blue-900/5 mb-20 border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Sparkles className="w-32 h-32 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[#0A2647]" />
            {t('learningGoals.mission.title')}
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "{t('learningGoals.mission.text')}"
          </p>
        </motion.div>

        {/* Objectives Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            {t('learningGoals.objectives.title')}
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {objectives.map((obj, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 ${obj.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <obj.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-slate-700 font-semibold leading-snug">
                  {t(`learningGoals.objectives.${obj.key}`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Vision/Motto */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-bold text-sm">
            <Users className="w-5 h-5" />
            <span>Ориентация на результат и успех студентов</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningGoals;