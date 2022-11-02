import { put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL, ACCESS_KEY } from 'api/const';
import { SEARCH_REQUEST, searchRequestError, searchRequestSuccess } from './searchAction';

function* fetchSearch({ search }) {
  const token = yield select(state => state.token.token);
  const photos = yield select(state => state.search.photos);
  const count = yield select(state => state.search.count);
  const page = yield select(state => state.search.page);
  const headers = {};

  const url = new URL(`${API_URL}/search/photos`);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.searchParams.append('query', search);
  url.searchParams.append('per_page', count);
  url.searchParams.append('page', page);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const request = yield axios.get(url.href, {
      headers,
    });
    let addSearch = request.data.results;
    const totalPages = request.data.total_pages;
    console.log('request: ', request);

    if (page > 1) {
      addSearch = [...photos, ...addSearch];
    }

    yield put({
      type: 'search/searchRequestSuccess',
      payload: searchRequestSuccess(search, addSearch, totalPages),
    });
  } catch (error) {
    yield put({
      type: 'search/searchRequestError',
      payload: searchRequestError(error.toString()),
    });
  }
}

export function* watchSearch() {
  yield takeLatest(SEARCH_REQUEST, fetchSearch);
}
