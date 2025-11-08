import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@/features/auth/convert-db-user-to-user";
import { consoleError } from "@/lib/consoleError";
import type { TagType } from "../types";

export async function insertFavoriteTags(
  supabase: SupabaseClient,
  user: User,
  tags: TagType[],
): Promise<void> {
  const { error } = await supabase.from("FavoriteTags").insert(
    tags.map((tag) => ({
      user_id: user.id,
      tag_id: tag.tagId,
    })),
  );

  if (error) consoleError(error);
}
