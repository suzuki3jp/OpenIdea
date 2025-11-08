import type { SupabaseClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe/stripe";

/*
 *顧客用アカウントの作成
 *初回ログイン時に実行
 */
export async function createCustomer(
  currentUserId: string,
  client: SupabaseClient,
) {
  const customer = await stripe.customers.create();
  const customerId = customer.id;

  await client.from("Customers").insert({
    user_id: currentUserId,
    customer_id: customerId,
  });
}
