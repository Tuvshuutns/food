"use client";

import { useState } from "react";

export const FoodDetail = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((open) => !open)}></button>
      {open && <div></div>}
      <button onClick={() => setOpen((open) => !open)}></button>
      {open && <div></div>}
    </div>
  );
};
