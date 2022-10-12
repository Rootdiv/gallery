import axios from 'axios';
import { ACCESS_KEY, API_URL_TOKEN, SECRET_KEY, REDIRECT_URI } from './const.js';

export const setToken = token => {
  localStorage.setItem('Bearer', token);
};

export const getToken = () => {
  let token = '';
  if (location.search.includes('code')) {
    const code = new URLSearchParams(location.search).get('code');
    const url = new URL(API_URL_TOKEN);
    url.searchParams.append('client_id', ACCESS_KEY);
    url.searchParams.append('client_secret', SECRET_KEY);
    url.searchParams.append('redirect_uri', REDIRECT_URI);
    url.searchParams.append('code', code);
    url.searchParams.append('grant_type', 'authorization_code');

    axios
      .post(url)
      .then(({ data }) => {
        token = data.access_token;
        setToken(data.access_token);
        location.replace('/');
      })
      .catch(err => {
        console.error('Произошла ошибка: ', err.message);
      });
  }

  if (localStorage.getItem('Bearer')) {
    token = localStorage.getItem('Bearer');
  }

  return token;
};
