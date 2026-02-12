"use client";

import { ClockIcon } from "../icons/clockIcon";
import { FoodIcon } from "../icons/foodIcon";
import { MapIcon } from "../icons/mapIcon";
import { RedFoodIcon } from "../icons/redFoodIcon";
import { useAuth } from "../_context/authContext";
import { useEffect, useState } from "react";

export function Order() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodHistory = async () => {
      if (!token || token === "no token") {
        setLoading(false);
        return;
      }

      try {
        const rawData = await fetch("http://localhost:8000/foodOrder", {
          method: "GET",
          headers: {
            authorization: token,
          },
        });
        const data = await rawData.json();

        if (user && user.id) {
          const userOrders = data.filter(
            (order) => order.user?._id === user.id || order.user === user.id
          );
          setOrders(userOrders);
        } else {
          setOrders(data);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getFoodHistory();
  }, [token, user]);

  if (loading) {
    return (
      <div className="w-full h-full rounded-xl bg-white text-black flex flex-col p-4">
        <p className="text-xl font-semibold">Order history</p>
        <p>Loading...</p>
      </div>
    );
  }
  console.log(orders, "123456789");

  return (
    <div className="w-full h-260 rounded-xl bg-white text-black flex flex-col p-4">
      <p className="text-xl font-semibold">Order history</p>

      {orders.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-scroll h-full">
          {orders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="px-3 flex flex-col gap-3 w-full h-fit border-b border-dashed pb-5 text-xs text-[#71717A]"
            >
              <div className="w-full flex justify-between">
                <p className="font-bold text-base text-black">
                  {order.totalPrice}₮
                </p>
                <button
                  className={`h-[28px] w-20 border rounded-full text-xs text-black ${
                    order.status === "PENDING"
                      ? "border-red-500"
                      : order.status === "DELIVERED"
                      ? "border-green-500"
                      : "border-gray-500"
                  }`}
                >
                  {order.status}
                </button>
              </div>
              {order.foodOrderItems?.map((item, itemIndex) => (
                <div className="w-full flex justify-between" key={itemIndex}>
                  <div className="flex gap-2 items-center">
                    <FoodIcon />
                    <p>{item.food.foodName}</p>
                  </div>
                  <p>{item.quantity}x</p>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <ClockIcon />
                {new Date(order.createdAt).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <MapIcon />
                <p>СБД, 12-р хороо, СБД нэгдсэн эмнэлэг Sbd negdsen em...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-46 w-full bg-[#F4F4F5] rounded-md px-12 py-8 flex flex-col justify-between items-center text-black my-4">
          <RedFoodIcon />
          <p className="font-bold">No Orders Yet? </p>
          <p className="text-[#71717A] text-xs text-center">
            🍕 "You haven't placed any orders yet. Start exploring our menu and
            satisfy your cravings!"
          </p>
        </div>
      )}
    </div>
  );
}
