"use client";

import { MessageSquare, Star, ThumbsDown } from "lucide-react";
import type { Post } from "../types";

type Props = {
  post: Post;
};

export function PostActions({ post }: Props) {
  return (
    <div className="my-5 flex flex-row space-x-8">
      <div className="flex space-x-1">
        <Star size={20} />
        <p>{post.goodCount}</p>
      </div>
      <div className="flex space-x-1">
        <ThumbsDown size={20} />
        <p>{post.badCount}</p>
      </div>
      <div className="flex space-x-1">
        <MessageSquare size={20} />
        <p>0</p>
      </div>
    </div>
  );
}
