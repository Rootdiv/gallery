import { createSlice } from '@reduxjs/toolkit';
import { photosRequestAsync } from './photosAction';

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
  },
  extraReducers: {
    [photosRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [photosRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photos = action.payload.photos;
      state.error = '';
      state.page += 1;
    },
    [photosRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default photosSlice.reducer;
