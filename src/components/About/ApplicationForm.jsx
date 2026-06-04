import React, { useState } from 'react';
import { User, FileText, Paperclip, Lightbulb, CheckCircle2, Mail, Plus, Lock } from 'lucide-react';

const ApplicationForm = ({ vacancy, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
    experience: '',
    motivation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, введите ваше полное имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, введите email адрес';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите корректный email адрес';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, введите номер телефона';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Пожалуйста, введите корректный номер телефона';
    }

    if (!formData.cv) {
      newErrors.cv = 'Пожалуйста, прикрепите резюме';
    } else {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(formData.cv.type)) {
        newErrors.cv = 'Допустимые форматы: PDF, DOC, DOCX';
      } else if (formData.cv.size > 5 * 1024 * 1024) {
        newErrors.cv = 'Размер файла не должен превышать 5 МБ';
      }
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Пожалуйста, напишите сопроводительное письмо';
    } else if (formData.coverLetter.trim().length < 100) {
      newErrors.coverLetter = 'Сопроводительное письмо должно содержать минимум 100 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Имитация отправки формы
      await new Promise(resolve => setTimeout(resolve, 2000));
      

      alert(`Спасибо за отклик на вакансию "${vacancy.title}"! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.`);
      onClose();
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, cv: file});
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-blue-900">
                Отклик на вакансию
              </h2>
              <p className="text-xl text-blue-600 mt-2">
                {vacancy.title}
              </p>
              <p className="text-gray-600 mt-1">
                {vacancy.department}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Личная информация
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Полное имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Введите ваше полное имя"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+996 XXX XXX XXX"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Paperclip className="w-5 h-5 text-blue-600" />
                Резюме
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Прикрепите резюме (CV) *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-3 border border-dashed rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.cv ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <p className="text-sm text-gray-500 mt-2 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span>Принимаются файлы форматов: PDF, DOC, DOCX (до 5 МБ)</span>
                </p>
                {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
                
                {formData.cv && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Файл загружен: <strong>{formData.cv.name}</strong> ({Math.round(formData.cv.size / 1024)} КБ)</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-amber-50/80 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Сопроводительное письмо
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Расскажите о себе и своей мотивации *
                </label>
                <textarea
                  rows="6"
                  required
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.coverLetter ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Напишите, почему вы заинтересованы в этой позиции, какой у вас опыт и что вы можете привнести в команду университета..."
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.coverLetter && <p className="text-red-500 text-sm">{errors.coverLetter}</p>}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.coverLetter.length}/1000 символов (минимум 100)
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                Дополнительная информация
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Опыт работы (краткое описание)
                </label>
                <textarea
                  rows="3"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Кратко опишите ваш релевантный опыт работы..."
                />
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-sm text-gray-700">
                <span className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Обработка персональных данных:</strong> Отправляя эту форму, вы соглашаетесь с обработкой ваших персональных данных в соответствии с политикой конфиденциальности университета. Ваши данные будут использованы исключительно для рассмотрения вашей кандидатуры.
                  </span>
                </span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Отправка...
                  </>
                ) : (
                  'Отправить заявку'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
