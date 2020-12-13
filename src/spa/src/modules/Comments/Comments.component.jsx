import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {
  DEFAULT_SORT_OPTION,
  renderComment,
} from '../../components/Comments/Comments.utils';
import Editor from '../../components/Comments/Editor/Editor.component';
import Sort from '../../components/Comments/Sort/Sort.component';
import Pagination from '../../components/Pagination/Pagination.component';
import usePagination from '../../hooks/usePagination';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import {
  selectEntities,
  selectPagesTotal,
} from '../../redux/modules/comments/comments.selectors';
import {
  fetchComments,
  fetchEntityAndComments,
} from '../../redux/modules/comments/comments.slice';
import { selectEntity as selectMovie } from '../../redux/modules/movie/movie.selectors';
import { selectEntity as selectShow } from '../../redux/modules/show/show.selectors';
import { postComment } from '../../redux/modules/users/comments/comments.slice';

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
  const { stats, summary } = useSelector(
    entity === 'movies' ? selectMovie : selectShow,
  );
  const comments = useSelector(selectEntities);
  const fetching = useSelector((state) =>
    fetchingSelector(state, ['comments/fetch', 'movie/fetch', 'show/fetch']),
  );
  const [sort, setSort] = useState(DEFAULT_SORT_OPTION);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      dispatch(fetchEntityAndComments({ entity, page, slug, sort: 'highest' }));
      return;
    }
    dispatch(fetchComments({ entity, page, slug, sort }));
  }, [dispatch, entity, page, slug, sort]);

  function handleSubmit({ reset, ...comment }) {
    dispatch(
      postComment({
        ...comment,
        entity,
        slug,
      }),
    ).then(reset);
  }

  return (
    <>
      <h1>Summary</h1>
      <pre>{JSON.stringify(summary, null, 2)}</pre>
      <h1>Stats</h1>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
      <h1>Comments</h1>
      {fetching && <div>Loading...</div>}
      <Sort onChange={setSort} value={sort} />
      <Pagination
        disabled={fetching}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
      />
      <Editor onSubmit={handleSubmit} />
      {comments.map((comment) => renderComment(comment))}
    </>
  );
}

Comments.propTypes = {
  entity: PropTypes.oneOf(['movies', 'shows']),
};

export default Comments;
