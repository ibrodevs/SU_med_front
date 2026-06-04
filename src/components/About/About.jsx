import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Landmark, Building2, Stethoscope, Microscope, Target, Eye, Lightbulb, Star, UserRound, School, GraduationCap, Calendar, Pill, Brain, Monitor, Home, Users, ClipboardList, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  const [playingVideo, setPlayingVideo] = useState(false);

  const timeline = [
    { 
      year: 1995, 
      event: t('about.timeline_1995'),
      description: t('about.timeline_1995_desc'),
      icon: Landmark
    },
    { 
      year: 2000, 
      event: t('about.timeline_2000'),
      description: t('about.timeline_2000_desc'),
      icon: Building2
    },
    { 
      year: 2010, 
      event: t('about.timeline_2010'),
      description: t('about.timeline_2010_desc'),
      icon: Stethoscope
    },
    { 
      year: 2020, 
      event: t('about.timeline_2020'),
      description: t('about.timeline_2020_desc'),
      icon: Microscope
    }
  ];

  const values = [
    { 
      icon: Target, 
      title: t('about.value_1_title'), 
      description: t('about.value_1_desc')
    },
    { 
      icon: Eye, 
      title: t('about.value_2_title'), 
      description: t('about.value_2_desc')
    },
    { 
      icon: Lightbulb, 
      title: t('about.value_3_title'), 
      description: t('about.value_3_desc')
    },
    { 
      icon: Star, 
      title: t('about.value_4_title'), 
      description: t('about.value_4_desc')
    }
  ];

  const achievements = [
    { 
      number: "150+", 
      label: t('about.faculty_count'),
      icon: UserRound,
      color: "blue"
    },
    { 
      number: "6", 
      label: t('about.departments_count'),
      icon: School,
      color: "blue"
    },
    { 
      number: "3,500+", 
      label: t('about.students_count'),
      icon: GraduationCap,
      color: "blue"
    },
    { 
      number: "29", 
      label: t('about.years_count'),
      icon: Calendar,
      color: "blue"
    }
  ];

  const schools = [
    { name: t('about.general_medicine'), established: "2000", icon: Stethoscope },
    { name: t('about.dentistry'), established: "2005", icon: Stethoscope },
    { name: t('about.pharmacy'), established: "2008", icon: Pill },
    { name: t('about.nursing'), established: "2010", icon: UserRound },
    { name: t('about.public_health'), established: "2015", icon: Building2 },
    { name: t('about.medical_psychology'), established: "2018", icon: Brain }
  ];

  const researchCenters = [
    { name: t('about.clinical_center'), focus: t('about.patient_care'), icon: Building2 },
    { name: t('about.research_lab'), focus: t('about.medical_research'), icon: Microscope },
    { name: t('about.simulation_center'), focus: t('about.practical_training'), icon: Stethoscope },
    { name: t('about.telemedicine_center'), focus: t('about.remote_care'), icon: Monitor }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-700 transition-colors duration-200 font-medium">
              {t('nav.home')}
            </a>
            <span className="text-gray-400">›</span>
            <span className="text-blue-700 font-semibold">{t('nav.about')}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <section className="text-center mb-20 animate-fadeInUp">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 px-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                {t('about.hero_title')}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                {t('about.hero_subtitle')}
              </p>
              <div className="mt-8 flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.achievements_title')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                  {achievement.icon}
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition-colors duration-300">
                  {achievement.number}
                </div>
                <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.mission_values')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-300">
                <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300">
                  {value.description}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-16 md:mb-20 animate-fadeInUp">
  <div className="text-center mb-10 md:mb-12">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about.university_history')}</h2>
    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
  </div>
  
  <div className="relative">
    {/* Мобильная вертикальная линия - видна только на мобильных */}
    <div className="block md:hidden absolute left-4 sm:left-6 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
    
    {/* Десктопная вертикальная линия */}
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full"></div>
    
    {timeline.map((item, index) => (
      <div key={index} className="flex mb-8 md:mb-12">
        {/* Точка на временной линии */}
        <div className="absolute left-4 sm:left-6 md:left-1/2 transform -translate-x-1/2 w-5 h-5 md:w-6 md:h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 hover:bg-blue-800 hover:scale-110 md:hover:scale-125 transition-all duration-300"></div>
        
        {/* Контент */}
        <div className={`w-full ml-10 sm:ml-14 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8 md:text-right' : 'md:w-1/2 md:pl-8 md:order-2'}`}>
          <div className="group bg-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-md md:shadow-xl hover:shadow-lg md:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 md:hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
            <div className="flex items-center mb-3 md:mb-4">
              <span className="text-2xl md:text-3xl mr-3">{item.icon}</span>
              <span className="text-lg md:text-2xl font-bold text-blue-700 group-hover:text-blue-900 transition-colors duration-300">
                {item.year}
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 group-hover:text-blue-900 transition-colors duration-300">
              {item.event}
            </h3>
            <p className="text-sm md:text-base text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              {item.description}
            </p>
          </div>
        </div>
        
        {/* Пустой блок для чередования на десктопе */}
        <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? '' : 'order-1'}`}></div>
      </div>
    ))}
  </div>
</section>

        {/* Leadership Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.leadership')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-white to-blue-50 p-12 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <GraduationCap className="w-20 h-20" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                    {t('about.rector_name')}
                  </h3>
                  <p className="text-xl text-blue-700 group-hover:text-blue-900 transition-colors duration-300 mb-4">
                    {t('about.rector_title')}
                  </p>
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                    {t('about.rector_bio')}
                  </p>
                  <div className="mt-6 flex justify-center md:justify-start">
                    <div className="w-0 group-hover:w-32 h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Departments Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.medical_departments')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school, index) => (
              <div key={index} className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <school.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {school.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {t('about.established')}: {school.established}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Medical Centers Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.medical_centers')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {researchCenters.map((center, index) => (
              <div key={index} className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <center.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-2">
                  {center.name}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                  {center.focus}
                </p>
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.video_presentation')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="group relative bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              {!playingVideo ? (
                <div 
                  className="relative aspect-video flex items-center justify-center cursor-pointer"
                  onClick={() => setPlayingVideo(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-800/80 flex items-center justify-center">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl group-hover:shadow-3xl transition-shadow duration-500">
                        <div className="w-0 h-0 border-l-8 border-l-blue-600 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t('about.watch_video')}
                      </h3>
                      <p className="text-blue-200">
                        {t('about.video_duration')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/SdluvCyzd6M?autoplay=1"
                    title="University Presentation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-3xl"
                  ></iframe>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                  {t('about.subtitles_available')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Medical Resources Section */}
        <section className="mb-20 animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.medical_resources')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Building2 className="w-8 h-8 text-blue-600" /></div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.university_hospital')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.hospital_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Microscope className="w-8 h-8 text-blue-600" /></div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.medical_labs')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.labs_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-blue-100 hover:border-blue-300">
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"><Home className="w-8 h-8 text-blue-600" /></div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.student_dormitory')}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                {t('about.dormitory_desc')}
              </p>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full mt-4"></div>
            </div>
          </div>
        </section>

        {/* Quick Links Section */}
        <section className="animate-fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('about.quick_links')}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <a href="/about/management" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.management')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
            
            <a href="/hsm/accreditation" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                <ClipboardList className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.charter_documents')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
            
            <a href="/about/careers" className="group bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-4 border border-blue-100 hover:border-blue-200">
              <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                <Briefcase className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 group-hover:text-blue-700 transition-colors duration-300 mb-3">
                {t('about.careers')}
              </h3>
              <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 mx-auto rounded-full"></div>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
