import PropTypes from 'prop-types';
import { ReactComponent as Login } from './image/login.svg';
import { ReactComponent as Logo } from './image/logo.svg';
import { ReactComponent as Like } from './image/like.svg';
import { ReactComponent as Liked } from './image/liked.svg';

const SVGCollection = {
  Login,
  Logo,
  Like,
  Liked,
};

export const SVG = ({ itemName, className, width, height }) => {
  const Item = SVGCollection[itemName];
  return <Item className={className} width={width} height={height} />;
};

SVG.propTypes = {
  itemName: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
