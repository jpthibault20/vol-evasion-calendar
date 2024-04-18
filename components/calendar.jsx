"use client"

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getAppoitments } from '@/data/appointments';

export function Calendar({reload}) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppoitments(reload);
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
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        events={events}
      />
    </div>
  );
}