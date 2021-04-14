import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpUser = createAsyncThunk(
  'signUp/signUpUser',
  async (form, { rejectWithValue }) => {
    const res = await fetch(
      'https://online-shop-web-mapsabootcamp.fandogh.cloud/signup',
      {
        method: 'POST',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      const err = res.json();
      return rejectWithValue(err);
    }
    const data = await res.json();
    return data;
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    signUpMessage: {},
    status: 'idle',
    error: null,
  },

  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.signUpMessage = action.payload;
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectSignUpMessage = (state) => state.signUp.signUpMessage;

export default signUpSlice.reducer;
