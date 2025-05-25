import { Middleware } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
} from "./cartSlice";
import { CartState } from "@/types/products";

type RootState = {
  cart: CartState;
};

const actionsToWatch = [
  addToCart.type,
  removeFromCart.type,
  updateQuantity.type,
  clearCart.type,
  setCart.type,
];

const saveCartToLocalStorage: Middleware<unknown, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      action &&
      typeof action === "object" &&
      "type" in action &&
      typeof action.type === "string" &&
      actionsToWatch.includes(action.type as (typeof actionsToWatch)[number])
    ) {
      const { cart } = store.getState();
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }

    return result;
  };

export default saveCartToLocalStorage;
