import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination.component';
import usePagination from '../../hooks/usePagination';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import {
  selectPagesTotal,
  selectSearchResults,
} from '../../redux/modules/search/search.selectors';
import { fetchSearchResults } from '../../redux/modules/search/search.slice';

function Search({ type }) {
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { query = '' } = useMemo(() => Object.fromEntries(searchParams), [
    searchParams,
  ]);
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'search/fetch'),
  );
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    dispatch(fetchSearchResults({ page, query, type }));
  }, [dispatch, page, query, type]);

  function handleQueryChange({ target: { value } }) {
    setSearchParams({ query: value });
  }

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
      {fetching && <div>Loading...</div>}
      <input onChange={handleQueryChange} type='text' value={query} />
      <pre>{JSON.stringify(searchResults, null, 2)}</pre>
    </>
  );
}

Search.propTypes = {
  type: PropTypes.oneOf(['all', 'movies', 'shows', 'people']),
};

export default Search;
