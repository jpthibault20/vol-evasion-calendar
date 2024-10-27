"use server"

import { db } from "@/lib/db";

export const getAppointments = async (id: string) =>{

    const appointment = await db.appointment.findUnique( {where: {id:id} });

    appointment?.startDate?.setTime(appointment.startDate.getTime() - 3600000);
    appointment?.endDate?.setTime(appointment.endDate.getTime() - 3600000);

    return appointment
};