"use client";

import { RedFoodIcon } from "@/app/icons/redFoodIcon";
import { useEffect, useState } from "react";

export const Footer = () => {
  const texts = Array(60).fill("Fresh fast delivered");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState();
  const fetchData = async () => {
    try {
      const Res = await fetch("http://localhost:8000/foodCategory");
      if (!Res.ok) throw new Error("Server responded with error");
      const Data = await Res.json();
      console.log("✅ usersData fetched:", Data);
      setCategory(Data);
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
  return (
    <div className="w-full py-15 flex flex-col items-center gap-20 bg-black">
      <div className="overflow-hidden whitespace-nowrap w-full bg-[#EF4444] text-white text-3xl font-semibold h-25 flex items-center">
        <div className="animate-marquee inline-block px-24">
          {texts.map((t, i) => (
            <span key={i} className="mx-8">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="px-30 flex w-full justify-between">
        <div className="flex gap-3 text-white flex-col items-center">
          <RedFoodIcon />
          <div className="text-xl font-semibold">
            <p>
              Nom<span className="text-[#EF4444]">Nom</span>
            </p>
            <p className="text-xs font-normal">Swift delivery</p>
          </div>
        </div>
        <div className="px-50 flex gap-10 text-white">
          <div>
            <p className="text-[#71717A]">NOMNOM </p>
            <p>Home </p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex flex-col gap-4 max-h-47 flex-wrap">
            <p className="text-[#71717A]">MENU</p>
            {category.map((item, index) => (
              <p key={index}>{item.categoryName}</p>
            ))}
          </div>
          <div>
            <p className="text-[#71717A]">FOLLOW US</p>
            <div className="flex gap-3">
              <img src="/admin/Facebook.png" />
              <img src="/admin/Instagram.png" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-30 border-t border-[#71717A] w-full text-[#71717A] flex gap-15 h-20 items-center">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditions</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
