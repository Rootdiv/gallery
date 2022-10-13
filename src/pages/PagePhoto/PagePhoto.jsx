import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { photoSlice } from 'store/photo/photoSlice';
import formatDate from 'utils/formatDate';
import style from './PagePhoto.module.css';
import Preloader from 'UI/Preloader';
import SVG from 'UI/Svg';
import { Text } from 'UI/Text';
import { likeUpdate } from 'api/like';
import { usePhotoData } from 'hooks/usePhotoData';

export const PagePhoto = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, photo, likes, isLiked, error] = usePhotoData(id);
  const token = useSelector(state => state.token.token);

  useEffect(() => {
    dispatch(photoSlice.actions.newPhoto());
  }, []);

  const handleLaked = () => {
    if (!token) return;
    dispatch(photoSlice.actions.changeLike());
    const method = isLiked ? 'DELETE' : 'POST';
    likeUpdate(id, token, method);
  };

  return !error.includes('403') ? (
    <div className={style.photoWrapper}>
      {loading || !photo.id ? (
        <Preloader color="#56af27" size={150} />
      ) : (
        <>
          <img className={style.photoPicture} src={photo.urls.regular} alt={photo.description} />
          <a className={style.photoAuthor} href={photo.user.links.html}>
            <img
              className={style.photoPicture}
              src={photo.user.profile_image.medium}
              alt={photo.user.bio}
              title={photo.user.name}
            />
            <span>{photo.user.name}</span>
          </a>
          <div className={style.photoInfo}>
            <p>{formatDate(photo.created_at)}</p>
            <button id={photo.id} type="button" className={style.photoLike} onClick={handleLaked}>
              <SVG itemName={isLiked ? 'Liked' : 'Like'} width={20} height={20} />
              {likes}
            </button>
          </div>
        </>
      )}
    </div>
  ) : (
    <Text As="h1" center tsize={20}>
      Исчерпан лимит запросов, повторите попытку через 1 час
    </Text>
  );
};
