import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './PageProflie.module.css';
import { userInfoSlice } from 'store/userInfo/userInfoSlice';
import { userInfoRequestAsync } from 'store/userInfo/userInfoAction';
import { Link, useNavigate } from 'react-router-dom';
import SVG from 'UI/Svg';
import Preloader from 'UI/Preloader';
import { declOfNum } from 'utils/declOfNum';

export const PageProflie = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const token = useSelector(state => state.token.token);
  const auth = useSelector(state => state.auth.data);
  const loading = useSelector(state => state.userInfo.loading);
  const photos = useSelector(state => state.userInfo.photos);

  useEffect(() => {
    if (!token) {
      navigation('/');
    }
    dispatch(userInfoSlice.actions.newUserInfo());
    dispatch(userInfoRequestAsync(auth.username));
  }, [auth]);

  return loading ? (
    <Preloader color="#56af27" size={150} />
  ) : (
    <div className={style.wrapper}>
      <div className={style.likeTotal}>Всего поставлено лайков: {photos.length}</div>
      <ul className={style.listPhoto}>
        {photos.map(({ id, urls, description, likes }) => (
          <li key={id} className={style.itemPhoto}>
            <Link to={`/photo/${id}`} className={style.photoLink}>
              <img src={urls.thumb} alt={description} className={style.img} />
            </Link>
            <div className={style.photoLike}>
              <SVG itemName={'Liked'} className={style.svg} height={20} width={20} />
              Всего {declOfNum(likes, ['лайк', 'лайка', 'лайков'])}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
