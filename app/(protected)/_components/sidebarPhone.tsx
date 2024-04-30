"use client"

import React, { useState } from 'react';
import { PageIcon } from '@/components/pageIcon';
import { Calendar, GraduationCap, LogOut, Menu, Plane, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RoleGate } from '@/components/auth/role-gate';
import { UserRole } from '@prisma/client';
import { LogoutButton } from '@/components/auth/logout-button';

export const SidebarPhone = () => {
    const location = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="relative">
            <div className="h-14 border-b border-gray-300">
                <div className="flex h-full justify-between mx-4">
                    <div className="flex items-center w-full">
                        <PageIcon location={location} />
                    </div>
                    <div className="flex items-center">
                        <button onClick={() => setShowSidebar(!showSidebar)}>
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 z-10 ${showSidebar ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Contenu de la sidebar */}
                <div className="p-4">
                    <div>
                        <nav>
                            <ul>
                                <li>
                                    <Link href="/calendar" onClick={() => setShowSidebar(!showSidebar)}>
                                        <div className={`mt-2 flex items-center p-2 rounded-md hover:bg-gray-100 justify-start`}>
                                            <Calendar className="w-6 h-6" />
                                            <span className="ml-2">Calendrier</span>
                                        </div>
                                    </Link>
                                </li>
                                <RoleGate allowedRole={UserRole.PILOTE}>
                                    <li>
                                        <Link href="/planes" onClick={() => setShowSidebar(!showSidebar)}>
                                            <div className={`flex items-center p-2 rounded-md hover:bg-gray-100 justify-start`}>
                                                <Plane className="w-6 h-6" />
                                                <span className="ml-2">Avions</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/students" onClick={() => setShowSidebar(!showSidebar)}>
                                            <div className={`flex items-center p-2 rounded-md hover:bg-gray-100 justify-start`}>
                                                <GraduationCap className="w-6 h-6" />
                                                <span className="ml-2">Élèves</span>
                                            </div>
                                        </Link>
                                    </li>
                                </RoleGate>
                                <li>
                                    <Link href="/account" onClick={() => setShowSidebar(!showSidebar)}>
                                        <div className={`flex items-center p-2 rounded-md hover:bg-gray-100 justify-start`}>
                                            <User className="w-6 h-6" />
                                            <span className="ml-2">Mon compte</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* Ajout de styles pour centrer la div LogoutButton en bas de la page */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-start">
                        <LogoutButton>
                            <div className={`inline-flex items-center p-2 rounded-md hover:bg-gray-100 justify-start`}>
                                <LogOut className="w-6 h-6" />
                                <span className="ml-2">Logout</span>
                            </div>
                        </LogoutButton>
                    </div>
                </div>
            </div>

            {/* Overlay lorsque la sidebar est ouverte */}
            {showSidebar && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-9"
                    onClick={() => setShowSidebar(false)}
                />
            )}
        </div>
    );
};
