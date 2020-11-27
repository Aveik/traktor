import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination.component';
import usePagination from '../../hooks/usePagination';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import {
  selectMovies,
  selectPagesTotal,
} from '../../redux/modules/movies/movies.selectors';
import { fetchMovies } from '../../redux/modules/movies/movies.slice';

function Movies({ category }) {
  const dispatch = useDispatch();
  const {
    hasNextPage,
    hasPreviousPage,
    page,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(selectPagesTotal);
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'movies/fetch'),
  );
  const movies = useSelector(selectMovies);

  useEffect(() => {
    dispatch(fetchMovies({ category, page }));
  }, [category, dispatch, page]);

  return (
    <>
      <Pagination
        disabled={fetching}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
      />
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
