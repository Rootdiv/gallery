import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import photosSlice from './photos/photosSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tokenMiddleware),
});
