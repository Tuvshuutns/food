"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Sonnera() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Food has been created")}
    >
      Add Food
    </Button>
  );
}
