import type { SupabaseClient } from "@supabase/supabase-js";

import { getIdsByCurrentId } from "@/features/follow/actions/get-Ids-by-currentId";
import { getPosts } from "@/features/post/actions/get-posts";

export async function getPostsByQuery(
  query: string | string[] | undefined,
  client: SupabaseClient,
) {
  if (!query) return null;

  let userIds: string[] | null = null;

  if (query === "following") {
    userIds = await getIdsByCurrentId({ client });
  }
  const posts = await getPosts(client, 40, userIds);

  return posts;
}
