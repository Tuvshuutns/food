"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Sonnerq() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Dish has been changed")}
    >
      Add Dish
    </Button>
  );
}
