
import { useEffect, useState } from "react"
import { CardWrapper } from "@/components/CardWrapper"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { getUserById, removeUserById } from "@/actions/user"
import { Spinner } from "../ui/spinner"



interface UpdateUserProps {
    ID: string
    show: boolean
    setShow: (load: boolean) => void
    reload: boolean
    setReload: (load: boolean) => void
}

export const RemoveUser = ({ show, setShow, ID, reload, setReload }: UpdateUserProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getUserById(ID)
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.log("Une erreur es survenue : ", error);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [ID, show])

    const deletUser = () => {
        removeUserById(user!.id)
            .finally(() => {
                setReload(!reload)
                setShow(false)
            })
    }

    if (show) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <CardWrapper headerLabel={`Supprimer définitivement`} setShowForm={setShow} showForm={show}>
                    {!isLoading ? (
                        <div>
                            <h3 className="text-center">
                                {user?.firstName} {user?.name}
                            </h3>
                            <p className="text-center">{user?.email}</p>
                            <div className="flex w-full justify-between px-10 mt-10">
                                <Button className="" onClick={() => setShow(false)}>
                                    Annuler
                                </Button>

                                <Button className="bg-red-500" onClick={deletUser}>
                                    Supprimer
                                </Button>
                            </div>
                        </div>

                    ) : (
                        <Spinner>Cargement ... </Spinner>
                    )}


                </CardWrapper>
            </div>
        )
    };

    return null;
}

