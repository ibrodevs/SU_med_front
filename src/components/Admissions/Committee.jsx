import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const Committee = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).committee);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).committee);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.committee) {
        setContent(data.committee);
      }
    });
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl opacity-90">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-8">
        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <p className="text-lg text-slate-700 leading-relaxed">{content.overview}</p>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.principlesTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.principles.map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.contactsTitle}</h2>
          <div className="space-y-3 text-slate-700">
            {content.contacts.map((item) => (
              <div key={item} className="rounded-2xl bg-blue-50 border border-blue-100 p-4">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Committee;
