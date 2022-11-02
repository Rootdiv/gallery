export const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_REQUEST_SUCCESS = 'AUTH_REQUEST_SUCCESS';
const AUTH_REQUEST_ERROR = 'AUTH_REQUEST_ERROR';

export const authRequest = () => ({
  type: AUTH_REQUEST,
});

export const authRequestSuccess = data => ({
  type: AUTH_REQUEST_SUCCESS,
  data,
});

export const authRequestError = error => ({
  type: AUTH_REQUEST_ERROR,
  error,
});
