"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye } from 'lucide-react';
import { useState, useTransition } from 'react';
import { Address, User } from '@prisma/client';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { updateUserAction } from '@/actions/updateUser';
import { toast } from 'sonner';

interface UserProfileProps {
  user: User | null,
  adress: Address | null,
  reload: boolean,
  setReload: (load: boolean) => void,
}
export const UserProfile = ({ user, adress, reload, setReload }: UserProfileProps) => {
  const [visibilityPassword, setVisibilityPassword] = useState("password");
  const [visibilityPasswordValidation, setVisibilityPasswordValidation] = useState("password");
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();



  const onClickVisibilityPassword = () => {
    if (visibilityPassword == "password") setVisibilityPassword("text");
    else setVisibilityPassword("password");
  }
  const onClickVisibilityValidationPassword = () => {
    if (visibilityPasswordValidation == "password") setVisibilityPasswordValidation("text");
    else setVisibilityPasswordValidation("password");
  }

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
                onClick: () => console.log("Undo"),
              },
            })
          }
          if (data.error) {
            setError(data.error);
            toast("Oups, il y a eu un problème !", {
              action: {
                label: "X",
                onClick: () => console.log("Undo"),
              },
            })
          }
        })
        .catch(() => setError("Une erreur est survenue"))
        .finally(() => setReload(!reload))
    });
  };

  return (

    <form className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8" onSubmit={handleSubmit}>
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Profile</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Vos informations personel
          </p>
        </div>
        <div className="space-y-6 pt-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* <div className="sm:col-span-3 w-full">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="photo">
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={img}
                    alt='avatar'
                    className='h-full w-full object-cover'
                    height={48}
                    style={{
                      aspectRatio: "48/48",
                      objectFit: "cover",
                    }}
                    width={48} />
                </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="ml-5" variant="outline">
                      Upload Photo
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Upload Profile Photo</DialogTitle>
                      <DialogDescription>Choose a new profile photo to upload.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 items-center gap-4">
                        <Input name='picture' type="file" />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div> */}

            <div className='sm:col-span-6 flex gap-4'>
              <div className="sm:col-span-3">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="first-name">
                  Prenom
                </label>
                <div className="mt-1">
                  <Input
                    name='Prenom'
                    placeholder='Prenom'
                    defaultValue={user?.firstName || ""}
                    disabled={isPending}
                    className='bg-white'
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="last-name">
                  Nom
                </label>
                <div className="mt-1">
                  <Input
                    name='name'
                    placeholder='Nom'
                    defaultValue={user?.name || ""}
                    disabled={isPending}
                    className='bg-white'
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="email">
                Mail
              </label>
              <div className="mt-1">
                <Input
                  name='email'
                  placeholder='Mail'
                  defaultValue={user?.email || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="phone">
                Téléphone
              </label>
              <div className="mt-1">
                <Input
                  name='phone'
                  placeholder='Téléphone'
                  defaultValue={user?.phone || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="address">
                Addresse
              </label>
              <div className="mt-1">
                <Input
                  name='adress'
                  placeholder='Adresse'
                  defaultValue={adress?.adress || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="city">
                Ville
              </label>
              <div className="mt-1">
                <Input
                  name='adressCity'
                  placeholder='Ville'
                  defaultValue={adress?.city || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="zip">
                Code postale
              </label>
              <div className="mt-1">
                <Input
                  name='adressZipCode'
                  placeholder='Code postale'
                  defaultValue={adress?.zipCode || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="country">
                Pays
              </label>
              <div className="mt-1">
                <Input
                  name='adressCountry'
                  placeholder='Pays'
                  defaultValue={adress?.country || ""}
                  disabled={isPending}
                  className='bg-white'
                />
              </div>
            </div>
            <div className="sm:col-span-3 sm:col-start-1 flex items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300" htmlFor="password">
                  Mot de passe
                </label>
                <div className="mt-1 relative">
                  <Input
                    name='password'
                    placeholder='******'
                    disabled={isPending}
                    type={visibilityPassword}
                    className='bg-white'
                  />
                  <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={onClickVisibilityPassword}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-bold text-gray-700 dark:text-gray-300"
                  htmlFor="confirm-password"
                >
                  Confirmation
                </label>
                <div className="mt-1 relative">
                  <Input
                    name='passwordConfirmation'
                    placeholder='******'
                    disabled={isPending}
                    type={visibilityPassword}
                    className='bg-white'
                  />
                  <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button" onClick={onClickVisibilityValidationPassword}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </div>
      </div>
    </form>
  )
};