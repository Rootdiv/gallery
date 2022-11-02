import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: state => {
      state.loading = true;
      state.error = '';
    },
    authRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.error = '';
    },
    authRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    authLogout: state => {
      state.data = {};
    },
  },
});

export default authSlice.reducer;
