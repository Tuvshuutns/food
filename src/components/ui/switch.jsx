"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, checked, onCheckedChange, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "relative peer inline-flex h-[40px] w-[120px] items-center rounded-full border border-gray-300 transition-all cursor-pointer bg-gray-200 data-[state=checked]:bg-red-500",
        className
      )}
      {...props}
    >
      {/* === 2 label === */}
      <span
        className={cn(
          "absolute left-4 text-sm font-semibold transition-all duration-300",
          checked ? "text-white opacity-100" : "text-gray-700 opacity-70"
        )}
      >
        Card
      </span>
      <span
        className={cn(
          "absolute right-4 text-sm font-semibold transition-all duration-300",
          checked ? "text-gray-200 opacity-70" : "text-black opacity-100"
        )}
      >
        Order
      </span>

      {/* === Switch Thumb === */}
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "absolute left-1 top-1 block h-8 w-[56px] rounded-full bg-white shadow-md transition-transform duration-300 data-[state=checked]:translate-x-[60px]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
