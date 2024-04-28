"use client"

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import img from "@/public/userProfil.png"
import Image from 'next/image';
import { Eye } from 'lucide-react';
import { useState } from 'react';


const Account = () => {
  const [visibilityPassword, setVisibilityPassword] = useState("password");
  const [visibilityPasswordValidation, setVisibilityPasswordValidation] = useState("password");
  const user = useCurrentUser();

  const onClickVisibilityPassword = () => {
    if (visibilityPassword == "password") setVisibilityPassword("text");
    else setVisibilityPassword("password");
  }
  const onClickVisibilityValidationPassword = () => {
    if (visibilityPasswordValidation == "password") setVisibilityPasswordValidation("text");
    else setVisibilityPasswordValidation("password");
  }

  return (

    <div className="mx-auto max-w-3xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="space-y-8 divide-y divide-gray-200 dark:divide-gray-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Profile</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
        <div className="space-y-6 pt-8">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3 w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="photo">
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
                        <Input id="photo-upload" type="file" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Upload</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className='sm:col-span-6 flex gap-4'>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="first-name">
                  First name
                </label>
                <div className="mt-1">
                  <Input defaultValue="John" id="first-name" type="text" className='bg-white' />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="last-name">
                  Last name
                </label>
                <div className="mt-1">
                  <Input defaultValue="Doe" id="last-name" type="text" className='bg-white' />
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                Email address
              </label>
              <div className="mt-1">
                <Input defaultValue="john.doe@example.com" id="email" type="email" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
                Phone
              </label>
              <div className="mt-1">
                <Input defaultValue="+1 (555) 987-6543" id="phone" type="tel" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="country">
                Country
              </label>
              <div className="mt-1">
                <Input defaultValue="United States" id="country" type="text" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="city">
                City
              </label>
              <div className="mt-1">
                <Input defaultValue="New York" id="city" type="text" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="address">
                Address
              </label>
              <div className="mt-1">
                <Input defaultValue="123 Main St" id="address" type="text" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="zip">
                Zip Code
              </label>
              <div className="mt-1">
                <Input defaultValue="10001" id="zip" type="text" className='bg-white' />
              </div>
            </div>
            <div className="sm:col-span-3 sm:col-start-1 flex items-center gap-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Input id="password" type={visibilityPassword} className='bg-white' />
                  <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" onClick={onClickVisibilityPassword}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Input id="validationPassword" type={visibilityPasswordValidation} className='bg-white' />
                  <Button className="absolute bottom-1 right-1 h-7 w-7" size="icon" variant="ghost" onClick={onClickVisibilityValidationPassword}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
