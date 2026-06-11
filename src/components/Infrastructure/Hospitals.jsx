import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, MapPin, Phone, Mail } from 'lucide-react';
import infrastructureService from '../../services/infrastructureService';

const Hospitals = () => {
  const { t, i18n } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';

  const field = (obj, name) => {
    if (!obj) return '';
    if (obj[`${name}_${lang}`]) return obj[`${name}_${lang}`];
    if (obj[name] && typeof obj[name] === 'object') return obj[name][lang] || obj[name].ru || '';
    return obj[`${name}_ru`] || obj[name] || '';
  };

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await infrastructureService.getHospitals(lang);
        setHospitals(Array.isArray(data) ? data : (data?.results || []));
      } catch (err) {
        console.error('Hospitals fetch failed:', err);
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
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
            {t('hospitals.title', 'Больницы и клиники')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('hospitals.subtitle', 'Клинические базы для практической подготовки студентов-медиков')}
          </p>
        </div>

        {hospitals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Building2 className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t('hospitals.noDepartments', 'Информация недоступна')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hospitals.map((hospital) => (
              <div key={hospital.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{field(hospital, 'name')}</h3>
                </div>

                {field(hospital, 'description') && (
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{field(hospital, 'description')}</p>
                )}

                <div className="mt-auto space-y-2 text-sm text-slate-600 pt-4 border-t border-slate-100">
                  {field(hospital, 'address') && (
                    <div className="flex items-start"><MapPin className="w-4 h-4 mr-2 mt-0.5 text-slate-400 flex-shrink-0" />{field(hospital, 'address')}</div>
                  )}
                  {hospital.contact_phone && (
                    <a href={`tel:${hospital.contact_phone}`} className="flex items-center hover:text-[#0A2647]">
                      <Phone className="w-4 h-4 mr-2 text-slate-400" />{hospital.contact_phone}
                    </a>
                  )}
                  {hospital.contact_email && (
                    <a href={`mailto:${hospital.contact_email}`} className="flex items-center hover:text-[#0A2647]">
                      <Mail className="w-4 h-4 mr-2 text-slate-400" />{hospital.contact_email}
                    </a>
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

export default Hospitals;
