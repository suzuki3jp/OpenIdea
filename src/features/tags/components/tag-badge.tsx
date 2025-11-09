"use client";

import type { TagType } from "@/features/tags/types";

type Props = {
  tag: TagType;
  className?: string;
};

export function TagBadge({ tag, className }: Props) {
  return (
    <p className={`rounded-full bg-[#A6F093] px-3 text-[#6E6E6E] ${className}`}>
      # {tag.tagName}
    </p>
  );
}
