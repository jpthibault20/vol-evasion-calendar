"use client"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent } from './ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarDays, CheckIcon, UserPlusIcon, X, XIcon } from 'lucide-react'
import { Calendar } from './ui/calendar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

export const PrivatAppointments = () => {
    return (
        <div>
            <div className="p-4  flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="px-4 py-2 rounded-md transition-colors " variant="outline">
                                    Recurring
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem>Recurring</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Non-recurring</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="px-4 py-2 rounded-md transition-colors " variant="outline">
                                    Available
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem>Available</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Not Available</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="px-4 py-2 rounded-md flex items-center gap-2" variant="outline">
                                    <CalendarDays className="w-5 h-5" />
                                    <span className='hidden md:block'>Search by date</span>
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
                                <div className="flex justify-center">
                                    <CheckIcon className="text-green-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <UserPlusIcon className="text-blue-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive">Supprimer</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>15/04/2023</TableCell>
                            <TableCell>11:00</TableCell>
                            <TableCell>12:30</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <XIcon className="text-red-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <CheckIcon className="text-green-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive">Supprimer</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>16/04/2023</TableCell>
                            <TableCell>13:00</TableCell>
                            <TableCell>15:00</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <CheckIcon className="text-green-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <X className="text-red-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive">Supprimer</Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>17/04/2023</TableCell>
                            <TableCell>09:30</TableCell>
                            <TableCell>11:00</TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <XIcon className="text-red-500" />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center">
                                    <UserPlusIcon className="text-blue-500" />
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
