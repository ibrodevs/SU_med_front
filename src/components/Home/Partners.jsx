import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PartnersService from '../../services/partnersService';
import API_CONFIG from '../../config/api';

const Partners = () => {
  const { t, i18n } = useTranslation();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failedLogos, setFailedLogos] = useState({});
  const scrollerRef = useRef(null);
  
  // Fetch partners from backend
  useEffect(() => {
    let isMounted = true;
    
    const fetchPartnersData = async () => {
      try {
        const data = await PartnersService.getAllPartners(i18n.language);
        if (isMounted) {
          // Filter active partners or default to whatever is returned
          setPartners(data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in Partners component:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPartnersData();
    
    return () => {
      isMounted = false;
    };
  }, [i18n.language]);

  // Only partners that actually have a logo — we show logos only, no text
  const logoPartners = partners.filter(p => p.logo);

  // Duplicating array for infinite scrolling effect
  const duplicatedPartners = logoPartners.length > 0 ? [...logoPartners, ...logoPartners] : [];

  // Smooth scroll effect using requestAnimationFrame
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || duplicatedPartners.length === 0) return;
    
    let animationId;
    let position = 0;
    const speed = 0.5; // px per frame
    
    const animate = () => {
      position -= speed;
      
      // Reset position when scrolled halfway
      if (Math.abs(position) > scroller.scrollWidth / 2) {
        position = 0;
      }
      
      scroller.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duplicatedPartners.length]);

  const handleImageError = (partnerId, index) => {
    setFailedLogos(prev => ({
      ...prev,
      [`${partnerId}-${index}`]: true
    }));
  };

  if (loading || logoPartners.length === 0) {
    return null; // Don't render partners section if loading or no logos to show
  }

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-100 overflow-hidden relative">
      <div className="container mx-auto relative z-10 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
          {t('partners.title')}
        </h2>
        
        <div className="relative py-4">
          <div 
            ref={scrollerRef}
            className="flex whitespace-nowrap items-center"
          >
            {duplicatedPartners.map((partner, index) => {
              const partnerKey = `${partner.id}-${index}`;
              const logoUrl = partner.logo 
                ? (partner.logo.startsWith('http') ? partner.logo : partner.logo)
                : null;

              const hasLogoFailed = failedLogos[partnerKey];

              // If the logo failed to load, skip the card entirely — logos only, no text
              if (hasLogoFailed || !logoUrl) {
                return null;
              }

              return (
                <a
                  key={partnerKey}
                  href={partner.website || '#'}
                  target={partner.website ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mx-6 p-5 rounded-xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
                  style={{ minWidth: '180px', height: '110px' }}
                  title={partner.name}
                >
                  <img
                    src={logoUrl}
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain"
                    onError={() => handleImageError(partner.id, index)}
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;