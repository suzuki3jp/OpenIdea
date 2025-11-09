"use server";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";
/*
 *チェックアウトセッションの作成
 *購入ボタン押下時に実行
 */
export async function createCheckoutSession() {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "sample post title",
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    // 顧客IDを指定
    customer: "cus_TOC1aK5LN71mrL",
    mode: "payment",
    payment_intent_data: {
      application_fee_amount: 123,
      transfer_data: {
        // 販売者アカウントIDを指定
        destination: "acct_1SRPde0gVziZg5y2",
      },
    },
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });
  if (!session.url) {
    throw new Error("Checkout session URL not found");
  }
  redirect(session.url);
}
