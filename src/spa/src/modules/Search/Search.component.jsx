import PropTypes from 'prop-types';
import React from 'react';

function Search({ type }) {
  return <h1>Search - {type || 'fulltext'}</h1>;
}

Search.propTypes = {
  type: PropTypes.oneOf(['movies', 'shows', 'people']),
};

export default Search;
