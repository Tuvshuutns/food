"use client";

import { AddOrderFood } from "./addOrderFood";

export const FoodCard = ({ item }) => {
  return (
    <div className="p-4 text-[14px] gap-5 rounded-[20px] border border-[#d1d1d1] h-[345px] flex items-center justify-center w-[397px] flex-col bg-white">
      <div className="w-full h-[210px] relative">
        <img
          src={item.Image || "/admin/delivery.png"}
          className="object-cover rounded-xl h-full w-full z-0 "
        />
        <AddOrderFood item={item} />
      </div>
      <div className="flex justify-between w-full font-semibold">
        <p className="text-2xl text-red-500">{item.foodName}</p>
        <p className="text-lg">{item.price}</p>
      </div>
      <p className="text-sm">{item.ingredients}</p>
    </div>
  );
};
