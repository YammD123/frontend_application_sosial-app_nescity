"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/common/shadcn/button";

type CommentUser = {
  profile: {
    user_name: string;
    avatar_image: string;
  };
};

type Comment = {
  id: string;
  content: string;
  user: CommentUser;
  replies: Comment[];
};

type Props = {
  commentar: Comment[];
  onSuccess: () => void; 
};

export default function NestedCommentPost({ commentar, onSuccess }: Props) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  const handleReply = (parentId: string) => {
    if (!replyText.trim()) return;
    console.log("Reply sent!", {
      parent_id: parentId,
      content: replyText,
    });
    onSuccess(); 
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-4 w-full ">
      {commentar.map((comment) => (
        <div key={comment.id}>
          {/* Komentar utama */}
          <div className="border p-4 rounded-lg flex items-start gap-3">
            <Image
              src={comment.user.profile.avatar_image}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div className="w-full flex flex-col justify-start items-start">
              <div className="font-semibold">{comment.user.profile.user_name}</div>
              <div className="text-sm text-gray-800">{comment.content}</div>
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-blue-500 text-xs mt-2"
              >
                Balas
              </button>

              {replyingTo === comment.id && (
                <div className="mt-2 w-full">
                  <textarea
                    className="w-full border p-2 rounded text-sm"
                    rows={2}
                    placeholder="Tulis balasan..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex gap-4 mt-1">
                    <Button
                      onClick={() => handleReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="bg-blue-500 text-white px-3 py-1 text-sm rounded"
                    >
                      Kirim
                    </Button>
                    <Button
                    variant={'ghost'}
                      onClick={() => {
                        setReplyText("");
                        setReplyingTo(null);
                      }}
                      className="text-gray-500 text-sm"
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Balasan (1 tingkat) */}
          {comment.replies.length > 0 && (
            <NestedCommentPost
            commentar={comment.replies}
            onSuccess={onSuccess}
            />
          )}
        </div>
      ))}
    </div>
  );
}
