"use client";
import "../index.css";
import { Navigation } from "./_feature/Navigation";
import { Content } from "./_feature/content";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <Navigation />
      <Content />
    </div>
  );
}
