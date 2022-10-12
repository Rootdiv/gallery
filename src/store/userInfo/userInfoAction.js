import axios from 'axios';
import { API_URL, ACCESS_KEY } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const userInfoRequestAsync = createAsyncThunk('userInfo/fetch', (userName, { getState }) => {
  const token = getState().token.token;

  const url = new URL(API_URL);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.pathname += `users/${userName}/likes`;

  if (!token || !userName) return;

  return axios
    .get(url.href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(data => ({
      photos: data.data,
    }))
    .catch(error => ({ error: error.toString() }));
});
