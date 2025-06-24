"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/common/shadcn/button";
import { localDate } from "@/common/helpers/local-date";
import { BASE_URL } from "@/lib/base-url";

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
  post_id: string;
  created_at: string;
};

type Props = {
  commentar: Comment[];
  onSuccess: () => void;
};

export default function NestedCommentPost({ commentar, onSuccess }: Props) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  const handleReply = async (parentId: string, postId: string) => {
    if (!replyText.trim()) return;
    await fetch(`${BASE_URL}/comment/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: replyText,
        parent_id: parentId,
        post_id: postId,
      }),
    });
    onSuccess();
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <div className="space-y-6 mt-1">
      {commentar.map((comment) => (
        <div key={comment.id} className="flex  items-start gap-3">
          <div className="shrink-0">
            <Image
              src={comment.user.profile.avatar_image}
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full object-cover"
            />
          </div>

          <div className="w-full max-w-3xl overflow-hidden break-words">
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm">
                {comment.user.profile.user_name}
              </span>
              <span className="text-xs text-gray-500">
                {localDate(comment.created_at)}
              </span>
            </div>

            <div className="text-sm text-left text-gray-300 mt-1 break-all whitespace-pre-wrap">
              {comment.content}
            </div>

            <button
              onClick={() => setReplyingTo(comment.id)}
              className="text-blue-500 text-xs mt-1 hover:underline items-start flex"
            >
              Balas
            </button>

            {replyingTo === comment.id && (
              <div className="mt-2 w-full ">
                <textarea
                  className="border w-full p-2 rounded text-sm bg-transparent focus:outline-none"
                  rows={2}
                  placeholder="Tulis balasan..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-3 mt-2">
                  <Button
                    onClick={() => handleReply(comment.id, comment.post_id)}
                    disabled={!replyText.trim()}
                    className="bg-blue-500 text-white px-3 py-1 text-sm"
                  >
                    Kirim
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setReplyText("");
                      setReplyingTo(null);
                    }}
                    className="text-gray-400 text-sm"
                  >
                    Batal
                  </Button>
                </div>
              </div>
            )}

            {/* ini comment balasan bossku*/}
            {comment.replies.length > 0 && (
              <div className="mt-4 pl-4 ml-2 border-l-2 border-gray-600 space-y-4">
                <NestedCommentPost
                  commentar={comment.replies}
                  onSuccess={onSuccess}
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
