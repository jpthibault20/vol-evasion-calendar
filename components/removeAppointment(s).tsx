import { removeAppointmentByIDAndReccurencID } from "@/actions/appointment";
import { CardWrapper } from "./CardWrapper";
import { Button } from "./ui/button";
import { useState } from "react";
import { FormError } from "./form-error";


interface RemoveAppointmentsProps {
    reload: Boolean;
    setReload: (load: boolean) => void,
    removedAppointments: boolean;
    setRemovedAppointments: (load: boolean) => void;
    ID: string;
    recurenceID: string | null;
    isReccurence: boolean;
}

export const RemoveAppointments = ({ reload, setReload, removedAppointments, setRemovedAppointments, ID, recurenceID, isReccurence }: RemoveAppointmentsProps) => {
    const [error, setError] = useState("");
    const [isPensding, setIsPending] = useState<boolean>(false);
    if (!removedAppointments) return null;

    const onClickButtonRemove = (deleteReccurence: boolean) => {
        setError("");
        setIsPending(true);
        if (deleteReccurence && !recurenceID) {
            setError("Ce vol n'es pas une reccurence")
            return;
        }


        if (deleteReccurence && recurenceID) {
            removeAppointmentByIDAndReccurencID(ID, recurenceID)
                .catch((err) => {
                    if (err) setError(err);
                })
                .finally(()=>setIsPending(false))
        }
        else {
            removeAppointmentByIDAndReccurencID(ID)
                .catch((err) => {
                    if (err) setError(err);
                })
                .finally(()=>setIsPending(false))
        }



        setRemovedAppointments(false)
        setReload(!reload);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <CardWrapper headerLabel={"Supprimer un vol ?"} setShowForm={setRemovedAppointments} showForm={removedAppointments}>
                <div className="space-y-4">
                    <Button
                        className="w-full"
                        disabled={isPensding}
                        onClick={() => { setRemovedAppointments(false) }}
                    >
                        Annuler
                    </Button>
                    <Button
                        className="w-full"
                        variant="destructive"
                        disabled={isPensding}
                        onClick={() => { onClickButtonRemove(false) }}
                    >
                        Supprimer ce vol uniquement
                    </Button>
                    {recurenceID && (
                        <Button
                        className="w-full"
                        variant="destructive"
                        disabled={isPensding}
                        onClick={() => { onClickButtonRemove(true) }}
                    >
                        Supprimer toute la récurence
                    </Button>
                    )}
                    

                    <FormError message={error} />
                </div>


            </CardWrapper>

        </div>
    )
}

