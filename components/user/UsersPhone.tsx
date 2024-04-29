"use client"

import { getAllUsers } from "@/actions/user";
import img from "@/public/userProfil.png"
import { User } from "@prisma/client";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { UpdateUser } from "./UpdateUser";
import { X } from "lucide-react";
import { RemoveUser } from "./RemoveUser";

export const UsersPhone = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [userID, setUserID] = useState("");
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showRemoveUser, setShowRemoveUser] = useState(false);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        getAllUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [reload]);

    const updateUser = (ID: string) => {
        setUserID(ID);
        setShowUpdateUser(true);
    };
    const removeUser = (ID: string) => {
        setUserID(ID);
        setShowRemoveUser(true)
    }


    return (
        <div className=" dark:bg-zinc-800 min-h-screen p-4">
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="Search..." className="p-2 rounded-lg w-full md:w-1/3 mr-10" />
                <select className="p-2 rounded-lg">
                    <option value="">Filtre</option>
                    <option value="admin">Admin</option>
                    <option value="pilot">Pilot</option>
                    <option value="student">Student</option>
                    <option value="user">User</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {users.map((user, index) => (
                    <div key={index} className="flex bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-md relative justify-between">
                        <button   onClick={() => updateUser(user.id)}>
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
                        <X className="text-red-500 top-0"/>
                    </button>
                    </div>
                    
                ))}
            </div>

            <UpdateUser ID={userID} show={showUpdateUser} setShow={setShowUpdateUser} setReload={setReload} reload={reload}/>
            <RemoveUser ID={userID} show={showRemoveUser} setShow={setShowRemoveUser} setReload={setReload} reload={reload} />
        </div>
    );
};