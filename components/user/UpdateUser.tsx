import { useEffect, useState, useTransition } from "react";
import { CardWrapper } from "@/components/CardWrapper";
import { getAdressById, getUserById } from "@/actions/user";
import { updateUserAction } from "@/actions/updateUser";
import { Address, User, UserRole } from "@prisma/client";
import { Spinner } from "@/components/ui/spinner";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UpdateUserProps {
    ID: string,
    show: boolean,
    setShow: (load: boolean) => void,
    reload: boolean,
    setReload: (load: boolean) => void,
}

export const UpdateUser = ({ show, setShow, ID, reload, setReload }: UpdateUserProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [adress, setAdress] = useState<Address | null>(null);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const userData = await getUserById(ID);
                setUser(userData);

                if (userData?.addressId) {
                    const userAdress = await getAdressById(userData.addressId);
                    setAdress(userAdress);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (ID) {

            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ID, reload]);


    useEffect(() => {
        setSuccess("");
        setError("");
    }, [show])


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        startTransition(() => {
            const formData = new FormData(event.currentTarget);
            const values: any = {};
            formData.forEach((value, key) => {
                values[key] = value;
            });

            updateUserAction(user!.id, adress!.id, values)
                .then((data) => {
                    if (data.success) {
                        setSuccess(data.success);
                        toast("Utilisateur mis à jour !", {
                            action: {
                                label: "X",
                                onClick: () => { },
                            },
                        })
                        setShow(false);
                        setReload(!reload);
                    }
                    if (data.error) {
                        setError(data.error);
                        toast("Oups, il y a eu un problème ! (code: E_008)", {
                            action: {
                                label: "X",
                                onClick: () => { },
                            },
                        })
                    }
                })
                .catch(() => setError("Une erreur est survenue"))
        });
    };

    if (show) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto pt-52 md:pt-0">
                <CardWrapper headerLabel={"Modifier un utilisateur"} setShowForm={setShow} showForm={show}>
                    {!isLoading ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label>Nom</label>
                                    <Input
                                        name="name"
                                        placeholder="Nom"
                                        defaultValue={user?.name || 'null'}
                                        disabled={isPending} />
                                </div>
                                <div>
                                    <label>Prénom</label>
                                    <Input
                                        name="Prenom"
                                        placeholder="Prenom"
                                        defaultValue={user?.firstName || ""} disabled={isPending} />
                                </div>

                                <div>
                                    <label>Email</label>
                                    <Input
                                        name="email"
                                        placeholder="Mail"
                                        defaultValue={user?.email || ""}
                                        disabled={isPending} />
                                </div>

                                <div>
                                    <label>Téléphone</label>
                                    <Input
                                        name="phone"
                                        placeholder="Tel"
                                        defaultValue={user?.phone || ""}
                                        disabled={isPending} />
                                </div>

                                <div className="space-y-4">

                                    <div>
                                        <label>Adresse</label>
                                        <Input
                                            name="adress"
                                            placeholder="Adresse"
                                            defaultValue={adress?.adress || ""}
                                            disabled={isPending} />
                                    </div>



                                    <div className="flex space-x-4">
                                        <div>
                                            <label>Ville</label>
                                            <Input
                                                name="adressCity"
                                                placeholder="Ville"
                                                defaultValue={adress?.city || ""}
                                                disabled={isPending} />
                                        </div>

                                        <div>
                                            <label>Code postale</label>
                                            <Input
                                                name="adressZipCode"
                                                placeholder="Code postale"
                                                defaultValue={adress?.zipCode || ""}
                                                disabled={isPending} />
                                        </div>



                                    </div>
                                    <div>
                                        <label>Pays</label>
                                        <Input
                                            name="adressCountry"
                                            placeholder="Pays"
                                            defaultValue={adress?.country || ""}
                                            disabled={isPending} />
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <label>Rôle</label>
                                            <select
                                                name="Role"
                                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                defaultValue={user?.role}
                                                disabled={isPending}
                                            >
                                                <option value={UserRole.ADMIN}>Administrateur</option>
                                                <option value={UserRole.PILOTE}>Pilote</option>
                                                <option value={UserRole.ELEVE}>Elève</option>
                                                <option value={UserRole.USER}>Utilisatur</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div>
                                        <div className="relative">
                                            <label>Bloquer l'utilisateur</label>

                                        </div>
                                    </div> */}


                                </div>




                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button disabled={isPending} type="submit">Enregistrer</Button>
                            </div>
                        </form>
                    ) : (
                        <Spinner>Chargement...</Spinner>
                    )}
                </CardWrapper>
            </div>
        );
    }

    return null;
};
