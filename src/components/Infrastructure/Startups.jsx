import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Rocket, DollarSign, GraduationCap, Microscope, Check } from 'lucide-react';
import { startupsAPI, infrastructureHelpers } from '../../services/infrastructureService';

const Startups = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startupCategories, setStartupCategories] = useState([]);
  const [startups, setStartups] = useState([]);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    fetchStartupsData();
  }, [i18n.language]);

  // Fetch startups data from API
  const fetchStartupsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
      const response = await startupsAPI.getAllForFrontend(lang);

      if (response.success && response.data) {
        const transformedData = infrastructureHelpers.transformStartupData(response, lang);

        // Add 'all' category
        const allCategory = {
          id: 'all',
          name: t('startups.allStartups'),
          icon: 'rocket',
          count: transformedData.startups.length
        }; setStartupCategories([allCategory, ...transformedData.categories]);
        setStartups(transformedData.startups);
        setStatistics(transformedData.statistics);
      }
    } catch (error) {
      console.error('Error fetching startups data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStartups = activeCategory === 'all'
    ? startups
    : startups.filter(startup => startup.categoryId === activeCategory);

  const defaultStatistics = [
    { number: `${startups.length}+`, label: t('startups.activeStartups') },
    { number: statistics.total_funding || '$5M+', label: t('startups.totalFunding') },
    { number: `${statistics.team_members || 50}+`, label: t('startups.teamMembers') },
    { number: statistics.patents || '10+', label: t('startups.patents') }
  ];

  const successStories = [
    {
      name: t('startups.story1Name'),
      quote: t('startups.story1Quote'),
      role: t('startups.story1Role')
    },
    {
      name: t('startups.story2Name'),
      quote: t('startups.story2Quote'),
      role: t('startups.story2Role')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">

          </div>
        </div>
      </header>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
          <button
            onClick={fetchStartupsData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('common.tryAgain') || 'Try Again'}
          </button>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('startups.heroTitle')}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {t('startups.heroSubtitle')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {defaultStatistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

         

          {/* Startups Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
                {t('startups.ourStartups')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedStartup(startup)}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center text-white">
                      <div className="flex justify-center mb-4"><Rocket className="w-14 h-14" /></div>
                      <h3 className="text-2xl font-bold mb-2">{startup.name}</h3>
                      <div className="flex justify-center items-center space-x-2">
                        <span className="bg-blue-400 px-3 py-1 rounded-full text-sm">
                          {startup.category}
                        </span>
                        <span className="bg-green-400 px-3 py-1 rounded-full text-sm">
                          {startup.stage}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {startup.description}
                      </p>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-sm text-gray-500">
                          {t('startups.funding')}: <span className="font-bold text-green-600">{startup.funding}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${startup.status === t('startups.active') ? 'bg-green-100 text-green-800' :
                          startup.status === t('startups.scaling') ? 'bg-blue-100 text-blue-800' :
                            startup.status === t('startups.development') ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {startup.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{startup.year}</span>
                        <button className="text-blue-600 font-semibold hover:text-blue-800">
                          {t('startups.learnMore')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Startup Details Modal */}
          {selectedStartup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedStartup.name}</h2>
                      <div className="flex items-center space-x-4 flex-wrap">
                        <span className="bg-blue-500 px-3 py-1 rounded-full">
                          {selectedStartup.category}
                        </span>
                        <span className="bg-green-500 px-3 py-1 rounded-full">
                          {selectedStartup.stage}
                        </span>
                        <span className="bg-purple-500 px-3 py-1 rounded-full">
                          {selectedStartup.year}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedStartup(null)}
                      className="text-white hover:text-gray-200 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="text-center bg-blue-50 rounded-2xl p-8 mb-6">
                        <div className="flex justify-center mb-4 text-blue-600"><Rocket className="w-20 h-20" /></div>
                        <div className="text-2xl font-bold text-blue-800">{selectedStartup.name}</div>
                        <div className="text-lg text-blue-600 mt-2">{selectedStartup.stage}</div>
                      </div>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('startups.description')}
                      </h3>
                      <p className="text-gray-700 mb-6">{selectedStartup.fullDescription}</p>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('startups.achievements')}
                      </h3>
                      <ul className="space-y-2 mb-6">
                        {selectedStartup.achievements && selectedStartup.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">
                          {t('startups.fundingInfo')}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('startups.totalFunding')}:</span>
                            <span className="font-bold text-green-600 text-lg">{selectedStartup.funding}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('startups.currentStage')}:</span>
                            <span className="font-bold">{selectedStartup.stage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('startups.status')}:</span>
                            <span className={`font-bold ${selectedStartup.status === t('startups.active') ? 'text-green-600' :
                              selectedStartup.status === t('startups.scaling') ? 'text-blue-600' :
                                selectedStartup.status === t('startups.development') ? 'text-yellow-600' :
                                  'text-gray-600'
                              }`}>
                              {selectedStartup.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('startups.team')}
                      </h3>
                      <div className="space-y-3 mb-6">
                        {selectedStartup.team && selectedStartup.team.map((member, index) => (
                          <div
                            key={index}
                            className="bg-white border border-blue-200 rounded-lg p-3"
                          >
                            {member}
                          </div>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('startups.investors')}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedStartup.investors && selectedStartup.investors.map((investor, index) => (
                          <div
                            key={index}
                            className="bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-center text-sm"
                          >
                            {investor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end space-x-4">
                    <button
                      onClick={() => setSelectedStartup(null)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      {t('startups.close')}
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {t('startups.contactTeam')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Support Programs */}
          <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                {t('startups.supportPrograms')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="text-white mb-4"><DollarSign className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold mb-3">{t('startups.fundingSupport')}</h3>
                  <p className="opacity-90">
                    {t('startups.fundingSupportDesc')}
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-white mb-4"><GraduationCap className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold mb-3">{t('startups.mentorship')}</h3>
                  <p className="opacity-90">
                    {t('startups.mentorshipDesc')}
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-white mb-4"><Microscope className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold mb-3">{t('startups.labAccess')}</h3>
                  <p className="opacity-90">
                    {t('startups.labAccessDesc')}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Startups;