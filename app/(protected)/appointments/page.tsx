import { RoleGate } from '@/components/auth/role-gate'
import React from 'react'

const appointments = () => {
  return (
    <div>
      <RoleGate allowedRole={'PILOTE'} noAccesPage={true}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-center">
            mes vols
          </p>
        </div>
      </RoleGate>
    </div>
  )
}

export default appointments
