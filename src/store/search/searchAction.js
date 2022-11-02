export const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_REQUEST_SUCCESS = 'SEARCH_REQUEST_SUCCESS';
const SEARCH_REQUEST_ERROR = 'SEARCH_REQUEST_ERROR';

export const searchRequest = search => ({
  type: SEARCH_REQUEST,
  search,
});

export const searchRequestSuccess = (search, photos, totalPages) => ({
  type: SEARCH_REQUEST_SUCCESS,
  search,
  photos,
  total_pages: totalPages,
});

export const searchRequestError = error => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});
