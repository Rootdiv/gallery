import PropTypes from 'prop-types';
import style from './Photo.module.css';

import Image from './Image';
import Rating from './Rating';
import Time from './Time';

export const Photo = ({ photos }) => {
  const { id, urls, description, user, likes, created_at: created } = photos;

  return (
    <li className={style.card}>
      <div id={id} href={`./photo/${id}`}>
        <Image thumbnail={urls.small} title={description} />
        <div className={style.cardInfo}>
          <Rating likes={likes} />
          <a className={style.cardAuthor} href={user.links.html}>
            {user.name}
          </a>
          <Time date={created} />
        </div>
      </div>
    </li>
  );
};

Photo.propTypes = {
  photos: PropTypes.object,
};
