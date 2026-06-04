import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, User, GraduationCap, FileText, CheckCircle2, XCircle, DollarSign, Phone, Mail, Home, Trash2, FolderOpen, Send, Loader2, HelpCircle, Clock, Save, Pencil, Check } from 'lucide-react';
import { emailConfig, openGmailCompose, createMailtoLink } from '../../config/emailConfig';
import admissionsAPI from '../../services/admissionsAPI';

const OnlineApplication = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Program selection
    program: '',
    programDetails: null,
    
    // Step 2: Personal information
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    
    // Step 3: Education
    schoolName: '',
    graduationYear: '',
    certificateNumber: '',
    ortScore: '',
    subjects: {
      biology: '',
      chemistry: '',
      physics: '',
      mathematics: ''
    },
    
    // Step 4: Documents
    documents: {
      certificate: null,
      passport: null,
      medical: null,
      photos: null,
      ortCertificate: null
    },
    
    // Step 5: Confirmation
    agreeTerms: false,
    agreePrivacy: false
  });

  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = [
  {
    id: 'medicine',
    name: t('application.programs.medicine.name'),
    duration: t('application.programs.medicine.duration'),
    cost: t('application.programs.medicine.cost'),
    requirements: t('application.programs.medicine.requirements'),
    description: t('application.programs.medicine.description')
  },
  {
    id: 'dentistry',
    name: t('application.programs.dentistry.name'),
    duration: t('application.programs.dentistry.duration'),
    cost: t('application.programs.dentistry.cost'),
    requirements: t('application.programs.dentistry.requirements'),
    description: t('application.programs.dentistry.description')
  },
  {
    id: 'pharmacy',
    name: t('application.programs.pharmacy.name'),
    duration: t('application.programs.pharmacy.duration'),
    cost: t('application.programs.pharmacy.cost'),
    requirements: t('application.programs.pharmacy.requirements'),
    description: t('application.programs.pharmacy.description')
  },
  {
    id: 'nursing',
    name: t('application.programs.nursing.name'),
    duration: t('application.programs.nursing.duration'),
    cost: t('application.programs.nursing.cost'),
    requirements: t('application.programs.nursing.requirements'),
    description: t('application.programs.nursing.description')
  }
];


  const steps = [
    { id: 1, title: t('application.steps.program'), icon: <ClipboardList className="w-5 h-5" /> },
    { id: 2, title: t('application.steps.personal'), icon: <User className="w-5 h-5" /> },
    { id: 3, title: t('application.steps.education'), icon: <GraduationCap className="w-5 h-5" /> },
    { id: 4, title: t('application.steps.documents'), icon: <FileText className="w-5 h-5" /> },
    { id: 5, title: t('application.steps.confirmation'), icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      const draftData = {
        formData: formData,
        currentStep: currentStep
      };
      localStorage.setItem('applicationDraft', JSON.stringify(draftData));
      setIsDraftSaved(true);
      setTimeout(() => setIsDraftSaved(false), 2000);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData, currentStep]);

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('applicationDraft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        // Check if it's the new format with currentStep
        if (parsedDraft.formData && parsedDraft.currentStep) {
          setFormData(parsedDraft.formData);
          setCurrentStep(parsedDraft.currentStep);
          setIsDraftLoaded(true);
          setTimeout(() => setIsDraftLoaded(false), 5000);
        } else {
          // Old format - just formData
          setFormData(parsedDraft);
          setIsDraftLoaded(true);
          setTimeout(() => setIsDraftLoaded(false), 5000);
        }
      } catch (error) {
        console.error('Error loading draft:', error);
        localStorage.removeItem('applicationDraft');
      }
    }
  }, []);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.program) newErrors.program = t('application.validation.selectProgram');
        break;
      
      case 2:
        if (!formData.firstName) newErrors.firstName = t('application.validation.required');
        else if (formData.firstName.length < 2) newErrors.firstName = t('application.validation.minLength');
        
        if (!formData.lastName) newErrors.lastName = t('application.validation.required');
        else if (formData.lastName.length < 2) newErrors.lastName = t('application.validation.minLength');
        
        if (!formData.birthDate) newErrors.birthDate = t('application.validation.required');
        else {
          const birthYear = new Date(formData.birthDate).getFullYear();
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          if (age < 16 || age > 35) newErrors.birthDate = t('application.validation.age');
        }
        
        if (!formData.phone) newErrors.phone = t('application.validation.required');
        else if (!/^\+996\s?\d{3}\s?\d{3}\s?\d{3}$/.test(formData.phone)) {
          newErrors.phone = t('application.validation.phoneFormat');
        }
        
        if (!formData.email) newErrors.email = t('application.validation.required');
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('application.validation.emailInvalid');
        break;
      
      case 3:
        if (!formData.schoolName) newErrors.schoolName = t('application.validation.required');
        if (!formData.graduationYear) newErrors.graduationYear = t('application.validation.required');
        if (!formData.ortScore) newErrors.ortScore = t('application.validation.required');
        else if (formData.ortScore < 0 || formData.ortScore > 240) {
          newErrors.ortScore = t('application.validation.ortRange');
        }
        break;
      
      case 4:
        if (!formData.documents.certificate) newErrors.certificate = t('application.validation.required');
        else if (!validateFile(formData.documents.certificate, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.certificate = t('application.validation.fileFormat');
        }
        
        if (!formData.documents.passport) newErrors.passport = t('application.validation.required');
        else if (!validateFile(formData.documents.passport, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.passport = t('application.validation.fileFormat');
        }
        
        if (!formData.documents.medical) newErrors.medical = t('application.validation.required');
        else if (!validateFile(formData.documents.medical, ['pdf', 'jpg', 'jpeg', 'png'], 5)) {
          newErrors.medical = t('application.validation.fileFormat');
        }
        break;
      
      case 5:
        if (!formData.agreeTerms) newErrors.agreeTerms = t('application.validation.agreeTerms');
        if (!formData.agreePrivacy) newErrors.agreePrivacy = t('application.validation.agreePrivacy');
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateFile = (file, allowedTypes, maxSizeMB) => {
    if (!file) return false;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileSizeMB = file.size / (1024 * 1024);
    
    return allowedTypes.includes(fileExtension) && fileSizeMB <= maxSizeMB;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (fieldName, file) => {
    updateFormData({
      documents: {
        ...formData.documents,
        [fieldName]: file
      }
    });
  };

  // Функция для создания тела письма с данными заявки
  const generateApplicationEmailBody = (data) => {
    return `
ЗАЯВКА НА ПОСТУПЛЕНИЕ
Салымбеков Университет

=== ЛИЧНЫЕ ДАННЫЕ ===
ФИО: ${data.lastName} ${data.firstName} ${data.middleName || ''}
Дата рождения: ${data.birthDate}
Пол: ${data.gender}
Телефон: ${data.phone}
Email: ${data.email}
Адрес: ${data.address}

=== ПРОГРАММА ОБУЧЕНИЯ ===
Выбранная программа: ${data.program}
${data.programDetails ? `Детали программы: ${JSON.stringify(data.programDetails, null, 2)}` : ''}

=== ОБРАЗОВАНИЕ ===
Название школы: ${data.schoolName}
Год окончания: ${data.graduationYear}
Номер аттестата: ${data.certificateNumber}
Балл ОРТ: ${data.ortScore}

=== ОЦЕНКИ ПО ПРЕДМЕТАМ ===
Биология: ${data.subjects?.biology || 'не указано'}
Химия: ${data.subjects?.chemistry || 'не указано'}
Физика: ${data.subjects?.physics || 'не указано'}
Математика: ${data.subjects?.mathematics || 'не указано'}

=== ДОКУМЕНТЫ ===
${Object.keys(data.documents).filter(key => data.documents[key]).length > 0 
  ? 'Приложены документы: ' + Object.keys(data.documents).filter(key => data.documents[key]).join(', ')
  : 'Документы будут предоставлены отдельно'}

=== СОГЛАСИЯ ===
Согласие с условиями: ${data.agreeTerms ? 'Да' : 'Нет'}
Согласие на обработку данных: ${data.agreePrivacy ? 'Да' : 'Нет'}

Дата подачи заявки: ${new Date().toLocaleString('ru-RU')}

--
С уважением,
${data.firstName} ${data.lastName}
    `.trim();
  };

  const submitApplication = async () => {
    if (validateStep(5)) {
      setIsSubmitting(true); // Устанавливаем состояние загрузки
      
      const subject = 'Заявка на поступление в Салымбеков Университет';
      const body = generateApplicationEmailBody(formData);

      const hasAnyFile = !!(
        formData.documents.certificate ||
        formData.documents.passport ||
        formData.documents.medical ||
        (formData.documents.photos && formData.documents.photos.length > 0) ||
        formData.documents.ortCertificate
      );

      try {
        // Всегда отправляем через backend (с телом письма и вложениями, если есть)
        await admissionsAPI.submitWithAttachments({
          ...formData,
          body,
          submittedAt: new Date().toLocaleString('ru-RU')
        });

        alert('Заявка отправлена на почту приемной комиссии' + (hasAnyFile ? ' вместе с документами.' : '.'));
        // Откроем Gmail как визуальное подтверждение (текст без вложений)
        try { openGmailCompose(emailConfig.mainAdmissions, subject, body); } catch (_) {}
        localStorage.removeItem('applicationDraft');
        return;
      } catch (e) {
        console.error('Backend email send failed:', e);
        // Резерв: открыть почтовый клиент
        try {
          openGmailCompose(emailConfig.mainAdmissions, subject, body);
        } catch (err) {
          const mailtoLink = createMailtoLink(emailConfig.mainAdmissions, subject, body);
          window.location.href = mailtoLink;
        }
        alert('Не удалось отправить через сервер. Открылся ваш почтовый клиент с готовым письмом. Добавьте файлы вручную и отправьте.');
      } finally {
        setIsSubmitting(false); // Сбрасываем состояние загрузки в любом случае
      }
    }
  };

  const saveDraft = () => {
    const draftData = {
      formData: formData,
      currentStep: currentStep
    };
    localStorage.setItem('applicationDraft', JSON.stringify(draftData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const clearDraft = () => {
    if (window.confirm(t('application.dialogs.clearForm'))) {
      localStorage.removeItem('applicationDraft');
      setFormData({
        program: '',
        programDetails: null,
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        schoolName: '',
        graduationYear: '',
        certificateNumber: '',
        ortScore: '',
        subjects: {
          biology: '',
          chemistry: '',
          physics: '',
          mathematics: ''
        },
        documents: {
          certificate: null,
          passport: null,
          medical: null,
          photos: null,
          ortCertificate: null
        },
        agreeTerms: false,
        agreePrivacy: false
      });
      setCurrentStep(1);
      setErrors({});
      alert(t('application.dialogs.formCleared'));
    }
  };

  const renderStep1 = () => {
    const filteredPrograms = programs.filter(program =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('application.stepTitles.step1')}</h3>
          <p className="text-gray-600">{t('application.selectProgram')}</p>
        </div>
        
        {/* Search input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Поиск программы
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('application.search.placeholder')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid gap-4">
          {filteredPrograms.length > 0 ? filteredPrograms.map(program => (
            <div
              key={program.id}
              className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                formData.program === program.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => {
                updateFormData({ program: program.id, programDetails: program });
                setErrors({ ...errors, program: null });
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-800">{program.name}</h4>
                <span className="text-sm text-blue-600 font-medium">{program.duration}</span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{program.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span><DollarSign className="w-4 h-4 inline-block" /> {program.cost}</span>
                <span><ClipboardList className="w-4 h-4 inline-block" /> {program.requirements}</span>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <p>{t('application.search.noResults')}</p>
            </div>
          )}
        </div>
        
        {errors.program && (
          <div className="text-red-600 text-sm">{errors.program}</div>
        )}
      </div>
    );
  };

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('application.stepTitles.step2')}</h3>
        <p className="text-gray-600">{t('application.personalInfo.title')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.lastName')} *
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.lastName && <div className="text-red-600 text-sm mt-1">{errors.lastName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.firstName')} *
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.firstName && <div className="text-red-600 text-sm mt-1">{errors.firstName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.middleName')}
          </label>
          <input
            type="text"
            value={formData.middleName}
            onChange={(e) => updateFormData({ middleName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.birthDate')} *
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => updateFormData({ birthDate: e.target.value })}
            max={new Date(new Date().getFullYear() - 16, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
            min={new Date(new Date().getFullYear() - 35, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.birthDate && <div className="text-red-600 text-sm mt-1">{errors.birthDate}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.gender')}
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('application.personalInfo.selectGender')}</option>
            <option value="male">{t('application.personalInfo.male')}</option>
            <option value="female">{t('application.personalInfo.female')}</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.phone')} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              let value = e.target.value;
              // Auto-format phone number
              if (!value.startsWith('+996')) {
                value = '+996 ' + value.replace(/^\+996\s?/, '');
              }
              updateFormData({ phone: value });
            }}
            placeholder={t('application.personalInfo.phonePlaceholder')}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.email')} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.personalInfo.address')}
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('application.stepTitles.step3')}</h3>
        <p className="text-gray-600">{t('application.education.title')}</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.education.schoolName')} *
          </label>
          <input
            type="text"
            value={formData.schoolName}
            onChange={(e) => updateFormData({ schoolName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.schoolName && <div className="text-red-600 text-sm mt-1">{errors.schoolName}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.education.graduationYear')} *
          </label>
          <select
            value={formData.graduationYear}
            onChange={(e) => updateFormData({ graduationYear: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('application.education.selectYear')}</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.graduationYear && <div className="text-red-600 text-sm mt-1">{errors.graduationYear}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.education.certificateNumber')}
          </label>
          <input
            type="text"
            value={formData.certificateNumber}
            onChange={(e) => updateFormData({ certificateNumber: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.education.ortScore')} *
          </label>
          <input
            type="number"
            value={formData.ortScore}
            onChange={(e) => updateFormData({ ortScore: e.target.value })}
            min="0"
            max="240"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.ortScore && <div className="text-red-600 text-sm mt-1">{errors.ortScore}</div>}
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-4">{t('application.education.subjectsOptional')}</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.education.biology')}
            </label>
            <input
              type="number"
              value={formData.subjects.biology}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, biology: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.education.chemistry')}
            </label>
            <input
              type="number"
              value={formData.subjects.chemistry}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, chemistry: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.education.physics')}
            </label>
            <input
              type="number"
              value={formData.subjects.physics}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, physics: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('application.education.mathematics')}
            </label>
            <input
              type="number"
              value={formData.subjects.mathematics}
              onChange={(e) => updateFormData({
                subjects: { ...formData.subjects, mathematics: e.target.value }
              })}
              min="1"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('application.stepTitles.step4')}</h3>
        <p className="text-gray-600">{t('application.documents.description')}</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.certificate')} *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('certificate', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.certificate && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <Check className="w-4 h-4 mr-1 flex-shrink-0" /> {t('application.documents.fileUploaded')}: {formData.documents.certificate.name}
            </div>
          )}
          {errors.certificate && <div className="text-red-600 text-sm mt-1">{errors.certificate}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.passport')} *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('passport', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.passport && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <Check className="w-4 h-4 mr-1 flex-shrink-0" /> {t('application.documents.fileUploaded')}: {formData.documents.passport.name}
            </div>
          )}
          {errors.passport && <div className="text-red-600 text-sm mt-1">{errors.passport}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.medical')} *
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('medical', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.medical && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <Check className="w-4 h-4 mr-1 flex-shrink-0" /> {t('application.documents.fileUploaded')}: {formData.documents.medical.name}
            </div>
          )}
          {errors.medical && <div className="text-red-600 text-sm mt-1">{errors.medical}</div>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.photos')}
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={(e) => handleFileUpload('photos', e.target.files)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.photos && formData.documents.photos.length > 0 && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <Check className="w-4 h-4 mr-1 flex-shrink-0" /> {t('application.documents.photosUploaded')}: {formData.documents.photos.length} шт.
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('application.documents.ortCertificate')}
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload('ortCertificate', e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {formData.documents.ortCertificate && (
            <div className="text-green-600 text-sm mt-1 flex items-center">
              <Check className="w-4 h-4 mr-1 flex-shrink-0" /> {t('application.documents.fileUploaded')}: {formData.documents.ortCertificate.name}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2"><ClipboardList className="w-5 h-5 inline-block mr-1" /> {t('application.documents.requirements.title')}</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• {t('application.documents.requirements.format')}</li>
          <li>• {t('application.documents.requirements.size')}</li>
          <li>• {t('application.documents.requirements.quality')}</li>
          <li>• {t('application.documents.requirements.passport')}</li>
          <li>• {t('application.documents.requirements.photos')}</li>
        </ul>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('application.stepTitles.step5')}</h3>
        <p className="text-gray-600">{t('application.confirmation.description')}</p>
      </div>
      
      <div className="space-y-6">
        {/* Program Details */}
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
          <div className="flex items-center mb-3">
            <span className="mr-3 text-green-600"><ClipboardList className="w-6 h-6" /></span>
            <h4 className="font-semibold text-gray-800 text-lg">{t('application.confirmation.selectedProgram')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">{formData.programDetails?.name}</p>
              <p className="text-gray-600 text-sm">{formData.programDetails?.description}</p>
            </div>
            <div className="text-sm text-gray-600">
              <p>Срок обучения: {formData.programDetails?.duration}</p>
              <p>Стоимость: {formData.programDetails?.cost}</p>
              <p>Требования: {formData.programDetails?.requirements}</p>
            </div>
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
          <div className="flex items-center mb-3">
            <span className="mr-3 text-blue-600"><User className="w-6 h-6" /></span>
            <h4 className="font-semibold text-gray-800 text-lg">{t('application.confirmation.personalData')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">
                {formData.lastName} {formData.firstName} {formData.middleName}
              </p>
              <p className="text-gray-600 text-sm">{t('application.personalInfo.birthDate')}: {formData.birthDate}</p>
              {formData.gender && <p className="text-gray-600 text-sm">{t('application.personalInfo.gender')}: {formData.gender === 'male' ? t('application.personalInfo.male') : t('application.personalInfo.female')}</p>}
            </div>
            <div className="text-sm text-gray-600">
              <p><Phone className="w-4 h-4 inline-block mr-1" /> {formData.phone}</p>
              <p><Mail className="w-4 h-4 inline-block mr-1" /> {formData.email}</p>
              {formData.address && <p><Home className="w-4 h-4 inline-block mr-1" /> {formData.address}</p>}
            </div>
          </div>
        </div>
        
        {/* Education */}
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
          <div className="flex items-center mb-3">
            <span className="mr-3 text-yellow-600"><GraduationCap className="w-6 h-6" /></span>
            <h4 className="font-semibold text-gray-800 text-lg">{t('application.confirmation.education')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-800">{formData.schoolName}</p>
              <p className="text-gray-600 text-sm">{t('application.education.graduationYear')}: {formData.graduationYear}</p>
              {formData.certificateNumber && <p className="text-gray-600 text-sm">{t('application.education.certificateNumber')} №: {formData.certificateNumber}</p>}
            </div>
            <div className="text-sm text-gray-600">
              <p>{t('application.education.ortScore')}: {formData.ortScore} баллов</p>
              {Object.entries(formData.subjects).some(([, value]) => value) && (
                <div className="mt-2">
                  <p className="font-medium">{t('application.education.subjects')}:</p>
                  {Object.entries(formData.subjects).map(([subject, grade]) => 
                    grade && (
                      <span key={subject} className="inline-block mr-3">
                        {subject === 'biology' && t('application.education.biology')} 
                        {subject === 'chemistry' && t('application.education.chemistry')} 
                        {subject === 'physics' && t('application.education.physics')} 
                        {subject === 'mathematics' && t('application.education.mathematics')}: {grade}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Documents */}
        <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
          <div className="flex items-center mb-3">
            <span className="mr-3 text-purple-600"><FileText className="w-6 h-6" /></span>
            <h4 className="font-semibold text-gray-800 text-lg">{t('application.confirmation.uploadedDocuments')}</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="flex items-center">
                {formData.documents.certificate ? <CheckCircle2 className="w-4 h-4 text-green-600 inline-block" /> : <XCircle className="w-4 h-4 text-red-400 inline-block" />} 
                <span className="ml-2">{t('application.documents.certificate')}</span>
              </p>
              <p className="flex items-center">
                {formData.documents.passport ? <CheckCircle2 className="w-4 h-4 text-green-600 inline-block" /> : <XCircle className="w-4 h-4 text-red-400 inline-block" />} 
                <span className="ml-2">{t('application.documents.passport')}</span>
              </p>
              <p className="flex items-center">
                {formData.documents.medical ? <CheckCircle2 className="w-4 h-4 text-green-600 inline-block" /> : <XCircle className="w-4 h-4 text-red-400 inline-block" />} 
                <span className="ml-2">{t('application.documents.medical')}</span>
              </p>
            </div>
            <div>
              <p className="flex items-center">
                {formData.documents.photos?.length > 0 ? <CheckCircle2 className="w-4 h-4 text-green-600 inline-block" /> : <span className="w-4 h-4 rounded-full border-2 border-gray-300 inline-block"></span>} 
                <span className="ml-2">{t('application.documents.photos')} (необязательно)</span>
              </p>
              <p className="flex items-center">
                {formData.documents.ortCertificate ? <CheckCircle2 className="w-4 h-4 text-green-600 inline-block" /> : <span className="w-4 h-4 rounded-full border-2 border-gray-300 inline-block"></span>} 
                <span className="ml-2">{t('application.documents.ortCertificate')} (необязательно)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit buttons */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">{t('application.confirmation.editSections')}</h4>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setCurrentStep(1)}
            className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 flex items-center"
          >
            <Pencil className="w-3.5 h-3.5 mr-1" /> {t('application.confirmation.editProgram')}
          </button>
          <button 
            onClick={() => setCurrentStep(2)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 flex items-center"
          >
            <Pencil className="w-3.5 h-3.5 mr-1" /> {t('application.confirmation.editPersonal')}
          </button>
          <button 
            onClick={() => setCurrentStep(3)}
            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200 flex items-center"
          >
            <Pencil className="w-3.5 h-3.5 mr-1" /> {t('application.confirmation.editEducation')}
          </button>
          <button 
            onClick={() => setCurrentStep(4)}
            className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 flex items-center"
          >
            <Pencil className="w-3.5 h-3.5 mr-1" /> {t('application.confirmation.editDocuments')}
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => updateFormData({ agreeTerms: e.target.checked })}
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            {t('application.confirmation.agreeTerms')}{' '}
            <a href="#" className="text-blue-600 underline">{t('application.confirmation.rulesLink')}</a>
            {' '} и {' '}
            <a href="#" className="text-blue-600 underline">{t('application.confirmation.conditionsLink')}</a>
          </span>
        </label>
        {errors.agreeTerms && <div className="text-red-600 text-sm">{errors.agreeTerms}</div>}
        
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreePrivacy}
            onChange={(e) => updateFormData({ agreePrivacy: e.target.checked })}
            className="mt-1 mr-3"
          />
          <span className="text-sm text-gray-700">
            {t('application.confirmation.agreePrivacy')}{' '}
            <a href="#" className="text-blue-600 underline">{t('application.confirmation.privacyLink')}</a>
          </span>
        </label>
        {errors.agreePrivacy && <div className="text-red-600 text-sm">{errors.agreePrivacy}</div>}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('application.title')}
            </h1>
            <p className="text-xl opacity-90 mb-2">
              {t('application.subtitle')}
            </p>
            <p className="text-sm opacity-75">
              <Save className="w-4 h-4 inline-block mr-1" /> {t('application.autosave')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium transition-all ${
                  currentStep >= step.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : currentStep === step.id - 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-2 mx-4 rounded-full transition-all ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {t('application.progress.step')} {currentStep} {t('application.progress.of')} {steps.length}: {steps[currentStep - 1].title}
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t('application.progress.progress')}: {Math.round((currentStep / steps.length) * 100)}%
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation Buttons */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
  {/* Left side buttons */}
  <div className="flex items-center gap-3 w-full sm:w-auto">
    <button
      onClick={prevStep}
      disabled={currentStep === 1}
      className={`flex items-center justify-center px-4 py-3 rounded-xl font-medium transition-all 
        flex-1 sm:flex-none min-w-[120px] sm:min-w-[140px] ${
        currentStep === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200 hover:border-gray-300 hover:shadow-lg transform hover:-translate-y-0.5'
      }`}
    >
      <span className="text-lg mr-2">←</span>
      <span className="hidden sm:inline">{t('application.navigation.previous')}</span>
      <span className="sm:hidden">Назад</span>
    </button>
    
    <button
      onClick={clearDraft}
      className="flex items-center justify-center px-4 py-3 rounded-xl bg-white text-red-600 font-medium 
        hover:bg-red-50 shadow-md border border-red-200 hover:border-red-300 hover:shadow-lg 
        transition-all transform hover:-translate-y-0.5 flex-1 sm:flex-none min-w-[100px] sm:min-w-[120px]"
    >
      <span className="mr-2"><Trash2 className="w-5 h-5" /></span>
      <span className="hidden sm:inline">Очистить</span>
      <span className="sm:hidden">Очистить</span>
    </button>
  </div>
  
  {/* Status messages */}
  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
    {isDraftLoaded && (
      <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium">
        <span className="mr-2"><FolderOpen className="w-5 h-5" /></span>
        <span className="hidden sm:inline">{t('application.status.draftLoaded')}</span>
        <span className="sm:hidden">Черновик</span>
      </div>
    )}
    {isDraftSaved && (
      <div className="flex items-center bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium">
        <Check className="w-5 h-5 mr-2" />
        <span className="hidden sm:inline">{t('application.status.draftSaved')}</span>
        <span className="sm:hidden">Сохранено</span>
      </div>
    )}
  </div>
  
  {/* Right side buttons */}
  <div className="flex items-center gap-3 w-full sm:w-auto">
    {currentStep < 5 ? (
      <button
        onClick={nextStep}
        className="flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 
          text-white font-medium hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl 
          transition-all transform hover:-translate-y-0.5 flex-1 sm:flex-none min-w-[120px] sm:min-w-[140px]"
      >
        <span className="hidden sm:inline">{t('application.navigation.next')}</span>
        <span className="sm:hidden">Далее</span>
        <span className="text-lg ml-2">→</span>
      </button>
    ) : (
      <button
        onClick={submitApplication}
        disabled={isSubmitting}
        className={`flex items-center justify-center px-6 py-3 rounded-xl font-medium shadow-lg 
          transition-all transform hover:-translate-y-0.5 flex-1 sm:flex-none min-w-[140px] sm:min-w-[160px]
          ${isSubmitting 
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
          }`}
      >
        {isSubmitting ? (
          <>
            <span className="inline-block animate-spin mr-2"><Loader2 className="w-5 h-5" /></span>
            <span className="hidden sm:inline">Отправка...</span>
            <span className="sm:hidden">Отправка...</span>
          </>
        ) : (
          <>
            <span className="mr-2"><Send className="w-5 h-5" /></span>
            <span className="hidden sm:inline">{t('application.navigation.submit')}</span>
            <span className="sm:hidden">Отправить</span>
          </>
        )}
      </button>
    )}
  </div>
</div>

        {/* Help Information */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">
            <HelpCircle className="w-5 h-5 inline-block mr-1" /> {t('application.help.title')}
          </h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p><Phone className="w-4 h-4 inline-block mr-1" /> {t('application.help.phone')}</p>
              <p><Mail className="w-4 h-4 inline-block mr-1" /> {t('application.help.email')}</p>
            </div>
            <div>
              <p><Clock className="w-4 h-4 inline-block mr-1" /> {t('application.help.hours')}</p>
              <p><Save className="w-4 h-4 inline-block mr-1" /> {t('application.help.autosave')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineApplication;
