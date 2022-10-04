import RingLoader from 'react-spinners/RingLoader';
import PropTypes from 'prop-types';

export const Preloader = ({ color, size }) =>
  <RingLoader color={color} cssOverride={{ display: 'block', margin: 'auto' }} size={size} />;

Preloader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};
