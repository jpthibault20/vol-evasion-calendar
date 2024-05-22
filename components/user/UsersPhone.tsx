"use client"

import { getAllUsers } from "@/actions/user";
import img from "@/public/userProfil.png"
import { User } from "@prisma/client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { UpdateUser } from "./UpdateUser";
import { X } from "lucide-react";
import { RemoveUser } from "./RemoveUser";
import { Spinner } from "../ui/spinner";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

export const UsersPhone = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [userID, setUserID] = useState("");
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showRemoveUser, setShowRemoveUser] = useState(false);
    const [reload, setReload] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'pilot' | 'student' | 'user'>('all');

    useEffect(() => {
        setIsLoading(true);
        getAllUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => setIsLoading(false))

    }, [reload]);

    const updateUser = (ID: string) => {
        setUserID(ID);
        setShowUpdateUser(true);
    };
    const removeUser = (ID: string) => {
        setUserID(ID);
        setShowRemoveUser(true)
    }

    const handleRoleFilterChange = (value: 'all' | 'admin' | 'pilot' | 'student' | 'user') => {
        setRoleFilter(value);
    };

    const sortUser = (
        users: User[],
        roleFilter: 'all' | 'admin' | 'pilot' | 'student' | 'user'
    ) => {
        let filteredStudents = users;

        if (roleFilter == 'admin') {
            filteredStudents = users.filter((user) => user.role == 'ADMIN');
        }
        if (roleFilter == 'pilot') {
            filteredStudents = users.filter((user) => user.role == 'PILOTE');
        }
        if (roleFilter == 'student') {
            filteredStudents = users.filter((user) => user.role == 'ELEVE');
        }
        if (roleFilter == 'user') {
            filteredStudents = users.filter((user) => user.role == 'USER');
        }

        return filteredStudents;
    }

    const sortedUsers = sortUser(users || [], roleFilter);

    return (
        <div className=" dark:bg-zinc-800 min-h-screen p-4">
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Search..." className="p-2 rounded-lg w-full md:w-1/3 mr-10" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="px-4 py-2 rounded-md transition-colors " variant="outline">
                            Filtre
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuCheckboxItem
                            checked={roleFilter === 'all'}
                            onCheckedChange={() => handleRoleFilterChange('all')}
                        >
                            Tous
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={roleFilter === 'admin'}
                            onCheckedChange={() => handleRoleFilterChange('admin')}
                        >
                            Admin
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={roleFilter === 'pilot'}
                            onCheckedChange={() => handleRoleFilterChange('pilot')}
                        >
                            Pilote
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={roleFilter === 'student'}
                            onCheckedChange={() => handleRoleFilterChange('student')}
                        >
                            Elève
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={roleFilter === 'user'}
                            onCheckedChange={() => handleRoleFilterChange('user')}
                        >
                            User
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {isLoading ? (
                <Spinner>Chargelment ...</Spinner>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedUsers.map((user, index) => (
                        <div key={index} className="flex bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-md  justify-between">
                            <button onClick={() => updateUser(user.id)}>
                                <Image
                                    src={img}
                                    alt='User Image'
                                    height={60}
                                    width={60}
                                    className='rounded-lg'
                                    priority />
                                <div className="w-full ml-6 mb-2">
                                    <div className="text-lg font-semibold text-left">{user.firstName} {user.name}</div>
                                    <div className="text-sm text-zinc-500 text-left">{user.role}</div>
                                </div>
                            </button>
                            <button key={index} className="flex" onClick={() => removeUser(user.id)}>
                                <X className="text-red-500 top-0" />
                            </button>
                        </div>

                    ))}
                </div>
            )}


            <UpdateUser ID={userID} show={showUpdateUser} setShow={setShowUpdateUser} setReload={setReload} reload={reload} />
            <RemoveUser ID={userID} show={showRemoveUser} setShow={setShowRemoveUser} setReload={setReload} reload={reload} />
        </div>
    );
};