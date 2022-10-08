import axios from 'axios';
import { API_URL_PHOTOS } from './const';

export const likeUpdate = (id, token, method) => {
  const url = new URL(`${API_URL_PHOTOS}/${id}/like`);
  if (!token) return;

  const likeData = {};

  axios(url.href, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(({ data }) => {
      likeData['likes'] = data.photo.likes;
      likeData['liked'] = data.photo.liked_by_user;
    })
    .catch(error => ({ error: error.toString() }));

  return likeData;
};
