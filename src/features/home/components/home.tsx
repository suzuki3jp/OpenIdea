import type { SupabaseClient } from "@supabase/supabase-js";
import { HomeBody } from "@/features/home/components/home-body";
import { HomeBodyTypeSelector } from "@/features/home/components/home-body-type-selector";
import { SearchBar } from "@/features/search/components/search-bar";

export function Home({
  query,
  client,
}: {
  query: string | string[] | undefined;
  client: SupabaseClient;
}) {
  return (
    <div>
      <SearchBar />
      <HomeBodyTypeSelector />
      <HomeBody query={query} client={client} />
    </div>
  );
}
