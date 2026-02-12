"use client";

import { UpDawnIcon } from "@/app/icons/upDawnIcon";
import { CalendarIcon } from "@/app/icons/calendarIcon";
import { useEffect, useState } from "react";
import { OrderCards } from "./orderCards";
import { ChangeDeliveryState } from "./changeDeliveryState";

export const Orders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const fetchData = async () => {
    try {
      const Res = await fetch("http://localhost:8000/foodOrder");
      if (!Res.ok) throw new Error("Server responded with error");
      const Data = await Res.json();
      console.log("✅ usersData fetched:", Data);
      setOrders(Data);
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">❌ Error: {error}</p>;
  if (selectedOrders.length > 0) {
  }
  return (
    <>
      <div className="flex items-center p-4 rounded-t-md bg-white justify-between border border-[#d1d1d1]">
        <div>
          <h3 className="font-bold text-[20px]">Orders</h3>
          <p className="text-[12px] text-[#71717A]">
            {orders.length} {orders.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="h-9 flex gap-3">
          <div className="border border-[#ddd] flex items-center text-[14px] h-full rounded-full gap-2 p-4">
            <CalendarIcon />
            {today.toLocaleDateString("mn-MN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <span> - </span>
            {tomorrow.toLocaleDateString("mn-MN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <ChangeDeliveryState selectedOrders={selectedOrders} />
        </div>
      </div>
      <div className="border-b border-l border-r h-[52px] border-[#d1d1d1] flex items-center justify-around">
        <div className="w-[52px] h-full p-4">
          <input type="checkbox" className="h-4 w-4" />
        </div>
        <div className="w-[56px] h-full flex items-center">
          <h3 className="text-[14px]">№</h3>
        </div>
        <div className="h-full w-[213px] p-4">
          <p className="text-sm text-gray-600">Customer</p>
        </div>
        <div className="h-full w-40 p-4">
          <p className="text-sm text-gray-600">Food</p>
        </div>
        <div className="h-full w-60 flex justify-between p-4 items-center">
          <p className="text-sm text-gray-600">Date</p>
          <UpDawnIcon />
        </div>
        <div className="h-full w-40 p-4">
          <p className="text-sm text-gray-600">Total</p>
        </div>
        <div className="h-full w-1/5 p-4">
          <p className="text-sm text-gray-600">Delivery Address</p>
        </div>
        <div className="h-full w-40 flex justify-between items-center p-4">
          <p className="text-sm text-gray-600">Delivery state</p>
          <UpDawnIcon />
        </div>
      </div>
      {orders.map((item, index) => (
        <OrderCards
          key={index}
          item={item}
          index={index}
          selectedOrders={selectedOrders}
          setSelectedOrders={setSelectedOrders}
        />
      ))}
    </>
  );
};
