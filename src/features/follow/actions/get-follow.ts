import type { SupabaseClient } from "@supabase/supabase-js";

export async function getIsFollow({
  currentUserId,
  userId,
  client,
}: {
  currentUserId: string;
  userId: string;
  client: SupabaseClient;
}): Promise<boolean> {
  const { data } = await client
    .from("Follows")
    .select("followee_id, follower_id")
    .eq("followee_id", currentUserId)
    .eq("follower_id", userId)
    .maybeSingle();

  return data?.followee_id === currentUserId && data?.follower_id === userId;
}
