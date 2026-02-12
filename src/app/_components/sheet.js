import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingIcon } from "../icons/shoppingIcon";
import { useState } from "react";
import { Card } from "./card";
import { Order } from "./order";

export function Sheetq() {
  const [stage, setStage] = useState("card");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="bg-white rounded-full h-9 w-9 flex items-center justify-center">
          <ShoppingIcon />
        </button>
      </SheetTrigger>
      <SheetContent className={"bg-[#404040] rounded-l-[20px] p-4 text-white"}>
        <SheetHeader>
          <ShoppingIcon />
          <SheetTitle className={"text-white"}>Order detail</SheetTitle>
        </SheetHeader>
        <div className="relative w-full h-11 rounded-full bg-white border-5 border-[#F1F1F1] flex items-center shadow-inner overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full w-1/2 rounded-full bg-red-500 transition-transform duration-300 ease-in-out ${
              stage === "order" ? "translate-x-full" : "translate-x-0"
            }`}
          ></div>
          <button
            className={`relative z-10 flex-1 h-full font-semibold transition-colors duration-300 ${
              stage === "card" ? "text-white" : "text-black"
            }`}
            onClick={() => setStage("card")}
          >
            Card
          </button>
          <button
            className={`relative z-10 flex-1 h-full font-semibold transition-colors duration-300 ${
              stage === "order" ? "text-white" : "text-black"
            }`}
            onClick={() => setStage("order")}
          >
            Order
          </button>
        </div>
        {stage === "card" && <Card />}
        {stage === "order" && <Order />}
      </SheetContent>
    </Sheet>
  );
}
