"use client"

import { commentLoaderGetTotalComment } from '@/loaders/comment-loader';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    post_id: string;
}

export default function TotalCommentPost({ post_id }: Props) {
    const router = useRouter();
    const [totalComment, setTotalComment] = React.useState<number>(0);

    React.useEffect(()=>{
        const fetchTotalComment = async () =>{
            const data = await commentLoaderGetTotalComment(post_id);
            setTotalComment(data);
        }
        fetchTotalComment();
    }, [])
  return (
    <div className="flex items-center gap-2 ">
        <MessageCircle
          onClick={() => router.push(`/content/beranda/post/${post_id}`)}
          className={`w-5 h-5 transition-all duration-200 `}
        />
      <span>{totalComment}</span>
    </div>
  )
}
