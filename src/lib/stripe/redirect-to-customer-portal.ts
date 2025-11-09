import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe/stripe";

export async function redirectToCustomerPortal(customerId: string) {
  const customerPortal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SUPABASE_AUTH_URL}/setting/sale`,
  });
  redirect(customerPortal.url);
}
