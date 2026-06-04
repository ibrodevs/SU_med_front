import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PartnersService from '../../services/partnersService';
import API_CONFIG from '../../config/api';

const Partners = () => {
  const { t, i18n } = useTranslation();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Duplicating array for infinite scrolling effect
  const duplicatedPartners = partners.length > 0 ? [...partners, ...partners] : [];

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

  if (loading || partners.length === 0) {
    return null; // Don't render partners section if loading or empty
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
              // Use relative path directly — Vite proxies /media/* to backend
              const logoUrl = partner.logo 
                ? (partner.logo.startsWith('http') ? partner.logo : partner.logo)
                : null;

              // Skip partners without a logo
              if (!logoUrl) return null;

              return (
                <a 
                  key={`${partner.id}-${index}`} 
                  href={partner.website || '#'}
                  target={partner.website ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mx-6 p-4 rounded-xl bg-white border border-slate-200/60 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
                  style={{ minWidth: '140px', height: '80px' }}
                  title={partner.name}
                >
                  <img 
                    src={logoUrl} 
                    alt={partner.name} 
                    className="max-h-14 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      // Hide the entire card if logo fails to load
                      e.target.closest('a').style.display = 'none';
                    }}
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