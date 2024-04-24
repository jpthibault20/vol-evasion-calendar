"use client"

import img from "@/public/userProfil.png"
import Image from 'next/image';

export const UsersPhone = () => {

    const updateUser = () => {
        console.log("Delete User");
    };


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
                <button className="flex bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-md relative" onClick={updateUser}>
                    <Image
                        src={img}
                        alt='User Image'
                        height={60}
                        width={60}
                        className='rounded-lg'
                        priority />
                    <div className="w-full ml-6 mb-2">
                        <div className="text-lg font-semibold text-left">John Doe</div>
                        <div className="text-sm text-zinc-500 text-left">Admin</div>
                    </div>
                </button>
            </div>
        </div>
    );
};