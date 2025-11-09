import { getCurrentUser } from "@/features/auth/get-current-user";
import { createClient } from "@/lib/supabase/server";
import { getDislikesCountByPostId, getIsDislikedByPostId } from "../dislike";
import { getIsLikedByPostId, getLikesCountByPostId } from "../like";
import type { Post } from "../types";
import { CommentButton, DislikeButton, LikeButton } from "./post-actions-item";

type PostActionsProps = {
  post: Post;
  className?: string;
};

export async function PostActions({ post, className }: PostActionsProps) {
  const client = await createClient();
  const currentUser = await getCurrentUser(client);

  const isLiked = currentUser
    ? await getIsLikedByPostId(post.postId, currentUser.id, client)
    : false;
  const likeCount = await getLikesCountByPostId(post.postId, client);

  const isDisliked = currentUser
    ? await getIsDislikedByPostId(post.postId, currentUser.id, client)
    : false;
  const dislikeCount = await getDislikesCountByPostId(post.postId, client);

  return (
    <div className={`flex w-fit flex-row space-x-8 ${className}`}>
      <LikeButton
        postId={post.postId}
        userId={currentUser?.id ?? null}
        authorId={post.userId}
        isLiked={isLiked}
        likeCount={likeCount}
      />
      <DislikeButton
        postId={post.postId}
        userId={currentUser?.id ?? null}
        authorId={post.userId}
        isDisliked={isDisliked}
        dislikeCount={dislikeCount}
      />
      <CommentButton
        postId={post.postId}
        userId={currentUser?.id ?? null}
        authorId={post.userId}
      />
    </div>
  );
}
