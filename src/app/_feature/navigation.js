"use client";
import { Dropdownq } from "../_components/dropDawn";
import { Sheetq } from "../_components/sheet";
import { LocationIcon } from "../icons/locationIcon";
import { RedFoodIcon } from "../icons/redFoodIcon";
import { RightIcon } from "../icons/rightIcon";
export const Navigation = () => {
  return (
    <div className="flex px-30 items-center justify-between py-16 w-full bg-black">
      <div className="flex gap-3 text-white">
        <RedFoodIcon />
        <div className="text-xl font-semibold">
          <p>
            Nom<span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="text-xs font-normal">Swift delivery</p>
        </div>
      </div>
      <div className="flex gap-10 items-center">
        <div className="h-9 w-[251px] bg-white rounded-full flex items-center justify-center gap-2">
          <LocationIcon />
          <p className="text-xs text-[#EF4444]">Delivery address:</p>
          <input
            placeholder="Add location"
            className="text-[#71717A] text-xs w-20 cursor-pointer"
          />
          <RightIcon />
        </div>
        <Sheetq />
        <Dropdownq />
      </div>
    </div>
  );
};
