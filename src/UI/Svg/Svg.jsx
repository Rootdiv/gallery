import PropTypes from 'prop-types';
import { ReactComponent as Logo } from './image/logo.svg';
import { ReactComponent as Login } from './image/login.svg';

const SVGCollection = {
  Logo,
  Login,
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
