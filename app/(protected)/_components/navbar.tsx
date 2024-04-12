"use client";

import { usePathname } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div>
      <LogoutButton>
        logOut
      </LogoutButton>
    </div>
  );
};
