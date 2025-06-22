"use client";

import { Button } from "@/common/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn/dialog";
import { Separator } from "@/common/shadcn/separator";
import { BASE_URL } from "@/lib/base-url";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "sonner";

interface Props {
  post_id: string;
  caption: string;
  media: {
    id: string;
    url: string;
    type: string;
  }[];
}

export default function EditPost({ caption, media, post_id }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [open, setOpen] = React.useState(false);
  const [captions, setCaptions] = React.useState("");
  const router = useRouter();
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("post_id", post_id);
      formData.append("caption", captions);
      const res = await fetch(`${BASE_URL}/post`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      if (res.status === 200) {
          setOpen(false);
        toast.success("Post updated");
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (error) {
      throw error;
    }
  };

  React.useEffect(() => {
    if (open) {
      setCaptions(caption);
    }
  }, [open]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex w-full  hover:bg-gray-600/10 p-2 pl-3 rounded-sm items-center gap-1">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-sm text-center">Edit Post</DialogTitle>
          <textarea
            className="w-full resize-none focus:outline-none p-2 rounded-lg"
            name="caption"
            ref={textAreaRef}
            defaultValue={caption}
            onInput={handleInput}
            onChange={(e) => setCaptions(e.target.value)}
            placeholder="Tulis sesuatu disini..."
          ></textarea>
          <Separator />
          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
