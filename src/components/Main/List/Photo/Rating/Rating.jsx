import style from './Rating.module.css';
import PropTypes from 'prop-types';

export const Rating = ({ likes }) => <button className={style.cardPhotoLike}>{likes}</button>;

Rating.propTypes = {
  likes: PropTypes.number,
};
