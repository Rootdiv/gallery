export const PHOTOS_REQUEST = 'PHOTOS_REQUEST';
const PHOTOS_REQUEST_SUCCESS = 'PHOTOS_REQUEST_SUCCESS';
const PHOTOS_REQUEST_ERROR = 'PHOTOS_REQUEST_ERROR';

export const photosRequest = () => ({
  type: PHOTOS_REQUEST,
});

export const photosRequestSuccess = photos => ({
  type: PHOTOS_REQUEST_SUCCESS,
  photos,
});

export const photosRequestError = error => ({
  type: PHOTOS_REQUEST_ERROR,
  error,
});
