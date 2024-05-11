"use client"

import { CardWrapper } from "./CardWrapper";
import { Button } from "./ui/button";
import { FormError } from "./form-error";
import { useState, useTransition } from "react";
import { removeStudentUser } from "@/actions/appointment";


interface RemoveUserApppointmentProps {
    view: boolean;
    setView: (load: boolean) => void;
    reload: boolean;
    setReload: (load: boolean) => void;
    appointmentID: string;
}


export const RemoveUserApppointment = ({ view, setView, reload, setReload, appointmentID }: RemoveUserApppointmentProps) => {
    const [error, setError] = useState<string>("");
    const [isPending, startTransition] = useTransition();

    const buttonDeleteSubmit = () => {
        startTransition(() => {
            removeStudentUser(appointmentID)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                    }
                    if (data.success) {
                        setView(false);
                        setReload(!reload);
                    }
                })
        })


    }

    if (!view) {
        return null;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <CardWrapper
                headerLabel="Supprimer l'élève du vol"
                setShowForm={setView}
                showForm={view}
            >
                <div className="space-y-4">
                    <FormError message={error} />
                    <div className="flex w-full space-x-4">
                        <Button
                            className="w-full"
                            onClick={() => setView(false)}
                            disabled={isPending}
                        >
                            Annuler
                        </Button>

                        <Button
                            className="w-full"
                            variant="destructive"
                            onClick={buttonDeleteSubmit}
                            disabled={isPending}
                        >
                        Supprimer
                    </Button>
                </div>
        </div>


            </CardWrapper >
        </div >
    );
}