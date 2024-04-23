"use server"

import { db } from "@/lib/db";

export const getAppointments = async (id: string) =>{

    const appointment = await db.appointment.findUnique( {where: {id} });
    return appointment
};