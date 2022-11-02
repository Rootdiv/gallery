export const PHOTO_REQUEST = 'PHOTO_REQUEST';
const PHOTO_REQUEST_SUCCESS = 'PHOTO_REQUEST_SUCCESS';
const PHOTO_REQUEST_ERROR = 'PHOTO_REQUEST_ERROR';

export const photoRequest = id => ({
  type: PHOTO_REQUEST,
  id,
});

export const photoRequestSuccess = (photo, likes, isLiked) => ({
  type: PHOTO_REQUEST_SUCCESS,
  photo,
  likes,
  isLiked,
});

export const photoRequestError = error => ({
  type: PHOTO_REQUEST_ERROR,
  error,
});
