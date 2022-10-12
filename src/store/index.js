import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import { authReducer } from './auth/authReducer';
import photosSlice from './photos/photosSlice';
import photoSlice from './photo/photoSlice';
import searchSlice from './search/searchSlice';
import userInfoSlice from './userInfo/userInfoSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosSlice,
    photo: photoSlice,
    search: searchSlice,
    userInfo: userInfoSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tokenMiddleware),
});
