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
import Masonry from 'react-masonry-component';

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
    if (type === 'photos') {
      // На странице поиска запрос фотографий не нужен
      dispatch(photosSlice.actions.firstPhotos());
      dispatch(photosRequestAsync());
    }
  }, [pageList]);

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

  const masonryOptions = {
    itemSelector: 'li',
    isFitWidth: true,
    gutter: 10,
  };

  return (
    <>
      {page === 1 && loading && <Preloader color="#56af27" size={150} />}
      {!error.includes('403') ? (
        <>
          <Masonry elementType={'ul'} className={style.grid} options={masonryOptions}>
            {photos.map(photos => (
              <Photo key={generateRandomId()} photos={photos} />
            ))}
          </Masonry>
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
