import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@/features/auth/convert-db-user-to-user";
import { consoleError } from "@/lib/consoleError";
import { convertDBTagsToTags } from "../lib/convert-tag";
import type { TagType } from "../types";

export async function getFavoriteTagsByUser(
  supabase: SupabaseClient,
  user: User,
): Promise<TagType[]> {
  const { data, error } = await supabase
    .from("FavoriteTags")
    .select("*")
    .eq("user_id", user.id);
  if (error) consoleError(error);

  return convertDBTagsToTags(data);
}
