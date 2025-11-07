"use client";
import { useId } from "react";
export function ProfileBackArrow() {
  const backArrowId = useId();
  const title = "戻る";
  return (
    <div className="absolute z-10 mt-[49px] ml-8 flex size-12 items-center justify-center rounded-full bg-white/50">
      <svg aria-hidden="true" focusable="false">
        <symbol id={backArrowId} viewBox="0 0 15 27">
          <path
            d="M13.5 25.5L1.5 13.5L13.5 1.5"
            stroke="#5A8397"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </symbol>
      </svg>
      P
      <svg
        role="img"
        aria-label={title}
        className="absolute mr-0.5 h-[27px] w-[15px] fill-none"
      >
        <use href={`#${backArrowId}`} />
      </svg>
    </div>
  );
}
