import { stripe } from "@/lib/stripe/stripe";

/*
 *アカウントリンクの作成
 *販売用アカウント作成後に実行or販売設定ページアクセス時に実行
 */
export async function createAccountLink(accountId: string) {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/setting/sale`,
    return_url: `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/setting/sale`,
    type: "account_onboarding",
  });
  return accountLink.url;
}
