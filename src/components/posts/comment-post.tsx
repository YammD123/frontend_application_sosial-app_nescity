"use client";
import { Card, CardContent } from "@/common/shadcn/card";
import React from "react";
import NestedCommentPost from "./nested-comment-post";
import { commentLoaderGetComments } from "@/loaders/comment-loader";
import NotFoundComment from "../not-founds/not-found-comment";

interface Props {
  post_id: string;
  triggerFetch: number;
  onSuccess: () => void;
}

export default function CommentPost({ post_id,triggerFetch,onSuccess }: Props) {
  const [comments, setComments] = React.useState([]);

  React.useEffect(() => {
    const fetchComments = async () => {
      const data = await commentLoaderGetComments(post_id);
      setComments(data);
    };
    fetchComments();
  }, [post_id,triggerFetch]);
  return (
    <Card className="w-full p-1">
      <CardContent className="w-full">
        <div className="flex w-full items-start flex-col gap-2">
          {comments.length === 0 ? (
            <NotFoundComment />
          ) : (
            <>
              <h3 className="text-sm text-muted-foreground font-semibold">
                Komentar
              </h3>
              <NestedCommentPost 
              commentar={comments}
              onSuccess={onSuccess}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
