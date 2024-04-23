"use client"

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'
import { appointmentType } from '@prisma/client';

export function Calendar({ reload }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppointments(reload);
      setAppointments(data);
    }
    fetchAppointments();
  }, [reload]);

  const events = appointments.map((appointment) => ({
    title: appointment.type,
    start: appointment.startDate,
    end: appointment.endDate,
  }));


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
      />
    </div>
  );
}