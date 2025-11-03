import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "./convert-db-user-to-user";
import { getUserById } from "./get-user-by-id";

export async function getCurrentUser(
  client: SupabaseClient,
): Promise<User | null> {
  const userId = (await client.auth.getUser()).data?.user?.id ?? null;
  if (!userId) return null;
  const currentUser = await getUserById(userId, client);

  return currentUser;
}
