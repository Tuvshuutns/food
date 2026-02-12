import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((x) => x.id !== id),
        })),

      increase: (id) =>
        set((state) => ({
          cart: state.cart.map((x) =>
            x.id === id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        })),
      decrease: (id) =>
        set((state) => ({
          cart: state.cart.map((x) =>
            x.id === id && x.quantity > 1
              ? { ...x, quantity: x.quantity - 1 }
              : x
          ),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "food-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
