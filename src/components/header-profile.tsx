"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/common/shadcn/avatar'
import { Button } from '@/common/shadcn/button'
import { Card, CardContent } from '@/common/shadcn/card'
import { ImagePlus } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props{
    profile:{
        name:string
        user_name: string
        avatar_image: string
        cover_image: string
        pendidikan:string
        pekerjaan:string
        alamat:string
        bio:string
        website:string
    }
}

export default function HeaderProfile({profile}:Props) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [preview, setPreview] = React.useState<string | null>(null);

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.click();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
    }
  return (
    <>
    <Card >
        <CardContent className='flex flex-col justify-center items-center gap-4'>
            <div>
                <div className='relative'>
                    <Image
                    src={profile.cover_image}
                    width={1000}
                    height={100}
                    alt='cover'
                    className=' z-0 rounded-sm h-96 object-cover'
                    />
                    <div className='absolute bottom-3 z-10  right-3'>
                    <Button onClick={handleClick} className='opacity-0 sm:opacity-100' variant="outline">
                        <ImagePlus size={25}/>
                        Tambahkan Banner Profil
                    </Button>
                    <Button onClick={handleClick} className='sm:opacity-0' variant="outline">
                        <ImagePlus size={25}/>
                    </Button>
                    </div>
                    <div  className='absolute bottom-3 z-10 right-3'>
                        <form>
                            <input ref={inputRef} type="file" className='hidden' name='cover_image' id='cover_image'/>
                            <Button type='submit' variant="outline">Save Banner</Button>
                        </form>
                    </div>
                    <div className='absolute w-full flex bottom-1 left-3'>
                        <Avatar className='w-40 h-40' >
                            <AvatarImage className='object-cover' src={profile.avatar_image} />
                            <AvatarFallback>SS</AvatarFallback>
                        </Avatar>
                        <div className='w-fit mt-3'>
                            <h1 className='text-2xl font-bold'>{profile.name}</h1>
                            <p className='text-muted-foreground'>{profile.user_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
    </>
  )
}
