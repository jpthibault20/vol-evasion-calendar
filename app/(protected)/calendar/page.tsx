"use client"

import React, { useEffect, useState } from 'react';
import { Calendar } from "@/components/calendar"
import { EventList } from "@/components/AppointmentsList"
import { RoleGate } from '@/components/auth/role-gate';
import { Appointment, UserRole } from '@prisma/client';
import { InfoAppointment } from '@/components/appointment/InfoAppointment';
import { getAppointments } from '@/actions/get-appoitments';
import { Spinner } from '@/components/ui/spinner';
import { AddToCalendar } from '@/components/AddToCalendar';


const CalendarPage = () => {
  const [viewInfo, setViewInfo] = useState(false);
  const [idAppointment, setIDAppointment] = useState("");
  const [reload, setReload] = useState(false);


  const [appointments, setAppointments] = useState<Appointment[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const appointmentsList: Appointment[] = await getAppointments();
      setAppointments(appointmentsList);
    }

    fetchData();
    setIsLoading(false)

  }, [reload]);

  return (
    <RoleGate allowedRole={UserRole.USER} noAccesPage={true}>
      <div className="w-full flex flex-col items-center space-y-8 md:divide-y md: divide-gray-200 md:dark:divide-gray-800 md:pt-8">

        <div className='hidden md:block'>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Calendrier</h2>
        </div>

        {isLoading ? (
          <Spinner>Chargement ...</Spinner> 

        ) : (
          <>
            <div className="w-3/4 hidden md:block md:pt-8">
              {appointments && (
                <Calendar setIDAppointment={setIDAppointment} appointments={appointments} setViewInfo={setViewInfo} />
              )}
            </div>

            <div className="w-3/4 md:hidden">
              {appointments && (
                <EventList setIDAppointment={setIDAppointment} appointments={appointments} setViewInfo={setViewInfo} />
              )}
            </div>

            <RoleGate allowedRole={UserRole.PILOTE}>
            <AddToCalendar setReload={setReload} reload={reload}/>

            </RoleGate>
          </>
        )}

      </div>
      {viewInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <InfoAppointment viewInfo={viewInfo} setViewInfo={setViewInfo} ID={idAppointment} setReload={setReload} reload={reload}/>
        </div>
      )}
    </RoleGate>

  );
};

export default CalendarPage;

