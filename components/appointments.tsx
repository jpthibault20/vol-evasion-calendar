import React from 'react'
import { PiloteAppointments } from './piloteAppointments';
import { currentUser } from '@/lib/auth';
import { useCurrentUser } from '@/hooks/use-current-user';
import { StudentAppointments } from './studentAppointments';

interface AppointmentsProps {
    reload: boolean,
    setReload: (load: boolean) => void;
    setRemovedAppointments: (load: boolean) => void;
    setID: (load: string) => void;
    setReccurenceID: (load: string | null) => void;
    setAddUserAppointments: (load: boolean) => void;
    setRemoveUser: (load: boolean) => void;
    setIsRecurence: (load: boolean) => void;
}

export const Appointments = ({ reload, setReload, setRemovedAppointments, setID, setReccurenceID, setAddUserAppointments, setRemoveUser, setIsRecurence }: AppointmentsProps) => {
    const user = useCurrentUser();

    if (user?.role === 'PILOTE' || user?.role === 'ADMIN') {
        return (
            <div>
                <PiloteAppointments
                    setReload={setReload}
                    reload={reload}
                    setRemovedAppointments={setRemovedAppointments}
                    setReccurenceID={setReccurenceID}
                    setID={setID}
                    setAddUserAppointments={setAddUserAppointments}
                    setRemoveUser={setRemoveUser}
                    setIsRecurence={setIsRecurence}
                />
            </div>
        );
    };

    if (user?.role === 'ELEVE'  || user?.role === 'USER') {
        return (
                <div>
                    <StudentAppointments
                    setReload={setReload}
                    reload={reload}
                    setRemovedAppointments={setRemovedAppointments}
                    setReccurenceID={setReccurenceID}
                    setID={setID}
                    setAddUserAppointments={setAddUserAppointments}
                    setRemoveUser={setRemoveUser}
                    setIsRecurence={setIsRecurence}
                />
                </div>
        );
    };

};
