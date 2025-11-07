import { User } from "lucide-react";
import Link from "next/link";
import { createClient } from "../../../lib/supabase/server";
import { getCurrentUser } from "../../auth/get-current-user";

export async function ProfileButton() {
  const client = await createClient();
  const user = await getCurrentUser(client);
  return (
    <Link href={`/users/${user?.id}`} className="profile">
      <div className="profile-icon">
        <User className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </Link>
  );
}
