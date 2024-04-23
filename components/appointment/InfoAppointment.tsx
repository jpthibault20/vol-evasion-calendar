"use server"

import { getAppointments } from "@/actions/get-appointment";
import { AppointmentCardWrapper } from "./AppointmentCardWrapper";

interface InfoAppointmentProps {
    viewInfo: boolean,
    setViewInfo: (load: boolean) => void,
    ID: string,
    setID: (load: string) => void,
}


export async function InfoAppointment({ viewInfo, setViewInfo, ID, setID }: InfoAppointmentProps) {

    const info = await getAppointments(ID)

    console.log(info);

    if (viewInfo) {
        return (
            <div>
                <AppointmentCardWrapper headerLabel={"Info dispo"} setShowForm={setViewInfo} showForm={viewInfo}>
                    {ID} <br />
                    {info?.id}
                </AppointmentCardWrapper>
            </div>
        )
    }

    return null;
}