
import Image from 'next/image';
import img from "@/public/userProfil.png"
import { useEffect, useState } from 'react';
import { User } from '@prisma/client';
import { getAllUsers } from '@/actions/user';
import { UpdateUser } from '@/components/user/UpdateUser';
import { RemoveUser } from '@/components/user/RemoveUser';
import { ChevronDown, Info } from 'lucide-react';
import { InfoUser } from '@/components/user/InfoUser';
import { Spinner } from '@/components/ui/spinner';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const UserManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userID, setUserID] = useState("");
    const [showUpdateUser, setShowUpdateUser] = useState(false);
    const [showRemoveUser, setShowRemoveUser] = useState(false);
    const [showInfoUser, setshowInfoUser] = useState(false);
    const [reload, setReload] = useState(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'pilot' | 'student' | 'user'>('all');
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleRoleFilterChange = (value: 'all' | 'admin' | 'pilot' | 'student' | 'user') => {
        setRoleFilter(value);
    };

    const sortUser = (
        users: User[],
        roleFilter: 'all' | 'admin' | 'pilot' | 'student' | 'user',
        searchQuery: string
    ) => {
        let filteredUsers = users;

        // Filter by rol
        if (roleFilter === 'admin') {
            filteredUsers = filteredUsers.filter((user) => user.role === 'ADMIN');
        } else if (roleFilter === 'pilot') {
            filteredUsers = filteredUsers.filter((user) => user.role === 'PILOTE');
        } else if (roleFilter === 'student') {
            filteredUsers = filteredUsers.filter((user) => user.role === 'ELEVE');
        } else if (roleFilter === 'user') {
            filteredUsers = filteredUsers.filter((user) => user.role === 'USER');
        }

        // Filter by firstname and lastname
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredUsers = filteredUsers.filter(
                (user) =>
                    user.firstName?.toLowerCase().includes(query) ||
                    user.name?.toLowerCase().includes(query)
            );
        }

        return filteredUsers;
    };

    const sortedUsers = sortUser(users || [], roleFilter, searchQuery);


    return (
        <div className='w-full flex flex-col items-center space-y-8 md:divide-y md:divide-gray-200 md:dark:divide-gray-800 md:pt-8 '>
            <div>
                <h1 className="text-2xl font-bold">Liste des Utilisateurs</h1>
            </div>

            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center w-2/3">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="p-2 rounded-lg w-full md:w-1/3 mr-10 bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="rounded-md bg-white text-gray-500 hover:bg-slate-200">
                                    <div className='flex w-full space-x-2'>
                                        {roleFilter === 'all' && 'Filtre'}
                                        {roleFilter === 'admin' && 'Admin'}
                                        {roleFilter === 'pilot' && 'Pilote'}
                                        {roleFilter === 'student' && 'Élève'}
                                        {roleFilter === 'user' && 'User'}
                                        <ChevronDown className='w-4 ml-4' />
                                    </div>
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
                                {sortedUsers.map((user, index) => (
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
        </div>

    );
};

export default UserManagement;