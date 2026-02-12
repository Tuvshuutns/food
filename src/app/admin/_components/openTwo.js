"use client";

export const OpenTwo = () => {
  return (
    <div className="w-35 p-4 absolute flex flex-col gap-3 drop-shadow-lg bg-white rounded mt-45">
      <button className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs">
        Delivered
      </button>
      <button className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs">
        Pending
      </button>
      <button className="h-5 w-25 bg-[#F4F4F5] rounded-full text-xs">
        Cancelled
      </button>
    </div>
  );
};
