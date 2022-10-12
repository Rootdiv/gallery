import { createSlice } from '@reduxjs/toolkit';
import { userInfoRequestAsync } from './userInfoAction';

const initialState = {
  loading: false,
  photos: [],
  error: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    newUserInfo: state => {
      state.photos = [];
    },
  },
  extraReducers: {
    [userInfoRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = '';
    },
    [userInfoRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photos = action.payload?.photos || [];
      state.error = action.payload?.error || '';
    },
    [userInfoRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default userInfoSlice.reducer;
