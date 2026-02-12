"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Sonnere() {
  return (
    <Button
      variant="save"
      onClick={() => toast.success("State has been changed")}
    >
      Save
    </Button>
  );
}
