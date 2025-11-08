import { ChevronLeft as BackButtonIcon, Circle as Icon } from "lucide-react";
import Image from "next/image";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { getUserById } from "@/features/auth/get-user-by-id";
import { TagBadge } from "@/features/tags/components/tag-badge";
import type { TagType } from "@/features/tags/types";
import { createClient } from "@/lib/supabase/server";
import { getIsLikedByPostId, getLikesCountByPostId } from "../like";
import type { Post } from "../types";
import { ContentLock } from "./content-lock";
import { CommentButton, DislikeButton, LikeButton } from "./post-actions";

/* TODO: タグテーブルできたらtestHogeは消す */
const testPaid = false;

type PostDetailProps = {
  post: Post;
  tags: TagType[];
};

export function PostDetail({ post, tags }: PostDetailProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <BackButtonIcon size={50} className="absolute top-12 left-6" />
      <PostHeader post={post} tags={tags} />
      <PostContent post={post} isPaid={testPaid} />
    </main>
  );
}

type PostHeaderProps = {
  post: Post;
  tags: TagType[];
};

async function PostHeader({ post, tags }: PostHeaderProps) {
  const client = await createClient();
  const author = await getUserById(post.userId, client);
  const authorIconPath = author?.iconPath ?? null;

  return (
    <header className="bg-[#FFFEEE]">
      <div className="h-full px-8 pt-32">
        <div className="flex space-x-5">
          {authorIconPath ? (
            <Image
              src={authorIconPath}
              alt="Author Icon"
              width={62}
              height={62}
            />
          ) : (
            <Icon
              size={62}
              color="gray"
              fill="gray"
              className="text-amber-700"
            />
          )}

          <div>
            <h1 className="w-full text-xl">{post.postTitle}</h1>

            <div className="space-y-2">
              <hr />
              <ul className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <li key={index}>
                    <TagBadge tag={tag} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <PostActions post={post} />
      </div>
    </header>
  );
}

type PostContentProps = {
  post: Post;
  isPaid: boolean;
};

function PostContent({ post, isPaid }: PostContentProps) {
  return (
    <>
      <article className="mx-12 my-10">
        <p>{post.freeContent}</p>
        {isPaid && <p>{post.paidContent}</p>}
      </article>
      {!isPaid && <ContentLock />}
    </>
  );
}

type PostActionsProps = {
  post: Post;
};

export async function PostActions({ post }: PostActionsProps) {
  const client = await createClient();
  const currentUser = await getCurrentUser(client);

  const isLiked = currentUser
    ? await getIsLikedByPostId(post.postId, currentUser.id, client)
    : false;
  const likeCount = await getLikesCountByPostId(post.postId, client);

  const isDisliked = false; // TODO: dislike機能実装時に修正

  return (
    <div className="mx-auto my-5 flex w-fit flex-row space-x-8">
      <LikeButton
        postId={post.postId}
        userId={currentUser?.id ?? null}
        isLiked={isLiked}
        likeCount={likeCount}
      />
      <DislikeButton
        postId={post.postId}
        userId={currentUser?.id ?? null}
        isDisliked={isDisliked}
        dislikeCount={post.badCount}
      />
      <CommentButton postId={post.postId} userId={currentUser?.id ?? null} />
    </div>
  );
}
