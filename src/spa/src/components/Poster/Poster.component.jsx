import PropTypes from 'prop-types';

function Poster({ children, entity, season, size, tmdbId, type }) {
  if (!tmdbId) {
    return null;
  }

  let url = `/images/${entity}/${tmdbId}/${type}?`;
  if (season) {
    url += `season=${season}`;
  }
  if (size) {
    url += `size=${size}`;
  }
  return children(url);
}

Poster.propTypes = {
  children: PropTypes.func.isRequired,
  entity: PropTypes.oneOf(['movie', 'person', 'show']).isRequired,
  season: PropTypes.number,
  size: PropTypes.string,
  tmdbId: PropTypes.number,
  type: PropTypes.oneOf(['backdrop', 'poster', 'profile']),
};

export default Poster;
