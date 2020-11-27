import PropTypes from 'prop-types';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { selectSearchResults } from '../../redux/modules/search/search.selectors';
import { fetchSearchResults } from '../../redux/modules/search/search.slice';

function Search({ type }) {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { query = '' } = useMemo(() => Object.fromEntries(searchParams), [
    searchParams,
  ]);
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'search/fetch'),
  );
  const searchResults = useSelector(selectSearchResults);

  useEffect(() => {
    dispatch(fetchSearchResults({ query, type }));
  }, [dispatch, type, query]);

  function handleQueryChange({ target: { value } }) {
    setSearchParams({ query: value });
  }

  return (
    <>
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
