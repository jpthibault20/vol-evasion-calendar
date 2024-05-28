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
                <div className='w-full md:space-y-8 flex flex-col items-center md:divide-y md:divide-gray-200 md:dark:divide-gray-800 md:pt-8'>

                    <div className='hidden md:block'>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Mes vols (pilote)</h2>
                    </div>
                    <div className='px-6 pb-6 w-full'>
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

                    <div className='w-full '>
                        <h2 className="text-2xl text-center font-bold tracking-tight mt-5 text-gray-900 dark:text-gray-50">Mes vols (élève)</h2>

                        <div className='px-6 pb-6 w-full'>
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
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className='w-full md:space-y-8 flex flex-col items-center md:divide-y md:divide-gray-200 md:dark:divide-gray-800 md:pt-8'>

                <div className='hidden md:block w-full text-center'>
                    <h2 className="text-2xl font-bold tracking-tight mt-5 text-gray-900 dark:text-gray-50">Mes vols</h2>
                </div>
                <div className='px-6 pb-6 w-full'>
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

            </div>
        </div>

    );


};
