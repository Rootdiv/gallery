import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL_PHOTOS, ACCESS_KEY } from 'api/const';
import { PHOTO_REQUEST, photoRequestError, photoRequestSuccess } from './photoAction';

function* fetchPhoto({ id }) {
  const token = yield select(state => state.token.token);
  const headers = {};

  const url = new URL(API_URL_PHOTOS);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.pathname += `/${id}`;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const request = yield axios.get(url.href, {
      headers,
    });
    const photo = request.data;
    const likes = request.data.likes;
    const isLiked = request.data.liked_by_user;

    yield put({
      type: 'photo/photoRequestSuccess',
      payload: photoRequestSuccess(photo, likes, isLiked),
    });
  } catch (error) {
    yield put({
      type: 'photo/photoRequestError',
      payload: photoRequestError(error.toString()),
    });
  }
}

export function* watchPhoto() {
  yield takeLatest(PHOTO_REQUEST, fetchPhoto);
}
