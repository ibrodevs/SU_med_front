import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, ExternalLink, AlertTriangle } from 'lucide-react';
import researchService from '../../services/researchService';

const Publications = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [publications, setPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await researchService.getPublications(i18n.language);
        setPublications(Array.isArray(data) ? data : (data?.results || []));
        setError(null);
      } catch (err) {
        console.error('Error fetching publications:', err);
        setError(t('research.publications.loadError', 'Ошибка загрузки публикаций'));
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [i18n.language]);

  const getYear = (pub) =>
    pub.publication_date ? new Date(pub.publication_date).getFullYear() : (pub.publication_year || pub.year || '');

  const filtered = publications.filter((pub) => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (field(pub, 'title') || '').toLowerCase().includes(q) ||
      (pub.authors || '').toLowerCase().includes(q) ||
      (pub.journal || '').toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-slate-200 border-t-[#0A2647]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-14 h-14 text-amber-500 mx-auto mb-4" />
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.publications.title', 'Научные публикации')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('research.publications.subtitle', 'База публикаций исследователей университета')}
          </p>
        </div>

        {/* Поиск */}
        <div className="mb-6">
          <input
            type="text"
            placeholder={t('research.common.search', 'Поиск по названию, автору или журналу...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#0A2647] focus:border-[#0A2647]"
          />
        </div>

        {/* Список публикаций */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <FileText className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t('research.publications.noResults', 'Публикации не найдены')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pub) => (
              <div key={pub.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{field(pub, 'title')}</h3>
                </div>

                <p className="text-slate-500 text-sm mb-2">{pub.authors}</p>

                <p className="text-xs text-slate-400 mb-4">
                  {pub.journal}{getYear(pub) ? ` · ${getYear(pub)}` : ''}
                </p>

                {pub.doi && (
                  <a
                    href={pub.doi.startsWith('http') ? pub.doi : `https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center flex items-center justify-center gap-2 bg-[#0A2647] text-white hover:bg-[#144272] transition-colors duration-200"
                  >
                    {t('research.publications.doi', 'DOI')} <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Publications;
