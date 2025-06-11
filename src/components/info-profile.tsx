import { Card, CardHeader, CardTitle } from "@/common/shadcn/card";
import { Separator } from "@/common/shadcn/separator";
import React from "react";

interface Props{
    profile:{
        name:string
        user_name: string
        avatar_image: string
        cover_image: string
        pendidikan:string
        pekerjaan:string
        alamat:string
        bio:string
        website:string
    }
}

export default function InfoProfile({profile}:Props) {
  return (
    <Card className="w-full px-1">
      <h1 className="text-xl font-semibold w-fit">Info</h1>
      <Separator />
    </Card>
  );
}
