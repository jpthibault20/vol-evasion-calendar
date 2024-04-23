"use server"

import { db } from "@/lib/db";

export const getAppointments = async (client?: boolean) => {
  try {
    const appointments = await db.appointment.findMany();
    const newAppointments = appointments.map(appointment => ({
      ...appointment,
      timeStart: new Date(appointment.startDate!.getTime() - 7200000 ),
      timeEnd: new Date(appointment.endDate!.getTime() - 7200000 ),
    }));


    return newAppointments
  } catch {
    return null;
  }
};