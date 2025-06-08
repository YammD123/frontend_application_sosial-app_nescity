import ContentHome from '@/components/content-home'
import Headerhome from '@/components/header-home'
import { postLoaderAll } from '@/loaders/post-loader'
import { profileLoader } from '@/loaders/profile-loader'
import React from 'react'

export default async function page() {
  const profileMe = await profileLoader()
  const postAll = await postLoaderAll()
  return (
    <div className='text-center  flex items-center justify-center'>
      <div className=' flex-col gap-3 flex justify-center w-2/4'>
      <Headerhome 
        profile={profileMe}
      />
      <ContentHome 
        postAll={postAll}
      />
      </div>
    </div>
  )
}
