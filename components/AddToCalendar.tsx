"use client"

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AppointmentForm } from "./appointment/AppointmentForm";

interface AddToCalendarProps {
    setReload: (reload: boolean) => void;
    reload: boolean;
}
export const AddToCalendar = ({setReload, reload}: AddToCalendarProps) => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
      };


    return (
        <div>
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <AppointmentForm setShowForm={setShowForm} showForm={showForm} setReload={setReload} reload={reload} />
                </div>
              )}
              
            <button
            onClick={toggleForm}
                className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full"
            >
                <PlusIcon size={24} />
            </button>
        </div>
    )
};
