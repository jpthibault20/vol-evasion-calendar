
import { useEffect, useState } from "react"
import { CardWrapper } from "@/components/CardWrapper"
import { Button } from "@/components/ui/button"

import { User } from "@prisma/client"
import { getUserById, removeUserById } from "@/actions/user"



interface UpdateUserProps {
    ID: string
    show: boolean
    setShow: (load: boolean) => void
    reload: boolean
    setReload: (load: boolean) => void
}

export const RemoveUser = ({ show, setShow, ID, reload, setReload }: UpdateUserProps) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserById(ID)
            setUser(userData)
        }
        if (show) {
            fetchUser();
        }
    }, [ID, show])

    const deletUser = () => {
        removeUserById(user!.id)
            .then((data) => {
                setReload(!reload)
                setShow(false)
            })
    }

    if (show) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <CardWrapper headerLabel={`Supprimer définitivement ${user?.firstName} ${user?.name}`} setShowForm={setShow} showForm={show}>
                    <div className="flex w-full justify-between px-10 mt-10">
                        <Button className="" onClick={() => setShow(false)}>
                            Annuler
                        </Button>

                        <Button className="bg-red-500" onClick={deletUser}>
                            Supprimer
                        </Button>
                    </div>

                </CardWrapper>
            </div>
        )
    };

    return null;
}

