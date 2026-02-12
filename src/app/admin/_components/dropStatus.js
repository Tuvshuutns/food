"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpDawnIcon } from "@/app/icons/upDawnIcon";
import { useState } from "react";

export function DropStatusq({ item }) {
  const [changeStatus, setChangeStatus] = useState(item.status);

  const handleEditStatus = async (nextStatus) => {
    setChangeStatus(nextStatus);
    try {
      const res = await fetch(`http://localhost:8000/foodOrder`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        accept: "application/json",
        body: JSON.stringify({
          id: item._id,
          status: nextStatus,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`h-8 w-full flex justify-between items-center p-2 border rounded-full bg-white ${
            changeStatus === "PENDING"
              ? "border-red-500"
              : changeStatus === "CANCELED"
              ? "border-[#ddd]"
              : "border-green-500"
          }`}
        >
          <p className="font-bold text-[12px]">{changeStatus}</p>
          <UpDawnIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35 p-4 absolute flex flex-col gap-3 bg-white rounded">
        <button
          className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs"
          onClick={() => handleEditStatus("DELIVERED")}
        >
          Delivered
        </button>
        <button
          className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs"
          onClick={() => handleEditStatus("PENDING")}
        >
          Pending
        </button>
        <button
          className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs"
          onClick={() => handleEditStatus("CANCELED")}
        >
          Cancelled
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
