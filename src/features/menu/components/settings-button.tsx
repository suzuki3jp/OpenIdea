import { Settings } from "lucide-react";
import Link from "next/link";

export function SettingsButton() {
  return (
    <Link href="/setting" className="setting">
      <div className="setting-icon">
        <Settings className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </Link>
  );
}
