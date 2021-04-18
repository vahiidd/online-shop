import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSingleProductDetail = createAsyncThunk(
  'singleProduct/getSingleProductDetail',
  async ({ urlCategory, urlName }) => {
    try {
      const res = await fetch(
        `http://online-shop-web-mapsabootcamp.fandogh.cloud/menu/${urlCategory}/${urlName}/`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      return error;
    }
  }
);

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState: {
    detail: {},
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [getSingleProductDetail.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getSingleProductDetail.fulfilled]: (state, action) => {
      state.status = 'success';
      state.detail = action.payload;
    },
    [getSingleProductDetail.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectSingleProductDetila = (state) => state.singleProduct;

export default singleProductSlice.reducer;
