"use client";

import { Orders } from "../_components/Orders";
import { Pagination } from "../_components/pagination";
import { Profile } from "../_components/profile";

export const Content = () => {
  return (
    <div className="flex flex-col bg-[#F4F4F5] gap-6 pt-6 pr-10 pb-13 pl-6 w-full h-full">
      <Profile />
      <div className="w-full">
        <Orders />
      </div>
      <div className="flex justify-end">
        <Pagination />
      </div>
    </div>
  );
};
