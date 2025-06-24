"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/lib/redux/cartSlice";
import { CartState } from "@/types/products";

export const CartHydrator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const cartData: CartState = JSON.parse(storedCart);
      const { items, total, itemCount } = cartData;

      dispatch(setCart({ items, total, itemCount }));
    }
  }, [dispatch]);

  return null;
};
