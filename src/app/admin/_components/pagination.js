"use client";

import { LeftIcon } from "@/app/icons/leftIcon";
import { RightIcon } from "@/app/icons/rightIcon";

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-[14px]">
      <button className="h-8 w-8 flex items-center justify-center rounded-full">
        <LeftIcon />
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-[#18181B] text-white">
        1
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        2
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        3
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        4
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        5
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        ...
      </button>
      <button className="border h-8 w-8 flex items-center justify-center rounded-full border-[#E2E8F0] bg-white">
        10
      </button>
      <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white">
        <RightIcon />
      </button>
    </div>
  );
};
