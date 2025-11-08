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
          unit_amount: 5555,
        },
        quantity: 1,
      },
    ],
    // 顧客IDを指定
    customer: "cus_TNyzjhCsNYKIV4",
    mode: "payment",
    payment_intent_data: {
      application_fee_amount: 123,
      transfer_data: {
        // 販売者アカウントIDを指定
        destination: "acct_1SRFVS0Ugy5W6upb",
      },
    },
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
  });
  return session.url;
}
