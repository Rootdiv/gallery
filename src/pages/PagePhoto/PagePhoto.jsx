import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { photoRequestAsync } from 'store/photo/photoAction';
import { photoSlice } from 'store/photo/photoSlice';
import formatDate from 'utils/formatDate';
import style from './PagePhoto.module.css';
import Preloader from 'UI/Preloader';
import SVG from 'UI/Svg';

export const PagePhoto = () => {
  const photo = useSelector(state => state.photo.photo);
  const [liked, setLiked] = useState(photo.liked_by_user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(photoSlice.actions.newPhoto());
    dispatch(photoRequestAsync(id));
  }, []);

  const handleLaked = () => {
    setLiked(!liked);
  };

  return (
    <div className={style.photoWrapper}>
      {!photo.id ? (
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
              <SVG itemName={liked ? 'Liked' : 'Like'} className={style.svg} height={20} width={20} />
              {liked ? photo.likes + 1 : photo.likes}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
