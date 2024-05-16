"use client"

import { AddToCalendar } from '@/components/AddToCalendar'
import { PrivatAppointments } from '@/components/PrivatAppointments'
import { RoleGate } from '@/components/auth/role-gate'
import { RemoveAppointments } from '@/components/removeAppointment(s)'
import { AddStudent } from "@/components/addStudentToAppointment"
import React, { useState } from 'react'
import { RemoveUserApppointment } from '@/components/removeUserAppointment'

const Appointments = () => {
    const [ID, setID] = useState("");
    const [recurenceID, setRcurenceID] = useState<string | null>("");
    const [removedAppointments, setRemovedAppointments] = useState<boolean>(false);
    const [removeUserAppointments, setRemoveUserAppointments] = useState<boolean>(false);
    const [addUserAppointments, setAddUserAppointments] = useState<boolean>(false);
    const [isReccurence, setIsReccurence] = useState<boolean>(false);
    const [reload, setReload] = useState(false);

    return (
        <div>
            <RoleGate allowedRole={'PILOTE'} noAccesPage={true}>
                <div className="w-full md:space-y-8 flex flex-col items-center md:divide-y md:divide-gray-200 md:dark:divide-gray-800 md:pt-8">

                    <div className='hidden md:block'>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Mes vols</h2>
                    </div>

                    <div className='px-6 pb-6 w-full'>
                        <PrivatAppointments
                            setReload={setReload}
                            reload={reload}
                            setRemovedAppointments={setRemovedAppointments}
                            setReccurenceID={setRcurenceID}
                            setID={setID}
                            setAddUserAppointments={setAddUserAppointments}
                            setRemoveUser={setRemoveUserAppointments}
                            setIsRecurence={setIsReccurence}
                        />
                    </div>
                </div>

                <AddToCalendar
                    setReload={setReload}
                    reload={reload}
                />
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

            </RoleGate>
        </div>
    )
}

export default Appointments
