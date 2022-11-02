import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { photoRequest } from 'store/photo/photoAction';

export const usePhotoData = id => {
  const loading = useSelector(state => state.photo.loading);
  const photo = useSelector(state => state.photo.photo);
  const likes = useSelector(state => state.photo.likes);
  const isLiked = useSelector(state => state.photo.isLiked);
  const error = useSelector(state => state.photo.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photoRequest(id));
  }, []);

  return [loading, photo, likes, isLiked, error];
};
