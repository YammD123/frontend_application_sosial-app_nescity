"use client";

import { followActionAccept, followActionReject } from "@/actions/follow-action";
import { Button } from "@/common/shadcn/button";
import { Card, CardContent, CardFooter } from "@/common/shadcn/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { toast } from "sonner";

interface Props {
  userLoaderAllReq: {
    id: string;
    profile: {
      name: string;
      avatar_image: string;
    };
  }[];
}

export default function UserAllRequest({ userLoaderAllReq }: Props) {
  const [state, formAction, isPending] = useActionState(followActionAccept, {
    message: "",
    success: false,
  });
  const [state2, formAction2, isPending2] = useActionState(followActionReject, {
    message: "",
    success: false,
  });


  const [isMounted, setIsMounted] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.refresh();
    }
  }, [state]);

  React.useEffect(() => {
    if (state2?.success) {
      toast.success(state2.message);
      router.refresh();
    }
  }, [state2]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3  xl:grid-cols-7">
        {userLoaderAllReq &&
          userLoaderAllReq.length > 0 &&
          userLoaderAllReq.map((user) => (
            <Card key={user.id} className="w-full p-0 border">
              <CardContent className="p-0">
                <div className="w-full">
                  <Image
                    src={user.profile.avatar_image}
                    width={150}
                    height={220}
                    alt="avatar"
                    className="w-full rounded"
                  />
                  {/* <div className='flex items-start flex-col'>
                                <h3 className='text-lg'>{user.profile.name}</h3>
                            </div> */}
                </div>
                <div className="w-full px-2 my-3">
                  <h2 className="text-2xl my-1 text-ellipsis line-clamp-1 overflow-hidden max-w-full">{user.profile.name}</h2>
                  <div className="flex gap-2 flex-col">
                    <form action={formAction}>
                      <input
                        name="receiver_id"
                        defaultValue={user.id}
                        className="hidden"
                        type="text"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-400"
                      >
                        {isPending && (
                          <Loader2 className="mr-2  animate-spin" />
                        )}
                        Ikuti Balik
                      </Button>
                    </form>
                    <form action={formAction2}>
                      <input
                        name="receiver_id"
                        defaultValue={user.id}
                        className="hidden"
                        type="text"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gray-400 hover:bg-gray-400"
                      >
                        {isPending2 && (
                          <Loader2 className="mr-2  animate-spin" />
                        )}
                        Tolak
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}
