import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  ClipboardCheck, 
  Briefcase, 
  Target, 
  Building2, 
  HeartPulse, 
  Globe, 
  HelpCircle,
  Clock,
  Calendar,
  FileText,
  Laptop,
  ChevronDown
} from 'lucide-react';

const MedicalProgramPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { t } = useTranslation();

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: t('mededu.subjectHighlights'),
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">{t('mededu.subjects.firstSecondYear')}</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t('mededu.subjects.subjectsList.anatomy')}</li>
              <li>{t('mededu.subjects.subjectsList.histology')}</li>
              <li>{t('mededu.subjects.subjectsList.biochemistry')}</li>
              <li>{t('mededu.subjects.subjectsList.physiology')}</li>
              <li>{t('mededu.subjects.subjectsList.microbiology')}</li>
              <li>{t('mededu.subjects.subjectsList.latin')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">{t('mededu.subjects.thirdFourthYear')}</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t('mededu.subjects.subjectsList.pharmacology')}</li>
              <li>{t('mededu.subjects.subjectsList.internalDiseases')}</li>
              <li>{t('mededu.subjects.subjectsList.surgery')}</li>
              <li>{t('mededu.subjects.subjectsList.pediatrics')}</li>
              <li>{t('mededu.subjects.subjectsList.obstetrics')}</li>
              <li>{t('mededu.subjects.subjectsList.neurology')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">{t('mededu.subjects.fifthSixthYear')}</h4>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t('mededu.subjects.subjectsList.infectious')}</li>
              <li>{t('mededu.subjects.subjectsList.oncology')}</li>
              <li>{t('mededu.subjects.subjectsList.emergency')}</li>
              <li>{t('mededu.subjects.subjectsList.dermatology')}</li>
              <li>{t('mededu.subjects.subjectsList.psychiatry')}</li>
              <li>{t('mededu.subjects.subjectsList.forensic')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.entryRequirements'),
      icon: ClipboardCheck,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.requirements.academic')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.requirements.academicList.diploma')}</li>
              <li>{t('mededu.requirements.academicList.grades')}</li>
              <li>{t('mededu.requirements.academicList.exams')}</li>
              <li>{t('mededu.requirements.academicList.foreign')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.requirements.language')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.requirements.languageList.russian')}</li>
              <li>{t('mededu.requirements.languageList.english')}</li>
              <li>{t('mededu.requirements.languageList.latin')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.requirements.additional')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.requirements.additionalList.motivation')}</li>
              <li>{t('mededu.requirements.additionalList.interview')}</li>
              <li>{t('mededu.requirements.additionalList.medical')}</li>
              <li>{t('mededu.requirements.additionalList.criminal')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.careerOpportunities'),
      icon: Briefcase,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.careers.clinical')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.careers.clinicalList.therapist')}</li>
              <li>{t('mededu.careers.clinicalList.pediatrician')}</li>
              <li>{t('mededu.careers.clinicalList.surgeon')}</li>
              <li>{t('mededu.careers.clinicalList.gynecologist')}</li>
              <li>{t('mededu.careers.clinicalList.emergencyDoctor')}</li>
              <li>{t('mededu.careers.clinicalList.familyDoctor')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.careers.research')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.careers.researchList.researcher')}</li>
              <li>{t('mededu.careers.researchList.labResearcher')}</li>
              <li>{t('mededu.careers.researchList.clinicalResearcher')}</li>
              <li>{t('mededu.careers.researchList.medicalWriter')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.careers.public')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.careers.publicList.healthOfficial')}</li>
              <li>{t('mededu.careers.publicList.epidemiologist')}</li>
              <li>{t('mededu.careers.publicList.methodist')}</li>
              <li>{t('mededu.careers.publicList.pharmaRep')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.programAim'),
      icon: Target,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.aims.mainGoals')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.aims.goalsList.quality')}</li>
              <li>{t('mededu.aims.goalsList.standards')}</li>
              <li>{t('mededu.aims.goalsList.thinking')}</li>
              <li>{t('mededu.aims.goalsList.ethics')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.aims.learningObjectives')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.aims.objectivesList.knowledge')}</li>
              <li>{t('mededu.aims.objectivesList.communication')}</li>
              <li>{t('mededu.aims.objectivesList.research')}</li>
              <li>{t('mededu.aims.objectivesList.continuous')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.structure'),
      icon: Building2,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.structureDetails.stages')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{t('mededu.structureDetails.stagesList.first')}</strong></li>
              <li><strong>{t('mededu.structureDetails.stagesList.second')}</strong></li>
              <li><strong>{t('mededu.structureDetails.stagesList.third')}</strong></li>
              <li><strong>{t('mededu.structureDetails.stagesList.fourth')}</strong></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.structureDetails.controls')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.structureDetails.controlsList.exams')}</li>
              <li>{t('mededu.structureDetails.controlsList.tests')}</li>
              <li>{t('mededu.structureDetails.controlsList.practical')}</li>
              <li>{t('mededu.structureDetails.controlsList.coursework')}</li>
              <li>{t('mededu.structureDetails.controlsList.final')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.clinicalTraining'),
      icon: HeartPulse,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.clinical.bases')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.clinical.basesList.hospital')}</li>
              <li>{t('mededu.clinical.basesList.children')}</li>
              <li>{t('mededu.clinical.basesList.cardiology')}</li>
              <li>{t('mededu.clinical.basesList.maternity')}</li>
              <li>{t('mededu.clinical.basesList.ambulance')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.clinical.stages')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{t('mededu.clinical.practiceStages.thirdYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.fourthYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.fifthYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.sixthYear')}</strong></li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.internationalOpportunities'),
      icon: Globe,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.international.exchange')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.international.exchangeList.erasmus')}</li>
              <li>{t('mededu.international.exchangeList.mobility')}</li>
              <li>{t('mededu.international.exchangeList.internships')}</li>
              <li>{t('mededu.international.exchangeList.summer')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.international.recognition')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.international.recognitionList.wfme')}</li>
              <li>{t('mededu.international.recognitionList.diploma')}</li>
              <li>{t('mededu.international.recognitionList.exams')}</li>
              <li>{t('mededu.international.recognitionList.projects')}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('mededu.faq'),
      icon: HelpCircle,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.faqContent.general')}</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.duration')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.duration')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.internship')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.internship')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.specializations')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.specializations')}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.faqContent.admission')}</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.exams')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.exams')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.budget')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.budget')}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок блока */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-[#0A2647]">
          <h1 className="text-4xl font-bold text-[#0A2647] mb-2">{t('mededu.title')}</h1>
          <p className="text-[#144272] text-lg">{t('mededu.code')}</p>
        </div>

        {/* Основная информация в блоках */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#0A2647] to-[#144272] text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 mr-3 text-blue-100" />
                <h3 className="text-xl font-semibold">{t('mededu.duration')}</h3>
              </div>
              <p className="text-lg">{t('mededu.fullTime')}</p>
              <p className="text-lg">{t('mededu.partTime')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 mr-3 text-blue-100" />
                <h3 className="text-xl font-semibold">{t('mededu.intakes')}</h3>
              </div>
              <p className="text-lg">{t('mededu.intakeMonths')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 mr-3 text-blue-100" />
                <h3 className="text-xl font-semibold">{t('mededu.brochure')}</h3>
              </div>
              <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors mt-2">
                {t('mededu.download')}
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-4">
                <Laptop className="w-6 h-6 mr-3 text-blue-100" />
                <h3 className="text-xl font-semibold">{t('mededu.online')}</h3>
              </div>
              <p className="text-lg opacity-90">{t('mededu.onlineInfo', 'Дистанционное обучение')}</p>
            </div>
          </div>
        </div>

        {/* Описание программы */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#0A2647] mb-6">{t('mededu.overview')}</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>{t('mededu.overviewText')}</p>
          </div>
        </div>

        {/* Аккордеон с дополнительной информацией */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-[#0A2647] mb-6">{t('mededu.details')}</h2>
          <div className="space-y-4">
            {accordionItems.map((item, index) => (
              <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center">
                    <div className="text-[#144272] mr-4">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xl font-semibold text-[#0A2647]">{item.title}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transform transition-transform text-[#144272] ${activeAccordion === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-screen p-6' : 'max-h-0'}`}>
                  <div className="text-gray-700 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProgramPage;