import React from "react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";

const Procedure = () => {
  const { i18n } = useTranslation();
  const content = getOfficialContent(i18n.language).procedure;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl opacity-90">{content.subtitle}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        <div className="space-y-6">
          {content.sections.map((section) => (
            <section key={section.heading} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.heading}</h2>
              <p className="text-slate-700 leading-relaxed mb-5">{section.body}</p>
              <ul className="space-y-2">
                {section.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Procedure;
