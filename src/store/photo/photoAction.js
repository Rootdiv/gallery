import axios from 'axios';
import { API_URL_PHOTOS, ACCESS_KEY } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const photoRequestAsync = createAsyncThunk('photo/fetch', (id, { getState }) => {
  const token = getState().token.token;
  const headers = {};

  const url = new URL(API_URL_PHOTOS);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.pathname += `/${id}`;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios(url.href, {
    headers,
  })
    .then(({ data }) => ({ photo: data }))
    .catch(error => {
      console.error('Произошла ошибка: ', error);
      return { error: error.toString() };
    });
});
