"use client"

import { followActionSend } from '@/actions/follow-action';
import { Button } from '@/common/shadcn/button';
import { Card, CardContent, CardFooter } from '@/common/shadcn/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react'
import { toast } from 'sonner';

interface Props {
    userLoaderAll: {
        id: string;
        profile: {
            name: string;
            avatar_image: string;
        }
    }[]
}

export default function UserAllExplore({userLoaderAll}: Props) {
    const [state,formAction,isPending] = useActionState(followActionSend,{message:"",success:false,receiver_id:""})
    const [isMounted, setIsMounted] = React.useState(false);
    const router = useRouter();
    React.useEffect(() => {
        if (state?.success) {
            toast.success(state.message)
            router.refresh()
        }
    },[state])

    React.useEffect(() => {
      setIsMounted(true);
    },[])

    if (!isMounted) return null

  return (
    <>
    <div className='grid gap-2 grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3  xl:grid-cols-7'>
        {userLoaderAll && userLoaderAll.length > 0 && userLoaderAll.map((user)=>(
            <Card key={user.id} className='w-full p-0 border'>
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
                            <h2 className='text-2xl my-1 text-ellipsis line-clamp-1 overflow-hidden max-w-full'>{user.profile.name}</h2>
                            <form action={formAction}>
                            <input name='receiver_id' defaultValue={user.id} className='hidden' type="text" />
                             <Button disabled={isPending}  type='submit' className='w-full bg-blue-400 hover:bg-blue-400'>
                                {isPending && state?.receiver_id === user.id && (
                                    <Loader2 className="mr-2  animate-spin" />
                                )}
                                Ikuti
                             </Button>
                            </form>
                        </div>
                </CardContent>
            </Card>
        ))}
    </div>
    </>
  )
}
