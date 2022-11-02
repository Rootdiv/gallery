import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  search: '',
  photos: [],
  error: '',
  count: 30,
  page: 1,
  total_pages: 0,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    newSearch: state => {
      state.search = '';
      state.photos = [];
      state.page = 1;
      state.total_pages = 0;
    },
    searchRequest: state => {
      state.loading = true;
      state.error = '';
    },
    searchRequestSuccess: (state, action) => {
      state.loading = false;
      state.search = action.payload.search;
      state.photos = action.payload.photos;
      state.page += 1;
      state.total_pages = action.payload.total_pages;
    },
    searchRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default searchSlice.reducer;
