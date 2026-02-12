"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DawnIcon } from "@/app/icons/DawnIcon";

export function DropdownMenuq({ item }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" w-40 px-4 flex items-center justify-between h-full">
          <p className="text-sm text-gray-600">
            {item.foodOrderItems.reduce((sum, i) => sum + i.quantity, 0)}
            <span> foods</span>
          </p>
          <DawnIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-66 absolute p-3 flex flex-col gap-3 drop-shadow-lg bg-white rounded">
        {item.foodOrderItems.map((orderItem, idx) => (
          <div className="flex justify-between items-center text-xs" key={idx}>
            <img
              src={orderItem.food?.Image || "/admin/pro.jpg"}
              className="h-full w-8 object-cover"
            />
            <p className="w-40">{orderItem.food?.foodName || "Unknown food"}</p>
            <p>x{orderItem.quantity}</p>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
