import type { SupabaseClient } from "@supabase/supabase-js";
import { convertDBPostToPost } from "@/features/post/lib/convert-post";
import type { Post } from "../types";

/**
 * userIdsが空配列の場合は空配列、nullの場合は全ての投稿を取得する仕様
 */
export async function getPosts(
  client: SupabaseClient,
  limit: number,
  userIds: string[] | null,
): Promise<Post[]> {
  if (Array.isArray(userIds) && userIds.length === 0) {
    return [];
  }
  let query = client
    .from("Posts")
    .select("*")
    .limit(limit)
    .order("created_at", { ascending: false });

  if (userIds && userIds.length > 0) {
    query = query.in("user_id", userIds);
  }

  const { data: postData } = await query;

  if (!postData) {
    return [];
  }

  return postData.map(convertDBPostToPost);
}
