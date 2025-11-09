import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { getConnectedIdByUserId } from "@/lib/stripe/get-connected-id-by-user-id";
import { redirectToConnectedAccountDashboard } from "@/lib/stripe/redirect-to-connected-account-dashboard";
import { createClient } from "@/lib/supabase/server";

export default async function () {
  const client = await createClient();
  const currentUser = await getCurrentUser(client);

  if (!currentUser) {
    return redirect("/login");
  }
  const connectedId = await getConnectedIdByUserId(currentUser.id, client);

  if (!connectedId) {
    return redirect("/setting");
  }

  await redirectToConnectedAccountDashboard(connectedId);
  return <div>販売履歴</div>;
}
