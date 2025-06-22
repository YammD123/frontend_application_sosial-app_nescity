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
import { Edit, ImagePlus, Trash2 } from "lucide-react";
import Image from "next/image";
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
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [captions, setCaptions] = React.useState("");
  const [preview, setPreview] = React.useState<string[]>([])
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
      //formData.append("media",)

      const files = inputRef.current?.files;
      if (files) {
          Array.from(files).forEach((file) => {
              formData.append("media", file);
          });
      }
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
  const handleSubmitRemove = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("post_id", post_id);
      formData.append("deletedMediaIds", JSON.stringify([id]));
      const res = await fetch(`${BASE_URL}/post`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      if (res.status === 200) {
        toast.success("Media deleted");
          router.refresh();
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreview(fileUrls);
    }
  };

  const handleRemovePreview = (index: number) => {
    const updatedUrls = [...preview];
    updatedUrls.splice(index, 1);
    setPreview(updatedUrls);

    if (updatedUrls.length === 0 && inputRef.current) {
      inputRef.current!.value = "";
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
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
        <DialogContent className="w-full">
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
          <div className="flex w-full flex-wrap gap-2 mt-2">
            {media.map((media) => (
              <div key={media.id} className="w-full max-h-30 overflow-hidden rounded-lg relative">
                <Image
                  src={media.url}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant={"destructive"}
                  className="absolute top-1 right-1 z-10"
                  onClick={() => handleSubmitRemove(media.id)}
                >
                  <Trash2 size={20} />
                </Button>
              </div>
            ))}
          </div>
          {preview.length > 0 && (
            <div className="flex w-full flex-wrap gap-2 mt-2">
              {preview.map((url, index) => (
                <div className="w-full max-h-30 overflow-hidden rounded-lg relative">
                  <Image
                    src={url}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant={"destructive"}
                    className="absolute top-1 right-1 z-10"
                    onClick={() => handleRemovePreview(index)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <input
            className="hidden"
            type="file"
            name="media"
            ref={inputRef}
            onChange={handlePreview}
            multiple
          />
          <Separator />
          <ImagePlus
            className="cursor-pointer"
            onClick={handleClick}
            size={25}
          />
          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
