"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/lib/auth";
import { useState } from "react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
  noAccesPage?: boolean;
};

export const RoleGate = ({ children, allowedRole, noAccesPage}: RoleGateProps) => {
  const role = useCurrentRole()

  switch (allowedRole) {
    case UserRole.USER:
      if (role === UserRole.USER || role === UserRole.ELEVE || role === UserRole.PILOTE || role === UserRole.ADMIN) {
        return ( <>{children}</>)
      }
      break;
    case UserRole.ELEVE:
      if (role === UserRole.ELEVE || role === UserRole.PILOTE || role === UserRole.ADMIN) {
        return ( <>{children}</>)
      }
      break;
    case UserRole.PILOTE:
      if (role === UserRole.PILOTE || role === UserRole.ADMIN) {
        return ( <>{children}</>)
      }
      break;
    case UserRole.ADMIN:
      if (role === UserRole.ADMIN) {
        return ( <>{children}</>)
      }
      break;
  
    default:
      break;
  }
  
  if (role !== allowedRole) {
    if (noAccesPage == true) {
      return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-center">
                Vous n&apos;êtes pas autorisé à accéder à cette page...
            </p>
        </div>
      )
    }
    return 
  }
};
