"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Calendar, Plane, User, LogOut, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { logout } from '@/actions/logout';
import { LogoutButton } from '@/components/auth/logout-button';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black text-white fixed h-screen grid grid-col-1 content-between">
      <div className={`${isOpen ? 'w-64' : 'w-20'} duration-300`}>
        <div className="flex justify-center items-center py-4 px-4">
          {isOpen && (
            <span className="text-xl font-bold w-60">vol-evasion Calendar</span>)}
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
                <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                  <Calendar className="w-6 h-6" />
                  {isOpen && <span className="ml-2">Calendrier</span>}
                </div>
              </Link>
            </li>
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
                  <User className="w-6 h-6" />
                  {isOpen && <span className="ml-2">Élèves</span>}
                </div>
              </Link>
            </li>
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
            {isOpen && <span className="ml-2">Logout</span>}
          </div>
        </LogoutButton>
      </div>
    </div>
  );
};