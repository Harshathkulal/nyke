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
      const existingIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      updateCartTotals(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      updateCartTotals(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        updateCartTotals(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

function updateCartTotals(state: CartState) {
  state.total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
}

export const { setCart, addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.total;
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.itemCount;

export default cartSlice.reducer;
