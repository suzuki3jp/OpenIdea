"use client";

export type TypeTag = {
  name: string;
};

type Props = {
  tag: TypeTag;
};

export function Tag({ tag }: Props) {
  return (
    <div className="rounded-full bg-[#A6F093] px-3 text-[#6E6E6E]">
      # {tag.name}
    </div>
  );
}
