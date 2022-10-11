import axios from 'axios';
import { API_URL, ACCESS_KEY } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const searchRequestAsync = createAsyncThunk('search/fetch', (search, { getState }) => {
  const token = getState().token.token;
  const photos = getState().search.photos;
  const count = getState().search.count;
  const page = getState().search.page;
  const headers = {};

  const url = new URL(`${API_URL}/search/photos`);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.searchParams.append('query', search);
  url.searchParams.append('per_page', count);
  url.searchParams.append('page', page);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios
    .get(url.href, {
      headers,
    })
    .then(data => {
      let addSearch = data.data.results;
      if (page > 1) {
        addSearch = [...photos, ...addSearch];
      }
      return {
        search,
        photos: addSearch,
        total_pages: data.data.total_pages,
      };
    })
    .catch(error => ({ error: error.toString() }));
});
