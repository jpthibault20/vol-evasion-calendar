"use client"
import { getAppointments } from "@/actions/get-appointment";
import { AppointmentCardWrapper } from "./AppointmentCardWrapper";
import { useState, useEffect } from "react";
import { Appointment, User } from "@prisma/client";
import { Spinner } from "../ui/spinner";
import { getUserById } from "@/actions/user";
import { Booking } from "./booking";



interface InfoAppointmentProps {
  viewInfo: boolean,
  setViewInfo: (load: boolean) => void,
  ID: string,
  setID: (load: string) => void,
}

export function InfoAppointment({ viewInfo, setViewInfo, ID, setID }: InfoAppointmentProps) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [pilote, setPilote] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  


  useEffect(() => {
    if (viewInfo) {
      setIsLoading(true);
      getAppointments(ID)
        .then(data => {
          setAppointment(data);

        })
        .catch(error => {
          console.error(error);

        })
    } else {
      setAppointment(null);

    }
  }, [viewInfo, ID]);

  useEffect(() => {
    if (appointment) {
      getUserById(appointment.piloteID)
        .then((data) => {
          setPilote(data);
          setIsLoading(false);
        })
    }
  }, [appointment]);

  if (!viewInfo) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pt-20 md:pt-0">
      <AppointmentCardWrapper headerLabel={"Réservez votre vol"} setShowForm={setViewInfo} showForm={viewInfo}>
        {isLoading ? (
          <Spinner>Loading...</Spinner>
        ) : appointment ? (
          <>







            <Booking appointment={appointment} pilote={pilote} />
           








          </>
        ) : (
          <p>Aucune donnée disponible.</p>
        )}
      </AppointmentCardWrapper>
    </div>
  )
}