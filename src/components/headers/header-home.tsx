"use client";

import { Card, CardContent } from "@/common/shadcn/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/common/shadcn/dialog";
import { Separator } from "@/common/shadcn/separator";
import Image from "next/image";
import Link from "next/link";
import React, { useActionState, useEffect, useRef } from "react";
import { Images, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/common/shadcn/button";
import { postActionCreate } from "@/actions/post-action";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/shadcn/avatar";
import { useRouter } from "next/navigation";

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
  const [preview, setPreview] = React.useState<string[]>([]);
  const [state,formData,isPending] = useActionState(postActionCreate,{message:"",success:false});
  const [open, setOpen] = React.useState(false);
  const router = useRouter();


  useEffect(() => {
    if (state?.success) {
      setOpen(false)
      setPreview([])
      toast.success(state.message)
    }
  }, [state?.success]);
  //mengatur tinggi textarea agar tetap sesuai dengan isi
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  //trigger file input pada icon image yg di click
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  //mengambil gambar dan menampilkan pada preview
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreview(urls);
  };


  //menghapus gambar pada preview
  const handleRemove = (index: number) => {
    const updatedUrls = [...preview];
    updatedUrls.splice(index, 1);
    setPreview(updatedUrls);

    if (updatedUrls.length === 0 && inputRef.current) {
      inputRef.current!.value = "";
    }
  };

  React.useEffect(()=>{
    if(state?.success){
      toast.success(state.message)
      router.refresh()
    }
  },[state?.success])

  return (
    <>
      <Card className="w-full bg-zinc-100 border-0 dark:bg-zinc-900">
        <CardContent>
          <div className="flex gap-2 items-center">
            <Link  href={"/content/beranda/profile"}>
            <Avatar className="w-12 h-12">
              <AvatarImage alt={profile.name} className="object-cover" src={profile.avatar_image} />
              <AvatarFallback>{profile.name.toLowerCase()}</AvatarFallback>
            </Avatar>
            </Link>
            <div className="w-full items-start">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger onClick={()=>setOpen(true)} className="text-sm w-full bg-gray-300 dark:bg-zinc-800 p-2 rounded-3xl flex items-start  opacity-65">
                  Apa yang anda pikirkan ,
                  {profile.name.toUpperCase()[0] + profile.name.slice(1)}?
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="text-center text-lg">
                    Buat Postingan
                  </DialogTitle>
                  <Separator />
                  <div className="flex gap-2 items-center">
                    {profile.avatar_image && (
                      <Image
                        src={profile.avatar_image}
                        alt={profile.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    )}
                    <h1>{profile.name}</h1>
                  </div>
                  <div>
                    <form  action={formData}>
                      <textarea
                        className="w-full resize-none focus:outline-none p-2 rounded-lg"
                        name="caption"
                        ref={textAreaRef}
                        onInput={handleInput}
                        placeholder="Tulis sesuatu disini..."
                      ></textarea>
                      <div className="flex flex-col gap-1">
                        {preview.map((url, index) => (
                          <div className="relative" key={url}>
                            <Image 
                            src={url} 
                            alt="" 
                            width={50} 
                            height={50} 
                            className="w-full h-30 object-cover"
                            />
                            <Button 
                            variant={"destructive"} 
                            className="absolute top-1 right-1 z-10"
                            onClick={() => handleRemove(index)}>
                              <Trash2
                              size={20}
                              />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex justify-end p-4">
                        <div onClick={handleClick}>
                          <Images size={25} />
                        </div>
                        <input
                          ref={inputRef}
                          type="file"
                          multiple
                          name="media"
                          className="hidden"
                          onChange={handleChange}
                        />
                      </div>
                        <Button onClick={()=>setOpen(false)} disabled={isPending}   variant={"outline"} type="submit">
                          {isPending && (
                            <Loader2 className="mr-2  animate-spin" />
                          )}
                          Posting
                        </Button>
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
