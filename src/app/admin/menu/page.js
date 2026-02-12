"use client";

import { Category } from "../_components/category";
import { Profile } from "../_components/profile";
import { Product } from "../_components/produsct";
import { Navigation } from "../_feature/Navigation";
import { useState } from "react";

export default function Home() {
  const [selectCategory, setSelectCategory] = useState("All");
  return (
    <div className="flex w-full h-screen">
      <Navigation />
      <div className="flex flex-col bg-[#F4F4F5] gap-6 pt-6 pr-10 pl-6 w-full h-full">
        <Profile />
        <Category
          selectCategory={selectCategory}
          setSelectCategory={setSelectCategory}
        />
        <Product selectCategory={selectCategory} />
      </div>
    </div>
  );
}
