"use client"
import { getAppointments } from "@/actions/get-appointment";
import { AppointmentCardWrapper } from "./AppointmentCardWrapper";
import { useState, useEffect } from "react";
import { Appointment, appointmentType } from "@prisma/client";
import { format } from "path";
import { Spinner } from "../ui/spinner";


interface InfoAppointmentProps {
  viewInfo: boolean,
  setViewInfo: (load: boolean) => void,
  ID: string,
  setID: (load: string) => void,
}

export function InfoAppointment({ viewInfo, setViewInfo, ID, setID }: InfoAppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (viewInfo) {
      setIsLoading(true);
      getAppointments(ID)
        .then(data => {
          setAppointment(data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    } else {
      setAppointment(null);
      setIsLoading(false);
    }
  }, [viewInfo, ID]);

  if (!viewInfo) {
    return null;
  }
  
  const formattedDateStart = appointment?.startDate?.toLocaleString('fr-FR');
  const formattedDateEnd = appointment?.endDate?.toLocaleString('fr-FR');

  return (
    <div>
      <AppointmentCardWrapper headerLabel={"Info dispo"} setShowForm={setViewInfo} showForm={viewInfo}>
        {isLoading ? (
          <Spinner>Loading...</Spinner>
        ) : appointment ? (
          <>
            <p>ID : {appointment.id}</p>
            <p>Type : {appointment.type}</p>
            <p>Pilote ID : {appointment.piloteID}</p>
            <p>Début : {formattedDateStart}</p>
            <p>Fin : {formattedDateEnd}</p>
          </>
        ) : (
          <p>Aucune donnée disponible.</p>
        )}
      </AppointmentCardWrapper>
    </div>
  )
}