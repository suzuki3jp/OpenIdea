import type { SupabaseClient } from "@supabase/supabase-js";

const TABLE_NAME = "Users";
const USER_ID_COLUMN = "user_id";
const LEVEL_COLUMN = "level";
const FALLBACK_LEVEL = 1;

export async function getLevelByUserId(
  userId: string,
  client: SupabaseClient,
): Promise<number> {
  const { data, error } = await client
    .from(TABLE_NAME)
    .select(LEVEL_COLUMN)
    .eq(USER_ID_COLUMN, userId)
    .single();

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error fetching user level:", error);
  }

  return data?.level ?? FALLBACK_LEVEL;
}

export async function incrementLevel(
  userId: string,
  client: SupabaseClient,
): Promise<number> {
  const currentLevel = await getLevelByUserId(userId, client);
  const newLevel = currentLevel + 1;

  const { error } = await client
    .from(TABLE_NAME)
    .update({ [LEVEL_COLUMN]: newLevel })
    .eq(USER_ID_COLUMN, userId);

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error incrementing user level:", error);
    return currentLevel;
  }

  return newLevel;
}

export async function decrementLevel(
  userId: string,
  client: SupabaseClient,
): Promise<number> {
  const currentLevel = await getLevelByUserId(userId, client);
  const newLevel = currentLevel - 1;

  const { error } = await client
    .from(TABLE_NAME)
    .update({ [LEVEL_COLUMN]: newLevel })
    .eq(USER_ID_COLUMN, userId);

  if (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error("Error decrementing user level:", error);
    return currentLevel;
  }

  return newLevel;
}
