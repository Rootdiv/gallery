import { all } from 'redux-saga/effects';
import { watchAuth } from './auth/authSaga';
import { watchPhoto } from './photo/photoSaga';
import { watchPhotos } from './photos/photosSaga';
import { watchSearch } from './search/searchSaga';
import { watchUserInfo } from './userInfo/userInfoSaga';

export default function* rootSaga() {
  yield all([watchAuth(), watchPhotos(), watchPhoto(), watchSearch(), watchUserInfo()]);
}
