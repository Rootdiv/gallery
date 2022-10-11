import style from './List.module.css';
import { useEffect, useRef } from 'react';
import Photo from './Photo';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { photosRequestAsync } from 'store/photos/photosAction';
import { photosSlice } from 'store/photos/photosSlice';
import { generateRandomId } from 'utils/generateRandomId';
import { Text } from 'UI/Text';
import { useLocation } from 'react-router-dom';
import { searchRequestAsync } from 'store/search/searchAction';

export const List = () => {
  const location = useLocation();
  const pageList = location.pathname !== '/search';
  const type = pageList ? 'photos' : 'search';
  const loading = useSelector(state => state[type].loading);
  const photos = useSelector(state => state[type].photos);
  const error = useSelector(state => state[type].error);
  const page = useSelector(state => state[type].page);
  const search = useSelector(state => state.search.search);
  const totalPages = useSelector(state => state.search.total_pages);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'search' && search.trim() !== '') {
      // На странице поиска при gecnjq запросе ничего не далаем
      dispatch(searchRequestAsync(search));
    } else if (type === 'photos') {
      // На странице поиска запрос фотографий не нужен
      dispatch(photosSlice.actions.firstPhotos());
      dispatch(photosRequestAsync());
    }
  }, []);

  useEffect(() => {
    if (!photos.length) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          if (type === 'search' && page <= totalPages) {
            dispatch(searchRequestAsync(search));
          } else {
            dispatch(photosRequestAsync());
          }
        }
      },
      {
        rootMargin: '50px',
      },
    );

    observer.observe(endList.current);

    return () => {
      if (endList.current) {
        observer.unobserve(endList.current);
      }
    };
  }, [page]);

  return (
    <>
      {page === 1 && loading && <Preloader color="#56af27" size={150} />}
      {!error.includes('403') ? (
        <>
          <ul className={style.grid}>
            {photos.map(photos => (
              <Photo key={generateRandomId()} photos={photos} />
            ))}
          </ul>
          {page !== 1 && loading && <Preloader color="#56af27" size={150} />}
        </>
      ) : (
        <Text As="h1" center tsize={20}>
          Исчерпан лимит запросов, повторите попытку через 1 час
        </Text>
      )}
      <div className={style.end} ref={endList} />
    </>
  );
};
