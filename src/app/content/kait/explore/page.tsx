import UserAllExplore from '@/components/user-all-explore'
import { userLoaderAllList } from '@/loaders/user-loader'
import React from 'react'

export default async function page() {
  const userLoaderAll = await userLoaderAllList()
  return (
    <div className='flex items-center justify-center'>
          <UserAllExplore userLoaderAll={userLoaderAll} />
    </div>
  )
}
