import React from 'react'

interface HomeProps {
    profile: {
        name: string
        avatar_image: string
        user_name: string
    }
}

export default function Headerhome({profile}: HomeProps) {
  return (
    <div>header-home</div>
  )
}
