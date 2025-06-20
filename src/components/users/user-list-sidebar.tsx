"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/common/shadcn/avatar'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
interface Props {
  followers:{
    data: {
      id: string;
      follower: {
        id: string;
        profile: {
          name: string;
          avatar_image: string;
          user_name: string;
        };
      };
    }[]
  }
}
export default function UserListSidebar({followers}: Props) {
    const searchParams = useSearchParams();
    const search = searchParams.get("id");
    const router = useRouter();
  return (
    <div className='flex flex-col gap-2'>
        {followers?.data?.map((follower) => (
            <div onClick={()=> router.push(`/user/follower?id=${follower.follower.id}`)} className={`flex ${search === follower.follower.id ? "dark:bg-zinc-800 bg-zinc-200" : ""} p-2 items-center rounded-xl   gap-2`} key={follower.id}>
                <Avatar className='w-10 h-10'>
                    <AvatarImage src={follower.follower.profile.avatar_image} alt={follower.follower.profile.name} />
                    <AvatarFallback>{follower.follower.profile.name}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className='font-semibold text-lg'>{follower.follower.profile.name}</h3>
                    <p className='text-sm text-muted-foreground'>{follower.follower.profile.user_name}</p>
                </div>
            </div>
        ))}
    </div>
  )
}
