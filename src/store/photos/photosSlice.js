import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  photos: [],
  error: '',
  count: 30,
  page: 1,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    firstPhotos: state => {
      state.photos = [];
      state.page = 1;
    },
    photosRequest: state => {
      state.loading = true;
      state.error = '';
    },
    photosRequestSuccess: (state, action) => {
      state.loading = false;
      state.photos = action.payload.photos;
      state.error = '';
      state.page += 1;
    },
    photosRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default photosSlice.reducer;
