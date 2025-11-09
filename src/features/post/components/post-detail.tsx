import { ChevronLeft as BackButtonIcon, Circle as Icon } from "lucide-react";
import Image from "next/image";
import { getUserById } from "@/features/auth/get-user-by-id";
import { TagBadge } from "@/features/tags/components/tag-badge";
import type { TagType } from "@/features/tags/types";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "../types";
import { ContentLock } from "./content-lock";
import { PostActions } from "./post-actions";

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
              className="size-[62px] rounded-full"
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

        <PostActions post={post} className="mx-auto my-5" />
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
