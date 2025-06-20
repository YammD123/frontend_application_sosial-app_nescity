"use client";

import {
  CalendarDays,
  Edit,
  MapPin,
  MapPinned,
  Map,
  Info,
  MapPinCheckInsideIcon,
  Notebook,
  BookOpenText,
  Cake,
  Loader2,
} from "lucide-react";

import { Card } from "@/common/shadcn/card";

import { Separator } from "@/common/shadcn/separator";
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
    tanggal_lahir: string;
    gender: string;
  };
}

export default function UserInfoFollower({ profile }: Props) {
  return (
    <Card className="w-full px-1 py-3">
      <div className="flex justify-between px-3">
        <h1 className="text-xl font-semibold">Info</h1>
      </div>
      <Separator className="mt-2" />

      <div className="flex flex-col items-start gap-4 ">
        <div>
          <div className="flex items-center gap-2">
            <MapPinCheckInsideIcon size={20} />
            Alamat
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.alamat?(
              profile?.alamat.toLowerCase()
            ):(
              "-"
            )}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Notebook size={20} />
            Pekerjaan
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.pekerjaan ?? "-"}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <BookOpenText size={20} />
            Pendidikan
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.pendidikan ?? "-"}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Cake size={20} />
            Ulang Tahun
          </div>
          <p className="text-muted-foreground text-sm">
            {profile?.tanggal_lahir ?? "-"}
          </p>
        </div>
      </div>
    </Card>
  );
}
