import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpUser = createAsyncThunk(
  'signUp/signUpUser',
  async ({ form, history }, { rejectWithValue }) => {
    console.log('vahid', history);
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
      const err = await res.json();
      history.push('/signUpResult');
      return rejectWithValue(err);
    }
    const data = await res.json();
    history.push('/signUpResult');
    return data;
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    successMessage: {},
    status: 'idle',
    error: null,
  },

  extraReducers: {
    [signUpUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = 'success';
      state.successMessage = action.payload;
    },
    [signUpUser.rejected]: (state, action) => {
      state.status = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectSignUp = (state) => state.signUp;

export default signUpSlice.reducer;
