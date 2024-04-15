"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/form-error";
import { Divide } from "lucide-react";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const role = useCurrentRole();

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
    return null
  }
};
