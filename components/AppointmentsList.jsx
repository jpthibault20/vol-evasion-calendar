import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'
import { ChevronLeft } from 'lucide-react';

export const EventList = ({ reload, setIDAppointment, setViewInfo }) => {
  const [appointments, setAppointments] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppointments();
      setAppointments(data);
    }
    fetchAppointments();
  }, [reload]);

  const events = appointments.map((appointment) => {
    let eventColor;
    switch (appointment.type) {
      case "ALL":
        eventColor = "green";
        break;
      case "BAPTEME":
        eventColor = "blue";
        break;
      case "COURS":
        eventColor = "brown";
        break;
      default:
        eventColor = "gray";
    }

    return {
      title: appointment.type,
      id: appointment.id,
      start: appointment.startDate,
      end: appointment.endDate,
      color: eventColor,
    };
  });

  const onClick = (info) => {
    setIDAppointment(info.event.id);
    setViewInfo(true);
  }

  const handlePrevButtonClick = () => {
    calendarRef.current.getApi().prev();
  };

  const handleNextButtonClick = () => {
    calendarRef.current.getApi().next();
  };

  const handleTodayButtonClick = () => {
    calendarRef.current.getApi().today();
  };

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        plugins={[listPlugin]}
        initialView="listWeek"
        events={events}
        headerToolbar={{
          left: 'title,prevButton,nextButton,todayButton', // Placer le titre au-dessus des boutons
          center: '', // Pas de contenu au centre
          right: '', // Aucun contenu à droite
        }}
        locale={frLocale}
        timeZone="Europe/Paris"
        eventClick={((info) => onClick(info))}
        customButtons={{
          prevButton: {
            text: '<', // Utilisation de l'icône Lucide ChevronLeft
            click: handlePrevButtonClick,
            
          },
          nextButton: {
            text: '>', // Utilisation de l'icône Lucide ChevronRight
            click: handleNextButtonClick,
          },
          todayButton: {
            text: 'Aujourd\'hui',
            click: handleTodayButtonClick,
          },
        }}
      />
    </div>
  );
};
