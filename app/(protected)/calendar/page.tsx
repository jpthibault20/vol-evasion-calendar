"use client"

import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

import { RoleGate } from '@/components/auth/role-gate';
import { UserRole } from '@prisma/client';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';

const Calendar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="w-full flex flex-col items-center">

      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4 text-center">Calendrier</h1>
        {/* <Calendar /> */}
      </div>

      <RoleGate allowedRole={UserRole.PILOTE}>
        <button
          onClick={toggleForm}
          className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full"
        >
          <PlusIcon size={24} />
        </button>

        {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <AppointmentForm setShowForm={setShowForm} showForm={showForm}/>
        </div>
      )}
      </RoleGate>

    </div>

  );
};

export default Calendar;