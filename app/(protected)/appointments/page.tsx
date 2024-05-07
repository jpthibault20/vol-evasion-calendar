"use client"

import { AddToCalendar } from '@/components/AddToCalendar'
import {PrivatAppointments} from '@/components/PrivatAppointments'
import { RoleGate } from '@/components/auth/role-gate'
import { RemoveAppointments } from '@/components/removeAppointment(s)'
import React, { useState } from 'react'

const Appointments = () => {
    const [ID, setID] = useState("");
    const [recurenceID, setRcurenceID] = useState("");
    const [removedAppointments, setRemovedAppointments] = useState<boolean>(false);
    const [modifyAppointments, setModifyAppointments] = useState<boolean>(false);
    const [addUserAppointments, setAddUserAppointments] = useState<boolean>(false);
    const [reload, setReload] = useState(false);
    
    return (
        <div>
            <RoleGate allowedRole={'PILOTE'} noAccesPage={true}>
                <div className="w-full flex flex-col items-center space-y-8 md:divide-y md: divide-gray-200 md:dark:divide-gray-800 md:pt-8">

                    <div className='hidden md:block'>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Mes vols</h2>
                    </div>

                    <div className='p-6 w-full'>
                        <PrivatAppointments setReload={setReload} reload={reload} setRemovedAppointments={setRemovedAppointments} setReccurenceID={setRcurenceID} setID={setID} />
                    </div>
                </div>

                <AddToCalendar setReload={setReload} reload={reload}/>
                <RemoveAppointments setReload={setReload} reload={reload} removedAppointments={removedAppointments} setRemovedAppointments={setRemovedAppointments} ID={ID} recurenceID={recurenceID} />

            </RoleGate>
        </div>
    )
}

export default Appointments
