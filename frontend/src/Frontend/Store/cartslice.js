import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if available
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading from localStorage", err);
    return [];
  }
};

const saveToLocalStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Error saving to localStorage", err);
  }
};

const initialState = loadFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      const item = state.find(p => p.id === action.payload.id);
      if (item) {
        item.quantity = (item.quantity || 1) + 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state);
    },
    remove(state, action) {
      const updated = state.filter(item => item.id !== action.payload);
      saveToLocalStorage(updated);
      return updated;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const product = state.find(p => p.id === id);
      if (product) {
        product.quantity = quantity;
      }
      saveToLocalStorage(state);
    },
    clearCart() {
      saveToLocalStorage([]);
      return [];
    }
  }
});

export const { add, remove, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
