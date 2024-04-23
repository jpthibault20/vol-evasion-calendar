"use client"

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'


export function Calendar({ reload, setIDAppointment, setViewInfo }) {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppointments();
      setAppointments(data);
    }
    fetchAppointments();
  }, [reload]);



  const events = appointments.map((appointment) => ({
    title: appointment.type,
    id: appointment.id,
    start: appointment.startDate,
    end: appointment.endDate,
  }));


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
    </div>
  );
}