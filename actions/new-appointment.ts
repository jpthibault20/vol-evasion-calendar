"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewAppointment } from "@/schemas";
import { z } from "zod";


export const newAppointment = async (values: z.infer<typeof NewAppointment>) => {
    const user = await currentUser();

    // validation fields
    const validatedFields = NewAppointment.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Champs manquant !" };
    }

    const { type } = validatedFields.data

    // validation "date" not passed
    const { date } = validatedFields.data;
    date.setHours(date.getHours() + 2); // hours gmt paris
    date.setHours(23, 59);
    if (date <= new Date()) {
        return { error: "Date de l'évènement déja passé" }
    }

    // validation "Horaire début" not passed
    const { timeStart } = validatedFields.data
    // timeStart.setHours(timeStart.getHours() + 2);  // hours gmt paris
    if (new Date().getDate() == timeStart.getDate() && new Date().getMonth() == timeStart.getMonth() && new Date().getFullYear() == timeStart.getFullYear()) {
        // console.log("date : ", new Date().getHours())
        // console.log("timeStart : ", timeStart.getHours())
        if (new Date().getHours() >= timeStart.getHours()) {
            return { error: "Horaire début erroné (min + 1h)" }
        }
    }

    date.setHours(timeStart.getHours());
    date.setMinutes(timeStart.getMinutes());

    // validation "Horaire fin" must min 1 hour between "Horaire début"
    const { timeEnd } = validatedFields.data
    // timeEnd.setHours(timeEnd.getHours() + 2);  // hours gmt paris
    if (timeEnd.getHours() <= timeStart.getHours()) {
        return { error: "Horaire fin erroné (min dispo 1h)" }
    }

    timeEnd.setDate(date.getDate());
    timeEnd.setMonth(date.getMonth());
    timeEnd.setFullYear(date.getFullYear());


    // if "disponibilité récurente" validate "date fin récurence" must have min 1 week between "date"
    const { recurrence } = validatedFields.data;
    const { dateEndReccurence } = validatedFields.data;
    dateEndReccurence?.setHours(dateEndReccurence.getHours() + 2);  // hours gmt paris
    if (recurrence) {
        if (dateEndReccurence!.getTime() < date.getTime() + (1209600000 - 86400000)) {
            return { error: "date fin récurence trop proche min (2 semaines)" }
        }
    }

    // 
    if (!user?.id) {
        return { error: "Un problème es survenue" }
    }

    // checked if apppointment with same date in db
    const appointmentAlreadyExiste = await db.appointment.findMany({
        where: {
            startDate: {
                gte: date,
                lte: timeEnd,
            },
            piloteID: user.id
        }
    })
    if (appointmentAlreadyExiste.length !== 0) {
        return { error: "Un disponibilité déja avec c'est dates" }
    }

    //for reccurent appointments
    if (recurrence) {
        // If appointment up to 1h
        if ((timeEnd.getHours() - date.getHours()) > 1) {

            while (date != new Date()) {

            }

        }

    }

    // If appointment up to 1h
    if ((timeEnd.getHours() - date.getHours()) > 1) {
        const numberAppointment = timeEnd.getHours() - date.getHours();

        for (let index = 0; index < numberAppointment; index++) {

            timeEnd.setTime(date.getTime() + 3600000);

            await db.appointment.create({
                data: {
                    piloteID: user?.id as string,
                    type,
                    startDate: date,
                    endDate: timeEnd,
                    recurrence,
                    appointmentDate: dateEndReccurence
                }
            });

            date.setTime(date.getTime() + 3600000);
        }

        return { success: "Disponibilité ajoutée" };
    }

    await db.appointment.create({
        data: {
            piloteID: user?.id as string,
            type,
            startDate: date,
            endDate: timeEnd,
            recurrence,
            appointmentDate: dateEndReccurence
        }
    });

    return { success: "Disponibilité ajoutée" };

}