import axios from 'axios';
import { API_URL_PHOTOS, ACCESS_KEY } from 'api/const';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const photosRequestAsync = createAsyncThunk('photos/fetch', (_, { getState }) => {
  const photos = getState().photos.photos;
  const count = getState().photos.count;
  const page = getState().photos.page;

  const url = new URL(API_URL_PHOTOS);
  url.searchParams.set('client_id', ACCESS_KEY);
  url.searchParams.append('per_page', count);
  url.searchParams.append('page', page);

  return axios
    .get(url.href)
    .then(data => {
      let newPhotos = data.data;
      if (page > 1) {
        newPhotos = [...photos, ...newPhotos];
      }
      return {
        photos: newPhotos,
      };
    })
    .catch(error => ({ error: error.toString() }));
});
