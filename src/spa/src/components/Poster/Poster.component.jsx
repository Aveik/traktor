import PropTypes from 'prop-types';

import usePoster from '../../hooks/usePoster';

function Poster({ children, entity, season, size, tmdbId, type }) {
  const url = usePoster({
    entity,
    season,
    size,
    tmdbId,
    type,
  });
  return children(url);
}

Poster.propTypes = {
  children: PropTypes.func.isRequired,
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  season: PropTypes.number,
  size: PropTypes.string,
  tmdbId: PropTypes.number,
  type: PropTypes.oneOf(['backdrop', 'poster', 'profile']),
};

export default Poster;
