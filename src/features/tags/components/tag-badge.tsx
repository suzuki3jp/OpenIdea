"use client";

import type { TagType } from "@/features/tags/types";

type Props = {
  tag: TagType;
};

export function TagBadge({ tag }: Props) {
  return (
    <p className={`rounded-full bg-[#A6F093] px-3 text-[#6E6E6E]`}>
      # {tag.tagName}
    </p>
  );
}
