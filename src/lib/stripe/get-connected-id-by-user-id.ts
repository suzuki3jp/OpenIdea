import type { SupabaseClient } from "@supabase/supabase-js";

const TABLE_NAME = "StripeConnectAccounts";
const USER_ID_COLUMN = "user_id";

export async function getConnectedIdByUserId(
  userId: string,
  client: SupabaseClient,
) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .select("connect_account_id")
    .eq(USER_ID_COLUMN, userId)
    .single();

  if (error) {
    return false;
  }

  return data !== null;
}
