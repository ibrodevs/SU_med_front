import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, X, Users, BookOpen, MapPin, Phone, Mail, Calendar, GraduationCap, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Departments = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Определение мобильного устройства
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Моковые данные факультетов и кафедр
  const faculties = [
    {
      id: 1,
      name: t('departments.faculties.medical.name'),
      shortName: t('departments.faculties.medical.shortName'),
      dean: 'Иванов П.С.',
      email: 'dean@med.salymbekov.kg',
      phone: '+996 312 123 456',
      color: 'bg-blue-500',
      icon: null,
      departments: [
        {
          id: 101,
          name: t('departments.faculties.medical.departments.therapy.name'),
          head: 'Сидорова М.А.',
          headPhoto: '/images/heads/sidorova.jpg',
          headEmail: 'sidorova@med.salymbekov.kg',
          headPhone: '+996 312 123 457',
          teachersCount: 15,
          disciplines: t('departments.faculties.medical.departments.therapy.disciplines', { returnObjects: true }),
          scheduleLink: '/schedule/therapy',
          building: t('departments.buildings.main'),
          room: '301',
          studentCount: 250,
          established: 2010
        },
        // Остальные кафедры с использованием t() аналогично
      ]
    },
    // Остальные факультеты с использованием t() аналогично
  ];

  // Фильтрация и поиск
  const filteredFaculties = useMemo(() => {
    return faculties
      .map(faculty => ({
        ...faculty,
        departments: faculty.departments.filter(dept =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.head.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(faculty => faculty.departments.length > 0)
      .filter(faculty => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'large') return faculty.departments.some(d => d.teachersCount > 10);
        if (activeFilter === 'small') return faculty.departments.some(d => d.teachersCount <= 10);
        return true;
      });
  }, [searchTerm, activeFilter]);

  const toggleNode = (nodeId) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleDepartmentSelect = async (department) => {
    setIsLoading(true);
    // Имитация загрузки данных
    await new Promise(resolve => setTimeout(resolve, 300));
    setSelectedDepartment(department);
    setIsLoading(false);
    
    const facultyId = faculties.find(f => 
      f.departments.some(d => d.id === department.id)
    )?.id;
    if (facultyId) {
      setExpandedNodes(prev => new Set(prev).add(`faculty-${facultyId}`));
    }
  };

  const handleCloseCard = () => {
    setSelectedDepartment(null);
  };

  const totalStats = useMemo(() => {
    return faculties.reduce((acc, faculty) => {
      acc.teachers += faculty.departments.reduce((sum, dept) => sum + dept.teachersCount, 0);
      acc.departments += faculty.departments.length;
      acc.students += faculty.departments.reduce((sum, dept) => sum + dept.studentCount, 0);
      return acc;
    }, { teachers: 0, departments: 0, students: 0 });
  }, []);

  // На мобильных устройствах показывать карточку кафедры в модальном окне
  const renderDepartmentCard = () => {
    if (!selectedDepartment) return null;

    if (isMobile) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedDepartment.name}</h2>
              <button
                onClick={handleCloseCard}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">{t('departments.loading')}</p>
              </div>
            ) : (
              <>
                {/* Заведующий кафедрой */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    {t('departments.departmentHead')}
                  </h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDepartment.headPhoto}
                      alt={selectedDepartment.head}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMzIiIGZpbGw9IiNEOEU5RkYiLz4KPHBhdGggZD0iTTQwIDI2QzQwIDI5LjMxMzcgMzcuMzEzNyAzMiAzNCAzMkMzMC42ODYzIDMyIDI4IDI5LjMxMzcgMjggMjZDMjggMjIuNjg2MyAzMC42ODYzIDIwIDM0IDIwQzM3LjMxMzcgMjAgNDAgMjIuNjg2MyA0MCAyNloiIGZpbGw9IiM0Njg1RjMiLz4KPHBhdGggZD0iTTM0IDM0QzI4LjQ3NyAzNCAyNCAzOC40NzcgMjQgNDRINDRDNDQgMzguNDc3IDM5LjUyMyAzNCAzNCAzNFoiIGZpbGw9IiM0Njg1RjMiLz4KPC9zdmc+';
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{selectedDepartment.head}</p>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Phone className="w-4 h-4 mr-1" />
                        {selectedDepartment.headPhone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-1" />
                        {selectedDepartment.headEmail}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Информация о кафедре */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Users className="w-4 h-4 mr-1" />
                        {t('departments.teachers')}
                      </div>
                      <div className="text-xl font-bold text-gray-800">{selectedDepartment.teachersCount}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <GraduationCap className="w-4 h-4 mr-1" />
                        {t('departments.students')}
                      </div>
                      <div className="text-xl font-bold text-gray-800">{selectedDepartment.studentCount}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                      {t('departments.mainDisciplines')}
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedDepartment.disciplines.map((discipline, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                          {discipline}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-600" />
                      {t('departments.location')}
                    </h4>
                    <p className="text-gray-800">{selectedDepartment.building}</p>
                    <p className="text-gray-600">{t('departments.room')}: {selectedDepartment.room}</p>
                  </div> 
                </div>
              </>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('departments.loading')}</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedDepartment.name}</h2>
                <button
                  onClick={handleCloseCard}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Заведующий кафедрой */}
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  {t('departments.departmentHead')}
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedDepartment.headPhoto}
                    alt={selectedDepartment.head}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ�IjY0IiByeD0iMzIiIGZpbGw9IiNEOEU5RkYiLz4KPHBhdGggZD0iTTQwIDI2QzQwIDI5LjMxMzcgMzcuMzEzNyAzMiAzNCAzMkMzMC42ODYzIDMyIDI4IDI5LjMxMzcgMjggMjZDMjggMjIuNjg2MyAzMC42ODYzIDIwIDM0IDIwQzM3LjMxMzcgMjAgNDAgMjIuNjg2MyA0MCAyNloiIGZpbGw9IiM0Njg1RjMiLz4KPHBhdGggZD0iTTM0IDM0QzI4LjQ3NyAzNCAyNCAzOC40NzcgMjQgNDRINDRDNDQgMzguNDc3IDM5LjUyMyAzNCAzNCAzNFoiIGZpbGw9IiM0Njg1RjMiLz4KPC9zdmc+';
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">{selectedDepartment.head}</p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Phone className="w-4 h-4 mr-1" />
                      {selectedDepartment.headPhone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Mail className="w-4 h-4 mr-1" />
                      {selectedDepartment.headEmail}
                    </div>
                  </div>
                </div>
              </div>

              {/* Информация о кафедре */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Users className="w-4 h-4 mr-1" />
                      {t('departments.teachers')}
                    </div>
                    <div className="text-xl font-bold text-gray-800">{selectedDepartment.teachersCount}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {t('departments.students')}
                    </div>
                    <div className="text-xl font-bold text-gray-800">{selectedDepartment.studentCount}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                    {t('departments.mainDisciplines')}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedDepartment.disciplines.map((discipline, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {discipline}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-600" />
                    {t('departments.location')}
                  </h4>
                  <p className="text-gray-800">{selectedDepartment.building}</p>
                  <p className="text-gray-600">{t('departments.room')}: {selectedDepartment.room}</p>
                </div> 
              </div>
            </>
          )}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-3 py-6 sm:px-4 sm:py-8">
        {/* Хлебные крошки */}
        <nav className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-8 flex items-center">
          <Link to="/" className="hover:text-blue-600 transition-colors">{t('breadcrumbs.home')}</Link>
          <span className="mx-1 sm:mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600 transition-colors">{t('breadcrumbs.academics')}</Link>
          <span className="mx-1 sm:mx-2">→</span>
          <span className="text-gray-800 font-medium">{t('breadcrumbs.departments')}</span>
        </nav>

        {/* Заголовок и статистика */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">{t('departments.title')}</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{t('departments.subtitle')}</p>
          
          {/* Статистика */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">{totalStats.teachers}+</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('departments.teachers')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">{totalStats.departments}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('departments.departments')}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-2 sm:mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">{totalStats.students}+</div>
                  <div className="text-xs sm:text-sm text-gray-600">{t('departments.students')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Основной контент */}
          <div className="w-full lg:w-2/3">
            {/* Поиск и фильтры */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md mb-4 sm:mb-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder={t('departments.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>
                
                {/* Кнопка показа фильтров на мобильных */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                >
                  <Filter className="w-4 h-4" />
                  {t('departments.filters')}
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`${showFilters ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row gap-2`}>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      activeFilter === 'all' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('departments.filtersAll')}
                  </button>
                  <button
                    onClick={() => setActiveFilter('large')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      activeFilter === 'large' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('departments.filtersLarge')}
                  </button>
                  <button
                    onClick={() => setActiveFilter('small')}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                      activeFilter === 'small' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {t('departments.filtersSmall')}
                  </button>
                </div>
              </div>
            </div>

            {/* Древовидная структура */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">{t('departments.structureTitle')}</h2>
              
              {filteredFaculties.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <Search className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-sm sm:text-base">{t('departments.noResults')}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">{t('departments.tryAgain')}</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {filteredFaculties.map((faculty) => (
                    <div key={faculty.id} className="border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden">
                      {/* Факультет */}
                      <div 
                        className="p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 cursor-pointer flex justify-between items-center transition-all"
                        onClick={() => toggleNode(`faculty-${faculty.id}`)}
                      >
                        <div className="flex items-center">
                          <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg mr-2 sm:mr-3"><Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /></div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{faculty.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{faculty.departments.length} {t('departments.departmentsCount')}</p>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transform transition-transform ${
                            expandedNodes.has(`faculty-${faculty.id}`) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Кафедры факультета */}
                      {expandedNodes.has(`faculty-${faculty.id}`) && (
                        <div className="bg-white p-3 sm:p-4 space-y-2 sm:space-y-3">
                          {faculty.departments.map((department) => (
                            <div 
                              key={department.id}
                              className="p-3 sm:p-4 border border-gray-100 rounded-lg hover:shadow-md cursor-pointer transition-all duration-200 bg-white"
                              onClick={() => handleDepartmentSelect(department)}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{department.name}</h4>
                                <span className="flex items-center text-xs sm:text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
                                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  {department.teachersCount}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2">{t('departments.departmentHeadShort')}: {department.head}</p>
                              <div className="flex flex-wrap gap-1 sm:gap-2">
                                {department.disciplines.slice(0, 2).map((discipline, idx) => (
                                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                    {discipline}
                                  </span>
                                ))}
                                {department.disciplines.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{department.disciplines.length - 2} {t('departments.more')}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Карточка кафедры (только для десктопов) */}
          {!isMobile && (
            <div className="w-full lg:w-1/3">
              {selectedDepartment ? (
                renderDepartmentCard()
              ) : (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 text-center hidden lg:block">
                  <div className="text-gray-300 mb-4">
                    <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">{t('departments.selectDepartment')}</h3>
                  <p className="text-gray-500 text-sm sm:text-base">{t('departments.selectDepartmentHint')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно для мобильных */}
      {isMobile && renderDepartmentCard()}
    </div>
  );
};

export default Departments;