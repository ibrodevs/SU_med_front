import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const CampusEvents = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).campusEvents);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).campusEvents);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.campusEvents) {
        setContent(data.campusEvents);
      }
    });
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#0A2647] text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl opacity-90">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12 space-y-8">
        <section className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.studentCouncilTitle}</h2>
          <p className="text-slate-700 leading-relaxed mb-6">{content.studentCouncil}</p>
          <div className="grid md:grid-cols-3 gap-4">
            {content.studentCouncilFacts.map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 border border-slate-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.mobilityTitle}</h2>
          <p className="text-slate-700 leading-relaxed mb-6">{content.mobility}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {content.mobilityPartners.map((item) => (
              <div key={item} className="rounded-lg bg-slate-50 border border-slate-200 p-5 text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{content.supportTitle}</h2>
          <p className="text-slate-700 leading-relaxed">{content.support}</p>
        </section>
      </div>
    </div>
  );
};

export default CampusEvents;
