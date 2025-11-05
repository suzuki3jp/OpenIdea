import type { SupabaseClient } from "@supabase/supabase-js";

export async function getFollow({
  currentUserId,
  userId,
  client,
}: {
  currentUserId: string;
  userId: string;
  client: SupabaseClient;
}): Promise<{ followeeId: string | null; followerId: string | null }> {
  const { data, error } = await client
    .from("Follows")
    .select("followee_id, follower_id")
    .eq("followee_id", currentUserId)
    .eq("follower_id", userId)
    .maybeSingle();
  if (error || !data) {
    return { followeeId: null, followerId: null };
  }
  return {
    followeeId: data.followee_id,
    followerId: data.follower_id,
  };
}
