"use client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createFollow } from "@/features/follow/actions/create-follow";
import { deleteFollow } from "@/features/follow/actions/delete-follow";
import { getFollow } from "@/features/follow/actions/get-follow";
import { createClient } from "@/lib/supabase/client";
export async function handleFollowToggle(
  currentUserId: string,
  userId: string,
) {
  const client: SupabaseClient = createClient();

  const { followeeId, followerId } = await getFollow({
    currentUserId,
    userId,
    client,
  });

  const isFollow: boolean =
    followeeId === currentUserId && followerId === userId;

  if (!isFollow) {
    await createFollow(currentUserId, userId, client);
    return { isFollow: true };
  }

  if (followeeId && followerId) {
    await deleteFollow(followeeId, followerId, client);
    return { isFollow: false };
  }

  return { isFollow: isFollow };
}
