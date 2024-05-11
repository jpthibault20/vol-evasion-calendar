"use client"

import UsersComputer from "@/components/user/UsersComputer";
import { UsersPhone } from "@/components/user/UsersPhone";

const Students = () => {


  return (
    <>
      <div className="md:hidden">
        <UsersPhone />
      </div>


      <div className="hidden md:block mt-10">
        <UsersComputer />
      </div>
    </>
  );
};

export default Students;
