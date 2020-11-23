import PropTypes from 'prop-types';
import React from 'react';

function Shows({ category }) {
  return <h1>Shows {category}</h1>;
}

Shows.propTypes = {
  category: PropTypes.oneOf([
    'trending',
    'popular',
    'recommended',
    'watched',
    'collected',
    'anticipated',
  ]).isRequired,
};

export default Shows;
