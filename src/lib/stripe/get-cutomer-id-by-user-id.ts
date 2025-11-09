import type { SupabaseClient } from "@supabase/supabase-js";

const TABLE_NAME = "Customers";
const USER_ID_COLUMN = "user_id";

export async function getCustomerIdByUserId(
  userId: string,
  client: SupabaseClient,
) {
  const { data, error } = await client
    .from(TABLE_NAME)
    .select("customer_id")
    .eq(USER_ID_COLUMN, userId)
    .single();

  if (error || !data) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log("No customer found for user:", userId);
    return null;
  }

  const customerId: string = data.customer_id;
  return customerId;
}
