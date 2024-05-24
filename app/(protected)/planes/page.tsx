import { RoleGate } from '@/components/auth/role-gate'
import React from 'react'

const planes = () => {
  return (
    <div>
      <RoleGate allowedRole={'PILOTE'} noAccesPage={true}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-center">
            Page indisponible pour le moment
          </p>
        </div>
      </RoleGate>
    </div>
  )
}

export default planes
