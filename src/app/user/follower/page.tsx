import React from 'react'

interface Props {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({searchParams}: Props) {
  const {page} = await searchParams
  return (
    <div>
      <p>ini page user follower {page}</p>
    </div>
  )
}
