"use client"

import { useEffect, useState, useTransition } from "react"
import { CardWrapper } from "@/components/CardWrapper"
import { getAdressById, getUserById } from "@/actions/user"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { updateUser } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Address, User, UserRole } from "@prisma/client"
import { Input } from "@/components/ui/input"
import { Spinner } from '@/components/ui/spinner';
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UpdateUserProps {
    ID: string
    show: boolean
    setShow: (load: boolean) => void
}

export const UpdateUser = ({ show, setShow, ID }: UpdateUserProps) => {
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
    }, [ID]);


    const form = useForm<z.infer<typeof updateUser>>({
        resolver: zodResolver(updateUser),
        defaultValues: {
            firstName: user?.firstName || undefined,
            name: user?.name || undefined,
            email: user?.email || undefined,
            phone: user?.phone || undefined,
            role: user?.role,
            adressNumber: adress?.number || undefined,
            adressStreet: adress?.street || undefined,
            adressCity: adress?.city || undefined,
            adressZipCode: adress?.zipCode || undefined,
            adressCountry: adress?.country || undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof updateUser>) => {
        console.log(values);
    }

    if (show) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <CardWrapper headerLabel={"Modifier un utilisateur"} setShowForm={setShow} showForm={show}>
                    {!isLoading ? (
                        <Form {...form}>
                            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="Doe"
                                                        defaultValue={user?.name || ""}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prenom</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="John"
                                                        defaultValue={user?.firstName || ""}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mail</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="John@Doe.com"
                                                        defaultValue={user?.email || ""}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Téléphone</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="06xxxxxxxx"
                                                        defaultValue={user?.phone || ""}
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div>
                                        <div className="flex">
                                            <FormField
                                                control={form.control}
                                                name="adressNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Numéro</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="19"
                                                                defaultValue={adress?.number || ""}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="adressStreet"
                                                render={({ field }) => (
                                                    <FormItem className="ml-6">
                                                        <FormLabel>Nom de rue, place, ...</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="rue des jardins"
                                                                defaultValue={adress?.street || ""}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="flex">
                                            <FormField
                                                control={form.control}
                                                name="adressCity"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Ville</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="Metz"
                                                                defaultValue={adress?.city || ""}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="adressZipCode"
                                                render={({ field }) => (
                                                    <FormItem className="ml-6">
                                                        <FormLabel>Code postale</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                placeholder="57000"
                                                                defaultValue={adress?.zipCode || ""}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="adressCountry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pays</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="France"
                                                            defaultValue={adress?.country || ""}
                                                            disabled={isPending}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <Select
                                                    disabled={isPending}
                                                    onValueChange={field.onChange}
                                                    defaultValue={user?.role}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a role"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value={UserRole.ADMIN}>
                                                            Admin
                                                        </SelectItem>
                                                        <SelectItem value={UserRole.PILOTE}>
                                                            Pilote
                                                        </SelectItem>
                                                        <SelectItem value={UserRole.ELEVE}>
                                                            Eleve
                                                        </SelectItem>
                                                        <SelectItem value={UserRole.USER}>
                                                            User
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <FormError message={error} />
                                <FormSuccess message={success} />
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                >
                                    Enregistrer
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Spinner>Loading...</Spinner>
                    )}

                </CardWrapper>
            </div>

        );
    };

    return null;
}

