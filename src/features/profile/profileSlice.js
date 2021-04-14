import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getSpecificProfile = createAsyncThunk(
  'user/getSpecificProfile',
  async (token, { rejectWithValue }) => {
    const res = await fetch(
      'https://online-shop-web-mapsabootcamp.fandogh.cloud/edit_profile/update_profile/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [getSpecificProfile.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getSpecificProfile.fulfilled]: (state, action) => {
      state.status = 'success';
      state.profile = action.payload;
    },
    [getSpecificProfile.rejected]: (state, action) => {
      state.state = 'fail';
      state.error = action.payload;
    },
  },
});

export const selectProfile = (state) => state.profile.profile;

export default profileSlice.reducer;