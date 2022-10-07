export const API_URL = 'https://api.unsplash.com';
export const API_URL_PHOTOS = `${API_URL}/photos`;
export const API_URL_TOKEN = 'https://unsplash.com/oauth/token';
export const API_URL_AUTH = 'https://unsplash.com/oauth/authorize';
export const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
export const REDIRECT_URI =
  process.env.NODE_ENV === 'production' ? 'https://gallery.rootdiv.ru/' : 'http://localhost:3000/';
export const RESPONSE_TYPE = 'code';
export const SCOPE = 'public read_user read_photos write_likes';
