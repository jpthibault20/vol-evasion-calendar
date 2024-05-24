import { RoleGate } from '@/components/auth/role-gate'
import Image from 'next/image'
import React from 'react'
import pictureBuilding from "@/public/Under construction.gif"

const planes = () => {
  return (
    <div>
      <RoleGate allowedRole={'PILOTE'} noAccesPage={true}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-center">
            <p>Cette page est en construction</p>
            <Image 
            src={pictureBuilding}
            alt='picture website in building'
            width={500}/>
          </p>
        </div>
      </RoleGate>
    </div>
  )
}

export default planes
