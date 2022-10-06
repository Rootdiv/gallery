import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import photosSlice from './photos/photosSlice';
import photoSlice from './photo/photoSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosSlice,
    photo: photoSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tokenMiddleware),
});
