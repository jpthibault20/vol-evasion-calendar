"use client"

import { useEffect, useState } from "react"
import { CardWrapper } from "../CardWrapper"
import { getUserById } from "@/actions/user"
import { User, UserRole } from "@prisma/client"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface UpdateUserProps {
    ID: string
    show: boolean
    setShow: (load: boolean) => void
}

export const UpdateUser = ({ show, setShow, ID }: UpdateUserProps) => {
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



    if (show) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <CardWrapper headerLabel={"Modifier un utilisateur"} setShowForm={setShow} showForm={show}>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder={user?.email || "Entrez votre email"} type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Téléphone</Label>
                            <Input id="phone" placeholder={user?.phone ||"Entrez votre numéro de téléphone"} type="tel" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="address-number">Numéro</Label>
                                <Input id="address-number" placeholder={user?.addressId || "Entrez le numéro"} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address-street">Rue</Label>
                                <Input id="address-street" placeholder="Entrez la rue" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="address-zip">Code postal</Label>
                                <Input id="address-zip" placeholder="Entrez le code postal" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address-city">Ville</Label>
                                <Input id="address-city" placeholder="Entrez la ville" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address-country">Pays</Label>
                            <Select >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un pays" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fr">France</SelectItem>
                                    <SelectItem value="Lu">Luxembourg</SelectItem>
                                    <SelectItem value="be">Belgique</SelectItem>
                                    <SelectItem value="De">Allemagne</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Rôle</Label>
                            <Select >
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un rôle" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrateur</SelectItem>
                                    <SelectItem value="pilote">Pilote</SelectItem>
                                    <SelectItem value="student">Elève</SelectItem>
                                    <SelectItem value="user">Utilisateur</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </CardWrapper>
            </div>

        );
    };

    return null;
}

