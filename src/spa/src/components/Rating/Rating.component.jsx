import { Rating as MuiRating } from '@material-ui/lab';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Rating({ onChange, value: initialValue = 0 }) {
  const [value, setValue] = useState(initialValue);

  function handleChange(_, value) {
    setValue(value);
    onChange(value);
  }

  return <MuiRating max={10} name='_' onChange={handleChange} value={value} />;
}

Rating.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Rating;
