import { ChevronLeft, Circle } from "lucide-react";
import type { Post } from "../types";
import { ContentLock } from "./content-lock";
import { PostActions } from "./post-actions";
import { Tag, type TypeTag } from "./tag";

const testTags: TypeTag[] = [
  { name: "test1" },
  { name: "test2" },
  { name: "test3" },
  { name: "test4" },
];

type Props = {
  post: Post;
};

const testPaid = false;

export function PostDetail({ post }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <ChevronLeft size={50} className="absolute top-12 left-6" />
      <Header post={post} tags={testTags} />
      <Content post={post} isPaid={testPaid} />
    </div>
  );
}

type HeaderProps = {
  post: Post;
  tags: TypeTag[];
};

function Header({ post, tags }: HeaderProps) {
  return (
    <div className="bg-[#FFFEEE]">
      <div className="flex h-full flex-row space-x-5 px-8 pt-32">
        <Circle size={90} color="gray" fill="gray" />
        <div className="flex w-full flex-col space-y-2 pt-4 pr-5">
          <h1 className="w-full text-xl">{post.postTitle}</h1>
          <div className="border-t-2 border-solid" />
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Tag tag={tag} key={index} />
            ))}
          </div>
          <PostActions post={post} />
        </div>
      </div>
    </div>
  );
}

type ContentProps = {
  post: Post;
  isPaid: boolean;
};

function Content({ post, isPaid }: ContentProps) {
  return (
    <>
      <div className="mx-12 my-10">
        {post.freeContent}
        {isPaid && <div>{post.paidContent}</div>}
      </div>
      {!isPaid && <ContentLock />}
    </>
  );
}
