import { LogoutButton } from '@/components/auth/logout-button'
import { Card } from '@/components/ui/card'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Card className='space-y-6 text-center bg-[#ffffff] p-6 border-none'>
        <h1>
          homePage
        </h1>
        <LogoutButton>
          logOut
        </LogoutButton>
      </Card>
    </div>
    
  )
}

export default HomePage
