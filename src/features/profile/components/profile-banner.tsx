import Image from "next/image";
import defaultBanner from "./default-image.jpg";
export function ProfileBanner({ bannerPath }: { bannerPath: string }) {
  return (
    <div className="relative h-[142px] w-full">
      <Image
        src={bannerPath || defaultBanner}
        alt="Banner Image"
        fill
        className="object-cover"
      />
    </div>
  );
}
