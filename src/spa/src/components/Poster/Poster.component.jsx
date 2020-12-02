import PropTypes from 'prop-types';
import React from 'react';

function Poster({ entity, id, season, size, type }) {
  if (!id) {
    return null;
  }

  let url = `/images/${entity}/${id}/${type}?`;
  if (season) {
    url += `season=${season}`;
  }
  if (size) {
    url += `size=${size}`;
  }
  //@TODO: remove styling when implementing actual HOC
  return (
    <img
      alt='poster'
      src={url}
      style={{
        display: 'block',
        margin: '12px 0',
        maxWidth: '100%',
      }}
    />
  );
}

Poster.propTypes = {
  entity: PropTypes.oneOf(['movie', 'person', 'show']).isRequired,
  id: PropTypes.number,
  season: PropTypes.number,
  size: PropTypes.string,
  type: PropTypes.oneOf(['backdrop', 'poster', 'profile']),
};

export default Poster;
