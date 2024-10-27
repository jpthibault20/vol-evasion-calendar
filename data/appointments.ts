"use server"

import { db } from "@/lib/db";
import { Appointment } from "@prisma/client";

export const getAppointments = async (client?: boolean) => {
  try {
    const appointments = await db.appointment.findMany();
    const newAppointments = appointments.map(appointment => ({
      ...appointment,
      timeStart: new Date(appointment.startDate!.getTime() - 3600000 ),
      timeEnd: new Date(appointment.endDate!.getTime() - 3600000 ),
    }));


    return newAppointments
  } catch {
    return null;
  }
};