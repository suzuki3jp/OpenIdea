import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";

/*
 *販売履歴など
 */
export async function redirectToConnectedAccountDashboard(
  connectedAccountId: string,
) {
  const connectedAccountDashboard =
    await stripe.accounts.createLoginLink(connectedAccountId);
  redirect(connectedAccountDashboard.url);
}
