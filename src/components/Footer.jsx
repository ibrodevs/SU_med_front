import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { getOfficialContent } from "../data/officialSiteContent";

const Footer = () => {
  const { i18n, t } = useTranslation();
  const [email, setEmail] = useState("");
  const content = getOfficialContent(i18n.language).footer;

  const handleSubscribe = (event) => {
    event.preventDefault();
    alert(t("footer.subscriptionAlert", { email }));
    setEmail("");
  };

  const socials = [
    { icon: <FaFacebookF />, url: "https://www.facebook.com/salymbekov.kg", name: "Facebook" },
    { icon: <FaTwitter />, url: "https://x.com/SalymbekovO", name: "X" },
    { icon: <FaInstagram />, url: "https://www.instagram.com/salymbekovuniversity/", name: "Instagram" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@salymbekovuniversity8213", name: "YouTube" },
    { icon: <FaWhatsapp />, url: "https://wa.me/996505658518", name: "WhatsApp" },
  ];

  return (
    <footer className="bg-blue-950 text-white pt-12 pb-6">
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
                  className="bg-blue-800 hover:bg-blue-700 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
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
                className="bg-blue-900 border border-blue-800 rounded px-3 py-2 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-blue-900 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition-colors"
              >
                {t("footer.subscribeButton")}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-900 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} {t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
