import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { selectShows } from '../../redux/modules/shows/shows.selectors';
import { fetchShows } from '../../redux/modules/shows/shows.slice';

function Shows({ category }) {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'shows/fetch'),
  );
  const shows = useSelector(selectShows);

  useEffect(() => {
    dispatch(fetchShows(category));
  }, [category, dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(shows, null, 2)}</pre>
    </>
  );
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
