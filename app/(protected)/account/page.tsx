"use client"

import { useCurrentUser } from '@/hooks/use-current-user';


const Account = () => {
  const user = useCurrentUser();
  
  return (
    <div className='h-screen w-screen text-center place-content-center'>
      role : {user?.role}
    </div>
  )
}

export default Account
