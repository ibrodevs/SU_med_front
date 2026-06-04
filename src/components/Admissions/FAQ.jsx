import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, FileText, PenLine, DollarSign, Home, Search, FileEdit, CheckCircle2, XCircle, X, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ name: '', email: '', question: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    { id: 'general', name: t('admissions.faq.categories.general'), icon: <HelpCircle className="w-5 h-5" />, count: 8 },
    { id: 'documents', name: t('admissions.faq.categories.documents'), icon: <FileText className="w-5 h-5" />, count: 6 },
    { id: 'exams', name: t('admissions.faq.categories.exams'), icon: <PenLine className="w-5 h-5" />, count: 7 },
    { id: 'payment', name: t('admissions.faq.categories.payment'), icon: <DollarSign className="w-5 h-5" />, count: 5 },
    { id: 'hostel', name: t('admissions.faq.categories.hostel'), icon: <Home className="w-5 h-5" />, count: 4 }
  ];

  const faqs = {
    general: [
      {
        question: t('admissions.faq.questions.general.q1'),
        answer: t('admissions.faq.questions.general.a1')
      },
      {
        question: t('admissions.faq.questions.general.q2'),
        answer: t('admissions.faq.questions.general.a2')
      },
      {
        question: t('admissions.faq.questions.general.q3'),
        answer: t('admissions.faq.questions.general.a3')
      },
      {
        question: t('admissions.faq.questions.general.q4'),
        answer: t('admissions.faq.questions.general.a4')
      },
      {
        question: t('admissions.faq.questions.general.q5'),
        answer: t('admissions.faq.questions.general.a5')
      },
      {
        question: t('admissions.faq.questions.general.q6'),
        answer: t('admissions.faq.questions.general.a6')
      },
      {
        question: t('faq.questions.general.exchangePrograms'),
        answer: t('faq.answers.general.exchangePrograms')
      },
      {
        question: t('faq.questions.general.militaryDeferment'),
        answer: t('faq.answers.general.militaryDeferment')
      }
    ],
    documents: [
      {
        question: t('faq.questions.documents.required'),
        answer: t('faq.answers.documents.required')
      },
      {
        question: t('faq.questions.documents.nostrification'),
        answer: t('faq.answers.documents.nostrification')
      },
      {
        question: t('faq.questions.documents.medicalValidity'),
        answer: t('faq.answers.documents.medicalValidity')
      },
      {
        question: t('faq.questions.documents.onlineSubmission'),
        answer: t('faq.answers.documents.onlineSubmission')
      },
      {
        question: t('faq.questions.documents.translation'),
        answer: t('faq.answers.documents.translation')
      },
      {
        question: t('faq.questions.documents.lostDocuments'),
        answer: t('faq.answers.documents.lostDocuments')
      }
    ],
    exams: [
      {
        question: t('faq.questions.exams.subjects'),
        answer: t('faq.answers.exams.subjects')
      },
      {
        question: t('faq.questions.exams.dates'),
        answer: t('faq.answers.exams.dates')
      },
      {
        question: t('faq.questions.exams.minimumScore'),
        answer: t('faq.answers.exams.minimumScore')
      },
      {
        question: t('faq.questions.exams.retake'),
        answer: t('faq.answers.exams.retake')
      },
      {
        question: t('faq.questions.exams.preparation'),
        answer: t('faq.answers.exams.preparation')
      },
      {
        question: t('faq.questions.exams.format'),
        answer: t('faq.answers.exams.format')
      },
      {
        question: t('faq.questions.exams.benefits'),
        answer: t('faq.answers.exams.benefits')
      }
    ],
    payment: [
      {
        question: t('faq.questions.payment.cost'),
        answer: t('faq.answers.payment.cost')
      },
      {
        question: t('faq.questions.payment.discounts'),
        answer: t('faq.answers.payment.discounts')
      },
      {
        question: t('faq.questions.payment.installment'),
        answer: t('faq.answers.payment.installment')
      },
      {
        question: t('faq.questions.payment.methods'),
        answer: t('faq.answers.payment.methods')
      },
      {
        question: t('faq.questions.payment.included'),
        answer: t('faq.answers.payment.included')
      }
    ],
    hostel: [
      {
        question: t('faq.questions.hostel.availability'),
        answer: t('faq.answers.hostel.availability')
      },
      {
        question: t('faq.questions.hostel.cost'),
        answer: t('faq.answers.hostel.cost')
      },
      {
        question: t('faq.questions.hostel.conditions'),
        answer: t('faq.answers.hostel.conditions')
      },
      {
        question: t('faq.questions.hostel.application'),
        answer: t('faq.answers.hostel.application')
      }
    ]
  };

  // Filter FAQs based on search term across all categories or within active category
  const getAllFilteredFAQs = () => {
    if (!searchTerm) return [];
    
    const allFAQs = [];
    Object.keys(faqs).forEach(categoryId => {
      faqs[categoryId].forEach((faq, index) => {
        if (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())) {
          allFAQs.push({...faq, categoryId, originalIndex: index});
        }
      });
    });
    return allFAQs;
  };

  const filteredFAQs = searchTerm 
    ? getAllFilteredFAQs()
    : faqs[activeCategory].map((faq, index) => ({...faq, categoryId: activeCategory, originalIndex: index}));

  // Highlight search term in text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark> : 
        part
    );
  };

  const toggleQuestion = (categoryId, index) => {
    const questionKey = `${categoryId}-${index}`;
    setOpenQuestion(openQuestion === questionKey ? null : questionKey);
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      setNewQuestion({ name: '', email: '', question: '' });
      setShowQuestionForm(false);
      setSubmitStatus('success');
      
      // Show success message for 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting question:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset open question when changing categories or searching
  useEffect(() => {
    setOpenQuestion(null);
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('admissions.faq.title')}
            </h1>
            <p className="text-xl opacity-90">
              {t('admissions.faq.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              {t('admissions.faq.search')}
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder={t('admissions.faq.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-4 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                  aria-label="Clear"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-3 text-sm text-gray-600 text-center">
                {t('faq.search.results', { count: filteredFAQs.length, term: searchTerm })}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {t('admissions.faq.categoriesTitle')}
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {setActiveCategory(category.id); setSearchTerm('');}}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeCategory === category.id && !searchTerm
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{category.icon}</span>
                      {category.name}
                    </div>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                {searchTerm ? 
                  t('faq.search.resultsTitle', { term: searchTerm }) : 
                  categories.find(c => c.id === activeCategory)?.name
                }
              </h3>
              
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? (
                    <>
                      <div className="flex justify-center mb-4 text-gray-400"><Search className="w-10 h-10" /></div>
                      <p className="text-lg mb-2">{t('faq.search.noResults')}</p>
                      <p className="text-sm">{t('faq.search.tryDifferent')}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4 text-gray-400"><FileEdit className="w-10 h-10" /></div>
                      <p>{t('admissions.faq.noQuestionsInCategory')}</p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFAQs.map((faq, index) => {
                    const questionKey = `${faq.categoryId}-${faq.originalIndex}`;
                    return (
                      <div key={questionKey} className="border border-gray-200 rounded-lg">
                        {searchTerm && (
                          <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                            <span className="text-xs text-gray-500">
                              {t('faq.category')}: {categories.find(c => c.id === faq.categoryId)?.name}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => toggleQuestion(faq.categoryId, faq.originalIndex)}
                          className="w-full text-left p-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-800 pr-4">
                              {highlightText(faq.question, searchTerm)}
                            </h4>
                            <div className={`transform transition-transform ${
                              openQuestion === questionKey ? 'rotate-180' : ''
                            }`}>
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </button>
                        
                        {openQuestion === questionKey && (
                          <div className="px-4 pb-4">
                            <div className="pt-2 border-t border-gray-100">
                              <p className="text-gray-600 leading-relaxed">
                                {highlightText(faq.answer, searchTerm)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {t('faq.askQuestion')}
                </h3>
                <button
                  onClick={() => setShowQuestionForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmitQuestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faq.form.name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={newQuestion.name}
                    onChange={(e) => setNewQuestion({...newQuestion, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={t('admissions.faq.yourName')}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faq.form.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={newQuestion.email}
                    onChange={(e) => setNewQuestion({...newQuestion, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={t('admissions.faq.yourEmail')}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('faq.form.question')} *
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder={t('admissions.faq.yourQuestion')}
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('faq.form.submitting')}
                      </span>
                    ) : t('faq.form.submit')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuestionForm(false)}
                    disabled={isSubmitting}
                    className="px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('faq.form.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success/Error Notifications */}
        {submitStatus && (
          <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            submitStatus === 'success' 
              ? 'bg-green-100 border border-green-400 text-green-700' 
              : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
            <div className="flex items-center">
              <div className="mr-2">
                {submitStatus === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <div>
                {submitStatus === 'success' 
                  ? t('faq.form.success') 
                  : t('faq.form.error')
                }
              </div>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            {t('admissions.faq.contactTitle')}
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-3 text-indigo-600"><Phone className="w-10 h-10" /></div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('admissions.faq.admissionsOffice')}</h4>
              <p className="text-indigo-600 font-medium text-lg">+996 312 123 456</p>
              <p className="text-gray-600 mt-1">{t('admissions.faq.schedule')}</p>
              <p className="text-gray-600">{t('admissions.faq.saturdaySchedule')}</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3 text-indigo-600"><Mail className="w-10 h-10" /></div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('admissions.faq.email')}</h4>
              <p className="text-indigo-600 font-medium">admission@salymbekov.edu.kg</p>
              <p className="text-gray-600 mt-1">{t('admissions.faq.responseTime24')}</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-3 text-indigo-600"><MessageCircle className="w-10 h-10" /></div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('admissions.faq.whatsapp')}</h4>
              <p className="text-indigo-600 font-medium">+996 700 123 456</p>
              <p className="text-gray-600 mt-1">{t('admissions.faq.quickResponse')}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-4">{t('admissions.faq.officeTitle')}</h4>
              <p className="text-gray-600">
                {t('faq.contact.address')}
              </p>
              <p className="text-gray-600 mt-2">
                <MapPin className="w-4 h-4 inline-block text-indigo-600" /> <span className="text-indigo-600 hover:underline cursor-pointer">{t('admissions.faq.showOnMap')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;