import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";

export async function redirectToConnectedAccountDashboard(
  connectedAccountId: string,
) {
  const connectedAccountDashboard =
    await stripe.accounts.createLoginLink(connectedAccountId);
  redirect(connectedAccountDashboard.url);
}
