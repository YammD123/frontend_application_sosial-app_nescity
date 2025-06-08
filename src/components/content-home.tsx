import { localDate } from '@/common/helpers/local-date'
import { Card, CardContent } from '@/common/shadcn/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/common/shadcn/tabs'
import Image from 'next/image'
import React from 'react'

interface Props {
    postAll:{
        id:string
        caption:string
        created_at:string
        media:{
            id:string
            url:string
            type:string
        }[]
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
        <Card className='w-full' key={post.id}>
            <CardContent>
                <div className='flex flex-col'>
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
                    <div>
                        {post.media.length > 0 && (
                            <Tabs defaultValue={post.media[0]?.id}>
                                {post.media.map((media)=>(
                                    <TabsContent className='mt-3' key={media.id} value={media.id}>
                                        {media.type.startsWith("image") ? (
                                            <Image 
                                                src={media.url}
                                                width={900}
                                                height={900}
                                                alt='media'
                                            />
                                        ):(
                                            <video 
                                            width={900}
                                            height={900}
                                            className='object-cover'
                                            >
                                                <source src={media.url} type="video/mp4" />
                                            </video>
                                        )}
                                    </TabsContent>
                                ))}
                                <TabsList className='gap-1 mt-2'>
                                    {post.media.map((media)=>(
                                    <TabsTrigger className='border-0'  key={media.id} value={media.id}>
                                        {media.type.startsWith("image") ? (                              
                                            <Image 
                                                src={media.url}
                                                width={60}
                                                height={60}
                                                alt='media'
                                                className='object-cover w-6 h-6'
                                            />
                                        ):(
                                            <video 
                                            width={60}
                                            height={60}
                                            muted
                                            className='object-cover'
                                            >
                                                <source src={media.url} type="video/mp4" />
                                            </video>
                                        )}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    ))}
    </>
  )
}
