import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const ForForeignCitizens = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).foreign);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).foreign);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.foreign) {
        setContent(data.foreign);
      }
    });
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl opacity-90">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12 space-y-10">
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/admissions/requirements/foreign-citizens" className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-slate-500 mb-2">01</div>
            <div className="font-semibold text-slate-900">Requirements</div>
          </Link>
          <Link to="/admissions/apply/foreign-citizens" className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-slate-500 mb-2">02</div>
            <div className="font-semibold text-slate-900">Application flow</div>
          </Link>
          <Link to="/admission/scholarships" className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-sm text-slate-500 mb-2">03</div>
            <div className="font-semibold text-slate-900">Tuition and support</div>
          </Link>
        </div>

        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Admission flow</h2>
          <div className="space-y-6">
            {content.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                  <div>
                    <div className="text-sm text-emerald-700 font-semibold mb-2">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                  </div>
                  <div className="text-sm text-slate-500">{step.timing}</div>
                </div>
                <ul className="space-y-2 text-slate-700">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.advantagesTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.advantages.map((item) => (
              <div key={item} className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.supportTitle}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {content.supportItems.map((item) => (
              <div key={item} className="rounded-2xl bg-sky-50 border border-sky-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForForeignCitizens;
