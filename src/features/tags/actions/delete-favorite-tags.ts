import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@/features/auth/convert-db-user-to-user";
import { consoleError } from "@/lib/consoleError";

export async function deleteFavoriteTags(
  supabase: SupabaseClient,
  user: User,
): Promise<void> {
  const { error } = await supabase
    .from("FavoriteTags")
    .delete()
    .eq("user_id", user.id);

  if (error) consoleError(error);
}
