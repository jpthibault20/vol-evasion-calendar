"use server"

import { db } from "@/lib/db";

export const getAppointments = async () =>{

    const appointments = await db.appointment.findMany()
    return appointments
};