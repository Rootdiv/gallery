import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from 'api/const';
import { AUTH_REQUEST, authRequestSuccess, authRequestError } from './authAction';
import { deleteToken } from 'store/tokenReducer';

function* fetchAuth() {
  const token = yield select(state => state.token.token);
  if (!token) return;
  try {
    const request = yield axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      data: { name, profile_image: iconImg, username },
    } = request;
    const img = iconImg.small.replace(/\?.*$/, '');
    const dataAuth = { name, img, username };

    yield put({
      type: 'auth/authRequestSuccess',
      payload: authRequestSuccess(dataAuth),
    });
  } catch (error) {
    yield put({
      type: 'auth/authRequestError',
      payload: authRequestError(error.toString()),
    });
    yield put(deleteToken());
  }
}

export function* watchAuth() {
  yield takeLatest(AUTH_REQUEST, fetchAuth);
}
