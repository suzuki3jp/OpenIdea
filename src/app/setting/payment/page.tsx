import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { getCustomerIdByUserId } from "@/lib/stripe/get-cutomer-id-by-user-id";
import { redirectToCustomerPortal } from "@/lib/stripe/redirect-to-customer-portal";
import { createClient } from "@/lib/supabase/server";

export default async function () {
  const client = await createClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    return redirect("/login");
  }
  const customerdId = await getCustomerIdByUserId(currentUser.id, client);

  if (!customerdId) {
    return redirect("/setting");
  }

  await redirectToCustomerPortal(customerdId);

  return <div>支払い設定ページ</div>;
}
