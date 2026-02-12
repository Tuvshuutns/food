"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Sonnerr() {
  return (
    <Button
      variant="save"
      onClick={() => toast.success("Food is being added to the cart!")}
      className={"bg-black text-white"}
    >
      Add to cart
    </Button>
  );
}
