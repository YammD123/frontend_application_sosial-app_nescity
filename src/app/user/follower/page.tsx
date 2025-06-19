import React from 'react'

interface Props {
   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function page({searchParams}: Props) {
  const {search} = await searchParams
  return (
    <div>
      <p>ini follower {search}</p>
    </div>
  )
}
