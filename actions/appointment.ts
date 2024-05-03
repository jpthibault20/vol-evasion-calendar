"use server"

import { db } from "@/lib/db";
import { getAppointments } from "./get-appointment";
import { sendNotificationBooking } from "@/lib/mail";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";

export const bookAppointment = async(appointmentID: string, userID: string, flightType: string) => {
    const appointment = await getAppointments(appointmentID);
    const studentUser = await currentUser();    

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

const piloteUser = await getUserById(appointment?.piloteID);

    try {
        await db.appointment.update({
            where: { id: appointmentID },
            data: { studentID: userID }
        });
    } catch (error) {
        console.log(error);
        return { error: "Oups, une erreur s'est produite dans la réservation" }
    }

    await sendNotificationBooking(piloteUser?.email as string, studentUser?.firstname as string, studentUser?.name as string, appointment.startDate as Date, appointment.endDate as Date);

    return {success: "Réservation réussie"}
};