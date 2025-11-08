import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

const TABLE_NAME = "Likes";
const POST_ID_COLUMN = "post_id";
const USER_ID_COLUMN = "user_id";

export async function getIsLikedByPostId(
  postId: string,
  userId: string,
  client: SupabaseClient,
) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .select("*")
    .eq(POST_ID_COLUMN, postId)
    .eq(USER_ID_COLUMN, userId)
    .single();

  if (error) {
    return false;
  }

  return data !== null;
}

const FALLBACK_LIKES_COUNT = 0;
export async function getLikesCountByPostId(
  postId: string,
  client: SupabaseClient,
): Promise<number> {
  const { count } = await client
    .from(TABLE_NAME)
    .select("*", { count: "exact", head: true })
    .eq(POST_ID_COLUMN, postId);

  return count ?? FALLBACK_LIKES_COUNT;
}

export async function likePost(
  postId: string,
  userId: string,
  client: SupabaseClient,
): Promise<PostgrestError | null> {
  const { error } = await client
    .from(TABLE_NAME)
    .upsert([{ [POST_ID_COLUMN]: postId, [USER_ID_COLUMN]: userId }]);

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error liking post:", error);
  }

  return error;
}

export async function unlikePost(
  postId: string,
  userId: string,
  client: SupabaseClient,
): Promise<PostgrestError | null> {
  const { error } = await client
    .from(TABLE_NAME)
    .delete()
    .eq(POST_ID_COLUMN, postId)
    .eq(USER_ID_COLUMN, userId);

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error unliking post:", error);
  }

  return error;
}
