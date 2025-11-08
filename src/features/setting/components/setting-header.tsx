import Link from "next/link";
import { ProfileBackArrow } from "@/features/profile/components/profile-back-arrow";

type SettingHeaderProps = {
  prevUrl: string;
  label: string;
};

export function SettingHeader({ prevUrl, label }: SettingHeaderProps) {
  return (
    <header className="border-[#946B54] border-b border-solid bg-[#FFEBB1]">
      <Link href={prevUrl}>
        <ProfileBackArrow />
      </Link>
      <h1 className="pt-15 pb-5 pl-25 text-2xl">{label}</h1>
    </header>
  );
}
