import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemProps, CartState } from "@/types/products";

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      return action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItemProps>) => {
      const newItem = action.payload;
      const { id } = newItem;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push(newItem);
      }

      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.itemCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);

      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== itemId);
        state.total -= itemToRemove.price * itemToRemove.quantity;
        state.itemCount -= itemToRemove.quantity;
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1 && quantity > 0) {
        state.items[existingItemIndex].quantity = quantity;
      }

      state.total = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.itemCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.itemCount;

export default cartSlice.reducer;
