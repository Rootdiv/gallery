import style from './Page404.module.css';
import { Text } from 'UI/Text';
import { Link } from 'react-router-dom';

export const Page404 = () => (
  <div className={style.wrapper}>
    <Text As="h1" color={'orange'} size={24} tsize={26}>
      Ошибка 404
    </Text>
    <Text As="p" center size={16} tsize={18}>
      Запрошенная страница не существует.
    </Text>
    <Link to="/" className="link">
      На главную
    </Link>
  </div>
);
