"use client";

import { Card, CardContent } from "@/common/shadcn/card";
import { Dialog, DialogContent } from "@/common/shadcn/dialog";
import { Separator } from "@/common/shadcn/separator";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Images } from "lucide-react";
import { Button } from "@/common/shadcn/button";

interface HomeProps {
  profile: {
    name: string;
    avatar_image: string;
    user_name: string;
  };
}

export default function Headerhome({ profile }: HomeProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }
  }

  const handleClick =() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <>
      <Card className="w-full bg-zinc-100 border-0 dark:bg-zinc-900">
        <CardContent>
          <div className="flex gap-2 items-center">
            <Link href={"/content/beranda/profile"}>
              <Image
                src={profile.avatar_image}
                alt={profile.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <div className="w-full items-start">
              <Dialog>
                <DialogTrigger className="text-sm w-full bg-gray-300 dark:bg-zinc-800 p-2 rounded-3xl flex items-start  opacity-65">
                  Apa yang anda pikirkan ,
                  {profile.name.toUpperCase()[0] + profile.name.slice(1)}?
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center text-lg">
                    Buat Postingan
                  </DialogTitle>
                  <Separator />
                  <div className="flex gap-2 items-center">
                    <Image
                      src={profile.avatar_image}
                      alt={profile.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <h1>{profile.name}</h1>
                  </div>
                  <div>
                    <form encType="" action="">
                      <textarea
                        className="w-full resize-none focus:outline-none p-2 rounded-lg"
                        name="caption"
                        ref={textAreaRef}
                        onInput={handleInput}
                        id=""
                        placeholder="Tulis sesuatu disini..."
                      ></textarea>
                      <Separator />
                      <div className="flex justify-end p-4">
                        <div onClick={handleClick}>
                          <Images 
                          size={25}
                          />
                        </div>
                          <input ref={inputRef} type="file" multiple className="hidden" />
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
