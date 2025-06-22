import HeaderProfile from "@/components/users/user-banner-profile";
import InfoProfile from "@/components/users/user-info-profile";
import NotFoundPost from "@/components/not-founds/not-found-post";
import { UserNotFound } from "@/components/not-founds/not-found-user";
import { UserNotFoundId } from "@/components/not-founds/not-found-user-id";
import PostProfile from "@/components/users/user-post-profile";
import UserHeaderProfile from "@/components/users/user-banner-follower";
import UserInfoProfile from "@/components/users/user-info-follower";
import UserPostProfile from "@/components/users/user-post-follower";
import { postLoaderDetailByUserId, postLoaderMe } from "@/loaders/post-loader";
import { profileLoaderMe } from "@/loaders/profile-loader";
import { userLoaderFollowerById, userLoaderStatus } from "@/loaders/user-loader";
import React from "react";
import UserBannerFollower from "@/components/users/user-banner-follower";
import UserInfoFollower from "@/components/users/user-info-follower";
import UserPostFollower from "@/components/users/user-post-follower";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ searchParams }: Props) {
  const { id } = await searchParams;
  const userLoaderFollower = await userLoaderFollowerById(id as string);
  const postLoaderDetailUserId = await postLoaderDetailByUserId(id as string);
  const auth = await userLoaderStatus();

  return (
    <div className="text-center gap-20 flex-col  flex items-center justify-center">
      <div className="w-full">
        {!userLoaderFollower || !userLoaderFollower.profile ? (
          <UserNotFoundId />
        ) : (
          <UserBannerFollower profile={userLoaderFollower.profile} />
        )}
      </div>
      <div className="flex gap-3 flex-col items-center sm:items-start sm:flex-row justify-between  w-full lg:w-3/4 2xl:w-8/12">
        <div className="w-8/12 ">
          {!userLoaderFollower || !userLoaderFollower.profile ? (
            ""
          ) : (
            <UserInfoFollower profile={userLoaderFollower.profile} />
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          {!postLoaderDetailUserId && !userLoaderFollower ? (
            <NotFoundPost />
          ) : (
            <UserPostFollower 
            postProfile={postLoaderDetailUserId} 
            auth={auth}
            />
          )}
        </div>
      </div>
    </div>
  );
}
