import Auth from './Auth';
import Logo from './Logo';
import style from './Header.module.css';
import { Link, Route, Routes } from 'react-router-dom';

export const Header = () => (
  <header className={style.header}>
    <div className={style.headerContainer}>
      <Logo />
      <Routes>
        <Route
          path="/photo/:id"
          element={
            <Link to="/" className="link">
              На главную
            </Link>
          }
        />
      </Routes>
      <Auth />
    </div>
  </header>
);
