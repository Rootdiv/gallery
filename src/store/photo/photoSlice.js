import { createSlice } from '@reduxjs/toolkit';
import { photoRequestAsync } from './photoAction';

const initialState = {
  loading: false,
  photo: {},
  likes: 0,
  isLiked: false,
  error: '',
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    newPhoto: state => {
      state.photo = {};
    },
    changeLike: state => {
      state.isLiked = !state.isLiked;
      state.likes += state.isLiked ? 1 : -1;
    },
  },
  extraReducers: {
    [photoRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [photoRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photo = action.payload?.photo || {};
      state.likes = action.payload?.likes || 0;
      state.isLiked = action.payload?.isLiked || false;
      state.error = action.payload?.error || '';
    },
    [photoRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default photoSlice.reducer;
