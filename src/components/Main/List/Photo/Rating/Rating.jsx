import style from './Rating.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { likeUpdate } from 'api/like';
import SVG from 'UI/Svg';
import { useEffect, useState } from 'react';

export const Rating = ({ id, likes, liked }) => {
  const token = useSelector(state => state.token.token);
  const [isLikedByUser, setIsLikedByUser] = useState(liked);
  const [likesByUser, setLikesByUser] = useState(likes);
  const [sendLike, setSendLike] = useState(false);
  const [method, setMethod] = useState('POST');

  useEffect(() => {
    setSendLike(false);
    if (!sendLike) return;
    likeUpdate(id, token, method);
  }, [sendLike]);

  const handleLaked = () => {
    if (!token) return;
    setSendLike(true);

    if (isLikedByUser) {
      setLikesByUser(likes - 1);
      setIsLikedByUser(false);
      setMethod('DELETE');
    }
    if (likesByUser === likes - 1) {
      setLikesByUser(likesByUser + 1);
      setIsLikedByUser(true);
      setMethod('POST');
    }
    if (!isLikedByUser) {
      setLikesByUser(likes + 1);
      setIsLikedByUser(true);
      setMethod('POST');
    }
    if (likesByUser - 1 === likes) {
      setLikesByUser(likesByUser - 1);
      setIsLikedByUser(false);
      setMethod('DELETE');
    }
  };

  return (
    <button id={id} type="button" className={style.cardPhotoLike} onClick={handleLaked}>
      <SVG itemName={isLikedByUser ? 'Liked' : 'Like'} className={style.svg} height={20} width={20} />
      {likesByUser}
    </button>
  );
};

Rating.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
  liked: PropTypes.bool,
};
