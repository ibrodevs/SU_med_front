import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { School, Briefcase, Monitor, BookOpen, DollarSign, MapPin, Clock, Eye } from 'lucide-react';

const VacancyCard = ({ vacancy }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('locale'), {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const getCategoryIcon = (category) => {
    // Always use proper Lucide icons based on category name
    const categoryName = typeof category === 'object' ? category.name : category;
    switch (categoryName) {
      case 'academic': return <School className="w-6 h-6 text-blue-600" />;
      case 'administrative': return <Briefcase className="w-6 h-6 text-blue-600" />;
      case 'technical': return <Monitor className="w-6 h-6 text-blue-600" />;
      case 'service': return <BookOpen className="w-6 h-6 text-blue-600" />;
      default: return <Briefcase className="w-6 h-6 text-blue-600" />;
    }
  };

  const getCategoryColor = (categoryName) => {
    if (typeof categoryName === 'object' && categoryName.name) {
      categoryName = categoryName.name;
    }
    switch (categoryName) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'administrative': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category) => {
    if (typeof category === 'object' && category.display_name) {
      return getFieldValue(category.display_name);
    }
    return t(`careers.categories.${category}`);
  };

  // API now returns localized strings directly, no need for translation extraction
  const getFieldValue = (field, fallback = '') => {
    return (field && field !== 'not given') ? field : fallback;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">{getCategoryIcon(vacancy.category)}</div>
            <div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                {getFieldValue(vacancy.title, t('careers.title_not_available'))}
              </h3>
              <p className="text-blue-600 font-medium">
                {vacancy.department && typeof vacancy.department === 'object' 
                  ? getFieldValue(vacancy.department.name || vacancy.department.short_name)
                  : getFieldValue(vacancy.department)
                }
              </p>
            </div>
          </div>
          {vacancy.is_deadline_soon && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {t('careers.urgent')}
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(vacancy.category)}`}>
            {getCategoryLabel(vacancy.category)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {getFieldValue(vacancy.short_description, t('careers.no_description'))}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          {vacancy.salary_display && (
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 text-green-600 mr-2" />
              <span className="font-medium">{vacancy.salary_display}</span>
            </div>
          )}
          
          {vacancy.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-blue-600 mr-2" />
              <span>{vacancy.location}</span>
            </div>
          )}

          {vacancy.employment_type && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 text-purple-600 mr-2" />
              <span>{t(`careers.employment_types.${vacancy.employment_type}`)}</span>
            </div>
          )}

          {vacancy.experience_years && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4 text-orange-600 mr-2" />
              <span>{t('careers.experience')}: {vacancy.experience_years}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 text-red-600 mr-2" />
            <span>{t('careers.deadline')}: {formatDate(vacancy.deadline)}</span>
          </div>
        </div>

        {/* Requirements */}
        {vacancy.tags_list && Array.isArray(vacancy.tags_list) && vacancy.tags_list.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs text-gray-500 mb-2">{t('careers.key_requirements')}:</span>
            {vacancy.tags_list.slice(0, 3).map((tag, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="flex space-x-3">
          <Link
            to={`/about/careers/${vacancy.slug}`}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
          >
            {t('careers.view_details')}
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('careers.published')}: {formatDate(vacancy.posted_date)}
            </span>
            {vacancy.views_count !== undefined && (
              <span className="text-gray-400 flex items-center">
                <Eye className="w-4 h-4 mr-1" /> {vacancy.views_count} {t('careers.views')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;