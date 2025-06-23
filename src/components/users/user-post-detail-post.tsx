"use client";

import { localDate } from "@/common/helpers/local-date";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/common/shadcn/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/shadcn/tabs";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import React from "react";
import EditPost from "../posts/edit-post";
import { Card, CardContent } from "@/common/shadcn/card";
import LikePost from "../posts/like-post";
import AddCommentPost from "../posts/add-comment-post";
interface Props {
  postDetail: {
    id: string;
    caption: string;
    created_at: string;
    media: {
      id: string;
      url: string;
      type: string;
    }[];
    user: {
      profile: {
        name: string;
        avatar_image: string;
      };
    };
    like: {
      id: string;
      user_id: string;
      post_id: string;
    }[];
  };
  auth: {
    user: {
      id: string;
    };
  };
}

export default function UserPostPetailPost({ auth, postDetail }: Props) {
  const [expandedMap, setExpandedMap] = React.useState<{
    [postId: string]: boolean;
  }>({});
  return (
    <>
      <Card className="w-full border" key={postDetail.id}>
        <CardContent>
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex items-center gap-2">
              <Image
                src={postDetail.user.profile.avatar_image}
                width={40}
                height={40}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg">{postDetail.user.profile.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {localDate(postDetail.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="my-3">
              <div
                className={`text-sm whitespace-pre-wrap break-words break-all text-left ${
                  expandedMap[postDetail.id] ? "" : "line-clamp-3"
                }`}
              >
                {postDetail.caption}
              </div>
              {postDetail.caption.length > 150 && (
                <button
                  onClick={() =>
                    setExpandedMap((prev) => ({
                      ...prev,
                      [postDetail.id]: !prev[postDetail.id],
                    }))
                  }
                  className="text-blue-500 text-left flex text-xs mt-1"
                >
                  {expandedMap[postDetail.id] ? "Tutup" : "Baca selengkapnya"}
                </button>
              )}
            </div>

            {/* Media */}
            {postDetail.media.length > 0 && (
              <Tabs defaultValue={postDetail.media[0]?.id}>
                {postDetail.media.map((media) => (
                  <TabsContent className="mt-3" key={media.id} value={media.id}>
                    {media.type.startsWith("image") ? (
                      <Image
                        src={media.url}
                        width={900}
                        height={900}
                        alt="media"
                      />
                    ) : (
                      <video
                        width={900}
                        height={900}
                        className="object-cover"
                        controls
                      >
                        <source src={media.url} type="video/mp4" />
                      </video>
                    )}
                  </TabsContent>
                ))}
                <TabsList className="gap-1 mt-2">
                  {postDetail.media.map((media) => (
                    <TabsTrigger
                      className="border-0"
                      key={media.id}
                      value={media.id}
                    >
                      {media.type.startsWith("image") ? (
                        <Image
                          src={media.url}
                          width={60}
                          height={60}
                          alt="media"
                          className="object-cover w-6 h-6"
                        />
                      ) : (
                        <video
                          width={60}
                          height={60}
                          muted
                          className="object-cover"
                        >
                          <source src={media.url} type="video/mp4" />
                        </video>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            {/* Action Bar */}
            <div className="flex px-15  justify-between mt-4">
              <LikePost
                like={postDetail.like}
                user_id={auth.user.id}
                post_id={postDetail.id}
              />
              <p>as</p>
              <p>as</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <AddCommentPost />
    </>
  );
}
