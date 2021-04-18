import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProductCategories = createAsyncThunk(
  'productCategory/getProductCategories',
  async () => {
    try {
      const res = await fetch(
        'http://online-shop-web-mapsabootcamp.fandogh.cloud/menu/'
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const productCategorySlice = createSlice({
  name: 'productCategory',
  initialState: {
    category: [],
    categoriesName: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [getProductCategories.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getProductCategories.fulfilled]: (state, action) => {
      state.status = 'success';
      state.category = action.payload;
      state.categoriesName = action.payload.reduce((acc, cur) => {
        return acc.concat(Object.values(cur)[0].map((obj) => Object.keys(obj)[0]));
      }, []);
    },
    [getProductCategories.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectProductCategory = (state) => state.productCategory;

export default productCategorySlice.reducer;
