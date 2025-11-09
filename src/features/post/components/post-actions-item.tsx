"use client";
import {
  MessageSquare as CommentButtonIcon,
  ThumbsDown as DislikeButtonIcon,
  Star as LikeButtonIcon,
} from "lucide-react";
import { useState } from "react";
import { decrementLevel, incrementLevel } from "@/features/level";
import { createClient } from "@/lib/supabase/client";
import { dislikePost, undislikePost } from "../dislike";
import { likePost, unlikePost } from "../like";

type CommonProps = {
  postId: string;
  userId: string | null;
  authorId: string;
};

export function LikeButton({
  postId,
  userId,
  authorId,
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
        await decrementLevel(userId, client);
        setCurrentIsLiked(false);
        setCurrentLikeCount((prev) => prev - 1);
      }
    } else {
      const isSuccess = !(await likePost(postId, userId, client));
      if (isSuccess) {
        await incrementLevel(userId, client);
        setCurrentIsLiked(true);
        setCurrentLikeCount((prev) => prev + 1);
      }
    }
    setIsDisabled(false);
    return;
  }

  return (
    <div className="flex space-x-1">
      <button
        type="button"
        onClick={handleLikeOnClick}
        disabled={isDisabled || userId === authorId}
      >
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
  authorId,
}: CommonProps & { isDisliked: boolean; dislikeCount: number }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const [currentIsDisliked, setCurrentIsDisliked] = useState(isDisliked);
  const [currentDislikeCount, setCurrentDislikeCount] = useState(dislikeCount);

  async function handleDislikeOnClick() {
    if (!userId) return;
    const client = createClient();

    setIsDisabled(true);
    if (currentIsDisliked) {
      const isSuccess = !(await undislikePost(postId, userId, client));
      if (isSuccess) {
        await incrementLevel(userId, client); // undislike したら dislike されたときに下がったレベルを戻す
        setCurrentIsDisliked(false);
        setCurrentDislikeCount((prev) => prev - 1);
      }
    } else {
      const isSuccess = !(await dislikePost(postId, userId, client));
      if (isSuccess) {
        await decrementLevel(userId, client);
        setCurrentIsDisliked(true);
        setCurrentDislikeCount((prev) => prev + 1);
      }
    }
    setIsDisabled(false);
    return;
  }

  return (
    <div className="flex space-x-1">
      <button
        type="button"
        onClick={handleDislikeOnClick}
        disabled={isDisabled || userId === authorId}
      >
        <DislikeButtonIcon
          size={20}
          fill={currentIsDisliked ? "currentColor" : "none"}
        />
      </button>
      <p>{currentDislikeCount}</p>
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
