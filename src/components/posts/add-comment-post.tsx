import { Button } from "@/common/shadcn/button";
import { Separator } from "@/common/shadcn/separator";
import React, { useState, useRef, useEffect } from "react";

export default function AddCommentPost() {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [comment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    console.log("Komentar:", comment);
    setComment("");
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
