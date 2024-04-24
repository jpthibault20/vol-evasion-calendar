
import Image from 'next/image';
import img from "@/public/userProfil.png"
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { getAllUsers } from '@/actions/user';

const tableData = [
    {
        name: 'Yeray Rosales',
        email: 'name@email.com',
        roles: ['Manager', 'Admin', 'Auditor']
    }
];

const UserManagement = () => {
    const [users, setUsers] = useState<User | null>(null);

    useEffect(() => {
        const dataUsers = getAllUsers()
        console.log(dataUsers)

    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Liste des Utilisateurs</h1>
            </div>
            <div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nom</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Role </th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((user, index) => (
                            <tr key={index} className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="mr-2" />
                                        <Image
                                            src={img}
                                            alt='avatar'
                                            className='rounded-full w-8 h-8 mr-2' />
                                        <div>
                                            <p>{user.name}</p>
                                            <p className="text-grey-dark">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    {user.roles.map((role, index) => (
                                        <span key={index} className={`bg-${role.toLowerCase()}-200 text-${role.toLowerCase()}-700 py-1 px-3 rounded-full text-xs`}>{role}</span>
                                    ))}
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs">Modify Roles</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-xs">Remove User</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center py-4">
                <span>Showing {tableData.length} of 56 total Users</span>
                <div className="inline-flex">
                    <button className={`text-sm bg-grey-lighter py-2 px-4 font-bold rounded-l cursor-not-allowed`}>First</button>
                    <button className={`text-sm bg-grey-lighter py-2 px-4 font-bold cursor-not-allowed`}>10</button>
                    <button className="text-sm bg-grey-lighter py-2 px-4 font-bold">11</button>
                    <button className={`text-sm bg-grey-lighter py-2 px-4 font-bold rounded-r`}>Last</button>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;