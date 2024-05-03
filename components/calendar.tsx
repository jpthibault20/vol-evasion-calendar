"use client"

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr'
import { Appointment } from '@prisma/client';
import { EventClickArg } from '@fullcalendar/core/index.js';

interface CalendarProps {
  appointments: Appointment[];
  setIDAppointment: (load: string) => void;
  setViewInfo: (load: boolean) => void;
}
export function Calendar({ setIDAppointment, appointments, setViewInfo }: CalendarProps) {


  const events = appointments.map((appointment: Appointment) => {
  
    return {
      title: appointment.studentID ? "Réservé" : "thibault",
      id: appointment.id || "",
      start: appointment.startDate || "",
      end: appointment.endDate || "",
      color: appointment.studentID ? "#CECECE" : appointment.color || "",
    };
  });


  const onClick = (info: EventClickArg) => {
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