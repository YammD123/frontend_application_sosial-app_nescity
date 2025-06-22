"use client";

import { Button } from "@/common/shadcn/button";
import { ThumbsUp } from "lucide-react";
import React from "react";

interface Props {
  like: {
    id: string;
    user_id: string;
    post_id: string;
  }[];
  user_id: string;
}

export default function LikePost({ like, user_id }: Props) {
  const isLiked = like.some((like) => like.user_id === user_id);
  console.log(user_id);
  return (
    <div className="flex items-center gap-1">
      <Button variant={isLiked ? "default" : "ghost"}>
        <ThumbsUp />
      </Button>
    </div>
  );
}
