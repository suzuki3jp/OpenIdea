import { stripe } from "@/lib/stripe/stripe";

/*
 *顧客用アカウントの作成
 *初回ログイン時に実行
 */
export async function createCustomer() {
  const customer = await stripe.customers.create();
  const customerId = customer.id;
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log("Created Stripe customer with ID:", customerId);
  return customerId;
}
