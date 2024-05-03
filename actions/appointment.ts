"use server"

import { db } from "@/lib/db";
import { getAppointments } from "./get-appointment";

export const bookAppointment = async(appointmentID: string, userID: string, flightType: string) => {
    const appointment = await getAppointments(appointmentID);

    if (!userID) {
        return {error: "Utilisateur introuvable"}
    }

    if (!appointment) {
        return {error: "Réservation introuvable"}
    }

    if (!flightType) {
        return {error: "type de vol invalide"}
    }

    if (appointment.studentID) {
        return {error: "réservation plus disponible "}
    }


    try {
        await db.appointment.update({
            where: { id: appointmentID },
            data: { studentID: userID }
        });
    } catch (error) {
        console.log(error);
        return { error: "Oups, une erreur s'est produite dans la réservation" }
    }

    return {success: "Réservation réussie"}
};