import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../components/Pagination/Pagination.component';
import usePagination from '../../hooks/usePagination';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import {
  selectPagesTotal,
  selectShows,
} from '../../redux/modules/shows/shows.selectors';
import { fetchShows } from '../../redux/modules/shows/shows.slice';

function Shows({ category }) {
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
    selectLoadingFlag(state, 'shows/fetch'),
  );
  const shows = useSelector(selectShows);

  useEffect(() => {
    dispatch(fetchShows({ category, page }));
  }, [category, dispatch, page]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <Pagination
        disabled={fetching}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
      />
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
