"use client";

import { redirect } from "next/navigation";
import { useState } from "react";
import type { User } from "@/features/auth/convert-db-user-to-user";
import { createTags } from "@/features/tags/actions/create-tags";
import { deleteFavoriteTags } from "@/features/tags/actions/delete-favorite-tags";
import { insertFavoriteTags } from "@/features/tags/actions/insert-favorite-tags";
import { TagBadge } from "@/features/tags/components/tag-badge";
import { TagForm } from "@/features/tags/components/tag-form";
import type { TagType } from "@/features/tags/types";
import { createClient } from "@/lib/supabase/client";
import { SettingContainer } from "../setting-container";

type Props = {
  currentUser: User;
};

export function SettingInterestForm({ currentUser }: Props) {
  const [tags, setTags] = useState<TagType[]>([]);

  async function handleClick() {
    // データベースにお気に入りタグを入れる
    const supabase = createClient();

    const createdTags = await createTags(supabase, tags);
    await deleteFavoriteTags(supabase, currentUser);
    if (createdTags)
      await insertFavoriteTags(supabase, currentUser, createdTags);
    redirect("/setting");
  }

  return (
    <div className="space-y-8">
      <div className="">
        <SettingContainer
          label={"興味のあるタグ"}
          className="h-52 space-y-4 px-10 py-9"
        >
          <TagForm maxTag={4} setTags={setTags} />
          <ul className="flex flex-wrap space-x-2 space-y-3">
            {tags.map((tag, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <li key={index}>
                <TagBadge tag={tag} />
              </li>
            ))}
          </ul>
        </SettingContainer>
      </div>

      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={async () => await handleClick()}
          className="rounded-full bg-linear-to-r from-[#FFFFFF] to-[#B1E0F3] px-14 py-4 shadow-xl"
        >
          保存する
        </button>
      </div>
    </div>
  );
}
