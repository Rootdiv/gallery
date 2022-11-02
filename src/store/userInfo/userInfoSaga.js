import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL, ACCESS_KEY } from 'api/const';
import { USERINFO_REQUEST, userInfoRequestSuccess, userInfoRequestError } from './userInfoAction';

function* fetchUserInfo({ username }) {
  const token = yield select(state => state.token.token);
  if (!token || !username) return;

  const url = new URL(API_URL);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.pathname += `users/${username}/likes`;

  try {
    const request = yield axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('request: ', request);

    yield put({
      type: 'userInfo/userInfoRequestSuccess',
      payload: userInfoRequestSuccess(request.data),
    });
  } catch (error) {
    yield put({
      type: 'userInfo/userInfoRequestError',
      payload: userInfoRequestError(error.toString()),
    });
  }
}

export function* watchUserInfo() {
  yield takeLatest(USERINFO_REQUEST, fetchUserInfo);
}
