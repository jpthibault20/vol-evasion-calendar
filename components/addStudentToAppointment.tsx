"use client"

import { useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Appointment } from "@prisma/client";
import { Spinner } from "./ui/spinner";
import { getAppointment } from "@/actions/appointment";

interface AddStudentProps {
    view: boolean;
    setView: (load: boolean) => void;
    appointmentID: string;
}


export const AddStudent = ({ view, setView, appointmentID }: AddStudentProps) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        getAppointment(appointmentID)
            .then((data) => {
                setAppointment(data)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);


    if (!view) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <CardWrapper headerLabel="Ajouter un élève a ce crénaux" setShowForm={setView} showForm={view}>
                {isLoading ? (
                    <Spinner>Chargement ...</Spinner>
                ) : (
                    <div>

                        <p>{appointment?.startDate?.toLocaleDateString("fr-FR")} {appointment?.startDate?.toLocaleTimeString()}</p>
                    </div>
                )}
            </CardWrapper>
        </div>
    )
};