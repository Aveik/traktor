import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Pagination from '../../components/Pagination/Pagination.component';
import usePagination from '../../hooks/usePagination';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import {
  selectEntities,
  selectPagesTotal,
} from '../../redux/modules/comments/comments.selectors';
import {
  fetchComments,
  fetchMovieAndComments,
} from '../../redux/modules/comments/comments.slice';
import { selectEntity as selectMovie } from '../../redux/modules/movie/movie.selectors';
import { selectEntity as selectShow } from '../../redux/modules/show/show.selectors';

//@TODO: Add redux module for this component
function Comments({ entity }) {
  const fetchingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const isFirstRender = useRef(true);
  const { slug } = useParams();
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
  const { stats, summary } = useSelector(entity ? selectMovie : selectShow);
  const comments = useSelector(selectEntities);
  const fetching = useSelector((state) =>
    fetchingSelector(state, ['comments/fetch', 'movie/fetch', 'show/fetch']),
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchMovieAndComments({ entity, page, slug, sort: 'highest' }));
      return;
    }
    dispatch(fetchComments({ entity, page, slug, sort: 'highest' }));
  }, [dispatch, entity, page, slug]);

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
      <h1>Summary</h1>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
      <h1>Stats</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <h1>Comments</h1>
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
}

Comments.propTypes = {
  entity: PropTypes.oneOf(['movies', 'shows']),
};

export default Comments;
