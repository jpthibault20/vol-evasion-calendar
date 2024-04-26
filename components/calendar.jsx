"use client"

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'
import { Spinner } from '@/components/ui/spinner';


export function Calendar({ reload, setIDAppointment, setViewInfo }) {

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAppointments() 
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.log("une erreur es survenu : ", error);
      })
      .finally(() => {
        setIsLoading(false);
      })
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


  // const events = appointments.map((appointment) => ({
  //   title: appointment.type,
  //   id: appointment.id,
  //   start: appointment.startDate,
  //   end: appointment.endDate,

  // }));


  const onClick = (info) => {
    setIDAppointment(info.event.id);
    setViewInfo(true);
  }

  return (
    <div className="container mx-auto">
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={events}
        nowIndicator={true}
        locale={frLocale}
        firstDay={1}
        slotLabelFormat={{
          hour: 'numeric',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false
        }}
        timeZone="Europe/Paris"
        allDaySlot={false}
        eventClick={((info) => onClick(info))}
      />
      {isLoading && (
        <Spinner>
        chargement ...
      </Spinner>
      )}
      
    </div>
  );
}