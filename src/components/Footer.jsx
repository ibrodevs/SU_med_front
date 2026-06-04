import React, { useState, useEffect } from "react";
import { Facebook, Instagram, Twitter, MessageCircle, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../data/officialSiteContent";
import { fetchOfficialContent } from "../services/officialContentService";

const Footer = () => {
  const { i18n, t } = useTranslation();
  const [email, setEmail] = useState("");
  const [content, setContent] = useState(() => getOfficialContent(i18n.language).footer);

  useEffect(() => {
    setContent(getOfficialContent(i18n.language).footer);
    fetchOfficialContent(i18n.language).then(data => {
      if (data && data.footer) {
        setContent(data.footer);
      }
    });
  }, [i18n.language]);

  const handleSubscribe = (event) => {
    event.preventDefault();
    alert(t("footer.subscriptionAlert", { email }));
    setEmail("");
  };

  const socials = [
    { icon: <Facebook className="w-4 h-4" />, url: "https://www.facebook.com/salymbekov.kg", name: "Facebook" },
    { icon: <Twitter className="w-4 h-4" />, url: "https://x.com/SalymbekovO", name: "X" },
    { icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/salymbekovuniversity/", name: "Instagram" },
    { icon: <Youtube className="w-4 h-4" />, url: "https://www.youtube.com/@salymbekovuniversity8213", name: "YouTube" },
    { icon: <MessageCircle className="w-4 h-4" />, url: "https://wa.me/996505658518", name: "WhatsApp" },
  ];

  return (
    <footer className="bg-[#0A2647] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.aboutTitle")}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">{content.about}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.contactsTitle")}</h3>
            <address className="not-italic text-blue-100 text-sm space-y-2">
              <p>
                {content.addressLabel}: {content.address}
              </p>
              <p>
                {content.phoneLabel}:{" "}
                <a href="tel:+996312658538" className="hover:text-white">
                  +996 (312) 658-538
                </a>
              </p>
              <p>
                {content.emailLabel}:{" "}
                <a href="mailto:info@salymbekov.com" className="hover:text-white">
                  info@salymbekov.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.socialTitle")}</h3>
            <div className="flex space-x-3 mb-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="bg-[#144272] hover:bg-[#205295] transition-colors h-10 w-10 rounded-full flex items-center justify-center"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4">{t("footer.subscriptionTitle")}</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t("footer.emailPlaceholder")}
                required
                className="bg-[#144272] border border-[#205295] rounded px-3 py-2 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
              />
              <button
                type="submit"
                className="bg-white text-[#0A2647] font-semibold py-2 px-4 rounded hover:bg-slate-100 transition-colors"
              >
                {t("footer.subscribeButton")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#144272] mt-8 pt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
