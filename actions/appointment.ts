"use server"

import { db } from "@/lib/db";
import { getAppointments } from "./get-appointment";
import { sendNotificationBooking, sendNotificationRemoveAppointment, sendNotificationSudentRemoveForPilot, sendStudentNotificationBooking } from "@/lib/mail";
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

function formatTime(date: Date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`
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
        return { error: "réservation indisponible " }
    }

    const piloteUser = await getUserById(appointment?.piloteID);

    try {
        await db.appointment.update({
            where: { id: appointmentID },
            data: {
                studentID: userID,
                studentFirstname: studentUser?.firstname,
                studentType: flightType
            }
        });
    } catch (error) {
        console.log(error);
        return { error: "Oups, une erreur s'est produite dans la réservation (code: E_002)" }
    }

    if (process.env.ENVIRONEMENT == "PROD") {
        appointment.startDate?.setHours( appointment.startDate.getHours() + 2 );
        appointment.endDate?.setHours( appointment.endDate.getHours() + 2 );
    }

    await sendNotificationBooking(piloteUser?.email as string, studentUser?.firstname as string, studentUser?.name as string, appointment.startDate as Date, appointment.endDate as Date);
    await sendStudentNotificationBooking(studentUser?.email as string, appointment.startDate as Date, appointment.endDate as Date);

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
        const { id, piloteID, studentID, startDate, endDate, studentType, appointmentDate, recurenceID } = appointment;
        const studentUser = await getUserById(studentID || "");

        const formattedStartDate = startDate?.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        // Créer une copie de la date de début pour éviter de modifier l'objet original
        const startDateCopy = new Date(startDate!.getTime() || "");
        if (process.env.ENVIRONEMENT == "DEV") {
            startDateCopy.setHours(startDate!.getHours() - 2);
        }
        const formattedStartTime = formatTime(startDateCopy);

        // Créer une copie de la date de fin pour éviter de modifier l'objet original
        const endDateCopy = new Date(endDate!.getTime() || "");
        if (process.env.ENVIRONEMENT == "DEV") {
            endDateCopy.setHours(endDate!.getHours() - 2);
        }
        const formattedEndTime = formatTime(endDateCopy);

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
            flightType: studentType,
            endRecurence: formatedEndRecurence || null,
            recurencID: recurenceID
        };


    })
    );
    return formattedAppointments;
}

export const getAppointmentsWithStudentID = async (studentID: string) => {
    const appointments = await db.appointment.findMany({
        where: {
            studentID: studentID
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
        const startDateCopy = new Date(startDate!.getTime() || "");
        if (process.env.ENVIRONEMENT == "DEV") {
            startDateCopy.setHours(startDate!.getHours() - 2);
        }
        const formattedStartTime = formatTime(startDateCopy);

        // Créer une copie de la date de fin pour éviter de modifier l'objet original
        const endDateCopy = new Date(endDate!.getTime() || "");
        if (process.env.ENVIRONEMENT == "DEV") {
            endDateCopy.setHours(endDate!.getHours() - 2);
        }
        const formattedEndTime = formatTime(endDateCopy);

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
        const appointments = await db.appointment.findMany({
            where: {
                recurenceID: reccurenceID
            }
        })
        await Promise.all(appointments.map(async (appointment) => {
            if (appointment.studentID) {
                const student = await db.user.findUnique({ where: { id: appointment.studentID } });
                if (student) {
                    sendNotificationRemoveAppointment(student.email as string, appointment.startDate as Date, appointment.endDate as Date);
                }
            }
        }));


        try {
            await db.appointment.deleteMany({
                where: {
                    recurenceID: reccurenceID,
                    endDate: {
                        gt: new Date()
                    }
                }
            })
        } catch (error) {
            console.log(error);
            return { error: "Erreur dans la suppression de la recurrence (code: E_003)" }
        }
        return;
    }



    const appointment = await db.appointment.findUnique({
        where: {
            id: ID
        }
    })
    if (appointment?.studentID) {
        const student = await db.user.findUnique({ where: { id: appointment.studentID } });
        if (student) {

            sendNotificationRemoveAppointment(student.email as string, appointment.startDate as Date, appointment.endDate as Date);
        }
    }


    try {
        await db.appointment.delete({
            where: {
                id: ID
            }
        })
    } catch (error) {
        console.log(error);
        return { error: "Erreur dans la suppression de la recurrence (code: E_003)"}
    }
    return;
}

export const getAppointment = async (ID: string) => {
    try {
        const appointment = await db.appointment.findUnique({ where: { id: ID } });

        appointment?.endDate?.setHours(appointment.endDate.getHours() - 2);
        appointment?.startDate?.setHours(appointment.startDate.getHours() - 2);

        return appointment
    } catch (error) {
        return null;
    }
}

export const addUserToAppointment = async (appointmentID: string, userID: string, flyingType: appointmentType) => {
    const appointment = await getAppointment(appointmentID);
    const user = await getUserById(userID);

    try {
        await db.appointment.update({
            where: { id: appointmentID },
            data: {
                studentID: userID,
                studentFirstname: user?.firstName,
                studentType: flyingType
            }
        });
    } catch (error) {
        console.log(error);
        return { error: "Il y a eu une erreur (code: E_002)" };
    }

    await sendStudentNotificationBooking(user?.email as string, appointment?.startDate as Date, appointment?.endDate as Date)
    return { success: "Mise à jour effectuée" };
}

export const removeStudentUser = async (appointmentID: string) => {
    const appointment = await getAppointment(appointmentID);
    const pilot = await getUserById(appointment?.piloteID || "")
    const student = await getUserById(appointment?.studentID || "");


    if (!appointmentID) {
        return { error: "Erreur ID (code: E_007)" }
    }

    if (appointment?.studentID) {
        await sendNotificationRemoveAppointment(student?.email as string, appointment.startDate as Date, appointment.endDate as Date);
        await sendNotificationSudentRemoveForPilot(pilot?.email as string, appointment.startDate as Date, appointment.endDate as Date);
    }

    try {
        await db.appointment.update({
            where: { id: appointmentID },
            data: { studentID: null }
        })
    } catch (error) {
        console.log(error);
        return { error: "Oups, une erreur s'est produite (code: E_002)" };
    }
    return { success: "Mise à jour effectuée" };

    
}