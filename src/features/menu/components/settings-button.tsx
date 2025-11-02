import { Settings } from "lucide-react";
export function SettingsButton() {
  return (
    <button className="setting" type="button">
      <div className="setting-icon">
        <Settings className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </button>
  );
}
