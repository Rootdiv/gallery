import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { urlAuth } from 'api/auth';
import { useAuth } from 'hooks/useAuth';
import { deleteToken } from 'store/tokenReducer';

import style from './Auth.module.css';
import { Text } from 'UI/Text';
import Preloader from 'UI/Preloader';
import SVG from 'UI/Svg';

export const Auth = () => {
  const dispatch = useDispatch();
  const [auth, loading, clearAuth] = useAuth();
  const errorPhoto = useSelector(state => state.auth.error);
  const errorPhotos = useSelector(state => state.photos.error);

  const login = () => {
    if (errorPhoto.includes('403') || errorPhotos.includes('403')) {
      return;
    }
    location.href = urlAuth;
  };

  const logout = () => {
    dispatch(deleteToken());
    clearAuth();
  };

  return (
    <div className={style.container}>
      {loading ? (
        <Preloader color={'#cc6633'} size={34} />
      ) : auth.name ? (
        <div className={style.login}>
          <Link to="/profile" className={style.loginLink}>
            <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} className={style.loginImg} />
            <Text As="p" medium dsize={18} className={style.loginText}>
              {auth.name}
            </Text>
          </Link>
          <button type="button" className={style.logout} onClick={logout}>
            Выйти
          </button>
        </div>
      ) : (
        <button type="button" className={style.authBtn} onClick={login}>
          <SVG itemName={'Login'} width={34} height={34} />
        </button>
      )}
    </div>
  );
};
