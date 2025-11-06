"use client";
import { useState } from "react";
import { SelectorButton } from "./selector-button";

export function Selector({ buttonItems }: { buttonItems: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonItemLength = buttonItems.length;

  let buttonWidth = "w-1/2";

  switch (buttonItemLength) {
    case 2:
      buttonWidth = "w-1/2";
      break;
    case 3:
      buttonWidth = "w-1/3";
      break;
    default:
      buttonWidth = "w-1/2";
  }

  return (
    <div className="relative mx-auto mt-4 h-[37px] w-[329px] cursor-pointer items-center rounded-full border-none bg-[#F6F4E0] shadow-[inset_2px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="absolute top-[3px] left-[5px] flex h-[31px] w-[319px] rounded-full border-none">
        {buttonItems.map((label, index) => (
          <SelectorButton
            key={label}
            label={label}
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            index={index}
            buttonWidth={buttonWidth}
          />
        ))}
        <div
          className={`absolute left-0 h-[31px] rounded-[60px] bg-gradient-to-r from-[#FFF58C] to-[#FFB4A9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-300 ${buttonWidth}`}
          style={{
            pointerEvents: "none",
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}
