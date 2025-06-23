import UserPostPetailPost from "@/components/users/user-post-detail-post";
import { postLoaderDetail } from "@/loaders/post-loader";
import { userLoaderStatus } from "@/loaders/user-loader";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postDetail = await postLoaderDetail(id);
  const auth = await userLoaderStatus();
  return (
    <div className="text-center  flex items-center justify-center">
      <div className=" flex-col gap-3 flex justify-center items-center w-full lg:w-1/3 2xl:w-1/3">
      <UserPostPetailPost
      postDetail={postDetail}
      auth={auth}
      />
      </div>
    </div>
  );
}
