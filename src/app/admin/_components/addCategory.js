import { PlusIcon } from "@/app/icons/plusIcon";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AddCategory({ fetchData }) {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    try {
      const res = await fetch("http://localhost:8000/foodCategory", {
        method: "",
        headers: {
          "content-type": "application/json",
        },
        accept: "application/json",
        body: JSON.stringify({ categoryName }),
      });
      fetchData();
    } catch (err) {
      console.error("❌ Fetch failed:", err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className="rounded-full w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer">
            <PlusIcon />
          </div>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[460px] h-[272px] flex flex-col justify-between"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Category name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Type category name..."
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await handleCreateCategory();
                toast.success("Category has been created");
              }}
            >
              Add category
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
