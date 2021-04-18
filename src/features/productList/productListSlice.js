import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getAllProductsList = createAsyncThunk(
  'productList/getAllProductsList',
  async () => {
    const categories = [
      'Refrigerator',
      'TV',
      'Laptob',
      'Mobile',
      'Book',
      'Stationery',
    ];
    try {
      const responses = await Promise.all(
        categories.map((category) =>
          fetch(
            `http://online-shop-web-mapsabootcamp.fandogh.cloud/menu/${category}/`
          )
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      return data.reduce((acc, cur) => acc.concat(cur), []);
    } catch (error) {
      return error;
    }
  }
);

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
    [getAllProductsList.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getAllProductsList.fulfilled]: (state, action) => {
      state.status = 'success';
      state.list = action.payload;
    },
    [getAllProductsList.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectProductList = (state) => state.productList;

export default productListSlice.reducer;
