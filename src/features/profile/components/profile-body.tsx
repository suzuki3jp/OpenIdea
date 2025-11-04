import type { User } from "@/features/auth/convert-db-user-to-user";
export function ProfileBody({
  user,
  currentUserId,
}: {
  user: User | null;
  currentUserId: string | null;
}) {
  return <div>Profile Body Component</div>;
}
