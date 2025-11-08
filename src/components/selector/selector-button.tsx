import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
export function SelectorButton({
  label,
  href,
  setActiveIndex,
  activeIndex,
  index,
  buttonWidth,
}: {
  label: string;
  href: { pathname: string; query: string };
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
  index: number;
  buttonWidth: string;
}) {
  const pathname = href.pathname;
  const query = href.query;

  return (
    <Link
      href={{ pathname, query: `query=${query}` }}
      onClick={() => setActiveIndex(index)}
      className={`z-10 h-[31px] ${buttonWidth} flex items-center justify-center rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === index ? "text-black" : "cursor-pointer text-gray-500"}`}
    >
      {label}
    </Link>
  );
}
