import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, AlertTriangle } from 'lucide-react';
import researchService from '../../services/researchService';

const ScientificJournals = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        const data = await researchService.getScientificJournals(i18n.language);
        setJournals(Array.isArray(data) ? data : (data?.results || []));
        setError(null);
      } catch (err) {
        console.error('Error fetching journals:', err);
        setError(t('research.journals.error', 'Ошибка загрузки журналов'));
        setJournals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, [i18n.language]);

  const field = (obj, name) =>
    obj?.[`${name}_${currentLang}`] || obj?.[`${name}_ru`] || obj?.[name] || '';

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
          <h3 className="text-xl font-bold text-slate-900 mb-2">{t('research.journals.error', 'Ошибка загрузки')}</h3>
          <button onClick={() => window.location.reload()} className="mt-2 px-4 py-2 bg-[#0A2647] text-white rounded-lg hover:bg-[#144272]">
            {t('research.journals.retry', 'Повторить')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {t('research.journals.title', 'Научные журналы')}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            {t('research.journals.subtitle', 'Академические издания Высшей медицинской школы')}
          </p>
        </div>

        {journals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <BookOpen className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">{t('research.journals.noData', 'Нет доступных журналов')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {journals.map((journal) => (
              <div key={journal.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2647] flex-shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{field(journal, 'title')}</h3>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{field(journal, 'description')}</p>

                <div className="space-y-1.5 text-sm text-slate-600 mb-4">
                  {field(journal, 'editor_in_chief') && (
                    <div><span className="font-medium text-slate-500">{t('research.journals.editor', 'Главный редактор')}:</span> {field(journal, 'editor_in_chief')}</div>
                  )}
                  {field(journal, 'publication_frequency') && (
                    <div><span className="font-medium text-slate-500">{t('research.journals.frequency', 'Периодичность')}:</span> {field(journal, 'publication_frequency')}</div>
                  )}
                  {journal.established_year && (
                    <div><span className="font-medium text-slate-500">{t('research.journals.year', 'Год основания')}:</span> {journal.established_year}</div>
                  )}
                </div>

                {(journal.is_open_access || journal.is_peer_reviewed) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {journal.is_open_access && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                        {t('research.journals.openAccess', 'Открытый доступ')}
                      </span>
                    )}
                    {journal.is_peer_reviewed && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                        {t('research.journals.peerReviewed', 'Рецензируемый')}
                      </span>
                    )}
                  </div>
                )}

                <a
                  href={journal.website || '#'}
                  target={journal.website ? '_blank' : undefined}
                  rel={journal.website ? 'noopener noreferrer' : undefined}
                  onClick={!journal.website ? (e) => e.preventDefault() : undefined}
                  className={`mt-auto px-4 py-2.5 rounded-lg font-medium text-sm text-center block transition-colors duration-200 ${
                    journal.website ? 'bg-[#0A2647] text-white hover:bg-[#144272]' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {t('research.journals.website', 'Перейти на сайт')}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScientificJournals;
