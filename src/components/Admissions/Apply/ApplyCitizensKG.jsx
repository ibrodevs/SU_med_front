import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, FileEdit, GraduationCap, IdCard, ScrollText, Building2, Camera, Lightbulb, BookOpen, PartyPopper } from 'lucide-react';

const ApplyCitizensKG = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);

  // Статичные данные для пошаговой инструкции
  const steps = [
    {
      id: 1,
      title: t('applyCitizens.step1.title', 'Подача документов'),
      description: t('applyCitizens.step1.desc', 'Сбор и подача необходимых документов'),
      duration: t('applyCitizens.step1.duration', '1-2 недели'),
      icon: <ClipboardList className="w-6 h-6" />
    },
    {
      id: 2,
      title: t('applyCitizens.step2.title', 'Сдача экзаменов'),
      description: t('applyCitizens.step2.desc', 'Прохождение вступительных испытаний'),
      duration: t('applyCitizens.step2.duration', '1 день'),
      icon: <FileEdit className="w-6 h-6" />
    },
    {
      id: 3,
      title: t('applyCitizens.step3.title', 'Зачисление'),
      description: t('applyCitizens.step3.desc', 'Получение результатов и зачисление'),
      duration: t('applyCitizens.step3.duration', '1-2 недели'),
      icon: <GraduationCap className="w-6 h-6" />
    }
  ];

  // Статичные данные для документов
  const requiredDocuments = [
    {
      name: t('applyCitizens.docs.passport', 'Паспорт гражданина КР'),
      description: t('applyCitizens.docs.passportDesc', 'Оригинал + копия'),
      icon: <IdCard className="w-6 h-6" />
    },
    {
      name: t('applyCitizens.docs.certificate', 'Аттестат о среднем образовании'),
      description: t('applyCitizens.docs.certificateDesc', 'Оригинал + нотариальная копия'),
      icon: <ScrollText className="w-6 h-6" />
    },
    {
      name: t('applyCitizens.docs.medical', 'Медицинская справка'),
      description: t('applyCitizens.docs.medicalDesc', 'Форма 086/у с флюорографией'),
      icon: <Building2 className="w-6 h-6" />
    },
    {
      name: t('applyCitizens.docs.photos', 'Фотографии'),
      description: t('applyCitizens.docs.photosDesc', '6 штук 3x4 см'),
      icon: <Camera className="w-6 h-6" />
    }
  ];

  // Статичные данные для календаря подачи заявок
  const applicationPeriods = [
    {
      period: t('applyCitizens.calendar.period1', 'Первая волна'),
      dates: t('applyCitizens.calendar.dates1', '1 июня - 15 июля'),
      description: t('applyCitizens.calendar.desc1', 'Основной период подачи документов'),
      status: 'active'
    },
    {
      period: t('applyCitizens.calendar.period2', 'Вторая волна'),
      dates: t('applyCitizens.calendar.dates2', '16 июля - 31 июля'),
      description: t('applyCitizens.calendar.desc2', 'Дополнительный период (при наличии мест)'),
      status: 'upcoming'
    },
    {
      period: t('applyCitizens.calendar.period3', 'Третья волна'),
      dates: t('applyCitizens.calendar.dates3', '1 августа - 15 августа'),
      description: t('applyCitizens.calendar.desc3', 'Заключительный период'),
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('applyCitizens.title', 'Подача заявки для граждан КР')}
          </h1>
          <p className="text-xl opacity-90">
            {t('applyCitizens.subtitle', 'Пошаговое руководство по поступлению в Медицинский университет')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Пошаговая инструкция */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('applyCitizens.process.title', 'Процесс поступления')}
          </h2>
          
          {/* Шаги */}
          <div className="flex flex-col md:flex-row justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all ${
                      activeStep === step.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    {step.icon}
                  </div>
                  <h3 className={`mt-2 text-center font-semibold ${
                    activeStep === step.id ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">{step.duration}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>

          {/* Детали активного шага */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {steps.find(s => s.id === activeStep)?.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {steps.find(s => s.id === activeStep)?.description}
            </p>
            
            {activeStep === 1 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step1.actions', 'Что нужно сделать:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step1.action1', 'Собрать необходимые документы')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step1.action2', 'Заполнить заявление')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step1.action3', 'Подать документы в приемную комиссию')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step1.tips', 'Полезные советы:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><Lightbulb className="w-4 h-4" /></span>
                      {t('applyCitizens.step1.tip1', 'Подавайте документы как можно раньше')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><Lightbulb className="w-4 h-4" /></span>
                      {t('applyCitizens.step1.tip2', 'Проверьте все документы заранее')}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step2.exams', 'Виды экзаменов:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step2.ort', 'ОРТ (Общереспубликанское тестирование)')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step2.interview', 'Собеседование (для некоторых специальностей)')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step2.preparation', 'Подготовка:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><BookOpen className="w-4 h-4" /></span>
                      {t('applyCitizens.step2.prep1', 'Изучите программу ОРТ')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><BookOpen className="w-4 h-4" /></span>
                      {t('applyCitizens.step2.prep2', 'Пройдите пробные тесты')}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step3.results', 'Получение результатов:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step3.result1', 'Проверка результатов на сайте')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step3.result2', 'Получение уведомления')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyCitizens.step3.result3', 'Подтверждение зачисления')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('applyCitizens.step3.next', 'Дальнейшие действия:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><PartyPopper className="w-4 h-4" /></span>
                      {t('applyCitizens.step3.next1', 'Оплата обучения (для контракта)')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2"><PartyPopper className="w-4 h-4" /></span>
                      {t('applyCitizens.step3.next2', 'Получение студенческого билета')}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Необходимые документы */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('applyCitizens.documents.title', 'Необходимые документы')}
              </h2>
            </div>
            
            <div className="space-y-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-3">{doc.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{doc.name}</h3>
                      <p className="text-gray-600 text-sm">{doc.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400">
              <p className="text-sm text-blue-800">
                <strong>{t('applyCitizens.documents.note', 'Важно:')}</strong> {' '}
                {t('applyCitizens.documents.noteText', 'Все документы должны быть в оригинале с нотариальными копиями.')}
              </p>
            </div>
          </div>

          {/* Календарь подачи заявок */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('applyCitizens.calendar.title', 'Сроки подачи заявок')}
              </h2>
            </div>
            
            <div className="space-y-4">
              {applicationPeriods.map((period, index) => (
                <div key={index} className={`border-2 rounded-lg p-4 ${
                  period.status === 'active' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{period.period}</h3>
                    {period.status === 'active' && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {t('applyCitizens.calendar.active', 'Активно')}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 font-medium mb-1">{period.dates}</p>
                  <p className="text-gray-600 text-sm">{period.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50/80 border-l-4 border-amber-500">
              <p className="text-sm text-yellow-800">
                <strong>{t('applyCitizens.calendar.reminder', 'Напоминание:')}</strong> {' '}
                {t('applyCitizens.calendar.reminderText', 'Рекомендуется подавать документы в первую волну для лучших шансов на зачисление.')}
              </p>
            </div>
          </div>
        </div>

        {/* Контакты приемной комиссии */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('applyCitizens.contact.title', 'Контакты приемной комиссии')}
            </h2>
            <p className="text-gray-600">
              {t('applyCitizens.contact.subtitle', 'Мы готовы помочь вам на каждом этапе поступления')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyCitizens.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600">+996 312 545 000</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyCitizens.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600">admissions@su.edu.kg</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyCitizens.contact.hours', 'Часы работы')}
              </h3>
              <p className="text-gray-600">
                {t('applyCitizens.contact.schedule', 'Пн-Пт: 9:00-18:00')}
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyCitizens.contact.address', 'Адрес')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('applyCitizens.contact.addressText', 'г. Бишкек, ул. Интергельпо 720000')}
              </p>
            </div>
          </div>

          {/* Карта (заглушка) */}
          <div className="mt-8">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-gray-500">{t('applyCitizens.contact.mapPlaceholder', 'Интерактивная карта')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyCitizensKG;
