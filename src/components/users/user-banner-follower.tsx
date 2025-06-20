"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/common/shadcn/avatar";
import { Card, CardContent } from "@/common/shadcn/card";
import Image from "next/image";
import React from "react";

interface Props {
  profile: {
    name: string;
    user_name: string;
    avatar_image: string;
    cover_image: string;
    pendidikan: string;
    pekerjaan: string;
    alamat: string;
    bio: string;
    website: string;
  };
}

export default function UserBannerFollower({ profile }: Props) {
  return (
    <>
      <Card className="bg-zinc-100 dark:bg-zinc-900">
        <CardContent className="flex flex-col justify-center items-center gap-4">
          <div>
            <div className="relative">
              <Image
                src={profile.cover_image}
                width={1000}
                height={100}
                alt="cover"
                className=" z-0 rounded-sm h-96 object-cover"
              />

              <div className="absolute w-full flex bottom-1 left-3">
                <div className="relative">
                  <Avatar className="w-40 h-40">
                    <AvatarImage
                      className="object-cover z-0"
                      src={profile.avatar_image}
                    />
                    <AvatarFallback>SS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col ml-1">
                  <div className="w-fit mt-3">
                    <h1 className="text-2xl font-bold">{profile.name}</h1>
                    <p className="text-muted-foreground">{profile.user_name}</p>
                  </div>
                  <div className="w-fit mt-3">
                    <p className="text-muted-foreground">{profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
