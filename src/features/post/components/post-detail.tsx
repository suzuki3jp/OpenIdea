import { ChevronLeft as BackButtonIcon, Circle as Icon } from "lucide-react";
import { TagBadge } from "@/features/tags/components/tag-badge";
import type { TagType } from "@/features/tags/types";
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

function PostHeader({ post, tags }: PostHeaderProps) {
  return (
    <header className="bg-[#FFFEEE]">
      <div className="flex h-full flex-row space-x-5 px-8 pt-32">
        {/* TODO: ユーザー機能が実装されたらアイコンに差し替える */}
        <Icon size={90} color="gray" fill="gray" className="text-amber-700" />
        <div className="flex w-full flex-col space-y-2 pt-4 pr-5">
          <h1 className="w-full text-xl">{post.postTitle}</h1>
          <hr />
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index}>
                <TagBadge tag={tag} />
              </li>
            ))}
          </ul>
          <PostActions post={post} />
        </div>
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
