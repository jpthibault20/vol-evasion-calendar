"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plane, User, LogOut, ChevronsRight, ChevronsLeft, GraduationCap, BetweenHorizontalEnd } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`${isOpen ? 'w-64' : 'w-20'} duration:300`}></div>
      <div className="bg-[#252525] fixed h-full text-white grid grid-col-1 content-between">
        <div className={`${isOpen ? 'w-64' : 'w-20'} duration-300`}>
          <div className="flex justify-center items-center py-4 px-4">
            {isOpen && (
              <div className='w-60'>
                <h1 className="text-xl font-bold ">vol-evasion</h1>
                <h2 className='font-bold'>Calendar</h2>
              </div>
            )}
            <button onClick={toggleSidebar} className=''>
              {isOpen ? (
                <ChevronsLeft className="w-6 h-6" />
              ) : (
                <ChevronsRight className="w-6 h-6" />
              )}

            </button>
          </div>

          <nav>
            <ul>
              <li>
                <Link href="/calendar">
                  <div className={`mt-2 flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                    <Calendar className="w-6 h-6" />
                    {isOpen && <span className="ml-2">Calendrier</span>}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/appointments">
                  <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                    <BetweenHorizontalEnd className="w-6 h-6" />
                    {isOpen && <span className="ml-2">Mes vols</span>}
                  </div>
                </Link>
              </li>
              <RoleGate allowedRole={UserRole.PILOTE}>
                <li>
                  <Link href="/planes">
                    <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                      <Plane className="w-6 h-6" />
                      {isOpen && <span className="ml-2">Avions</span>}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/students">
                    <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                      <GraduationCap className="w-6 h-6" />
                      {isOpen && <span className="ml-2">Élèves</span>}
                    </div>
                  </Link>
                </li>
              </RoleGate>
              <li>
                <Link href="/account">
                  <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                    <User className="w-6 h-6" />
                    {isOpen && <span className="ml-2">Mon compte</span>}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='mb-4'>
          <LogoutButton>
            <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
              <LogOut className="w-6 h-6" />
              {isOpen && <span className="ml-2">Déconnexion</span>}
            </div>
          </LogoutButton>
        </div>
      </div>
    </div>

  );
};