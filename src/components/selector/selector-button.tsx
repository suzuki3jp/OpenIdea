import type { Dispatch, SetStateAction } from "react";
export function SelectorButton({
  label,
  setActiveIndex,
  activeIndex,
  index,
  buttonWidth,
}: {
  label: string;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  activeIndex: number;
  index: number;
  buttonWidth: string;
}) {
  return (
    <button
      type="button"
      onClick={() => setActiveIndex(index)}
      className={`z-10 h-[31px] ${buttonWidth} rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === index ? "text-black" : "cursor-pointer text-gray-500"}`}
    >
      {label}
    </button>
  );
}
