import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { useTranslation } from 'react-i18next';

const Calendar = () => {
  const { t, i18n } = useTranslation();
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState([
    t('calendar.eventTypes.studyPeriod'),
    t('calendar.eventTypes.examSession'),
    t('calendar.eventTypes.vacation'),
    t('calendar.eventTypes.scientificEvent'),
    t('calendar.eventTypes.certification'),
    t('calendar.eventTypes.event')
  ]);
  const calendarRef = useRef(null);

  // Получение локали для календаря
  const getCalendarLocale = () => {
    return i18n.language === 'kg' ? ruLocale : 
           i18n.language === 'en' ? enLocale : ruLocale;
  };

  // Моковые данные академического календаря
  const calendarEvents = [
    {
      id: 1,
      title: t('calendar.events.fallSemester.title'),
      start: '2024-09-01',
      end: '2024-12-20',
      color: '#144272',
      type: t('calendar.eventTypes.studyPeriod'),
      description: t('calendar.events.fallSemester.description'),
      icon: null
    },
    {
      id: 2,
      title: t('calendar.events.fallSession.title'),
      start: '2024-12-23',
      end: '2025-01-10',
      color: '#991b1b',
      type: t('calendar.eventTypes.examSession'),
      description: t('calendar.events.fallSession.description'),
      icon: null
    },
    {
      id: 3,
      title: t('calendar.events.winterVacation.title'),
      start: '2025-01-11',
      end: '2025-02-02',
      color: '#2C7865',
      type: t('calendar.eventTypes.vacation'),
      description: t('calendar.events.winterVacation.description'),
      icon: null
    },
    {
      id: 4,
      title: t('calendar.events.springSemester.title'),
      start: '2025-02-03',
      end: '2025-05-20',
      color: '#144272',
      type: t('calendar.eventTypes.studyPeriod'),
      description: t('calendar.events.springSemester.description'),
      icon: null
    },
    {
      id: 5,
      title: t('calendar.events.scienceConference.title'),
      start: '2025-03-15',
      end: '2025-03-17',
      color: '#205295',
      type: t('calendar.eventTypes.scientificEvent'),
      description: t('calendar.events.scienceConference.description'),
      icon: null
    },
    {
      id: 6,
      title: t('calendar.events.springSession.title'),
      start: '2025-05-23',
      end: '2025-06-15',
      color: '#991b1b',
      type: t('calendar.eventTypes.examSession'),
      description: t('calendar.events.springSession.description'),
      icon: null
    },
    {
      id: 7,
      title: t('calendar.events.summerVacation.title'),
      start: '2025-06-16',
      end: '2025-08-31',
      color: '#2C7865',
      type: t('calendar.eventTypes.vacation'),
      description: t('calendar.events.summerVacation.description'),
      icon: null
    },
    {
      id: 8,
      title: t('calendar.events.openDay.title'),
      start: '2025-04-12T10:00:00',
      end: '2025-04-12T16:00:00',
      color: '#0891b2',
      type: t('calendar.eventTypes.event'),
      description: t('calendar.events.openDay.description'),
      icon: null
    },
    {
      id: 9,
      title: t('calendar.events.thesisDefense.title'),
      start: '2025-06-20',
      end: '2025-06-25',
      color: '#1B4242',
      type: t('calendar.eventTypes.certification'),
      description: t('calendar.events.thesisDefense.description'),
      icon: null
    },
    {
      id: 10,
      title: t('calendar.events.doctorDay.title'),
      start: '2024-10-07',
      color: '#0A2647',
      type: t('calendar.eventTypes.event'),
      description: t('calendar.events.doctorDay.description'),
      icon: null
    }
  ];

  // Легенда событий
  const eventTypes = [
    { color: '#144272', label: t('calendar.legend.studyPeriods'), type: t('calendar.eventTypes.studyPeriod') },
    { color: '#991b1b', label: t('calendar.legend.examSessions'), type: t('calendar.eventTypes.examSession') },
    { color: '#2C7865', label: t('calendar.legend.vacations'), type: t('calendar.eventTypes.vacation') },
    { color: '#205295', label: t('calendar.legend.scientificEvents'), type: t('calendar.eventTypes.scientificEvent') },
    { color: '#0891b2', label: t('calendar.legend.generalEvents'), type: t('calendar.eventTypes.event') },
    { color: '#1B4242', label: t('calendar.legend.certification'), type: t('calendar.eventTypes.certification') }
  ];

  // Фильтрация событий по выбранным типам
  const filteredEvents = calendarEvents.filter(event => 
    filteredTypes.includes(event.type)
  );

  // Обработчик клика по событию
  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  // Экспорт в Google Calendar
  const exportToGoogleCalendar = (event) => {
    const start = event.startStr.split('T')[0];
    const end = event.endStr ? event.endStr.split('T')[0] : start;
    
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start.replace(/-/g, '')}/${end.replace(/-/g, '')}&details=${encodeURIComponent(event.extendedProps.description)}`;
    
    window.open(googleUrl, '_blank');
  };

  // Экспорт в ICS файл
  const exportToICS = (event) => {
    const formatDate = (dateStr) => {
      return dateStr ? dateStr.replace(/-/g, '').replace(/:/g, '') : '';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Medical University//Academic Calendar//${i18n.language.toUpperCase()}
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDate(event.startStr)}
DTEND:${formatDate(event.endStr)}
DESCRIPTION:${event.extendedProps.description}
LOCATION:${t('calendar.universityName')}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Экспорт всего календаря
  const exportAllToICS = () => {
    const formatDate = (dateStr) => {
      return dateStr ? dateStr.replace(/-/g, '').replace(/:/g, '') : '';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Medical University//Academic Calendar//${i18n.language.toUpperCase()}
${calendarEvents.map(event => `
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
DESCRIPTION:${event.description}
LOCATION:${t('calendar.universityName')}
END:VEVENT
`).join('')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = t('calendar.exportFileName');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Переключение фильтра типов событий
  const toggleEventType = (type) => {
    setFilteredTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Кастомный рендер событий
  const eventContent = (eventInfo) => {
    return (
      <div className="fc-event-content flex items-center p-1">
        <div className="w-2 h-2 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: eventInfo.event.backgroundColor }}></div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{eventInfo.event.title}</div>
          {eventInfo.view.type !== 'dayGridMonth' && (
            <div className="text-xs opacity-75 truncate">{eventInfo.timeText}</div>
          )}
        </div>
      </div>
    );
  };

  // Кастомный рендер заголовка события в списке
  const eventContentList = (eventInfo) => {
    return (
      <div className="flex items-center p-3 border-l-4 rounded-r-lg" style={{ borderLeftColor: eventInfo.event.backgroundColor }}>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{eventInfo.event.title}</div>
          <div className="text-sm text-gray-600 mt-1">{eventInfo.event.extendedProps.description}</div>
        </div>
        <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">{eventInfo.timeText}</div>
      </div>
    );
  };

  // Эффект для обновления календаря при изменении фильтров
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
    }
  }, [filteredTypes]);

  // Эффект для обновления календаря при изменении языка
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.setOption('locale', getCalendarLocale());
    }
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8 flex items-center">
          <Link to="/" className="hover:text-blue-600 transition-colors">{t('breadcrumbs.home')}</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600 transition-colors">{t('breadcrumbs.academics')}</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800 font-medium">{t('breadcrumbs.calendar')}</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{t('calendar.title')}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('calendar.subtitle')}
          </p>
        </div>

        {/* Легенда и фильтры событий */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('calendar.filters.title')}</h2>
          <div className="flex flex-wrap gap-3">
            {eventTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => toggleEventType(type.type)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  filteredTypes.includes(type.type)
                    ? 'bg-opacity-20 text-gray-800 shadow-sm'
                    : 'bg-opacity-10 text-gray-500 opacity-70'
                }`}
                style={{ backgroundColor: filteredTypes.includes(type.type) ? type.color : '#f3f4f6' }}
              >

                <span className="text-sm font-medium">{type.label}</span>
                <div className="w-3 h-3 rounded-full ml-2" style={{ backgroundColor: type.color }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Кнопки экспорта и управления */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportAllToICS}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('calendar.exportAll')}
            </button>
            
            <a
              href="#mobile-view"
              className="md:hidden flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {t('calendar.eventList')}
            </a>
          </div>
        </div>

        {/* Календарь */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            views={{
              dayGridMonth: { buttonText: t('calendar.views.month') },
              timeGridWeek: { buttonText: t('calendar.views.week') },
              timeGridDay: { buttonText: t('calendar.views.day') },
              listMonth: { 
                buttonText: t('calendar.views.list'),
                eventContent: eventContentList
              }
            }}
            events={filteredEvents}
            eventContent={eventContent}
            eventClick={handleEventClick}
            locale={getCalendarLocale()}
            buttonText={{
              today: t('calendar.today'),
              month: t('calendar.views.month'),
              week: t('calendar.views.week'),
              day: t('calendar.views.day'),
              list: t('calendar.views.list')
            }}
            height="auto"
            contentHeight="auto"
            eventDisplay="block"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
            dayMaxEvents={3}
            moreLinkText={t('calendar.moreEvents')}
            windowResize={() => {
              if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.updateSize();
              }
            }}
          />
        </div>

        {/* Мобильный вид - список событий (скрыт на десктопе) */}
        <div id="mobile-view" className="md:hidden bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('calendar.upcomingEvents')}</h2>
          <div className="space-y-4">
            {filteredEvents.slice(0, 5).map(event => (
              <div 
                key={event.id} 
                className="p-4 border-l-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                style={{ borderLeftColor: event.color }}
                onClick={() => {
                  setSelectedEvent({
                    title: event.title,
                    startStr: event.start,
                    endStr: event.end,
                    extendedProps: {
                      description: event.description,
                      type: event.type
                    },
                    backgroundColor: event.color
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>

                </div>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.start).toLocaleDateString(i18n.language)}
                  {event.end && (
                    <>
                      <span className="mx-2">—</span>
                      {new Date(event.end).toLocaleDateString(i18n.language)}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями события */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedEvent.backgroundColor }}></div>
                <span className="text-sm font-medium text-gray-600">{selectedEvent.extendedProps.type}</span>
              </div>
              
              <p className="text-gray-700 mb-4">{selectedEvent.extendedProps.description}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(selectedEvent.startStr).toLocaleDateString(i18n.language, { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                {selectedEvent.endStr && (
                  <>
                    <span className="mx-2">—</span>
                    <span>
                      {new Date(selectedEvent.endStr).toLocaleDateString(i18n.language, { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => exportToGoogleCalendar(selectedEvent)}
                className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Google Calendar
              </button>
              
              <button 
                onClick={() => exportToICS(selectedEvent)}
                className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t('calendar.downloadICS')}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Стили для FullCalendar */
        .fc {
          font-family: inherit;
        }

        .fc .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
        }

        .fc .fc-button {
          background-color: #3B82F6;
          border-color: #3B82F6;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }

        .fc .fc-button:hover {
          background-color: #2563EB;
          border-color: #2563EB;
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #1D4ED8;
          border-color: #1D4ED8;
        }

        .fc .fc-daygrid-day-number {
          color: #374151;
          font-weight: 500;
        }

        .fc .fc-col-header-cell-cushion {
          color: #374151;
          font-weight: 600;
          padding: 0.5rem;
        }

        .fc .fc-event {
          border: none;
          border-radius: 0.5rem;
          padding: 0.25rem;
          font-size: 0.75rem;
        }

        .fc .fc-event:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .fc .fc-list-event:hover {
          background-color: #F3F4F6;
        }

        .fc .fc-day-today {
          background-color: #EFF6FF !important;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }
          
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
          }
          
          .fc .fc-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;