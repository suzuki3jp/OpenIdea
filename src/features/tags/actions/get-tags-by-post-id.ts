"use server";

import type { SupabaseClient } from "@supabase/supabase-js";
import { consoleError } from "@/lib/consoleError";
import { convertDBTagsToTags } from "../lib/convert-tag";
import type { TagType } from "../types";

export async function getTagsByPostId(
  supabase: SupabaseClient,
  postId: string,
): Promise<TagType[]> {
  const tagIds = await getTagIdsByPostId(supabase, postId);
  const tags = await getTagsByTagIds(supabase, tagIds);

  return tags;
}

async function getTagIdsByPostId(
  supabase: SupabaseClient,
  postId: string,
): Promise<string[]> {
  const { data, error } = await supabase
    .from("PostTags")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    consoleError(error);
    return [];
  }

  return (data ?? []).map((row) => row.tag_id);
}

async function getTagsByTagIds(
  supabase: SupabaseClient,
  tagIds: string[],
): Promise<TagType[]> {
  const { data, error } = await supabase
    .from("Tags")
    .select("*")
    .in("tag_id", tagIds);

  if (error) {
    consoleError(error);
    return [];
  }

  return convertDBTagsToTags(data);
}
