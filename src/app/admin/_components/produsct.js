"use client";

import { FoodCard } from "../_components/foodCard";
import { AddNewFood } from "./addNewFood";
import { useState, useEffect } from "react";

export const Product = ({ selectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const catRes = await fetch("http://localhost:8000/foodCategory");
      if (!catRes.ok) throw new Error("Category fetch failed");
      const catData = await catRes.json();
      const foodRes = await fetch("http://localhost:8000/food");
      if (!foodRes.ok) throw new Error("Food fetch failed");
      const foodData = await foodRes.json();

      setCategories(catData);
      setFoods(foodData);
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
    <div className="w-full overflow-y-scroll flex flex-col gap-6 h-full">
      {categories
        .filter((category) => {
          if (selectCategory === "All") return true;
          return category.categoryName === selectCategory;
        })
        .map((category) => (
          <div
            key={category._id}
            className="w-full bg-white rounded-xl p-6 font-semibold flex flex-col gap-4"
          >
            <h1 className="text-[20px]">{category.categoryName}</h1>

            <div className="flex gap-4 flex-wrap">
              <div className="border border-dashed border-red-500 rounded-[20px] flex items-center justify-center flex-col w-[270px] h-[241px] gap-6">
                <button className="rounded-full w-10 h-10 bg-red-500 flex items-center justify-center">
                  <AddNewFood categoryId={category._id} fetchData={fetchData} />
                </button>
                <p className="text-[14px]">
                  Add new dish to {category.categoryName}
                </p>
              </div>
              {foods
                .filter((food) => food.category?._id === category._id)
                .map((food) => (
                  <FoodCard
                    key={food._id}
                    item={food}
                    categories={categories}
                    fetchData={fetchData}
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};
