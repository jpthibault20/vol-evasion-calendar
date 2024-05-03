import React, { useState, useEffect, useRef, RefObject } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'
import { ChevronLeft } from 'lucide-react';
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
      title: appointment.piloteFirstname || "",
      id: appointment.id || "",
      start: appointment.startDate || "",
      end: appointment.endDate || "",
      color: appointment.color || "",
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
