"use client"

import React, { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { Calendar } from "@/components/calendar"
import { EventList } from "@/components/AppointmentsList"
import { RoleGate } from '@/components/auth/role-gate';
import { Appointment, UserRole } from '@prisma/client';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';
import { InfoAppointment } from '@/components/appointment/InfoAppointment';
import { getAppointments } from '@/actions/get-appoitments';
import { Spinner } from '@/components/ui/spinner';


const CalendarPage = () => {
  const [viewInfo, setViewInfo] = useState(false);
  const [idAppointment, setIDAppointment] = useState("");
  const [showForm, setShowForm] = useState(false);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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
              <button
                onClick={toggleForm}
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full"
              >
                <PlusIcon size={24} />
              </button>

              {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <AppointmentForm setShowForm={setShowForm} showForm={showForm} setReload={setReload} reload={reload} />
                </div>
              )}
            </RoleGate>
          </>
        )}




      </div>
      {viewInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <InfoAppointment viewInfo={viewInfo} setViewInfo={setViewInfo} ID={idAppointment} setID={setIDAppointment} />
        </div>
      )}
    </RoleGate>

  );
};

export default CalendarPage;

