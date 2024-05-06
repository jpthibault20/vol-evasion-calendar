"use server"

import { db } from "@/lib/db";
import { getAppointments } from "./get-appointment";
import { sendNotificationBooking } from "@/lib/mail";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";
import { Appointment, appointmentType } from "@prisma/client";

export interface FormattedAppointment {
    id: string;
    piloteID: string;
    studentID: string | null;
    studentName: string;
    Date: string;
    startTime: String;
    endTime: String;
    flightType: appointmentType | null;
}

export const bookAppointment = async (appointmentID: string, userID: string, flightType: string) => {
    const appointment = await getAppointments(appointmentID);
    const studentUser = await currentUser();

    if (!userID) {
        return { error: "Utilisateur introuvable" }
    }

    if (!appointment) {
        return { error: "Réservation introuvable" }
    }

    if (!flightType) {
        return { error: "type de vol invalide" }
    }

    if (appointment.studentID) {
        return { error: "réservation plus disponible " }
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

    return { success: "Réservation réussie" }
};

export const getAppointmentsWithPilotID = async (piloteID: string) => {
    const appointments = await db.appointment.findMany({
        where: {
            piloteID: piloteID
        }
    });

    const formattedAppointments: FormattedAppointment[] = await Promise.all(appointments.map(async (appointment: Appointment) => {
        const { id, piloteID, studentID, startDate, endDate, type } = appointment;

        const studentUser = await getUserById(studentID || "");

        const formattedStartDate = startDate?.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        // Créer une copie de la date de début pour éviter de modifier l'objet original
        const startDateCopy = new Date(startDate || "");
        startDateCopy.setHours(startDate!.getHours() - 2);
        const formattedStartTime = startDateCopy.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // Créer une copie de la date de fin pour éviter de modifier l'objet original
        const endDateCopy = new Date(endDate || "");
        endDateCopy.setHours(endDate!.getHours() - 2);
        const formattedEndTime = endDateCopy.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return {
            id,
            piloteID,
            studentID,
            studentName: `${studentUser?.firstName} ${studentUser?.name}`,
            Date: formattedStartDate || "",
            startTime: formattedStartTime || "",
            endTime: formattedEndTime || "",
            flightType: type
        };


    })
    );
    return formattedAppointments;
}