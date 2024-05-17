"use client"

import React, { startTransition, useState, useTransition } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Appointment, User, appointmentType } from '@prisma/client'
import { useCurrentUser } from '@/hooks/use-current-user'
import { bookAppointment } from '@/actions/appointment'
import { FormSuccess } from '../form-success'
import { FormError } from '../form-error'
import { toast } from 'sonner'

interface bookingProps {
  appointment: Appointment | null,
  pilote: User | null,
  reload: boolean,
  setReload: (load: boolean) => void,
  setViewInfo: (load: boolean) => void,
}
export const Booking = ({ appointment, pilote, reload, setReload, setViewInfo }: bookingProps) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  let availbleAppointment = true;
  const user = useCurrentUser();

  const currentDate = new Date();
  if (appointment?.endDate && currentDate > appointment?.endDate || appointment?.studentID != null) {
    availbleAppointment= false;
  }

  const formattedDateStart = appointment?.startDate?.toLocaleString('fr-FR');
  const formattedDateEnd = appointment?.endDate?.toLocaleString('fr-FR');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(event.currentTarget);
    const flightType = formData.get('type');

    startTransition(() => {
      if (appointment?.id && user?.id) {
        bookAppointment(appointment.id, user.id, flightType as appointmentType)
          .then((data) => {
            if (data.success) {
              setSuccess(data.success);
              toast(success || "Réservation réussie !", {
                action: {
                  label: "X",
                  onClick: () => console.log("Undo"),
                },
              });
              setReload(!reload);
              setViewInfo(false);
            }
            if (data.error) {
              setError(data.error);
            }
          })
          .catch((err) => {
            setError("Une erreur est survenue");
            console.log(err);
          })
          .finally(() => {

          })
      }
    })



  };


  return (
    <div>
      <div className="mx-auto max-w-md space-y-6 py-4">
        <div className="space-y-4">
          <p className="text-gray-700 font-semibold">Information sur votre vol</p>
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom du pilot</Label>
              <Input value={pilote?.firstName || ""} readOnly disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom du pilot</Label>
              <Input value={pilote?.name || ""} readOnly disabled={isPending} />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input value={formattedDateStart} readOnly disabled={isPending} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input value={formattedDateEnd} readOnly disabled={isPending} />
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <p className="text-gray-700 font-semibold pt-6">Coisisez le type de votre vol</p>
            <div className="space-y-2">
              <Label htmlFor="type">Type de vol</Label>
              <Select
                name="type"
                disabled={isPending}
              >
                <SelectTrigger >
                  <SelectValue placeholder="Choisissez un type de vol" />
                </SelectTrigger>
                <SelectContent>
                  {appointment?.type == "COURS" ? (
                    <SelectItem value="COURS">Cours de pilotage</SelectItem>
                  ) : appointment?.type == "BAPTEME" ? (
                    <SelectItem value="BAPTEME">Baptême de l&apos;air</SelectItem>
                  ) : (
                    <>
                      <SelectItem value="COURS">Cours de pilotage</SelectItem>
                      <SelectItem value="BAPTEME">Baptême de l&apos;air</SelectItem>
                    </>
                  )}


                </SelectContent>
              </Select>
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            {availbleAppointment ? (

                <Button
                  className="w-full"
                  type="submit"
                  disabled={isPending}
                >
                  Réserver
                </Button>
            ) : (
            <div>
              <p className='text-center font-semibold text-gray-700'>
                vol Indisponible
              </p>
            </div>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}