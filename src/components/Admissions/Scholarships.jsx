import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const Scholarships = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).scholarships);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).scholarships);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.scholarships) {
        setContent(data.scholarships);
      }
    });
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl opacity-90">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-8">
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.benefitsTitle}</h2>
          <div className="space-y-3">
            {content.benefits.map((item) => (
              <div key={item} className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.categoriesTitle}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {content.categories.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.tuitionTitle}</h2>
            <div className="space-y-3">
              {content.tuition.map((item) => (
                <div key={item} className="rounded-2xl bg-blue-50 border border-blue-100 p-4 text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.hostelTitle}</h2>
            <div className="space-y-3">
              {content.hostel.map((item) => (
                <div key={item} className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-slate-800">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
