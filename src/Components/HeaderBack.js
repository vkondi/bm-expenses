import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {OFF_WHITE} from '@constants/Colors';

const HeaderBack = ({onPress, color, size}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesomeIcon
        icon={['fas', 'chevron-left']}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

HeaderBack.propTypes = {
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

HeaderBack.defaultProps = {
  onPress: () => {},
  color: OFF_WHITE,
  size: 30,
};

const Memoiz = React.memo(HeaderBack);
export default Memoiz;
