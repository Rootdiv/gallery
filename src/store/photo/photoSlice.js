import { createSlice } from '@reduxjs/toolkit';

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
    photoRequest: state => {
      state.loading = true;
      state.error = '';
    },
    photoRequestSuccess: (state, action) => {
      state.loading = false;
      state.photo = action.payload.photo;
      state.likes = action.payload.likes;
      state.isLiked = action.payload.isLiked;
    },
    photoRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default photoSlice.reducer;
