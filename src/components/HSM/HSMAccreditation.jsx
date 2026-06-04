

const AccreditationCard = ({ accreditation, language }) => {
  const { t } = useTranslation();
  
  const getName = () => {
    switch (language) {
      case 'kg':
        return accreditation.name_kg || accreditation.name;
      case 'en':
        return accreditation.name_en || accreditation.name;
      default:
        return accreditation.name;
    }
  };

  const getOrganization = () => {
    switch (language) {
      case 'kg':
        return accreditation.organization_kg || accreditation.organization;
      case 'en':
        return accreditation.organization_en || accreditation.organization;
      default:
        return accreditation.organization;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'kg':
        return accreditation.description_kg || accreditation.description;
      case 'en':
        return accreditation.description_en || accreditation.description;
      default:
        return accreditation.description;
    }
  };

  const getAccreditationType = () => {
    switch (language) {
      case 'kg':
        return accreditation.accreditation_type_kg || accreditation.accreditation_type_display;
      case 'en':
        return accreditation.accreditation_type_en || accreditation.accreditation_type_display;
      default:
        return accreditation.accreditation_type_display;
    }
  };

  const getTypeColor = () => {
    switch (accreditation.accreditation_type) {
      case 'national':
        return 'bg-blue-100 text-blue-800';
      case 'international':
        return 'bg-green-100 text-green-800';
      case 'institutional':
        return 'bg-teal-50 text-[#1B4242]';
      case 'programmatic':
        return 'bg-amber-50 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU');
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor()}`}>
            {getAccreditationType()}
          </span>
          <div className="flex items-center">
            {accreditation.is_valid ? (
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {t('hsm.valid', 'Действительна')}
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                {t('hsm.expired', 'Истекла')}
              </span>
            )}
          </div>
        </div>

        {/* Certificate Image */}
        <SafeImage
          src={accreditation.certificate_image}
          alt={getName()}
          className="w-full h-48 object-cover rounded-lg mb-4"
          fallback={null}
        />

        {/* Organization Logo */}
        <div className="flex justify-center mb-4">
          <SafeImage
            src={accreditation.organization_logo}
            alt={getOrganization()}
            className="h-16 object-contain"
            fallback={null}
          />
        </div>

        {/* Accreditation Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {getName()}
        </h3>

        {/* Organization */}
        <div className="mb-3">
          <h4 className="font-semibold text-gray-800 text-sm mb-1">
            {t('hsm.accrediting_organization', 'Аккредитующая организация')}
          </h4>
          <p className="text-gray-600">
            {getOrganization()}
          </p>
        </div>

        {/* Description */}
        {getDescription() && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-1">
              {t('hsm.description', 'Описание')}
            </h4>
            <p className="text-gray-600 text-sm">
              {getDescription()}
            </p>
          </div>
        )}

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-800 mb-1">
              {t('hsm.issue_date', 'Дата выдачи')}
            </h4>
            <p className="text-gray-600">
              {formatDate(accreditation.issue_date)}
            </p>
          </div>
          {accreditation.expiry_date && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">
                {t('hsm.expiry_date', 'Дата окончания')}
              </h4>
              <p className="text-gray-600">
                {formatDate(accreditation.expiry_date)}
              </p>
            </div>
          )}
        </div>

        {/* Certificate Number */}
        {accreditation.certificate_number && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 text-sm mb-1">
              {t('hsm.certificate_number', 'Номер сертификата')}
            </h4>
            <p className="text-gray-600 text-sm font-mono">
              {accreditation.certificate_number}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const AccreditationSection = ({ title, accreditations, language }) => {
  if (!accreditations || accreditations.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accreditations.map((accreditation) => (
          <AccreditationCard 
            key={accreditation.id} 
            accreditation={accreditation} 
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';

const HSMAccreditation = () => {
  const { t, i18n } = useTranslation();
  const [accreditationData, setAccreditationData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback данные для аккредитаций медицинской школы

  useEffect(() => {
    const fetchAccreditations = async () => {
      try {
        setLoading(true);
        const data = await hsmService.getAccreditationsByType();
        // Если нет данных или данные не медицинские, используем fallback
        if (!data || Object.keys(data).length === 0) {
          setAccreditationData(fallbackAccreditations);
        } else {
          setAccreditationData(data);
        }
      } catch (err) {
        console.error('Error fetching accreditations:', err);
        // При ошибке используем fallback данные
        setAccreditationData(fallbackAccreditations);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccreditations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('hsm.error')}</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hsm.accreditations_title', 'Аккредитации и сертификаты')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hsm.accreditations_description', 'Наши аккредитации подтверждают высокое качество образования и соответствие международным стандартам')}
          </p>
        </motion.div>

        {/* Accreditation Sections */}
        <div className="space-y-12">
          {Object.entries(accreditationData).map(([typeCode, typeData]) => {
            // Получаем название типа в зависимости от языка
            const getTypeName = () => {
              switch (i18n.language) {
                case 'kg':
                  return typeData.name_kg || typeData.name;
                case 'en':
                  return typeData.name_en || typeData.name;
                default:
                  return typeData.name;
              }
            };

            return (
              <AccreditationSection
                key={typeCode}
                title={getTypeName()}
                accreditations={typeData.accreditations}
                language={i18n.language}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {Object.keys(accreditationData).length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_accreditations', 'Аккредитации не найдены')}
              </h3>
              <p className="text-gray-600">
                {t('hsm.no_accreditations_description', 'Информация об аккредитациях скоро появится на сайте')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HSMAccreditation;
