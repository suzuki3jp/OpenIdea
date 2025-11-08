import { Home } from "@/features/home/components/home";
import { createClient } from "@/lib/supabase/server";
export default async function ({ searchParams }: PageProps<"/">) {
  const client = await createClient();
  const query = (await searchParams).query;
  return <Home query={query} client={client} />;
}
