import PropTypes from 'prop-types';
import React from 'react';

function Movies({ category }) {
  return <h1>Movies - {category}</h1>;
}

Movies.propTypes = {
  category: PropTypes.oneOf([
    'trending',
    'popular',
    'recommended',
    'watched',
    'collected',
    'anticipated',
  ]).isRequired,
};

export default Movies;
