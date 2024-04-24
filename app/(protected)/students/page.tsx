"use client"

import UsersComputer from "@/components/user/UsersComputer";
import { UsersPhone } from "@/components/user/UsersPhone";

const Students = () => {


  return (
    <>
      <div className="md:hidden">
        <h1 className="text-xl font-bold my-4 text-center ">Liste des utilisateurs</h1>
        <UsersPhone />
      </div>


      <div className="hidden md:block mt-10">
        <UsersComputer />
      </div>
    </>
  );
};

export default Students;
