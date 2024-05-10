
import Image from 'next/image';
import img from "@/public/userProfil.png"
import { useEffect, useState } from 'react';
import { Address, User } from '@prisma/client';
import { getAllAdress, getAllUsers } from '@/actions/user';
import { UpdateUser } from './UpdateUser';
import { RemoveUser } from './RemoveUser';
import { Info } from 'lucide-react';
import { InfoUser } from './InfoUser';
import { Spinner } from '../ui/spinner';

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userID, setUserID] = useState("");
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showRemoveUser, setShowRemoveUser] = useState(false);
    const [showInfoUser, setshowInfoUser] = useState(false);
    const [reload, setReload] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const updateRole = (ID: string) => {
        setUserID(ID);
        setShowUpdateUser(true);
    }

    const deleteUser = (ID: string) => {
        setUserID(ID);
        setShowRemoveUser(true);
    }

    const infoUser = (ID: string) => {
        setUserID(ID);
        setShowUpdateUser(true);
    }

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


    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold">Liste des Utilisateurs</h1>

                <div className="flex items-center">
                    <input type="text" placeholder="Search..." className="p-2 rounded-lg w-full md:w-2/3 mr-10" />
                    <select className="p-2 rounded-lg">
                        <option value="">Filtre</option>
                        <option value="admin">Admin</option>
                        <option value="pilot">Pilot</option>
                        <option value="student">Student</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>
            {isLoading ? (
                <Spinner>Chargement</Spinner>
            ) : (
<div className="bg-white shadow-md rounded my-6">
                <table className="text-left w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Nom</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Info</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Role </th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-grey-lighter">
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <div className="flex items-center">
                                        <Image
                                            src={img}
                                            alt='avatar'
                                            className='rounded-full w-14 h-14 mr-2' />

                                        <div>
                                            <p className='font-medium'>{user.firstName} {user.name}</p>
                                            <p className="text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <button onClick={() => infoUser(user.id)}>
                                        <Info />
                                    </button>
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <span key={index} className="py-1 px-3 rounded-full text-xs">{user.role}</span>
                                </td>
                                <td className="py-4 px-6 border-b border-grey-light">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-xs mr-4" onClick={() => updateRole(user.id)}>Modifer</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-xs" onClick={() => deleteUser(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
            
            <div className="flex justify-between items-center py-4">
                <span>Total Users : {users.length}</span>
            </div>

            <UpdateUser ID={userID} show={showUpdateUser} setShow={setShowUpdateUser} setReload={setReload} reload={reload} />

            <RemoveUser ID={userID} show={showRemoveUser} setShow={setShowRemoveUser} setReload={setReload} reload={reload} />

            <InfoUser ID={userID} show={showInfoUser} setShow={setshowInfoUser} />
        </div>
    );
};

export default UserManagement;