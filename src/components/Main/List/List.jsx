import style from './List.module.css';
import { useEffect, useRef } from 'react';
import Photo from './Photo';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { photosRequestAsync } from 'store/photos/photosAction';
import { photosSlice } from 'store/photos/photosSlice';
import { generateRandomId } from 'utils/generateRandomId';
import { Text } from 'UI/Text';

export const List = () => {
  const loading = useSelector(state => state.photos.loading);
  const photos = useSelector(state => state.photos.photos);
  const error = useSelector(state => state.photos.error);
  const page = useSelector(state => state.photos.page);
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(photosSlice.actions.firstPhotos());
    dispatch(photosRequestAsync());
  }, []);

  useEffect(() => {
    if (!photos.length) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          dispatch(photosRequestAsync());
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
        <ul className={style.grid}>
          {photos.map(photos => (
            <Photo key={generateRandomId()} photos={photos} />
          ))}
          {page !== 1 && loading && <Preloader color="#56af27" size={150} />}
        </ul>
      ) : (
        <Text As="h1" center tsize={20}>
          Исчерпан лимит запросов, повторите попытку через 1 час
        </Text>
      )}
      <div className={style.end} ref={endList} />
    </>
  );
};
