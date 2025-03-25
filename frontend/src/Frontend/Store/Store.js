import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartslice';
import productSlice from './productslice';

const store = configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice
    }
});

export default store;


