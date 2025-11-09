import { Search as SearchIcon } from "lucide-react";

export function SearchBar() {
  return (
    <div className="mx-auto flex h-[50px] w-[329px] items-center justify-end rounded-[25px] bg-gradient-to-r from-[#D4ECEF] to-[#8BB7CC] pr-6 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <SearchIcon color="white" size={28} />
    </div>
  );
}
