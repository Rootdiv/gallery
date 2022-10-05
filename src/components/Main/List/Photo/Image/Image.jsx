import style from './Image.module.css';
import PropTypes from 'prop-types';

export const Image = ({ thumbnail, title }) => <img src={thumbnail} alt={title} className={style.img} />;

Image.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};
