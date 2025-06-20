import { Card, CardContent, CardHeader, CardTitle } from "@/common/shadcn/card";
import { FileX2 } from "lucide-react";
import React from "react";

export default function NotFoundPost() {
  return (
    <>
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-semibold text-gray-700">
          Belum Ada Postingan
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <FileX2 className="w-16 h-16 text-gray-400" />
        <p className="text-center text-sm text-muted-foreground">
          Sepertinya belum ada postingan di sini. Yuk, buat postingan pertama
          kamu sekarang!
        </p>
        {/* Opsional: Tambahkan tombol CTA */}
        {/* <a
          href="/create-post"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Buat Postingan
        </a> */}
      </CardContent>
    </Card>
    </>
  );
}
