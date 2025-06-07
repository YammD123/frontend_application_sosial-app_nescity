import Headerhome from '@/components/header-home'
import { profileLoader } from '@/loaders/profile-loader'
import React from 'react'

export default async function page() {
  const profileMe = await profileLoader()
  return (
    <div className='text-center  flex items-center justify-center'>
      <div className=' flex justify-center w-1/2'>
      <Headerhome 
        profile={profileMe}
      />
      </div>
    </div>
  )
}
