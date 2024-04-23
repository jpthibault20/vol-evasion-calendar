"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NewAppointment } from "@/schemas";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';


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


    const { timeStart } = validatedFields.data
    timeStart.setFullYear(date.getFullYear());
    timeStart.setMonth(date.getMonth());
    timeStart.setDate(date.getDate());

    // validation "Horaire début" not passed

    timeStart.setHours(timeStart.getHours() + 2);  // hours gmt paris
    if (new Date().getDate() == timeStart.getDate() && new Date().getMonth() == timeStart.getMonth() && new Date().getFullYear() == timeStart.getFullYear()) {
        console.log("date : ", new Date())
        console.log("timeStart : ", timeStart)
        if (new Date().getHours() >= timeStart.getHours()) {
            return { error: "Horaire début erroné (min + 1h)" }
        }
    }

    date.setHours(timeStart.getHours());
    date.setMinutes(timeStart.getMinutes());

    // validation "Horaire fin" must min 1 hour between "Horaire début"
    const { timeEnd } = validatedFields.data
    timeEnd.setHours(timeEnd.getHours() + 2);  // hours gmt paris
    if (timeEnd.getHours() <= timeStart.getHours()) {
        return { error: "Horaire fin erroné (min dispo 1h)" }
    }

    timeEnd.setDate(date.getDate());
    timeEnd.setMonth(date.getMonth());
    timeEnd.setFullYear(date.getFullYear());


    // if "disponibilité récurente" validate "date fin récurence" must have min 1 week between "date"
    const { recurrence } = validatedFields.data;
    const { dateEndReccurence } = validatedFields.data;
    dateEndReccurence?.setHours(25);
    dateEndReccurence?.setMinutes(59);
    if (recurrence) {
        if (dateEndReccurence!.getTime() < date.getTime() + (1209600000 - 86400000)) {
            return { error: "date fin récurence trop proche min (2 semaines)" }
        }
    }

    // 
    if (!user?.id) {
        return { error: "Un problème es survenue" }
    }


    if (!recurrence) {
        // checked if apppointment with same date in db
        const appointmentAlreadyExiste = await db.appointment.findMany({
            where: {
                startDate: {
                    gte: timeStart,
                    lte: new Date(timeEnd.getTime() - 1),
                },
                piloteID: user.id
            }
        });

        if (appointmentAlreadyExiste.length !== 0) {
            return { error: "Un disponibilité déja avec c'est dates" }
        };

        const useDateStart = date;
        const useDateEnd = new Date(useDateStart.getFullYear(), useDateStart.getMonth(), useDateStart.getDay(), useDateStart.getHours() + 1, useDateStart.getMinutes());

        while (useDateStart < timeEnd) {
            await db.appointment.create({
                data: {
                    piloteID: user?.id as string,
                    type,
                    startDate: useDateStart,
                    endDate: useDateEnd,
                    recurrence,
                    appointmentDate: dateEndReccurence
                }
            });

            useDateStart.setHours(useDateStart.getHours() + 1);
            useDateEnd.setHours(useDateEnd.getHours() + 1);
        };
    };


    if (dateEndReccurence) {
        const reccurenceID = uuidv4();
        const sevenDaysMs = 604800000;
        const oneHourMs = 3600000;

        const useStartDate = new Date(date.getTime());
        const useEndDate = new Date(useStartDate.getTime() + oneHourMs);


        while (dateEndReccurence > useEndDate) {

            while (useEndDate <= timeEnd) {

                const appointmentAlreadyExiste = await db.appointment.findMany({
                    where: {
                        startDate: {
                            gte: useStartDate,
                            lte: new Date(useEndDate.getTime() - 1),
                        },
                        piloteID: user.id
                    }
                });

                if (appointmentAlreadyExiste.length !== 0) {
                    return { error: `Indisponibilité déja présente avec c'est dates : ${useStartDate.toDateString()} - ${useEndDate.toDateString()}` }
                };
                

                await db.appointment.create({
                    data: {
                        piloteID: user?.id as string,
                        type,
                        startDate: useStartDate,
                        endDate: useEndDate,
                        recurrence,
                        appointmentDate: dateEndReccurence,
                        recurenceID: reccurenceID,
                    }
                });



                
                useStartDate.setTime(useStartDate.getTime() + oneHourMs);
                useEndDate.setTime(useStartDate.getTime() + oneHourMs);
            }

            useStartDate.setTime(date.getTime() + sevenDaysMs);
            date.setTime(useStartDate.getTime());

            useEndDate.setTime(useStartDate.getTime() + oneHourMs);
            timeEnd.setTime(timeEnd.getTime() + sevenDaysMs);
        }
    }





    return { success: "Disponibilité ajoutée" };

}