import { createSlice } from '@reduxjs/toolkit';
import { searchRequestAsync } from './searchAction';

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
  },
  extraReducers: {
    [searchRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [searchRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.search = action.payload.search;
      state.photos = action.payload?.photos || [];
      state.error = action.payload.error || '';
      state.page += 1;
      state.total_pages = action.payload.total_pages;
    },
    [searchRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default searchSlice.reducer;
