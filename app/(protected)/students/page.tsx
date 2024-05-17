"use client"

import { RoleGate } from "@/components/auth/role-gate";
import UsersComputer from "@/components/user/UsersComputer";
import { UsersPhone } from "@/components/user/UsersPhone";

const Students = () => {


  return (
    <>
    <RoleGate allowedRole={"PILOTE"} noAccesPage={true}>
      <div className="md:hidden">
        <UsersPhone />
      </div>


      <div className="hidden md:block mt-10">
        <UsersComputer />
      </div>
    </RoleGate>
      
    </>
  );
};

export default Students;
