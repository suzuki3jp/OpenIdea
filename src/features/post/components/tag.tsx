"use client";

import { colors } from "@/constans/tailwind";

/* TODO: タグテーブルできたらちゃんとしたとこに型定義する */
export type TagType = {
  name: string;
};

type Props = {
  tag: TagType;
};

export function Tag({ tag }: Props) {
  return (
    <p className={`rounded-full bg-[#A6F093] px-3 text-[#6E6E6E]`}>
      # {tag.name}
    </p>
  );
}
