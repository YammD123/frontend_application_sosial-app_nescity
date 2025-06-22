"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn/dialog";
import { Separator } from "@/common/shadcn/separator";
import { Edit } from "lucide-react";
import React, { useRef } from "react";

interface Props {
  caption: string;
  media: {
    id: string;
    url: string;
    type: string;
  }[];
}

export default function EditPost({ caption, media }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger className="flex w-full  hover:bg-gray-600/10 p-2 pl-3 rounded-sm items-center gap-1">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-sm text-center">Edit Post</DialogTitle>
          <form action="">
            <textarea
              className="w-full resize-none focus:outline-none p-2 rounded-lg"
              name="caption"
              ref={textAreaRef}
              defaultValue={caption}
              onInput={handleInput}
              placeholder="Tulis sesuatu disini..."
            ></textarea>
            <Separator/>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
