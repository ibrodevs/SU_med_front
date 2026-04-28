import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  AcademicCapIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  HeartIcon,
  UserGroupIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import { missionData } from '../../data/missionData';

// Icon mapping helper
const IconComponent = ({ iconName, className }) => {
  const icons = {
    AcademicCapIcon: AcademicCapIcon,
    BeakerIcon: BeakerIcon,
    ComputerDesktopIcon: ComputerDesktopIcon,
    RocketLaunchIcon: RocketLaunchIcon,
    GlobeAltIcon: GlobeAltIcon,
    HeartIcon: HeartIcon,
    UserGroupIcon: UserGroupIcon,
    SparklesIcon: SparklesIcon,
    ShieldCheckIcon: ShieldCheckIcon,
    BriefcaseIcon: BriefcaseIcon
  };
  const Icon = icons[iconName] || HeartIcon;
  return <Icon className={className} />;
};

const Mission = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'ru';
  const data = missionData[currentLang] || missionData['ru'];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-slate-50 z-10" />
          <img 
            src="/images/n-bg-1.jpg" 
            alt="University Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-blue-100 uppercase bg-blue-600/30 backdrop-blur-md rounded-full border border-blue-400/30">
              {data.mission.subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              {data.mission.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-50 leading-relaxed max-w-3xl mx-auto font-light">
              {data.mission.text}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Strategic Goals Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto relative z-30 -mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.strategicGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 border border-blue-50 hover:border-blue-200 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-500">
                <IconComponent 
                  iconName={goal.icon} 
                  className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-500" 
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{goal.title}</h3>
              <p className="text-slate-600 leading-relaxed">{goal.description}</p>
            </motion.div>
          ))}
          
          {/* Vision Card - Special styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-blue-600/20 text-white flex flex-col justify-center"
          >
            <SparklesIcon className="w-12 h-12 mb-6 text-blue-200" />
            <h3 className="text-2xl font-bold mb-4">{data.mission.vision_title}</h3>
            <p className="text-blue-50 leading-relaxed text-lg italic">
              "{data.mission.vision_text}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-slate-200 hidden md:block" />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Наша История</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="space-y-16 relative">
            {data.history.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Bases Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">{data.clinicalBases.title}</h2>
              <p className="text-slate-600 text-lg">{data.clinicalBases.subtitle}</p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-blue-600 font-semibold cursor-pointer group">
                Подробнее о клиниках 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.clinicalBases.items.map((base, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                  <BriefcaseIcon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{base.name}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{base.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 z-0" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-10" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Наши Ценности</h2>
            <p className="text-blue-200">Фундамент нашего успеха и академической честности</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg border border-white/10 p-8 rounded-3xl text-center hover:bg-white/20 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed opacity-80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 relative`}>
      {/* Dot on line */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-last'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-blue-600 font-black text-4xl opacity-20 block mb-2">{item.year}</span>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
          <p className="text-slate-600 leading-relaxed">{item.description}</p>
        </motion.div>
      </div>

      {/* Placeholder for the other side on desktop */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
};

export default Mission;