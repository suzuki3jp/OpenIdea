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

  if (error || !data) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log("No connected account found for user:", userId);
    return null;
  }

  const connectedId: string = data.connect_account_id;
  return connectedId;
}
