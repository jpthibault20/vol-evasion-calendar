"use client"

import { startTransition, useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper";
import { Appointment, User, appointmentType } from "@prisma/client";
import { Spinner } from "./ui/spinner";
import { addUserToAppointment, getAppointment } from "@/actions/appointment";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { getAllUsers } from "@/actions/user";

interface AddStudentProps {
    view: boolean;
    setView: (load: boolean) => void;
    appointmentID: string;
    reload: boolean;
    setReload: (load: boolean) => void;
}


export const AddStudent = ({ view, setView, appointmentID, reload, setReload }: AddStudentProps) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const [error, setError] = useState<string | undefined>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getAppointment(appointmentID)
            .then((data) => {
                setAppointment(data)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                // setIsLoading(false);
            })

        getAllUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setIsLoading(false);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [view]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(() => {
            const formData = new FormData(event.currentTarget);
            const values: any = {};
            formData.forEach((value, key) => {
                values[key] = value;
            });

            addUserToAppointment(appointmentID, values.userID, values.flyingType)
                .then((data) => {
                    if (data.success) {
                        setReload(!reload);
                        setView(false);
                    }
                    if (data.error) {
                        setError(data.error);
                    }
                })

            // console.log(values);
        });
    }

    let flyingType: appointmentType[] = [];

    switch (appointment?.type) {
        case "ALL":
            flyingType = ["BAPTEME", "COURS"];
            break;
        case "COURS":
            flyingType = ["COURS"];
            
            break;
        case "BAPTEME":
            flyingType = ["BAPTEME"];
            break;
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

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label>Liste des élève</label>
                                <select
                                    name="userID"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    {users?.map((user, index) => (
                                        <option value={user.id} key={index}>
                                            {user.firstName} {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Type de vole</label>
                                <select
                                    name="flyingType"
                                    className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                >
                                    {flyingType?.map((flyingType, index) => (
                                        <option key={index} value={flyingType} >
                                            {flyingType}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <FormError message={error} />
                            <Button type="submit">Enregistrer</Button>
                        </form>

                    </div>
                )}
            </CardWrapper>
        </div>
    )
};