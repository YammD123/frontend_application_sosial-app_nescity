import Headerhome from "@/components/headers/header-home";
import NotFoundPost from "@/components/not-founds/not-found-post";
import { postLoaderAll } from "@/loaders/post-loader";
import { profileLoaderMe } from "@/loaders/profile-loader";
import React from "react";
import UserPostHome from "@/components/users/user-post-home";

export default async function page() {
  const profileMe = await profileLoaderMe();
  const postAll = await postLoaderAll();
  return (
    <div className="text-center  flex items-center justify-center">
      <div className=" flex-col gap-3 flex justify-center items-center w-full lg:w-3/4 2xl:w-1/2">
        <section className="w-full mb-6 sticky top-0">
          <Headerhome profile={profileMe} />
        </section>
        {postAll && postAll.length > 0 ? (
          <UserPostHome postAll={postAll} />
        ) : (
          <NotFoundPost />
        )}
      </div>
    </div>
  );
}
