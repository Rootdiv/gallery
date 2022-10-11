import PropTypes from 'prop-types';
import style from './Photo.module.css';

import Image from './Image';
import Rating from './Rating';
import Time from './Time';
import { Link } from 'react-router-dom';
import { Text } from 'UI/Text';

export const Photo = ({
  photos: { id, urls, description, user, likes, created_at: created, liked_by_user: liked },
}) => (
  <li className={style.card}>
    <Link to={`/photo/${id}`} className={style.cardLink}>
      <Image thumbnail={urls.small} title={description} />
    </Link>
    <div className={style.cardInfo}>
      <Rating likes={likes} id={id} liked={liked} />
      <Text As="a" className={style.cardAuthor} href={user.links.html}>
        {user.name}
      </Text>
      <Time date={created} />
    </div>
  </li>
);

Photo.propTypes = {
  photos: PropTypes.object,
};
