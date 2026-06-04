import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HSM = () => {
  const { t } = useTranslation();
  
  // Состояния для фильтров
  const [filters, setFilters] = useState({
    educationLevels: [],
    faculty: '',
    language: '',
    searchQuery: ''
  });

  // Состояния для программ и пагинации
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const programsPerPage = 6;

  // Моковые данные
  const mockPrograms = [
    {
      id: 1,
      title: t('academics.programs.medicine.title'),
      faculty: t('academics.faculties.medical'),
      educationLevel: t('academics.educationLevels.bachelor'),
      language: t('academics.languages.russian'),
      duration: t('academics.durations.fiveSixYears'),
      popularity: 95,
      image: 'https://лазуркин.бел/wp-content/uploads/2020/05/Spetsialnost-79-01-01---Lechebnoe-delo--.jpg',
      description: t('academics.programs.medicine.description'),
      requirements: t('academics.requirements.basic'),
      price: t('academics.prices.semester', { price: 25000 }),
      credits: 300,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 2,
      title: t('academics.programs.dentistry.title'),
      faculty: t('academics.faculties.dental'),
      educationLevel: t('academics.educationLevels.specialist'),
      language: t('academics.languages.kyrgyz'),
      duration: t('academics.durations.fiveYears'),
      popularity: 88,
      image: 'https://dostoma.ru/upload/iblock/b30/vneuu4lpzryi60ejfrq08191tlhrul0v.png',
      description: t('academics.programs.dentistry.description'),
      requirements: t('academics.requirements.basic'),
      price: t('academics.prices.semester', { price: 28000 }),
      credits: 320,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 3,
      title: t('academics.programs.pharmacy.title'),
      faculty: t('academics.faculties.pharmaceutical'),
      educationLevel: t('academics.educationLevels.bachelor'),
      language: t('academics.languages.russian'),
      duration: t('academics.durations.fiveYears'),
      popularity: 76,
      image: 'https://gomel.1prof.by/kcfinder/upload/images/135791-3776.jpg',
      description: t('academics.programs.pharmacy.description'),
      requirements: t('academics.requirements.basic'),
      price: t('academics.prices.semester', { price: 22000 }),
      credits: 300,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 4,
      title: t('academics.programs.biochemistry.title'),
      faculty: t('academics.faculties.biological'),
      educationLevel: t('academics.educationLevels.master'),
      language: t('academics.languages.english'),
      duration: t('academics.durations.twoYears'),
      popularity: 65,
      image: 'https://mbf.msk.ru/images/info_img.jpg',
      description: t('academics.programs.biochemistry.description'),
      requirements: t('academics.requirements.master'),
      price: t('academics.prices.semester', { price: 30000 }),
      credits: 120,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 5,
      title: t('academics.programs.nursing.title'),
      faculty: t('academics.faculties.medical'),
      educationLevel: t('academics.educationLevels.bachelor'),
      language: t('academics.languages.kyrgyz'),
      duration: t('academics.durations.fourYears'),
      popularity: 82,
      image: 'https://mfk1.kg/wp-content/uploads/2022/07/n-bg-1.jpg',
      description: t('academics.programs.nursing.description'),
      requirements: t('academics.requirements.ortOnly'),
      price: t('academics.prices.semester', { price: 18000 }),
      credits: 240,
      studyForm: t('academics.studyForms.fullTimePartTime')
    },
    {
      id: 6,
      title: t('academics.programs.publicHealth.title'),
      faculty: t('academics.faculties.publicHealth'),
      educationLevel: t('academics.educationLevels.master'),
      language: t('academics.languages.russian'),
      duration: t('academics.durations.twoYears'),
      popularity: 59,
      image: 'https://niioz.ru/upload/iblock/1c9/1c9f6777ca6fe42541563d5bd24b6cec.jpg',
      description: t('academics.programs.publicHealth.description'),
      requirements: t('academics.requirements.master'),
      price: t('academics.prices.semester', { price: 26000 }),
      credits: 120,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 7,
      title: t('academics.programs.cybernetics.title'),
      faculty: t('academics.faculties.it'),
      educationLevel: t('academics.educationLevels.bachelor'),
      language: t('academics.languages.russian'),
      duration: t('academics.durations.fourYears'),
      popularity: 71,
      image: 'https://rsmu.ru/fileadmin/templates/img/cardimg/undergraduate/med-info.jpg',
      description: t('academics.programs.cybernetics.description'),
      requirements: t('academics.requirements.basic'),
      price: t('academics.prices.semester', { price: 27000 }),
      credits: 240,
      studyForm: t('academics.studyForms.fullTime')
    },
    {
      id: 8,
      title: t('academics.programs.psychology.title'),
      faculty: t('academics.faculties.psychological'),
      educationLevel: t('academics.educationLevels.specialist'),
      language: t('academics.languages.russian'),
      duration: t('academics.durations.fiveYears'),
      popularity: 68,
      image: 'https://mmamos.ru/wp-content/themes/yootheme/cache/71/klin_psy02-71b7a3e4.jpeg',
      description: t('academics.programs.psychology.description'),
      requirements: t('academics.requirements.basic'),
      price: t('academics.prices.semester', { price: 23000 }),
      credits: 300,
      studyForm: t('academics.studyForms.fullTime')
    }
  ];

  const faculties = [
    t('academics.faculties.medical'),
    t('academics.faculties.dental'),
    t('academics.faculties.pharmaceutical'),
    t('academics.faculties.biological'),
    t('academics.faculties.publicHealth'),
    t('academics.faculties.it'),
    t('academics.faculties.psychological')
  ];

  const educationLevels = [
    t('academics.educationLevels.bachelor'),
    t('academics.educationLevels.specialist'),
    t('academics.educationLevels.master'),
    t('academics.educationLevels.postgraduate')
  ];

  // Имитация загрузки данных
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrograms(mockPrograms);
      setFilteredPrograms(mockPrograms);
      setIsLoading(false);
    };
    
    loadData();
  }, [t]);

  // Фильтрация и сортировка программ
  useEffect(() => {
    let result = [...programs];

    // Поиск по запросу
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(program => 
        program.title.toLowerCase().includes(query) ||
        program.faculty.toLowerCase().includes(query) ||
        program.description.toLowerCase().includes(query)
      );
    }

    // Фильтрация по уровню образования
    if (filters.educationLevels.length > 0) {
      result = result.filter(program => 
        filters.educationLevels.includes(program.educationLevel)
      );
    }

    // Фильтрация по факультету
    if (filters.faculty) {
      result = result.filter(program => program.faculty === filters.faculty);
    }

    // Фильтрация по языку обучения
    if (filters.language) {
      result = result.filter(program => program.language === filters.language);
    }

    // Сортировка
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'duration') {
      result.sort((a, b) => a.duration.localeCompare(b.duration));
    }

    setFilteredPrograms(result);
    setCurrentPage(1);
  }, [filters, sortBy, programs]);

  // Пагинация
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const handleEducationLevelChange = (level) => {
    setFilters(prev => ({
      ...prev,
      educationLevels: prev.educationLevels.includes(level)
        ? prev.educationLevels.filter(l => l !== level)
        : [...prev.educationLevels, level]
    }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      educationLevels: [],
      faculty: '',
      language: '',
      searchQuery: ''
    });
  };

  // Функция для отображения скелетона загрузки
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
          <div className="flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{t('academics.title')}</h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            {t('academics.subtitle')}
          </p>
        </div>
        
        {/* Кнопка для открытия фильтров на мобильных устройствах */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full p-3 bg-white rounded-xl shadow-md flex items-center justify-between"
          >
            <span className="font-medium text-gray-700">{t('academics.filters.title')}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-500 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Сайдбар с фильтрами */}
          <aside className={`w-full lg:w-1/4 bg-white p-4 md:p-6 rounded-xl shadow-lg lg:sticky lg:top-6 h-fit transition-all duration-300 ${isFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">{t('academics.filters.title')}</h2>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {t('academics.filters.resetAll')}
              </button>
            </div>

            {/* Поиск */}
            <div className="mb-4 md:mb-6">
              <h3 className="font-medium text-gray-700 mb-2 md:mb-3">{t('academics.filters.searchPrograms')}</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('academics.filters.searchPlaceholder')}
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                  className="w-full p-2 md:p-3 pl-9 md:pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-gray-400 absolute left-2.5 md:left-3 top-2.5 md:top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Уровень образования */}
            <div className="mb-4 md:mb-6">
              <h3 className="font-medium text-gray-700 mb-2 md:mb-3">{t('academics.filters.educationLevel')}</h3>
              <div className="space-y-1 md:space-y-2">
                {educationLevels.map(level => (
                  <label key={level} className="flex items-center p-1.5 md:p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.educationLevels.includes(level)}
                      onChange={() => handleEducationLevelChange(level)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 md:ml-3 text-gray-700 text-sm md:text-base">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Факультет */}
            <div className="mb-4 md:mb-6">
              <h3 className="font-medium text-gray-700 mb-2 md:mb-3">{t('academics.filters.faculty')}</h3>
              <select
                value={filters.faculty}
                onChange={(e) => handleFilterChange('faculty', e.target.value)}
                className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
              >
                <option value="">{t('academics.filters.allFaculties')}</option>
                {faculties.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>

            {/* Язык обучения */}
            <div className="mb-4 md:mb-6">
              <h3 className="font-medium text-gray-700 mb-2 md:mb-3">{t('academics.filters.language')}</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  t('academics.languages.russian'),
                  t('academics.languages.kyrgyz'),
                  t('academics.languages.english'),
                  t('academics.filters.allLanguages')
                ].map(lang => (
                  <button
                    key={lang}
                    onClick={() => handleFilterChange('language', lang === t('academics.filters.allLanguages') ? '' : lang)}
                    className={`p-1.5 md:p-2 rounded-lg text-xs md:text-sm transition-colors ${
                      filters.language === (lang === t('academics.filters.allLanguages') ? '' : lang) 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопка применения фильтров для мобильных */}
            <div className="lg:hidden mt-4">
              <button
                onClick={() => setIsFiltersOpen(false)}
                className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium"
              >
                {t('academics.filters.applyFilters')}
              </button>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="w-full lg:w-3/4">
            {/* Сортировка и информация */}
            <div className="bg-white rounded-xl shadow-md p-3 md:p-4 mb-4 md:mb-6 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm md:text-base mb-2 sm:mb-0">
                {t('academics.foundPrograms', { count: filteredPrograms.length })}
                {filters.searchQuery && (
                  <span> {t('academics.forQuery')} "<span className="font-semibold">{filters.searchQuery}</span>"</span>
                )}
              </p>
              
              <div className="flex items-center">
                <span className="text-gray-600 text-sm md:text-base mr-2">{t('academics.sorting')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 md:p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                >
                  <option value="popularity">{t('academics.sortOptions.popularity')}</option>
                  <option value="title">{t('academics.sortOptions.title')}</option>
                  <option value="duration">{t('academics.sortOptions.duration')}</option>
                </select>
              </div>
            </div>

            {/* Сетка программ */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {renderSkeletons()}
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 md:h-16 w-12 md:w-16 mx-auto text-gray-400 mb-3 md:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">{t('academics.noProgramsFound')}</h3>
                <p className="text-gray-500 text-sm md:text-base mb-4">{t('academics.tryChangingFilters')}</p>
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  {t('academics.filters.resetAll')}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                  {currentPrograms.map(program => (
                    <div 
                      key={program.id} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => setSelectedProgram(program)}
                    >
                      <div className="h-40 md:h-48 bg-gradient-to-r from-blue-400 to-indigo-600 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white font-medium text-sm md:text-base">{t('academics.details')}</span>
                        </div>
                        <img 
                          src={program.image} 
                          alt={program.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
                            e.target.className = "w-full h-full object-cover bg-gray-200";
                          }}
                        />
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-blue-600 text-white text-xs px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                          {program.popularity}%
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <h3 className="font-bold text-base md:text-lg text-gray-800 mb-1 md:mb-2 line-clamp-1">{program.title}</h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-1 md:mb-2 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {program.faculty}
                        </p>
                        <div className="flex justify-between text-xs text-gray-500 mb-2 md:mb-3">
                          <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs">{program.educationLevel}</span>
                          <span className="bg-green-100 text-green-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs">{program.duration}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 md:mt-4">
                          <span className="text-xs md:text-sm text-gray-600">{program.studyForm}</span>
                          <span className={`text-xs md:text-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded-full ${
                            program.language === t('academics.languages.russian') ? 'bg-red-100 text-red-800' :
                            program.language === t('academics.languages.kyrgyz') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {program.language}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Пагинация */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <nav className="flex items-center space-x-1 md:space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 md:p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        // Логика для отображения не всех страниц, если их много
                        if (
                          index === 0 || 
                          index === totalPages - 1 || 
                          (index >= currentPage - 1 && index <= currentPage + 1) ||
                          totalPages <= 5
                        ) {
                          return (
                            <button
                              key={index + 1}
                              onClick={() => setCurrentPage(index + 1)}
                              className={`px-2.5 py-1.5 md:px-4 md:py-2 rounded-lg border text-sm md:text-base ${
                                currentPage === index + 1
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                              } transition-colors`}
                            >
                              {index + 1}
                            </button>
                          );
                        } else if (
                          index === currentPage - 2 ||
                          index === currentPage + 2
                        ) {
                          return <span key={index + 1} className="px-1 md:px-2 text-sm md:text-base">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 md:p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Модальное окно с деталями программы */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-2 md:top-4 right-2 md:right-4 bg-blue-300 rounded-full p-1 md:p-2 shadow-md hover:bg-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              
              <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{selectedProgram.title}</h2>
                <p className="text-gray-600 text-base md:text-lg mb-4">{selectedProgram.faculty}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">{t('academics.programDetails.basicInfo')}</h3>
                    <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.level')}:</span>
                        <span className="font-medium">{selectedProgram.educationLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.language')}:</span>
                        <span className="font-medium">{selectedProgram.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.form')}:</span>
                        <span className="font-medium">{selectedProgram.studyForm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.duration')}:</span>
                        <span className="font-medium">{selectedProgram.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.credits')}:</span>
                        <span className="font-medium">{selectedProgram.credits}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">{t('academics.programDetails.financialInfo')}</h3>
                    <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('academics.programDetails.cost')}:</span>
                        <span className="font-medium text-blue-600">{selectedProgram.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{t('academics.programDetails.popularity')}:</span>
                        <div className="w-16 md:w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${selectedProgram.popularity}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-xs md:text-sm">{selectedProgram.popularity}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">{t('academics.programDetails.description')}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{selectedProgram.description}</p>
                </div>
                
                <div className="mb-4 md:mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2 md:mb-3 text-sm md:text-base">{t('academics.programDetails.requirements')}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{selectedProgram.requirements}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HSM;