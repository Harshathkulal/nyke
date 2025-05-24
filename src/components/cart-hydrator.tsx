"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/lib/redux/cartSlice";
import { CartItemProps } from "@/types/products";

export const CartHydrator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const items: CartItemProps[] = JSON.parse(storedCart);
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      dispatch(setCart({ items, total, itemCount }));
    }
  }, [dispatch]);

  return null;
};
