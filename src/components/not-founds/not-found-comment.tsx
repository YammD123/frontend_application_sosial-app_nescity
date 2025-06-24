import { MessageSquare } from "lucide-react";

export default function NotFoundComment() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
      <MessageSquare className="w-10 h-10 mb-2" />
      <p className="text-sm">Belum ada komentar.</p>
    </div>
  );
}
