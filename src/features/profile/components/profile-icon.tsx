import Image from "next/image";
import defaultIcon from "./default-image.jpg";

export function ProfileIcon({ iconPath }: { iconPath: string }) {
  return (
    <div className="relative z-10 h-[78px] w-[78px] rounded-full">
      <Image
        src={iconPath || defaultIcon}
        className="bobject-cover absolute rounded-full"
        alt="Icon Image"
        fill
      />
    </div>
  );
}
