import { profileLoader } from '@/loaders/profile-loader'
import React from 'react'

export default function page() {
  const profileMe = profileLoader()
  console.log(profileMe)
  return (
    <div className='text-center flex items-center justify-center'>
      <p>Home</p>
    </div>
  )
}
