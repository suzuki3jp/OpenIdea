import Image from "next/image";
import Link from "next/link";
import image from "./Plus.svg";
export function PostButton() {
  return (
    <Link
      href="/post/create"
      className="sticky bottom-[140px] left-12/15 flex size-20 items-center justify-center rounded-full bg-[rgba(154,193,211,0.75)]"
    >
      <Image src={image} alt="投稿ボタン" width={50} height={50} />
    </Link>
  );
}
