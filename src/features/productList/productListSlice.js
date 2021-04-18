import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getproductList = createAsyncThunk(
  'productList/getproductList',
  async (category) => {
    try {
      const res = await fetch(
        `http://online-shop-web-mapsabootcamp.fandogh.cloud/menu/${category}/`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [getproductList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getproductList.fulfilled]: (state, action) => {
      state.status = 'success';
      state.list = action.payload;
    },
    [getproductList.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectProductList = (state) => state.productList;

export default productListSlice.reducer;
