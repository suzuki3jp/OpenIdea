import { House } from "lucide-react";
export function HomeButton() {
  return (
    <button className="home-button" type="button">
      <div className="home-icon">
        <House className="h-full w-full stroke-[2.5] text-[#946B54]" />
      </div>
    </button>
  );
}
