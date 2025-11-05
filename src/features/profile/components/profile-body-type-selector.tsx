"use client";
import { useState } from "react";

interface ProfileBodyTypeSelectorProps {
  isMyProfile: boolean;
}

export function ProfileBodyTypeSelector({
  isMyProfile,
}: ProfileBodyTypeSelectorProps) {
  return isMyProfile ? (
    <MyProfileBodyTypeSelector />
  ) : (
    <OtherProfileBodyTypeSelector />
  );
}
// 3ボタン用の設定
const BUTTON_COUNT_3 = 3;
const TRACK_WIDTH_3 = 319;
const ITEM_WIDTH_PX_3 = TRACK_WIDTH_3 / BUTTON_COUNT_3;

function MyProfileBodyTypeSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => setActiveIndex(index);
  const leftPositionPx = activeIndex * ITEM_WIDTH_PX_3;

  return (
    <div className="relative mx-auto mt-4 h-[37px] w-[329px] cursor-pointer items-center rounded-full border-none bg-[#F6F4E0] shadow-[inset_2px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="absolute top-[3px] left-[5px] flex h-[31px] w-[319px] rounded-full border-none">
        <button
          type="button"
          onClick={() => handleClick(0)}
          className={`z-[10] h-[31px] w-1/3 rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === 0 ? "brack" : "text-gray-500"}`}
        >
          投稿
        </button>
        <button
          type="button"
          onClick={() => handleClick(1)}
          className={`z-[10] h-[31px] w-1/3 rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === 1 ? "brack" : "text-gray-500"}`}
        >
          いいね
        </button>
        <button
          type="button"
          onClick={() => handleClick(2)}
          className={`z-[10] h-[31px] w-1/3 rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === 2 ? "brack" : "text-gray-500"}`}
        >
          購入履歴
        </button>
        <div
          className="absolute left-0 z-[5] h-[31px] w-1/3 rounded-[60px] bg-gradient-to-r from-[#FFF58C] to-[#FFB4A9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-300"
          style={{
            pointerEvents: "none",
            width: `${ITEM_WIDTH_PX_3}px`,
            transform: `translateX(${leftPositionPx}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}

// 2ボタン用の設定
const BUTTON_COUNT_2 = 2;
const TRACK_WIDTH_2 = 319;
const ITEM_WIDTH_PX_2 = TRACK_WIDTH_2 / BUTTON_COUNT_2;
function OtherProfileBodyTypeSelector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index: number) => setActiveIndex(index);
  const leftPositionPx = activeIndex * ITEM_WIDTH_PX_2;

  return (
    <div className="relative mx-auto mt-4 h-[37px] w-[329px] cursor-pointer items-center rounded-full border-none bg-[#F6F4E0] shadow-[inset_2px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="absolute top-[3px] left-[5px] flex h-[31px] w-[319px] rounded-full border-none">
        <button
          type="button"
          onClick={() => handleClick(0)}
          className={`z-[10] h-[31px] w-1/2 rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === 0 ? "brack" : "text-gray-500"}`}
        >
          投稿
        </button>
        <button
          type="button"
          onClick={() => handleClick(1)}
          className={`z-[10] h-[31px] w-1/2 rounded-[60px] bg-transparent font-semibold transition-colors duration-300 ${activeIndex === 1 ? "brack" : "text-gray-500"}`}
        >
          いいね
        </button>
        <div
          className="absolute left-0 z-[5] h-[31px] w-1/2 rounded-[60px] bg-gradient-to-r from-[#FFF58C] to-[#FFB4A9] shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-transform duration-300"
          style={{
            pointerEvents: "none",
            width: `${ITEM_WIDTH_PX_2}px`,
            transform: `translateX(${leftPositionPx}px)`,
          }}
        ></div>
      </div>
    </div>
  );
}
