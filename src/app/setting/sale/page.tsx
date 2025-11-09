import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/get-current-user";
import { getConnectedIdByUserId } from "@/lib/stripe/get-connected-id-by-user-id";
import { redirectAccountLink } from "@/lib/stripe/redirect-account-link";
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

  await redirectAccountLink(connectedId);
  return <div>販売設定</div>;
}
