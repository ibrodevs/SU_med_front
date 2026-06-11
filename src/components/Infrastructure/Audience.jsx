import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { School, Users, Layers } from 'lucide-react';
import { classroomsAPI, infrastructureHelpers } from '../../services/infrastructureService.js';

const Classrooms = () => {
  const { t, i18n } = useTranslation();
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const lang = i18n.language === 'kg' ? 'kg' : i18n.language === 'en' ? 'en' : 'ru';
        const response = await classroomsAPI.getAllForFrontend(lang);
        if (response.success && response.data) {
          const transformed = infrastructureHelpers.transformClassroomData(response, lang);
          setClassrooms(transformed.classrooms);
        } else {
          setClassrooms([]);
        }
      } catch (e) {
        console.error('Error fetching classrooms:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('classrooms.title', 'Учебные аудитории')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('classrooms.heroSubtitle', 'Современные аудитории и лаборатории для медицинского образования')}
          </p>
        </div>

        {error || classrooms.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <School className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t('classrooms.availableRooms', 'Аудитории недоступны')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {classrooms.map((room) => (
              <div key={room.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                    <School className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{room.name}</h3>
                    {room.category && <span className="text-sm text-slate-500">{room.category}</span>}
                  </div>
                </div>

                {room.description && (
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{room.description}</p>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-4 text-sm text-slate-600">
                  {room.capacity && (
                    <span className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-slate-400" />{room.capacity} {t('classrooms.students', 'студентов')}</span>
                  )}
                  {room.floor && (
                    <span className="flex items-center"><Layers className="w-4 h-4 mr-1.5 text-slate-400" />{t('classrooms.floor', 'Этаж')} {room.floor}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classrooms;
