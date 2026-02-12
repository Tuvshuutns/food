import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sonnere } from "./sonnere";
import { useState } from "react";

export function ChangeDeliveryState({ selectedOrders }) {
  const [select, setSelect] = useState(false);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className={`flex items-center px-4 py-2 text-[14px] h-full rounded-full text-white  ${
              selectedOrders.length > 0
                ? "bg-black w-[222px] justify-between"
                : "bg-[#D1D1D1] w-[179px] justify-center"
            }`}
            disabled={selectedOrders.length === 0}
          >
            <p>Change delivery state</p>
            {selectedOrders.length > 0 && (
              <div className="h-full w-7 bg-white rounded-full text-black flex items-center justify-center">
                {selectedOrders.length}
              </div>
            )}
          </button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-91 h-50 flex flex-col justify-between"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>
          <div className="flex justify-between">
            <button
              className={`flex justify-center items-center bg-[#F4F4F5] text-xs h-8 px-5 rounded-full ${
                select ? "border border-green-500 text-green-500" : ""
              }`}
              onClick={setSelect}
            >
              delivered
            </button>
            <button className="flex justify-center items-center bg-[#F4F4F5] text-xs h-8 px-5 rounded-full">
              pending
            </button>
            <button className="flex justify-center items-center bg-[#F4F4F5] text-xs h-8 px-5 rounded-full">
              canceled
            </button>
          </div>
          <DialogFooter>
            <Sonnere />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
