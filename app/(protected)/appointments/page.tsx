"use client"

import { AddToCalendar } from '@/components/AddToCalendar'
import { PiloteAppointments } from '@/components/piloteAppointments'
import { RoleGate } from '@/components/auth/role-gate'
import { RemoveAppointments } from '@/components/removeAppointment(s)'
import { AddStudent } from "@/components/addStudentToAppointment"
import React, { useState } from 'react'
import { RemoveUserApppointment } from '@/components/removeUserAppointment'
import { Appointments } from '@/components/appointments'

const AppointmentsPage = () => {
    const [ID, setID] = useState("");
    const [recurenceID, setRcurenceID] = useState<string | null>("");
    const [removedAppointments, setRemovedAppointments] = useState<boolean>(false);
    const [removeUserAppointments, setRemoveUserAppointments] = useState<boolean>(false);
    const [addUserAppointments, setAddUserAppointments] = useState<boolean>(false);
    const [isReccurence, setIsReccurence] = useState<boolean>(false);
    const [reload, setReload] = useState(false);

    return (
        <div>



            <Appointments
                setReload={setReload}
                reload={reload}
                setRemovedAppointments={setRemovedAppointments}
                setReccurenceID={setRcurenceID}
                setID={setID}
                setAddUserAppointments={setAddUserAppointments}
                setRemoveUser={setRemoveUserAppointments}
                setIsRecurence={setIsReccurence}
            />



            <RoleGate allowedRole={'PILOTE'}>
                <AddToCalendar
                    setReload={setReload}
                    reload={reload}
                />
            </RoleGate>

            <AddStudent
                view={addUserAppointments}
                setView={setAddUserAppointments}
                appointmentID={ID}
                setReload={setReload}
                reload={reload}
            />
            <RemoveAppointments
                setReload={setReload}
                reload={reload}
                removedAppointments={removedAppointments}
                setRemovedAppointments={setRemovedAppointments}
                ID={ID}
                recurenceID={recurenceID}
                isReccurence={isReccurence}
            />
            <RemoveUserApppointment
                view={removeUserAppointments}
                setView={setRemoveUserAppointments}
                reload={reload}
                setReload={setReload}
                appointmentID={ID} />
        </div>
    )
}

export default AppointmentsPage
