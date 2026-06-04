import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Mail, Phone, Globe, AlertTriangle, Users, Building2, GraduationCap, Microscope, Briefcase, MapPin, Check } from 'lucide-react';
import './About.css';
import PartnersService from '../../services/partnersService';
import API_CONFIG from '../../config/api';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers for different partner types
const createCustomMarker = (type) => {
  const colors = {
    clinical: '#2C7865', // teal / medical green
    university: '#144272', // navy blue
    organization: '#205295', // medium blue
    business: '#1B4242' // dark teal
  };

  const svgs = {
    clinical: `<svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.66 0 3-1.34 3-3V3a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8c0 1.66 1.34 3 3 3"/><path d="M22 10H2"/><path d="M12 2v18"/><path d="M12 18H4a2 2 0 0 0-2 2v2"/><path d="M22 22v-2a2 2 0 0 0-2-2h-8"/></svg>`,
    university: `<svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10l-10-5-10 5 10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
    organization: `<svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0-10 0"/><circle cx="14" cy="6" r="2"/><path d="M14 8V2h2v6"/><path d="M12 2h4"/></svg>`,
    business: `<svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  };

  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${colors[type] || '#6b7280'};
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    ">${svgs[type] || svgs.business}</div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const Partners = () => {
  const { t, i18n } = useTranslation();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners data from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const partnersData = await PartnersService.getAllPartners(i18n.language);
        const formattedPartners = partnersData.map(partner => {
          return {
            id: partner.id,
            name: partner.name,
            type: partner.partner_type || 'academic',
            country: partner.country || 'Кыргызстан',
            city: partner.city || 'Бишкек',
            description: partner.description || '',
            website: partner.website || '',
            email: partner.email || '',
            phone: partner.phone || '',
            address: partner.address || `${partner.city || 'Бишкек'}, ${partner.country || 'Кыргызстан'}`,
            logo: partner.logo
              ? (partner.logo.startsWith('http') ? partner.logo : partner.logo)
              : null,
            coordinates: [
              partner.latitude || 42.8746,
              partner.longitude || 74.5698
            ],
            stats: {
              students: '',  // Remove fake numbers
              exchanges: '',
              projects: ''
            },
            established: partner.established_year || '',
            cooperation_since: partner.cooperation_since || '',
            cooperation: partner.partnership_areas ?
              partner.partnership_areas.split(',').map(area => area.trim()) :
              [],
            contact: {
              email: partner.email || '',
              phone: partner.phone || ''
            }
          };
        });
        setPartners(formattedPartners);
      } catch (err) {
        setError('Failed to load partners data');
        console.error('Error fetching partners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [i18n.language]); // Re-fetch when language changes

  // Fallback partners data (backup)
  const fallbackPartners = [
    {
      id: 1,
      name: t('partners.list.1.name'),
      type: 'clinical',
      country: t('partners.list.1.country'),
      city: t('partners.list.1.city'),
      logo: '/src/assets/partners/rkb-logo.svg',
      coordinates: [42.8546, 74.5875],
      website: 'https://rkb.kg',
      established: '2015',
      students: 245,
      exchanges: 12,
      projects: 8,
      description: t('partners.list.1.description'),
      cooperation: t('partners.list.1.cooperation', { returnObjects: true }),
      achievements: t('partners.list.1.achievements', { returnObjects: true }),
      contact: {
        email: 'info@rkb.kg',
        phone: '+996 312 666-000'
      }
    },
  ];

  const partnerTypes = [
    { value: 'all', label: 'Все партнеры', icon: Users },
    { value: 'clinical', label: 'Клинические базы', icon: Building2 },
    { value: 'university', label: 'Университеты', icon: GraduationCap },
    { value: 'organization', label: 'Организации', icon: Microscope },
    { value: 'business', label: 'Бизнес-партнеры', icon: Briefcase },
    { value: 'academic', label: 'Академические', icon: GraduationCap }
  ];

  const filteredPartners = partners.filter(partner =>
    (filterType === 'all' || partner.type === filterType) &&
    (partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeLabel = (type) => {
    const typeLabels = {
      'clinical': 'Клиническая база',
      'university': 'Университет',
      'organization': 'Организация',
      'business': 'Бизнес-партнер',
      'academic': 'Академический партнер'
    };
    return typeLabels[type] || 'Партнер';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      clinical: 'bg-red-100 text-red-800',
      university: 'bg-blue-100 text-blue-800',
      organization: 'bg-green-100 text-green-800',
      business: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const PartnerModal = ({ partner, onClose }) => {
    if (!partner) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-16 h-16 object-contain mr-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 items-center justify-center font-bold text-2xl mr-4 flex flex-shrink-0"
                  style={{ display: partner.logo ? 'none' : 'flex' }}
                >
                  {partner.name ? partner.name.charAt(0) : 'P'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(partner.type)}`}>
                      {getTypeLabel(partner.type)}
                    </span>
                    <span className="text-gray-500">{partner.city}, {partner.country}</span>
                    <span className="text-gray-500">{t('partners.established')} {partner.established}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.about')}</h3>
              <p className="text-gray-600 leading-relaxed">{partner.description}</p>
            </div>

            {/* Cooperation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.cooperation')}</h3>
              <ul className="space-y-2">
                {partner.cooperation.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            {partner.achievements && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.achievements')}</h3>
                <ul className="space-y-2">
                  {partner.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.contact')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-500 mr-3" />
                  <a href={`mailto:${partner.contact.email}`} className="text-blue-600 hover:underline">
                    {partner.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-500 mr-3" />
                  <a href={`tel:${partner.contact.phone}`} className="text-blue-600 hover:underline">
                    {partner.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-500 mr-3" />
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {partner.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4 flex items-center justify-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('partners.retry', 'Повторить попытку')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Заголовок */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('partners.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('partners.subtitle')}
        </p>
      </div>

      {/* Сетка логотипов партнёров (без текста) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map(partner => {
          const card = (
            <div className="flex items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-32 p-6">
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fb = e.target.nextSibling;
                    if (fb) fb.style.display = 'flex';
                  }}
                />
              ) : null}
              <span
                className="text-gray-400 font-semibold text-center text-sm items-center justify-center px-2"
                style={{ display: partner.logo ? 'none' : 'flex' }}
              >
                {partner.name}
              </span>
            </div>
          );
          return partner.website ? (
            <a
              key={partner.id}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={partner.name}
            >
              {card}
            </a>
          ) : (
            <div key={partner.id} aria-label={partner.name}>{card}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Partners;