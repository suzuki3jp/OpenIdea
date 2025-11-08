"use server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/stripe";

/*
 *販売用アカウントの作成
 *初回ログイン時に実行
 */
export async function createConnectAccount() {
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

  return account.id;
}
