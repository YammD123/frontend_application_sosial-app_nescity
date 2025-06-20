import { UserNotFound } from "@/components/not-founds/not-found-user";
import UserAllExplore from "@/components/users/user-all-explore";
import UserAllRequest from "@/components/users/user-all-request";
import { userLoaderAllList, userLoaderAllRequest } from "@/loaders/user-loader";
import React from "react";

export default async function page() {
  const userLoaderAllReq = await userLoaderAllRequest();
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-xl opacity-80 font-sans items-start mb-3 ">
        Permintaan Pertemanan
      </h1>
      {userLoaderAllReq && userLoaderAllReq.length > 0 ? (
        <UserAllRequest userLoaderAllReq={userLoaderAllReq} />
      ) : (
        <UserNotFound />
      )}
    </div>
  );
}
