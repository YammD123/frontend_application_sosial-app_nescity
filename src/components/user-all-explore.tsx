"use client"

import { Button } from '@/common/shadcn/button';
import { Card, CardContent, CardFooter } from '@/common/shadcn/card';
import Image from 'next/image';
import React from 'react'

interface Props {
    userLoaderAll: {
        profile: {
            name: string;
            avatar_image: string;
        }
    }[]
}

export default function UserAllExplore({userLoaderAll}: Props) {
  return (
    <>
    <div className='grid grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3  xl:grid-cols-7'>
        {userLoaderAll && userLoaderAll.length > 0 && userLoaderAll.map((user)=>(
            <Card className='w-full p-0 border' key={user.profile.name}>
                <CardContent className='p-0'>
                        <div className='w-full'>
                            <Image 
                                src={user.profile.avatar_image}
                                width={150}
                                height={220}
                                alt='avatar'
                                className='w-full rounded'
                            />
                            {/* <div className='flex items-start flex-col'>
                                <h3 className='text-lg'>{user.profile.name}</h3>
                            </div> */}
                        </div>
                        <div className='w-full px-2 my-3'>
                            <h2 className='text-2xl my-1'>{user.profile.name}</h2>
                            <Button className='w-full'>Follow</Button>
                        </div>
                </CardContent>
            </Card>
        ))}
    </div>
    </>
  )
}
