import React, { useRef, RefObject } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr'
import { Appointment } from '@prisma/client';
import { EventClickArg } from '@fullcalendar/core/index.js';

interface EventListProp {
  setIDAppointment: (load: string) => void;
  setViewInfo: (load: boolean) => void;
  appointments: Appointment[];
}

export const EventList = ({ setIDAppointment, setViewInfo, appointments }: EventListProp) => {
  const calendarRef: RefObject<FullCalendar> = useRef(null);

  const events = appointments.map((appointment: Appointment) => {
  
    return {
      title: appointment.studentID ? `${appointment.studentFirstname}` : `Disponible`,
      id: appointment.id || "",
      start: appointment.startDate || "",
      end: appointment.endDate || "",
      color: appointment.studentID ? "#9E0202" : "#0E9E02",
    };
  });

  const onClick = (info: EventClickArg) => {
    setIDAppointment(info.event.id);
    setViewInfo(true);
  }

  const handlePrevButtonClick = () => {
    if (calendarRef.current) { 
      calendarRef.current.getApi().prev();
    }
  };

  const handleNextButtonClick = () => {
    if (calendarRef.current) { 
      calendarRef.current.getApi().next();
    }
    
  };

  const handleTodayButtonClick = () => {
    if (calendarRef.current) { 
      calendarRef.current.getApi().today();
    }
    
  };

  return (
    <div className='h-full'>
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
        height="70vh"
      />
    </div>
  );
};
