"use client";
import { RedFoodIcon } from "../../icons/redFoodIcon";
import { DashBoardIcon } from "../../icons/dashBoardIcon";
import { TruckIcon } from "../../icons/truckIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "lucide-react";

export const Navigation = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col px-5 py-9 gap-10 w-[205px] h-full">
      <div className=" flex gap-2.5 items-center">
        <RedFoodIcon />
        <div className="flex flex-col justify-between">
          <p className="text-[18px] font-bold">NomNom</p>
          <p className="text-[12px] text-[#71717A]">Swift delivery</p>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <Link
          href={`admin/menu`}
          className={`flex items-center rounded-full h-10 justify-center gap-2.5 cursor-pointer ${
            pathName === "/admin/menu"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <DashBoardIcon className="text-current" />
          Food Menu
        </Link>
        <Link
          href={`/admin`}
          className={`rounded-full flex gap-2.5 h-10 items-center px-6 cursor-pointer ${
            pathName === "/admin"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          <TruckIcon className="text-current" />
          Orders
        </Link>
        <button className="rounded-full flex gap-2.5 h-10 items-center px-6 cursor-pointer">
          <Settings />
          Settings
        </button>
      </div>
    </div>
  );
};
