import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";

/*
 *販売設定ページアクセス
 */
export async function redirectAccountLink(accountId: string) {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/setting/sale`,
    return_url: `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/setting/sale`,
    type: "account_onboarding",
  });

  redirect(accountLink.url);
}
