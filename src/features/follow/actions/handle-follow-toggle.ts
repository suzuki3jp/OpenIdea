"use client";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createFollow } from "@/features/follow/actions/create-follow";
import { deleteFollow } from "@/features/follow/actions/delete-follow";
import { getIsFollow } from "@/features/follow/actions/get-follow";
import { createClient } from "@/lib/supabase/client";
export async function handleFollowToggle(
  currentUserId: string,
  userId: string,
) {
  const client: SupabaseClient = createClient();

  const isFollow = await getIsFollow({
    currentUserId,
    userId,
    client,
  });

  if (!isFollow) {
    await createFollow(currentUserId, userId, client);
  } else {
    await deleteFollow(currentUserId, userId, client);
  }

  return !isFollow;
}
