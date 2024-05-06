"use client"

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarDays, CheckIcon, Info, UserPlusIcon, X } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { useEffect, useState } from 'react'
import { FormattedAppointment, getAppointmentsWithPilotID } from '@/actions/appointment'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Appointment } from '@prisma/client'

export const PrivatAppointments = () => {
    const [appointments, setAppointments] = useState<FormattedAppointment[]>()
    const user = useCurrentUser();

    useEffect(() => {
        if (user) {
            getAppointmentsWithPilotID(user.id as string)
                .then((data) => {
                    setAppointments(data);
                })
                .catch((err) => {console.log(err);})
                .finally(() => { })
        }
    }, [])
    console.log(appointments);
    return (
        <div>
            <div className="p-4  flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
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
                    </div>
                </div>
            </div>
            <div className="border rounded-lg bg-white">

                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Heure de début</TableHead>
                            <TableHead>Heure de fin</TableHead>
                            <TableHead>Récurrent</TableHead>
                            <TableHead>Élève inscrit</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>14/04/2023</TableCell>
                            <TableCell>08:00</TableCell>
                            <TableCell>10:00</TableCell>
                            <TableCell>
                                <div className="">
                                    <CheckIcon className="text-green-500" />
                                    {/* <X className="text-red-500" /> */}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-4">
                                    {/* <UserPlusIcon className="text-blue-500" /> */}
                                    <p className='place-content-center'>Jean DUPONT</p>
                                    <button>
                                        <Info />
                                    </button>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive">Supprimer</Button>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        </div>

    )
};
