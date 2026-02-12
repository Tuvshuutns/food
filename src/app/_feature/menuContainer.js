"use client";

import { useEffect, useState } from "react";
import { FoodCard } from "../_components/foodCard";

export const MenuContainer = () => {
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
    <>
      {categories.map((category) => (
        <div
          className="w-full flex flex-col px-50 py-12 text-3xl gap-14"
          key={category._id}
        >
          <p className="text-white font-semibold">{category.categoryName}</p>
          <div className="w-full flex flex-wrap gap-20">
            {foods
              .filter((food) => food.category?._id === category._id)
              .map((food) => (
                <FoodCard key={food._id} item={food} />
              ))}
          </div>
        </div>
      ))}
    </>
  );
};
