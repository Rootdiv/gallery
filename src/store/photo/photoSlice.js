import { createSlice } from '@reduxjs/toolkit';
import { photoRequestAsync } from './photoAction';

const initialState = {
  loading: false,
  photo: {},
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    newPhoto: state => {
      state.photo = {};
    },
  },
  extraReducers: {
    [photoRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [photoRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photo = action.payload.photo;
      state.error = '';
    },
    [photoRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default photoSlice.reducer;
