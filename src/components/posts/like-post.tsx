"use client";

import { Button } from "@/common/shadcn/button";
import { BASE_URL } from "@/lib/base-url";
import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  post_id: string;
  like: {
    id: string;
    user_id: string;
    post_id: string;
  }[];
  user_id: string;
}

export default function LikePost({ like, user_id, post_id }: Props) {
  const router = useRouter();
  const isLiked = like.some((like) => like.user_id === user_id);
  console.log(user_id);
  console.log(post_id);

  const likeAction = async () => {
    if (!isLiked) {
      try {
        const createLikePost = await fetch(`${BASE_URL}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          credentials: "include",
          body: JSON.stringify({
            post_id,
          }),
        });
        if (createLikePost.status === 201) {
          router.refresh();
        }
        const data = await createLikePost.json();
        return data;
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const deleteLikePost = await fetch(`${BASE_URL}/like`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          credentials: "include",
          body: JSON.stringify({
            post_id,
          }),
        });
        if (deleteLikePost.status === 200) {
          router.refresh();
        }
        const data = await deleteLikePost.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  };
  return (
    <div className="flex items-center ">
      <Button onClick={likeAction} variant={"ghost"}>
        <ThumbsUp
          className={`w-5 h-5 transition-all duration-200 ${
            isLiked
              ? "text-blue-500 fill-blue-500 scale-110"
              : "text-muted-foreground"
          }`}
        />
      </Button>
      <span>{like.length}</span>
    </div>
  );
}
