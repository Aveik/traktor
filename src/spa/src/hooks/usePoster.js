import { transformEntityToSingular } from '../utils';

function usePoster({ entity, season, size, tmdbId, type }) {
  entity = transformEntityToSingular(entity);
  if (!tmdbId) {
    return '/images/placeholder.png';
  }

  let url = `/images/${entity}/${tmdbId}/${type}?`;
  if (season) {
    url += `season=${season}`;
  }
  if (size) {
    url += `size=${size}`;
  }
  return url;
}

export default usePoster;
