export const USERINFO_REQUEST = 'USERINFO_REQUEST';
const USERINFO_REQUEST_SUCCESS = 'USERINFO_REQUEST_SUCCESS';
const USERINFO_REQUEST_ERROR = 'USERINFO_REQUEST_ERROR';

export const userInfoRequest = username => ({
  type: USERINFO_REQUEST,
  username,
});

export const userInfoRequestSuccess = photos => ({
  type: USERINFO_REQUEST_SUCCESS,
  photos,
});

export const userInfoRequestError = error => ({
  type: USERINFO_REQUEST_ERROR,
  error,
});
