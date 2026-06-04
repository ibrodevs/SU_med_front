import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const ForApplicants = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).applicants);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).applicants);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.applicants) {
        setContent(data.applicants);
      }
    });
  }, [i18n.language]);

  const openLabel =
    i18n.language === "en" ? "Open" : i18n.language === "kg" ? "Ачуу" : "Открыть";

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl space-y-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">{content.title}</h1>
          <p className="text-xl text-slate-600">{content.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.cards.map((card, index) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
              <Link to={card.link} className="block h-full rounded-[2rem] bg-slate-950 text-white p-8 shadow-xl hover:-translate-y-1 transition-transform">
                <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
                <p className="text-slate-300 leading-relaxed">{card.description}</p>
                <div className="mt-8 text-cyan-300 font-semibold">{openLabel}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <section className="rounded-[2rem] bg-slate-50 border border-slate-200 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{content.factsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.facts.map((fact) => (
              <div key={fact} className="rounded-2xl bg-white border border-slate-200 p-5 text-slate-700">
                {fact}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForApplicants;
