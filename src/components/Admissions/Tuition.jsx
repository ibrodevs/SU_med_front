import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lightbulb, Phone } from 'lucide-react';

const Tuition = () => {
  const { t, i18n } = useTranslation();
  const [selectedProgram, setSelectedProgram] = useState('medicine');
  const [selectedDiscount, setSelectedDiscount] = useState('none');

  const programs = [
    {
      id: 'medicine',
      name: t('tuition.programs.medicine'),
      semesterCost: 85000,
      yearCost: 170000,
      duration: 6,
      discounts: [
        { id: 'excellent', name: t('tuition.discounts.excellent'), percent: 10 },
        { id: 'early', name: t('tuition.discounts.early'), percent: 5 }
      ]
    },
    {
      id: 'dentistry',
      name: t('tuition.programs.dentistry'),
      semesterCost: 95000,
      yearCost: 190000,
      duration: 5,
      discounts: [
        { id: 'excellent', name: t('tuition.discounts.excellentDentistry'), percent: 8 },
        { id: 'early', name: t('tuition.discounts.early'), percent: 5 }
      ]
    },
    {
      id: 'pharmacy',
      name: t('tuition.programs.pharmacy'),
      semesterCost: 75000,
      yearCost: 150000,
      duration: 5,
      discounts: [
        { id: 'excellent', name: t('tuition.discounts.excellent'), percent: 10 },
        { id: 'early', name: t('tuition.discounts.early'), percent: 5 }
      ]
    },
    {
      id: 'nursing',
      name: t('tuition.programs.nursing'),
      semesterCost: 65000,
      yearCost: 130000,
      duration: 4,
      discounts: [
        { id: 'excellent', name: t('tuition.discounts.excellent'), percent: 10 },
        { id: 'early', name: t('tuition.discounts.earlyNursing'), percent: 3 }
      ]
    }
  ];

  const currentProgram = programs.find(p => p.id === selectedProgram);
  const currentDiscount = selectedDiscount === 'none' 
    ? { percent: 0 } 
    : currentProgram.discounts.find(d => d.id === selectedDiscount);

  const calculateCost = (baseCost, discount) => {
    return baseCost - (baseCost * discount / 100);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(i18n.language === 'kg' ? 'ru-RU' : i18n.language).format(amount) + ' ' + t('common.currency');
  };

  const paymentMethods = [
    {
      title: t('tuition.paymentMethods.bankTransfer.title'),
      description: t('tuition.paymentMethods.bankTransfer.description'),
      details: [
        t('tuition.paymentMethods.bankTransfer.details.recipient'),
        t('tuition.paymentMethods.bankTransfer.details.inn'),
        t('tuition.paymentMethods.bankTransfer.details.account'),
        t('tuition.paymentMethods.bankTransfer.details.bank')
      ]
    },
    {
      title: t('tuition.paymentMethods.online.title'),
      description: t('tuition.paymentMethods.online.description'),
      details: [
        t('tuition.paymentMethods.online.details.elsom'),
        t('tuition.paymentMethods.online.details.balance'),
        t('tuition.paymentMethods.online.details.omoney'),
        t('tuition.paymentMethods.online.details.megapay')
      ]
    },
    {
      title: t('tuition.paymentMethods.cash.title'),
      description: t('tuition.paymentMethods.cash.description'),
      details: [
        t('tuition.paymentMethods.cash.details.address'),
        t('tuition.paymentMethods.cash.details.hours'),
        t('tuition.paymentMethods.cash.details.weekends')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('tuition.title')}
            </h1>
            <p className="text-xl opacity-90">
              {t('tuition.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('tuition.comparisonTable.title')}
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('tuition.comparisonTable.program')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('tuition.comparisonTable.semester')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('tuition.comparisonTable.year')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('tuition.comparisonTable.totalCost')}</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">{t('tuition.comparisonTable.availableDiscounts')}</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr key={program.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{program.name}</td>
                    <td className="px-6 py-4 text-gray-700">{formatCurrency(program.semesterCost)}</td>
                    <td className="px-6 py-4 text-gray-700">{formatCurrency(program.yearCost)}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-purple-600">
                        {formatCurrency(program.yearCost * program.duration)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {program.discounts.map((discount, discIndex) => (
                          <span key={discIndex} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {discount.name}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cost Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {t('tuition.calculator.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tuition.calculator.selectProgram')}
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {programs.map(program => (
                    <option key={program.id} value={program.id}>
                      {program.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('tuition.calculator.selectDiscount')}
                </label>
                <select
                  value={selectedDiscount}
                  onChange={(e) => setSelectedDiscount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="none">{t('tuition.calculator.noDiscount')}</option>
                  {currentProgram.discounts.map(discount => (
                    <option key={discount.id} value={discount.id}>
                      {discount.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                {t('tuition.calculator.calculation')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{t('tuition.calculator.program')}:</span>
                  <span className="font-medium">{currentProgram.name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{t('tuition.calculator.semesterCost')}:</span>
                  <span className={selectedDiscount !== 'none' ? 'line-through text-gray-500' : 'font-medium'}>
                    {formatCurrency(currentProgram.semesterCost)}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">{t('tuition.calculator.withDiscountSemester')}:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(calculateCost(currentProgram.semesterCost, currentDiscount.percent))}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{t('tuition.calculator.yearCost')}:</span>
                  <span className={selectedDiscount !== 'none' ? 'line-through text-gray-500' : 'font-medium'}>
                    {formatCurrency(currentProgram.yearCost)}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="flex justify-between items-center">
                    <span className="text-green-700">{t('tuition.calculator.withDiscountYear')}:</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(calculateCost(currentProgram.yearCost, currentDiscount.percent))}
                    </span>
                  </div>
                )}
                
                <hr className="my-4" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="text-gray-700">
                    {t('tuition.calculator.totalCost', { years: currentProgram.duration })}:
                  </span>
                  <span className="font-bold text-purple-600">
                    {formatCurrency(calculateCost(currentProgram.yearCost * currentProgram.duration, currentDiscount.percent))}
                  </span>
                </div>
                
                {selectedDiscount !== 'none' && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    {t('tuition.calculator.savings')}: {formatCurrency((currentProgram.yearCost * currentProgram.duration) - calculateCost(currentProgram.yearCost * currentProgram.duration, currentDiscount.percent))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {t('tuition.paymentMethods.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {method.description}
                </p>
                <div className="space-y-2">
                  {method.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-sm text-gray-700">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-800">
              <Lightbulb className="w-5 h-5 inline-block mr-1" /> {t('tuition.tips.title')}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• {t('tuition.tips.earlyPayment')}</li>
              <li>• {t('tuition.tips.excellentGrades')}</li>
              <li>• {t('tuition.tips.installment')}</li>
              <li>• {t('tuition.tips.discountsNotCombined')}</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-green-800">
              <Phone className="w-5 h-5 inline-block mr-1" /> {t('tuition.contact.title')}
            </h4>
            <p className="text-sm text-green-700 mb-3">
              {t('tuition.contact.description')}
            </p>
            <div className="space-y-1 text-sm text-green-700">
              <p>{t('tuition.contact.phone')}: +996 312 123 456</p>
              <p>{t('tuition.contact.email')}: cashier@salymbekov.edu.kg</p>
              <p>{t('tuition.contact.hours')}: 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tuition;