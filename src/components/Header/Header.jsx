import Auth from './Auth';
import Logo from './Logo';
import style from './Header.module.css';

export const Header = () => (
  <header className={style.header}>
    <div className={style.headerContainer}>
      <Logo />
      <Auth />
    </div>
  </header>
);
