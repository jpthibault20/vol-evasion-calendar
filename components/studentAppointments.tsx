"use client"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarDays, CheckIcon, Info, UserPlusIcon, UserX, X } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useEffect, useState } from 'react'
import { FormattedAppointment, bookAppointment, getAppointmentsWithPilotID, getAppointmentsWithStudentID } from '@/actions/appointment'
import { useCurrentUser } from '@/hooks/use-current-user'
import { compareAsc } from 'date-fns'
import { Spinner } from './ui/spinner'

interface StudentAppointmentsProps {
    reload: boolean,
    setReload: (load: boolean) => void;
    setRemovedAppointments: (load: boolean) => void;
    setID: (load: string) => void;
    setReccurenceID: (load: string | null) => void;
    setAddUserAppointments: (load: boolean) => void;
    setRemoveUser: (load: boolean) => void;
    setIsRecurence: (load : boolean) => void;
}
export const StudentAppointments = ({ reload, setReload, setRemovedAppointments, setID, setReccurenceID, setAddUserAppointments, setRemoveUser, setIsRecurence }: StudentAppointmentsProps) => {
    const [appointments, setAppointments] = useState<FormattedAppointment[]>()
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const user = useCurrentUser();


    useEffect(() => {
        if (user) {
            setIsLoading(true);
            getAppointmentsWithStudentID(user.id as string)
                .then((data) => {
                    setAppointments(data);
                })
                .catch((err) => { console.log(err); })
                .finally(() => { setIsLoading(false) })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload]);

    const buttonUnsubscribe = (ID: string) => {
        setID(ID);
        setRemoveUser(true)
    }

    const sortAppointments = (appointments: FormattedAppointment[]) => {
        return appointments.sort((a, b) => {
            const dateA = a.fullDate || new Date(0);
            const dateB = b.fullDate || new Date(0);
            return compareAsc(dateA, dateB);
        });
    };

    const sortedAppointments = sortAppointments(appointments || []);

    return (
        <div>
            <div className="p-4  flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="px-4 py-2 rounded-md transition-colors " variant="outline">
                                    Récurence
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem>Reccurent</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Occasionel</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="px-4 py-2 rounded-md transition-colors " variant="outline">
                                    Disponibilité
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem>Disponible</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Reservé</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="px-4 py-2 rounded-md flex items-center gap-2" variant="outline">
                                    <CalendarDays className="w-5 h-5" />
                                    <span className='hidden md:block'>Recherche par date</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Calendar />
                            </PopoverContent>
                        </Popover>
                    </div> */}
                </div>
            </div>
            {isLoading ? (
                <Spinner>chargement ...</Spinner>
            ) : (
                <div className="border rounded-lg bg-white">

                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Heure de début</TableHead>
                                <TableHead>Heure de fin</TableHead>
                                <TableHead>Type de vol</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedAppointments?.map((appointment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{appointment.Date}</TableCell>
                                    <TableCell>{appointment.startTime}</TableCell>
                                    <TableCell>{appointment.endTime}</TableCell>
                                    
                                    
                                    <TableCell>
                                        {appointment.studentID ? (
                                            appointment.flightType
                                        ) : (
                                            <p>...</p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex space-x-4'>
                                            <Button variant="destructive" onClick={() => buttonUnsubscribe(appointment.id)}>Se désinscrire</Button>
                                            {/* <Button variant="modify">Modifier</Button> */}

                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>


            )}
        </div>
    )
};
