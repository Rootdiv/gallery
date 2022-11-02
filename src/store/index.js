import { configureStore } from '@reduxjs/toolkit';
import { tokenMiddleware, tokenReducer } from './tokenReducer';
import authSlice from './auth/authSlice';
import photosSlice from './photos/photosSlice';
import photoSlice from './photo/photoSlice';
import searchSlice from './search/searchSlice';
import userInfoSlice from './userInfo/userInfoSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authSlice,
    photos: photosSlice,
    photo: photoSlice,
    search: searchSlice,
    userInfo: userInfoSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tokenMiddleware, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
