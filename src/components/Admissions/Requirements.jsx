import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Phone, Check } from 'lucide-react';

const Requirements = () => {
  const { t } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState('all');

  const programs = [
    { id: 'all', name: t('requirements.programs.all') },
    { id: 'medicine', name: t('requirements.programs.medicine') },
    { id: 'dentistry', name: t('requirements.programs.dentistry') },
    { id: 'pharmacy', name: t('requirements.programs.pharmacy') },
    { id: 'nursing', name: t('requirements.programs.nursing') }
  ];

  const requirements = [
    {
      program: t('requirements.programs.medicine'),
      programId: 'medicine',
      ortScore: '120+',
      examinations: [t('requirements.subjects.biology'), t('requirements.subjects.chemistry')],
      documents: [
        t('requirements.documents.highSchoolDiploma'),
        t('requirements.documents.medicalCertificate'),
        t('requirements.documents.passport'),
        t('requirements.documents.photos')
      ],
      duration: t('requirements.duration.6years'),
      language: t('requirements.language.ru_kg')
    },
    {
      program: t('requirements.programs.dentistry'),
      programId: 'dentistry',
      ortScore: '110+',
      examinations: [t('requirements.subjects.biology'), t('requirements.subjects.chemistry')],
      documents: [
        t('requirements.documents.highSchoolDiploma'),
        t('requirements.documents.medicalCertificate'),
        t('requirements.documents.passport'),
        t('requirements.documents.photos')
      ],
      duration: t('requirements.duration.5years'),
      language: t('requirements.language.ru_kg')
    },
    {
      program: t('requirements.programs.pharmacy'),
      programId: 'pharmacy',
      ortScore: '100+',
      examinations: [t('requirements.subjects.chemistry'), t('requirements.subjects.biology')],
      documents: [
        t('requirements.documents.highSchoolDiploma'),
        t('requirements.documents.medicalCertificate'),
        t('requirements.documents.passport'),
        t('requirements.documents.photos')
      ],
      duration: t('requirements.duration.5years'),
      language: t('requirements.language.ru_kg')
    },
    {
      program: t('requirements.programs.nursing'),
      programId: 'nursing',
      ortScore: '90+',
      examinations: [t('requirements.subjects.biology')],
      documents: [
        t('requirements.documents.highSchoolDiploma'),
        t('requirements.documents.medicalCertificate'),
        t('requirements.documents.passport'),
        t('requirements.documents.photos')
      ],
      duration: t('requirements.duration.4years'),
      language: t('requirements.language.ru_kg')
    }
  ];

  const filteredRequirements = selectedProgram === 'all' 
    ? requirements 
    : requirements.filter(req => req.programId === selectedProgram);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('admissions.requirements.title')}
            </h1>
            <p className="text-xl opacity-90">
              {t('admissions.requirements.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Program Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('requirements.selectProgram')}</h2>
          <div className="flex flex-wrap gap-3">
            {programs.map(program => (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  selectedProgram === program.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {program.name}
              </button>
            ))}
          </div>
        </div>

        {/* Requirements Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-xl font-bold text-gray-800">
              {t('requirements.programRequirements')}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('requirements.table.program')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('requirements.table.ortScore')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('requirements.table.entranceExams')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('requirements.table.documents')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequirements.map((req, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{req.program}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {req.ortScore}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {req.examinations.map((exam, examIndex) => (
                          <span key={examIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                            {exam}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          {t('requirements.documents.shortList')}
                        </div>
                        <div className="text-xs text-gray-500">
                          + {t('requirements.documents.standardPackage')}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              {t('requirements.requiredDocuments')}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  {t('requirements.generalRequirements')}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('requirements.documents.fullList.diploma')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('requirements.documents.fullList.passport')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('requirements.documents.fullList.medicalCertificate')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('requirements.documents.fullList.photos')}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t('requirements.documents.fullList.ortCertificate')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-700">
                  {t('requirements.additionalDocuments')}
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('requirements.documents.additional.parentsIncome')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('requirements.documents.additional.benefits')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('requirements.documents.additional.reference')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{t('requirements.documents.additional.portfolio')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-800">
              <ClipboardList className="w-5 h-5 inline-block mr-1" /> {t('requirements.importantInfo.title')}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• {t('requirements.importantInfo.translation')}</li>
              <li>• {t('requirements.importantInfo.nostrification')}</li>
              <li>• {t('requirements.importantInfo.medicalValidity')}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-green-800">
              <Phone className="w-5 h-5 inline-block mr-1" /> {t('requirements.help.title')}
            </h4>
            <p className="text-sm text-green-700 mb-3">
              {t('requirements.help.description')}
            </p>
            <div className="space-y-1 text-sm text-green-700">
              <p>{t('requirements.help.phone')}: +996 312 123 456</p>
              <p>{t('requirements.help.email')}: admission@salymbekov.edu.kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirements;