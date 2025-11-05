import type { SupabaseClient } from "@supabase/supabase-js";
export async function deleteFollow(
  followeeId: string,
  followerId: string,
  client: SupabaseClient,
) {
  await client
    .from("Follows")
    .delete()
    .eq("followee_id", followeeId)
    .eq("follower_id", followerId);
  return;
}
