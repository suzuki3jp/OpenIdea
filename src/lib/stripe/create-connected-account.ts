"use server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/stripe";

/*
 *販売用アカウントの作成
 *初回ログイン時に実行
 */
export async function createConnectAccount(
  currentUserId: string,
  client: SupabaseClient,
) {
  const account = await stripe.accounts.create({
    controller: {
      stripe_dashboard: {
        type: "express",
      },
      fees: {
        payer: "application",
      },
      losses: {
        payments: "application",
      },
    },
  } as Stripe.AccountCreateParams);

  await client.from("StripeConnectAccounts").insert({
    user_id: currentUserId,
    connect_account_id: account.id,
  });
}
