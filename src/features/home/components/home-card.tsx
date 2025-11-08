import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/features/post/types";

export function HomeCard({ icon, ...post }: Post & { icon?: string | null }) {
  return (
    <Link
      href={`/post/${post.postId}`}
      className="flex h-32 min-h-32 w-[329px] items-center rounded-xl bg-[#FFFEEE] p-2.5 shadow-[2px_4px_6px_0px_rgba(0,0,0,0.25)]"
    >
      <div className="relative mr-2.5 size-[60.89px] overflow-hidden rounded-full">
        <Image src={icon || "/default-icon.png"} alt="アイコン" fill />
      </div>
      <div className="flex w-[238.5px] flex-col overflow-hidden p-0">
        <p className="text-[12px]">{post.postTitle}</p>
        <div className="h-px w-[172.85px] bg-black" />
        <p>タグ</p>
        <p>評価</p>
      </div>
    </Link>
  );
}
