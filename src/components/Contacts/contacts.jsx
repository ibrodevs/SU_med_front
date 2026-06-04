import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../../data/officialSiteContent";
import { fetchOfficialContent } from "../../services/officialContentService";

const MAP_EMBED_URL = "https://www.google.com/maps?q=42.878791,74.561372&z=17&output=embed";

const Contacts = () => {
  const { i18n } = useTranslation();
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).contacts);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).contacts);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.contacts) {
        setContent(data.contacts);
      }
    });
  }, [i18n.language]);

  const quickAccessLabel =
    i18n.language === "en" ? "Quick access" : i18n.language === "kg" ? "Тез жетүү" : "Быстрый доступ";

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-lg text-slate-300">{content.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">{content.contactTitle}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {content.contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg border border-white/10 bg-slate-900/60 p-5 hover:border-cyan-400/40 transition-colors"
                  >
                    <p className="text-sm text-slate-400 mb-2">{item.label}</p>
                    <p className="font-semibold text-white">{item.value}</p>
                  </a>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-6">{content.officeHours}</p>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">{content.campusTitle}</h2>
              <div className="space-y-4">
                {content.campuses.map((campus) => (
                  <div key={campus.name} className="rounded-lg bg-slate-900/60 border border-white/10 p-5">
                    <p className="font-semibold text-lg">{campus.name}</p>
                    <p className="text-cyan-300 mt-2">{campus.address}</p>
                    <p className="text-sm text-slate-400 mt-2">{campus.note}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white/5 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">{content.departmentTitle}</h2>
              <div className="space-y-4">
                {content.departments.map((department) => (
                  <div key={department.name} className="rounded-lg bg-slate-900/60 border border-white/10 p-5">
                    <p className="font-semibold text-lg">{department.name}</p>
                    <div className="mt-3 space-y-1 text-sm text-slate-300">
                      <p>{department.contact}</p>
                      <p>{department.email}</p>
                    </div>
                    <p className="text-sm text-slate-400 mt-3">{department.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <section className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">{content.mapLabel}</h2>
              <div className="rounded-lg overflow-hidden border border-white/10 h-[420px]">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Salymbekov University map"
                />
              </div>
            </section>

            <section className="bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-cyan-400/20 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6">{quickAccessLabel}</h2>
              <div className="space-y-4">
                <a href="tel:+996312658538" className="flex items-center gap-4 rounded-lg bg-slate-900/60 border border-white/10 p-4 hover:border-cyan-400/40 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-300" />
                  <span>{content.contactItems[0].value}</span>
                </a>
                <a href="mailto:info@salymbekov.com" className="flex items-center gap-4 rounded-lg bg-slate-900/60 border border-white/10 p-4 hover:border-cyan-400/40 transition-colors">
                  <Mail className="w-5 h-5 text-cyan-300" />
                  <span>info@salymbekov.com</span>
                </a>
                <a href="https://wa.me/996505658518" className="flex items-center gap-4 rounded-lg bg-slate-900/60 border border-white/10 p-4 hover:border-cyan-400/40 transition-colors">
                  <MessageCircle className="w-5 h-5 text-cyan-300" />
                  <span>WhatsApp</span>
                </a>
                <a href="https://www.google.com/maps/place/3+Fuchika+Street,+Bishkek" className="flex items-center gap-4 rounded-lg bg-slate-900/60 border border-white/10 p-4 hover:border-cyan-400/40 transition-colors">
                  <MapPin className="w-5 h-5 text-cyan-300" />
                  <span>{content.campuses[0].address}</span>
                </a>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
