import type { SupabaseClient } from "@supabase/supabase-js";
export async function createFollow(
  currentUserId: string,
  userId: string,
  client: SupabaseClient,
) {
  const payload = { followee_id: currentUserId, follower_id: userId };
  await client
    .from("Follows")
    .upsert(payload, { onConflict: "followee_id,follower_id" })
    .select("followee_id, follower_id");

  return;
}
