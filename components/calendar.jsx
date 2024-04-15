import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import listPlugin from '@fullcalendar/list';

const Calendar = () => {
    const [events, setEvents] = useState([
        { title: 'Événement', date: '2023-04-16' },
        { title: 'Autre événement', date: '2023-04-18' },
    ]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Entrez un nouveau titre pour votre évènement');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selectInfo.startStr}-${title}`,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Êtes-vous sûr de vouloir supprimer l'évènement '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  return (
    <div className="p-4 sm:p-8">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: '',
          right: '',
        }}
        initialView="listWeek"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        dayHeaderFormat={{ day: '2-digit', month: '2-digit' }}
        locale={frLocale}
        Events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto"
        contentHeight="auto"
      />
    </div>
  );
};

export default Calendar;