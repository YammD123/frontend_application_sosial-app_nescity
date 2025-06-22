"use client";
import { postActionDelete } from "@/actions/post-action";
import { Button } from "@/common/shadcn/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/common/shadcn/dialog";
import { Input } from "@/common/shadcn/input";
import { Dialog } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { toast } from "sonner";

interface Props {
  post_id: string;
}

export default function DeletePost({ post_id }: Props) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [state, formAction] = useActionState(postActionDelete, {
    message: "",
    success: false,
  });
  React.useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.refresh();
      setOpen(false);
    }
  }, [state]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex w-full  hover:bg-gray-600/10 p-2 pl-3 rounded-sm items-center gap-1">
          <Trash className="w-4 h-4" />
          <span>Hapus</span>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="text-sm text-center">Hapus Post</DialogTitle>
          <form action={formAction} className="flex flex-col gap-2">
            <Input
              defaultValue={post_id}
              name="id"
              className="hidden"
            />
            <p className="text-sm text-muted-foreground">Anda yakin ingin menghapus post ini?</p>
            <Button
              type="submit"
              className=" flex w-fit mt-2"
              variant="destructive"
            >
              <Trash className="w-fit" />
              <span className="w-fit">Delete</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
