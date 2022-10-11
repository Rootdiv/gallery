import Auth from './Auth';
import Logo from './Logo';
import style from './Header.module.css';
import { useLocation, Link } from 'react-router-dom';
import Search from './Search';

export const Header = () => {
  const location = useLocation();
  return (
    <header className={style.header}>
      <div className={style.headerContainer}>
        <Logo />
        <Search />
        {location.pathname !== '/' && (
          <Link to="/" className="link">
            На главную
          </Link>
        )}
        <Auth />
      </div>
    </header>
  );
};
