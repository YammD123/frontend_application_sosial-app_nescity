import { postLoaderDetail } from '@/loaders/post-loader'
import React from 'react'

export default async function page({
    params
}:{
    params:Promise<{id:string}>
}) {
    
  const {id} = await params
  const postDetail = await postLoaderDetail(id)
  console.log(postDetail);
  return (
    <div>page {id}</div>
  )
}
