import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { urlAuth } from 'api/auth';
import { useAuth } from 'hooks/useAuth';
import { deleteToken } from 'store/tokenReducer';

import style from './Auth.module.css';
import { ReactComponent as LoginSvg } from './img/login.svg';
import { Text } from 'UI/Text';
import Preloader from 'UI/Preloader';

export const Auth = () => {
  const dispatch = useDispatch();
  const [auth, loading, clearAuth] = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const login = () => {
    location.href = urlAuth;
  };

  const getOut = () => {
    setShowLogout(!showLogout);
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
        <>
          <button type="button" className={style.login} onClick={getOut}>
            <img src={auth.img} title={auth.name} alt={`Аватар ${auth.name}`} className={style.loginImg} />
            <Text As="p" medium dsize={18} className={style.loginText}>
              {auth.name}
            </Text>
          </button>
          {showLogout && (
            <button className={style.logout} onClick={logout}>
              Выйти
            </button>
          )}
        </>
      ) : (
        <button type="button" className={style.authBtn} onClick={login}>
          <LoginSvg className={style.svg} />
        </button>
      )}
    </div>
  );
};
