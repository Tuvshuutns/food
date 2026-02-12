"use client";
import { AddFoodInfo } from "./addFoodInfo";

export const FoodCard = ({ item, fetchData, categories }) => {
  return (
    <div className="px-4 py-2 text-[14px] gap-5 rounded-[20px] border border-[#d1d1d1] h-[241px] flex items-center justify-center w-[270px] flex-col">
      <div className="w-full h-[129px] relative">
        <img
          src={item?.Image || "delivery.png"}
          alt="image failed"
          className="w-full h-full absolute "
        />
        <button className="rounded-full w-11 h-11 flex items-center justify-center absolute z-10 bottom-2 right-2 bg-white hover:bg-black/30">
          <AddFoodInfo
            fetchData={fetchData}
            categories={categories}
            item={item}
          />
        </button>
      </div>
      <div className="flex justify-between w-full">
        <p className="text-[14px] text-red-500">{item.foodName}</p>
        <p className="text-[12px]">{item.price}</p>
      </div>
      <p className="text-[12px]">{item.ingredients}</p>
    </div>
  );
};
