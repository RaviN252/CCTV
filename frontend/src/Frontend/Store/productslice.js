import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StatusCode from '../utils/Stutuscode';

const initialState = {
    data: [],
    status: StatusCode.SIGNALGODS.IDLE,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProducts(state, action) {
            state.data = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getProducts.pending, (state) => {
            state.status = StatusCode.SIGNALGODS.LOADING;
          })
          .addCase(getProducts.fulfilled, (state, action) => {
            state.status = StatusCode.SIGNALGODS.IDLE;
            state.data = action.payload;
          })
          .addCase(getProducts.rejected, (state, action) => {
            state.status = StatusCode.SIGNALGODS.ERROR;
            state.error = action.error.message;
          });
      }
    })

// Correct action export
export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk('products/get', async () => {
      const data = await fetch('https://fakestoreapi.com/products'); 
      const result = await data.json();
      return result;
})
// Thunk with proper formatting and error handling
// export function getProducts() {
//     return async function getProductsThunk(dispatch) {
//         try {
//             const response = await fetch('https://fakestoreapi.com/products');
//             const result = await response.json();
//             dispatch(fetchProducts(result));
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
// }