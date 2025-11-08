import type { SupabaseClient } from "@supabase/supabase-js";
import { PostButton } from "@/components/post-button.tsx/post-button";
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
    <div className="mx-auto w-[393px]">
      <div className="mt-[104px]">
        <SearchBar />
        <HomeBodyTypeSelector />
      </div>
      <HomeBody query={query} client={client} />
      <PostButton />
    </div>
  );
}
