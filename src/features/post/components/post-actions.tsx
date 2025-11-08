"use client";
import {
  MessageSquare as CommentButtonIcon,
  ThumbsDown as DislikeButtonIcon,
  Star as LikeButtonIcon,
} from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { likePost, unlikePost } from "../like";

type CommonProps = {
  postId: string;
  userId: string | null;
};

export function LikeButton({
  postId,
  userId,
  isLiked,
  likeCount,
}: CommonProps & { isLiked: boolean; likeCount: number }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);

  async function handleLikeOnClick() {
    if (!userId) return;
    const client = createClient();

    setIsDisabled(true);
    if (currentIsLiked) {
      const isSuccess = !(await unlikePost(postId, userId, client));
      if (isSuccess) {
        setCurrentIsLiked(false);
        setCurrentLikeCount((prev) => prev - 1);
      }
    } else {
      const isSuccess = !(await likePost(postId, userId, client));
      if (isSuccess) {
        setCurrentIsLiked(true);
        setCurrentLikeCount((prev) => prev + 1);
      }
    }
    setIsDisabled(false);
    return;
  }

  return (
    <div className="flex space-x-1">
      <button type="button" onClick={handleLikeOnClick} disabled={isDisabled}>
        <LikeButtonIcon
          size={20}
          fill={currentIsLiked ? "currentColor" : "none"}
        />
      </button>
      <p>{currentLikeCount}</p>
    </div>
  );
}

export function DislikeButton({
  postId,
  userId,
  isDisliked,
  dislikeCount,
}: CommonProps & { isDisliked: boolean; dislikeCount: number }) {
  return (
    <div className="flex space-x-1">
      <DislikeButtonIcon
        size={20}
        fill={isDisliked ? "currentColor" : "none"}
      />
      <p>{dislikeCount}</p>
    </div>
  );
}

export function CommentButton({ postId, userId }: CommonProps) {
  return (
    <div className="flex space-x-1">
      <CommentButtonIcon size={20} />
      <p>0</p>
    </div>
  );
}
