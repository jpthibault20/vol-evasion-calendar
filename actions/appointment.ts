"use server"

import { db } from "@/lib/db";
import { getAppointments } from "./get-appointment";
import { sendNotificationBooking } from "@/lib/mail";
import { currentUser } from "@/lib/auth";
import { getUserById } from "./user";
import { Appointment, appointmentType } from "@prisma/client";

export interface FormattedAppointment {
    id: string;
    piloteID: string;
    studentID: string | null;
    studentName: string;
    Date: string;
    fullDate: Date | null;
    startTime: String;
    endTime: String;
    endRecurence: string | null;
    recurencID: string | null;
    flightType: appointmentType | null;
}

export const bookAppointment = async (appointmentID: string, userID: string, flightType: appointmentType) => {
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
            data: { studentID: userID,
                    type: flightType
             }
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

    const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 2, 0, 0); // 2 for local time europe

    const upcomingAppointments = appointments.filter(
        (appointment) => appointment.startDate !== null && appointment.startDate >= date
    );

    const formattedAppointments: FormattedAppointment[] = await Promise.all(upcomingAppointments.map(async (appointment: Appointment) => {
        const { id, piloteID, studentID, startDate, endDate, type, appointmentDate, recurenceID } = appointment;
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

        const formatedEndRecurence = appointmentDate?.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        return {
            id,
            piloteID,
            studentID,
            studentName: `${studentUser?.firstName} ${studentUser?.name}`,
            Date: formattedStartDate || "",
            fullDate: startDate,
            startTime: formattedStartTime || "",
            endTime: formattedEndTime || "",
            flightType: type,
            endRecurence: formatedEndRecurence || null,
            recurencID: recurenceID
        };


    })
    );
    return formattedAppointments;
}

export const removeAppointmentByIDAndReccurencID = async (ID: string, reccurenceID?: string) => {
    if (reccurenceID) {
        try {
            await db.appointment.deleteMany({
                where: {
                    recurenceID: reccurenceID
                }
            })
        } catch (error) {
            console.log(error);
            return {error: "Erreur dans la suppression de la recurence"}
        }
        return;
    }

    try {
        await db.appointment.delete({
            where: {
                id: ID
            }
        })
    } catch (error) {
        console.log(error);
        return {error: "Erreur dans la suppression de la recurence"}
    }
    return;
}