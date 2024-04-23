import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import { getAppointments } from '@/data/appointments';
import frLocale from '@fullcalendar/core/locales/fr'



export const EventList = ({ reload, setIDAppointment, setViewInfo }) => {
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
    <FullCalendar
      plugins={[listPlugin]}
      initialView="listWeek"
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: '',
      }}
      locale={frLocale}
      eventClick={((info) => onClick(info))}
    />
  );
};