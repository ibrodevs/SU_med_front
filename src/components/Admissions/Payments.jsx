import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  CreditCardIcon, 
  BanknotesIcon, 
  InformationCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {t('payments.title')}
          </h1>
          <p className="text-xl text-slate-600">
            {t('payments.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* General Medicine Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <BanknotesIcon className="w-48 h-48 text-blue-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-4">
              <CurrencyDollarIcon className="w-10 h-10 text-blue-600" />
              {t('payments.medicine.title')}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 relative z-10">
              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-2">Международные студенты</p>
                <p className="text-4xl font-black text-slate-900 mb-2">$3,500</p>
                <p className="text-slate-600">{t('payments.medicine.fiveYears')}</p>
              </div>
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">Граждане КР</p>
                <p className="text-4xl font-black text-slate-900 mb-2">100,000 сом</p>
                <p className="text-slate-600">{t('payments.medicine.sixYears')}</p>
              </div>
            </div>

            <div className="mt-12 flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <InformationCircleIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
              <p className="text-sm text-slate-500 italic">
                * Оплата производится по курсу НБКР на день оплаты. Возможна оплата по семестрам.
              </p>
            </div>
          </motion.div>

          {/* IT College Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 opacity-10">
              <SparklesIcon className="w-40 h-40" />
            </div>

            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <CreditCardIcon className="w-8 h-8 text-blue-400" />
              {t('payments.it.title')}
            </h2>

            <div className="space-y-6 relative z-10">
              <div className="pb-6 border-b border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Computer Science</p>
                <p className="text-2xl font-bold">{t('payments.it.cs')}</p>
              </div>
              <div className="pb-6 border-b border-slate-700">
                <p className="text-slate-400 text-sm mb-1">Artificial Intelligence</p>
                <p className="text-2xl font-bold">{t('payments.it.ai')}</p>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Web Development</p>
                <p className="text-2xl font-bold">{t('payments.it.web')}</p>
              </div>
            </div>

            <button className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-colors shadow-lg shadow-blue-600/20">
              Узнать подробнее
            </button>
          </motion.div>
        </div>

        {/* Payment Warning */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center text-slate-500 text-sm"
        >
          <p>Цены могут быть изменены в соответствии с ежегодным пересмотром стоимости обучения. Пожалуйста, уточняйте актуальную стоимость в приемной комиссии.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Payments;