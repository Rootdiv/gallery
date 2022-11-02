import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import style from './Search.module.css';
import SVG from 'UI/Svg';
import { searchSlice } from 'store/search/searchSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchRequest } from 'store/search/searchAction';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigation = useNavigate();
  const location = useLocation();
  const isSearchPage = location.pathname === '/search';

  useEffect(() => {
    // Сбрасываем строку поиска всех страницах кроме search
    !isSearchPage && setSearch('');
  }, [isSearchPage]);

  const handlerSubmit = event => {
    event.preventDefault();
    dispatch(searchSlice.actions.newSearch());
    if (search.trim() !== '') {
      dispatch(searchRequest(search));
    }
    navigation('/search');
  };

  const handlerSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input type="search" className={style.search} onChange={handlerSearch} value={search} />
      <button className={style.button} type="submit">
        <SVG itemName={'Search'} />
      </button>
    </form>
  );
};
