import { localDate } from '@/common/helpers/local-date'
import { Card, CardContent } from '@/common/shadcn/card'
import Image from 'next/image'
import React from 'react'

interface Props {
    postAll:{
        id:string
        caption:string
        created_at:string
        user:{
            profile:{
                name:string
                avatar_image:string
            }
        }
    }[]
}

export default function ContentHome({postAll}:Props) {
  return (
    <>
    {postAll.map((post)=>(
        <Card key={post.id}>
            <CardContent>
                <div>
                    <div className='flex items-center gap-2'>
                        <Image 
                            src={post.user.profile.avatar_image}
                            width={40}
                            height={40}
                            alt='avatar'
                            className='rounded-full '
                        />
                        <div className='flex items-start flex-col'>
                            <h3 className='text-lg'>{post.user.profile.name}</h3>
                            <p className='text-xs text-muted-foreground'>{localDate(post.created_at)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    ))}
    </>
  )
}
