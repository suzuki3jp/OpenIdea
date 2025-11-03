"use client";

{
  /* TODO: タグテーブルできたらちゃんとしたとこに型定義する */
}
export type TagType = {
  name: string;
};

type Props = {
  tag: TagType;
};

export function Tag({ tag }: Props) {
  return (
    <div className="rounded-full bg-[#A6F093] px-3 text-[#6E6E6E]">
      # {tag.name}
    </div>
  );
}
