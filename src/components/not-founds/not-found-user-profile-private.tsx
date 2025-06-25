"use client";

import { Lock } from "lucide-react";
import { Card, CardContent } from "@/common/shadcn/card";

export function NotFoundUserProfilePrivate() {
  return (
    <Card className="max-w-md mx-auto mt-20 text-center">
      <CardContent className="py-10 flex flex-col items-center gap-4">
        <Lock className="w-10 h-10 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Profil ini bersifat privat</h2>
        <p className="text-sm text-muted-foreground">
          Anda tidak memiliki izin untuk melihat profil ini.
        </p>
      </CardContent>
    </Card>
  );
}
