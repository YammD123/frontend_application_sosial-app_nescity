"use client";

import { UserX } from "lucide-react";

export function UserNotFoundId() {
  return (
    <div className="w-full h-64 flex flex-col items-center justify-center text-muted-foreground">
      <UserX className="w-12 h-12 mb-3 text-gray-800 dark:text-gray-400" />
      <h2 className="text-xl font-semibold">Tidak Ada Pengguna</h2>
      <p className="text-sm text-center max-w-sm mt-1">
        mohon maaf, kami tidak dapat menemukan pengguna dengan ID yang diminta.Silakan tab user untuk melihat detail
      </p>
    </div>
  );
}
