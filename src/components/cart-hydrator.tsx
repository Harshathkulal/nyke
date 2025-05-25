"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/lib/redux/cartSlice";
import { CartState } from "@/types/products"; // Import the CartState type

export const CartHydrator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      const cartData: CartState = JSON.parse(storedCart); // Parse the entire cart object
      const { items, total, itemCount } = cartData; // Destructure the data

      dispatch(setCart({ items, total, itemCount })); // Dispatch the cart state
    }
  }, [dispatch]);

  return null;
};
