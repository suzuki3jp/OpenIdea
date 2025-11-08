import type { SupabaseClient } from "@supabase/supabase-js";
import * as v from "valibot";
import { consoleError } from "@/lib/consoleError";
import { convertDBTagsToTags } from "../lib/convert-tag";
import { tagNameSchema } from "../schemas";
import type { TagType } from "../types";

export async function createTags(
  supabase: SupabaseClient,
  tags: TagType[],
): Promise<TagType[] | null> {
  // tagのバリデーション
  const tagNames = tags.map((tag) => tag.tagName);
  const tagArraySchema = v.array(tagNameSchema);
  v.parse(tagArraySchema, tagNames);

  // タグ追加
  await supabase.from("Tags").upsert(
    tags.map((tag) => ({ tag_name: tag.tagName })),
    {
      onConflict: "tag_name",
    },
  );

  // 追加したタグをfavorite tagsに入れたいからtag_idを返してる
  const { data, error } = await supabase
    .from("Tags")
    .select("*")
    .in(
      "tag_name",
      tags.map((tag) => tag.tagName),
    );

  if (error) {
    consoleError(error);
    return null;
  }

  return convertDBTagsToTags(data);
}
