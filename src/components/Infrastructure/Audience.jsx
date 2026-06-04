import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { School, Monitor, Microscope, Stethoscope, Check } from 'lucide-react';
import { classroomsAPI, infrastructureHelpers } from '../../services/infrastructureService.js';

const Classrooms = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classroomCategories, setClassroomCategories] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    fetchClassroomsData();
  }, [i18n.language]);

  // Fetch classrooms data from API
  const fetchClassroomsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
      const response = await classroomsAPI.getAllForFrontend(lang);

      if (response.success && response.data) {
        const transformedData = infrastructureHelpers.transformClassroomData(response, lang);

        // Add 'all' category
        const allCategory = {
          id: 'all',
          name: t('classrooms.allRooms'),
          icon: 'school',
          count: transformedData.classrooms.length
        }; setClassroomCategories([allCategory, ...transformedData.categories]);
        setClassrooms(transformedData.classrooms);
      }
    } catch (error) {
      console.error('Error fetching classrooms data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredClassrooms = activeCategory === 'all'
    ? classrooms
    : classrooms.filter(room => room.category === activeCategory);

  const defaultStatistics = [
    { number: `${classrooms.length}+`, label: t('classrooms.totalRooms') },
    { number: classrooms.reduce((total, room) => total + parseInt(room.capacity), 0).toString(), label: t('classrooms.totalCapacity') },
    { number: '95%', label: t('classrooms.equipped') },
    { number: '24/7', label: t('classrooms.access') }
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
            onClick={fetchClassroomsData}
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
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('classrooms.heroTitle')}
              </h2>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {t('classrooms.heroSubtitle')}
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



          {/* Classrooms Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
                {t('classrooms.availableRooms')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClassrooms.map((room) => (
                  <div
                    key={room.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="bg-blue-100 p-8 text-center">
                      <div className="flex justify-center mb-4 text-blue-600"><School className="w-14 h-14" /></div>
                      <h3 className="text-2xl font-bold text-blue-800">{room.name}</h3>
                      <div className="text-blue-600 font-semibold">{room.category}</div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                          {t('classrooms.capacity')}: {room.capacity}
                        </div>
                        <div className="text-gray-600">
                          {t('classrooms.floor')} {room.floor}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {room.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {room.features.slice(0, 2).map((feature, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                          >
                            {t(feature)}
                          </span>
                        ))}
                        {room.features.length > 2 && (
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            +{room.features.length - 2}
                          </span>
                        )}
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        {t('classrooms.viewDetails')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Room Details Modal */}
          {selectedRoom && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="bg-blue-600 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">{selectedRoom.name}</h2>
                      <div className="flex items-center space-x-4">
                        <span className="bg-blue-500 px-3 py-1 rounded-full">
                          {selectedRoom.category}
                        </span>
                        <span>{t('classrooms.floor')} {selectedRoom.floor}</span>
                        <span>{selectedRoom.size}m²</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedRoom(null)}
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
                        <div className="flex justify-center mb-4 text-blue-600"><School className="w-20 h-20" /></div>
                        <div className="text-2xl font-bold text-blue-800">{selectedRoom.name}</div>
                      </div>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('classrooms.description')}
                      </h3>
                      <p className="text-gray-700 mb-6">{selectedRoom.description}</p>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('classrooms.features')}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {selectedRoom.features.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg flex items-center"
                          >
                            <Check className="w-4 h-4 text-green-500 mr-2" />
                            {t(feature)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">
                          {t('classrooms.roomSpecs')}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('classrooms.capacity')}:</span>
                            <span className="font-bold">{selectedRoom.capacity} {t('classrooms.students')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('classrooms.area')}:</span>
                            <span className="font-bold">{selectedRoom.size}m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('classrooms.floor')}:</span>
                            <span className="font-bold">{selectedRoom.floor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">{t('classrooms.type')}:</span>
                            <span className="font-bold">{selectedRoom.category}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-blue-800 mb-4">
                        {t('classrooms.equipment')}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {selectedRoom.equipment.map((item, index) => (
                          <div
                            key={index}
                            className="bg-white border border-blue-200 text-blue-800 px-3 py-2 rounded-lg"
                          >
                            {t(item)}
                          </div>
                        ))}
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Equipment Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
                {t('classrooms.modernEquipment')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4"><Monitor className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    {t('classrooms.digitalClassrooms')}
                  </h3>
                  <p className="text-gray-600">
                    {t('classrooms.digitalClassroomsDesc')}
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4"><Microscope className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    {t('classrooms.laboratoryEquipment')}
                  </h3>
                  <p className="text-gray-600">
                    {t('classrooms.laboratoryEquipmentDesc')}
                  </p>
                </div>
                <div className="text-center p-6">
                  <div className="text-blue-600 mb-4"><Stethoscope className="w-10 h-10 mx-auto" /></div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    {t('classrooms.simulationEquipment')}
                  </h3>
                  <p className="text-gray-600">
                    {t('classrooms.simulationEquipmentDesc')}
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

export default Classrooms;