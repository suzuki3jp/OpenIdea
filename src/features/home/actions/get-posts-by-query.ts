import type { SupabaseClient } from "@supabase/supabase-js";

import { getCurrentUserFollowerIds } from "@/features/follow/lib/get-current-user-follower-ids";
import { getPosts } from "@/features/post/actions/get-posts";

export async function getPostsByQuery(
  query: string | string[] | undefined,
  client: SupabaseClient,
) {
  if (!query) return null;

  let userIds: string[] | null = null;

  if (query === "following") {
    userIds = await getCurrentUserFollowerIds({ client });
  }
  const posts = await getPosts(client, 40, userIds);

  return posts;
}
