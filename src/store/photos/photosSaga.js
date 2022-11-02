import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL_PHOTOS, ACCESS_KEY } from 'api/const';
import { PHOTOS_REQUEST, photosRequestError, photosRequestSuccess } from './photosAction';

function* fetchPhotos() {
  const token = yield select(state => state.token.token);
  const photos = yield select(state => state.photos.photos);
  const count = yield select(state => state.photos.count);
  const page = yield select(state => state.photos.page);
  const headers = {};

  const url = new URL(API_URL_PHOTOS);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.searchParams.append('per_page', count);
  url.searchParams.append('page', page);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const request = yield axios.get(url.href, {
      headers,
    });
    let newPhotos = request.data;

    if (page > 1) {
      newPhotos = [...photos, ...newPhotos];
    }

    yield put({
      type: 'photos/photosRequestSuccess',
      payload: photosRequestSuccess(newPhotos),
    });
  } catch (error) {
    yield put({
      type: 'photos/photosRequestError',
      payload: photosRequestError(error.toString()),
    });
  }
}

export function* watchPhotos() {
  yield takeLatest(PHOTOS_REQUEST, fetchPhotos);
}
