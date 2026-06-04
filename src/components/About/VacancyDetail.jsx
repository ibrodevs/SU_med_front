import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Briefcase, Monitor, BookOpen, DollarSign, MapPin, Clock, Calendar, Star, Check } from 'lucide-react';
import careersService from '../../services/careersService';

const VacancyDetail = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume: null
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadVacancy();
  }, [id, i18n.language]); // Добавляем зависимость от языка

  const loadVacancy = async () => {
    try {
      setLoading(true);
      const data = await careersService.getVacancy(id, i18n.language);
      setVacancy(data);
    } catch (err) {
      console.error('Error loading vacancy:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // API now returns localized strings directly, no need for translation extraction
  const getFieldValue = (field, fallback = '') => {
    return (field && field !== 'not given') ? field : fallback;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('locale'), {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    // Fallback to hardcoded icons if no API icon
    if (typeof category === 'object' && category.name) {
      category = category.name;
    }
    switch (category) {
      case 'academic': return GraduationCap;
      case 'administrative': return Briefcase;
      case 'technical': return Monitor;
      case 'service': return BookOpen;
      default: return Briefcase;
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      Object.keys(applicationData).forEach(key => {
        if (applicationData[key] !== null) {
          formData.append(key, applicationData[key]);
        }
      });
      formData.append('vacancy', vacancy.id);

      await careersService.submitApplication(formData);
      alert(t('careers.application.success'));
      setShowApplication(false);
      setApplicationData({
        full_name: '',
        email: '',
        phone: '',
        cover_letter: '',
        resume: null
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      alert(t('careers.application.error'));
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('careers.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !vacancy) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('careers.not_found')}</h3>
          <p className="text-gray-500 mb-4">{error || t('careers.vacancy_not_found')}</p>
          <Link
            to="/about/careers"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('careers.back_to_careers')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-blue-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">{t('careers.breadcrumbs.home')}</Link>
            <span className="mx-2">→</span>
            <Link to="/about" className="hover:text-blue-600">{t('careers.breadcrumbs.about')}</Link>
            <span className="mx-2">→</span>
            <Link to="/about/careers" className="hover:text-blue-600">{t('careers.breadcrumbs.careers')}</Link>
            <span className="mx-2">→</span>
            <span className="text-blue-600">{getFieldValue(vacancy.title, t('careers.title_not_available'))}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mr-4 flex-shrink-0">
                  {React.createElement(getCategoryIcon(vacancy.category), { className: "w-8 h-8" })}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-blue-900 mb-2">
                    {getFieldValue(vacancy.title, t('careers.title_not_available'))}
                  </h1>
                  <p className="text-xl text-blue-600 font-medium">
                    {vacancy.department && typeof vacancy.department === 'object' 
                      ? getFieldValue(vacancy.department.name || vacancy.department.short_name)
                      : getFieldValue(vacancy.department)
                    }
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplication(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {t('careers.apply_now')}
              </button>
            </div>

            {/* Key Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {vacancy.salary_display && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-500">{t('careers.salary')}</div>
                  <div className="font-semibold text-sm">{vacancy.salary_display}</div>
                </div>
              )}
              
              {vacancy.location && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-500">{t('careers.location')}</div>
                  <div className="font-semibold text-sm">{vacancy.location}</div>
                </div>
              )}

              {vacancy.employment_type && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-500">{t('careers.employment_type')}</div>
                  <div className="font-semibold text-sm">{t(`careers.employment_types.${vacancy.employment_type}`)}</div>
                </div>
              )}

              {vacancy.experience_years && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-gray-500">{t('careers.experience')}</div>
                  <div className="font-semibold text-sm">{vacancy.experience_years}</div>
                </div>
              )}

              <div className="text-center flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-xs text-gray-500">{t('careers.deadline')}</div>
                <div className="font-semibold text-sm">{formatDate(vacancy.deadline)}</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('careers.description')}</h2>
                <div className="prose max-w-none text-gray-700">
                  <p>{getFieldValue(vacancy.description, vacancy.short_description)}</p>
                </div>
              </div>

              {/* Responsibilities */}
              {vacancy.responsibilities_list && vacancy.responsibilities_list.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('careers.responsibilities')}</h2>
                  <div className="space-y-2">
                    {vacancy.responsibilities_list.map((responsibility, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {vacancy.requirements_list && vacancy.requirements_list.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('careers.requirements')}</h2>
                  <div className="space-y-2">
                    {vacancy.requirements_list.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditions */}
              {vacancy.conditions_list && vacancy.conditions_list.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">{t('careers.conditions')}</h2>
                  <div className="space-y-2">
                    {vacancy.conditions_list.map((condition, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1.5">•</span>
                        <span className="text-gray-700">{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Sidebar */}
            <div>
              {/* Quick Apply */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6 sticky top-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">{t('careers.quick_apply')}</h3>
                <p className="text-gray-600 mb-4">{t('careers.quick_apply_description')}</p>
                <button
                  onClick={() => setShowApplication(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium mb-3"
                >
                  {t('careers.apply_now')}
                </button>
                <Link
                  to="/about/careers"
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium text-center block"
                >
                  {t('careers.back_to_list')}
                </Link>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-blue-900 mb-4">{t('careers.vacancy_stats')}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('careers.published')}</span>
                    <span className="font-medium">{formatDate(vacancy.posted_date)}</span>
                  </div>
                  {vacancy.views_count !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('careers.views')}</span>
                      <span className="font-medium">{vacancy.views_count}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('careers.category')}</span>
                    <span className="font-medium">
                      {vacancy.category && typeof vacancy.category === 'object' 
                        ? getFieldValue(vacancy.category.display_name)
                        : t(`careers.categories.${vacancy.category}`)
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900">{t('careers.apply_for')} {getFieldValue(vacancy.title, t('careers.this_position'))}</h3>
                <button
                  onClick={() => setShowApplication(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.application.full_name')} *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={applicationData.full_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.application.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={applicationData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.application.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.application.resume')} *
                  </label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {t('careers.application.resume_formats')}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.application.cover_letter')}
                  </label>
                  <textarea
                    name="cover_letter"
                    value={applicationData.cover_letter}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={t('careers.application.cover_letter_placeholder')}
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                  >
                    {submitting ? t('careers.application.submitting') : t('careers.application.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowApplication(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('careers.application.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VacancyDetail;