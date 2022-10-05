import style from './List.module.css';
import { useEffect, useRef } from 'react';
import Photo from './Photo';
import Preloader from 'UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { photosRequestAsync } from 'store/photos/photosAction';
import { photosSlice } from 'store/photos/photosSlice';
import { generateRandomId } from 'utils/generateRandomId';

export const List = () => {
  const loading = useSelector(state => state.photos.loading);
  const photos = useSelector(state => state.photos.photos);
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
        rootMargin: '100px',
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
      <ul className={style.grid}>
        {photos.map(photos => (
          <Photo key={generateRandomId()} photos={photos} />
        ))}
        {page !== 1 && loading && <Preloader color="#56af27" size={150} />}
      </ul>
      <div className={style.end} ref={endList} />
    </>
  );
};
