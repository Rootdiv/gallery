import style from './Auth.module.css';
import { ReactComponent as LoginSvg } from './img/login.svg';

export const Auth = () => (
  <button className={style.button}>
    <LoginSvg className={style.svg} />
  </button>
);
