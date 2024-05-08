"use server"

import { db } from "@/lib/db";

export const getAppointments = async (id: string) =>{

    const appointment = await db.appointment.findUnique( {where: {id:id} });
    console.log(appointment);
    appointment?.startDate?.setTime(appointment.startDate.getTime() - 7200000);
    appointment?.endDate?.setTime(appointment.endDate.getTime() - 7200000);

    console.log(appointment);
    return appointment
};