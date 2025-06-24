import { Button } from "@/common/shadcn/button";
import { Separator } from "@/common/shadcn/separator";
import { BASE_URL } from "@/lib/base-url";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";


interface Props {
  post_id: string;
}

export default function AddCommentPost({ post_id }: Props) {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [comment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const res = await fetch(`${BASE_URL}/comment`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: comment,
        post_id: post_id,
      }),
    })
    if(res.status === 201){
      setComment("")
      router.refresh();
      toast.success("Komentar berhasil ditambahkan");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="w-full px-4 py-2 mt-2">
    <Separator className="my-2" />
      <div className="flex items-start gap-2">
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tulis komentar..."
          rows={1}
          className="w-full resize-none overflow-hidden text-sm px-3 py-2 border focus  rounded-md focus:outline-none  bg-background"
        />
        <Button
          type="submit"
          className="shrink-0"
          disabled={!comment.trim()}
        >
          Kirim
        </Button>
      </div>
    </form>
    </>
  );
}
