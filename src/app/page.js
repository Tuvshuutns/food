"use client";

import { Bg } from "./_feature/bg";
import { MenuContainer } from "./_feature/menuContainer";
import { Navigation } from "./_feature/navigation";
import { Footer } from "./admin/_feature/footer";
export default function Home() {
  return (
    <div className="flex w-full h-screen flex-col bg-[#404040]">
      <Navigation />
      <div className=" flex flex-col w-full overflow-scroll">
        <Bg />
        <MenuContainer />
        <Footer />
      </div>
    </div>
  );
}
