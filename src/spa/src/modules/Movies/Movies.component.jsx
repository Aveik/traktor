import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlagFactory } from '../../redux/loading/loading.selectors';
import { selectMovies } from '../../redux/modules/movies/movies.selectors';
import { fetchMovies } from '../../redux/modules/movies/movies.slice';

function Movies({ category }) {
  const dispatch = useDispatch();
  const selectLoadingFlag = useMemo(selectLoadingFlagFactory, []);
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'movies/fetch'),
  );
  const movies = useSelector(selectMovies);

  useEffect(() => {
    dispatch(fetchMovies(category));
  }, [category, dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </>
  );
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
