import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let loginForm = '';

export const loginUser = createAsyncThunk(
  'login/loginUser ',
  async (form, { rejectWithValue }) => {
    loginForm = form;
    const res = await fetch(
      'https://online-shop-web-mapsabootcamp.fandogh.cloud/login/',
      {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      const err = await res.json();
      return rejectWithValue(err);
    }
    const data = await res.json();
    return data;
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: {},
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.token = btoa(`${loginForm.username}:${loginForm.password}`);
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;
