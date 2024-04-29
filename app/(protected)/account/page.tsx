"use client"

import { getAdressById, getUserById } from "@/actions/user";
import { Spinner } from "@/components/ui/spinner";
import { UserProfile } from "@/components/user/UserProfile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Address, User } from "@prisma/client";
import { useEffect, useState } from "react";

const Account = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [adress, setAdress] = useState<Address | null>(null);
  const [reload, setReload] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserById(currentUser?.id as string);
        setUser(userData);

        if (user?.addressId) {
          const userAdress = await getAdressById(user.addressId);
          setAdress(userAdress);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (currentUser?.id) {
      fetchData();
    }
  }, [currentUser?.id, user?.addressId, reload])

  return (
    <div>
      {isLoading ? (
        <div className="flex h-screen justify-center items-center">
          <Spinner className="text-center">Chargement...</Spinner>
        </div>
      ) : (
        <UserProfile user={user} adress={adress} reload={reload} setReload={setReload}/>
      )}
    </div>
    
    
  )
};

export default Account
