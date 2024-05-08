"use client"

import { useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Appointment } from "@prisma/client";
import { Spinner } from "./ui/spinner";
import { getAppointment } from "@/actions/appointment";
import { Button } from "./ui/button";
import { FormError } from "./form-error";

interface AddStudentProps {
    view: boolean;
    setView: (load: boolean) => void;
    appointmentID: string;
}


export const AddStudent = ({ view, setView, appointmentID }: AddStudentProps) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [error, setError] = useState<string | undefined>();
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

    const handleSubmit = () => {

    }


    if (!view) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <CardWrapper headerLabel="Ajouter un élève a ce crénaux" setShowForm={setView} showForm={view}>
                {isLoading ? (
                    <Spinner>Chargement ...</Spinner>
                ) : (
                    <div className="space-y-6">
                        <p className="text-gray-500 text-center mb-5">Ajouter un Elève à ce vol ?</p>

                        <form className="space-y-6">
                            <label>Liste des élève</label>
                            <select
                                name="Role"
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>

                            <FormError message={error} />
                            <Button>Enregistrer</Button>
                        </form>

                    </div>
                )}
            </CardWrapper>
        </div>
    )
};