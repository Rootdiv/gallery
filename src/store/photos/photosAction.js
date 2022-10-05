import axios from 'axios';
import { API_URL_PHOTOS, ACCESS_KEY } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const photosRequestAsync = createAsyncThunk('photos/fetch', (idPhoto, { getState }) => {
  const token = getState().token.token;
  const photos = getState().photos.photos;
  const count = getState().photos.count;
  const page = getState().photos.page;
  const headers = {};

  const url = new URL(API_URL_PHOTOS);
  url.searchParams.set('client_id', ACCESS_KEY);
  if (count && page) {
    url.searchParams.append('per_page', count);
    url.searchParams.append('page', page);
  }

  if (idPhoto) {
    url.pathname += `/${idPhoto}`;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axios(url.href, {
    headers,
  })
    .then(({ data }) => {
      let newPhotos = data;
      if (page > 1) {
        newPhotos = [...photos, ...newPhotos];
      }
      return {
        photos: newPhotos,
      };
    })
    .catch(error => {
      console.error('Произошла ошибка: ', error);
      return { error: error.toString() };
    });
});
