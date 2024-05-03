"use client"

import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { Appointment, User } from '@prisma/client'
import { currentUser } from '@/lib/auth'
import { useCurrentUser } from '@/hooks/use-current-user'

interface bookingProps {
  appointment: Appointment | null
  pilote: User | null
}
export const Booking = ({ appointment, pilote }: bookingProps) => {

  const user = useCurrentUser();
  const formattedDateStart = appointment?.startDate?.toLocaleString('fr-FR');
  const formattedDateEnd = appointment?.endDate?.toLocaleString('fr-FR');


  return (
    <div>
      <div className="mx-auto max-w-md space-y-6 py-4">
        <div className="space-y-4">
          <p className="text-gray-700 font-semibold">Information sur votre vol</p>
          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom du pilot</Label>
              <Input value={pilote?.firstName || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom du pilot</Label>
              <Input value={pilote?.name || ""} readOnly />
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début</Label>
              <Input value={formattedDateStart} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin</Label>
              <Input value={formattedDateEnd} readOnly />
            </div>
          </div>
          <p className="text-gray-700 font-semibold pt-6">Coisisez le type de votre vol</p>
          <div className="space-y-2">
            <Label htmlFor="type">Type de vol</Label>
            <Select>
              <SelectTrigger id="type">
                <SelectValue placeholder="Choisissez un type de vol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bapteme">Baptême de l&apos;air</SelectItem>
                <SelectItem value="cours">Cours de pilotage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  )
}