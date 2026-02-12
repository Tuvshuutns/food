import { useState } from "react";

export function useCounter(initial = 1) {
  const [count, setCount] = useState(initial);

  const minus = (e) => {
    e.preventDefault();
    if (count > 1) setCount(count - 1);
  };

  const plus = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  return { count, minus, plus };
}
