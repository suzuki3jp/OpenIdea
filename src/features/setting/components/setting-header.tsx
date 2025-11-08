import { ProfileBackArrow } from "@/features/profile/components/profile-back-arrow";

type SettingHeaderProps = {
  label: string;
};

export function SettingHeader({ label }: SettingHeaderProps) {
  return (
    <header className="border-[#946B54] border-b border-solid bg-[#FFEBB1]">
      <ProfileBackArrow />
      <h1 className="pt-15 pb-5 pl-25 text-2xl">{label}</h1>
    </header>
  );
}
