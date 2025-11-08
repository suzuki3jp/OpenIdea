import type { SupabaseClient } from "@supabase/supabase-js";
import { getCurrentUser } from "@/features/auth/get-current-user";

export async function getCurrentUserFollowerIds({
  client,
}: {
  client: SupabaseClient;
}): Promise<string[]> {
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    return [];
  }

  const { data, error } = await client
    .from("Follows")
    .select("follower_id")
    .eq("followee_id", currentUser.id);

  if (error || !data) {
    return [];
  }

  const followerIds = data
    .map((row) => row.follower_id)
    .filter((v): v is string => typeof v === "string" && v.length > 0);

  return followerIds;
}
