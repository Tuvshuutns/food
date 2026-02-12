"use client";

import { useEffect, useState } from "react";
import { AddCategory } from "./addCategory";

export const Category = ({ selectCategory, setSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/foodCategory");
      if (!res.ok) throw new Error("Server responded with error");
      const data = await res.json();
      console.log("✅ Data fetched:", data);
      setCategories(data);
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
    <div className="w-full bg-white rounded-xl p-6 font-semibold flex flex-col gap-4">
      <h1 className="text-[20px]">Dishes category</h1>
      <div className="flex gap-3 flex-wrap">
        <button
          className={`px-4 py-2 text-[14px] gap-2 rounded-full border h-9 flex items-center justify-center ${
            selectCategory === "All" ? "border-red-500" : "border-[#d1d1d1]"
          }`}
          onClick={() => setSelectCategory("All")}
        >
          All dishes
          <span className="bg-black rounded-full w-8 text-[12px] text-white">
            {categories.reduce((acc, item) => acc + item.food, 0)}
          </span>
        </button>
        {categories.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-[14px] gap-2 rounded-full border h-9 flex items-center justify-center ${
              selectCategory === item.categoryName
                ? "border-red-500"
                : "border-[#d1d1d1]"
            }`}
            onClick={() => setSelectCategory(item.categoryName)}
          >
            {item.categoryName}
            <span className="bg-black rounded-full w-8 text-[12px] text-white">
              {item.food ?? 0}
            </span>
          </button>
        ))}
        <div className="rounded-full w-9 h-9 bg-red-500 flex items-center justify-center cursor-pointer">
          <AddCategory fetchData={fetchData} />
        </div>
      </div>
    </div>
  );
};
