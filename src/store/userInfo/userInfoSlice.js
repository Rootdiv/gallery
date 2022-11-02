import { createSlice } from '@reduxjs/toolkit';

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
    userInfoRequest: state => {
      state.loading = true;
      state.error = '';
    },
    userInfoRequestSuccess: (state, action) => {
      state.loading = false;
      state.photos = action.payload.photos;
    },
    userInfoRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export default userInfoSlice.reducer;
