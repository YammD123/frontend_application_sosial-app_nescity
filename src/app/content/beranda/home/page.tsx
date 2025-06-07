import Headerhome from '@/components/header-home'
import { profileLoader } from '@/loaders/profile-loader'
import React from 'react'

export default async function page() {
  const profileMe = await profileLoader()
  return (
    <div className='text-center flex items-center justify-center'>
      <Headerhome 
        profile={profileMe}
      />
    </div>
  )
}
