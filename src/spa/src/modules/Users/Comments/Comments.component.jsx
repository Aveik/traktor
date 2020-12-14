import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { renderComment } from '../../../components/Comments/Comments.utils';
import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import {
  selectEntities,
  selectPagesTotal,
} from '../../../redux/modules/users/comments/comments.selectors';
import { fetchComments } from '../../../redux/modules/users/comments/comments.slice';

function Comments() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const {
    hasNextPage,
    hasPreviousPage,
    page,
    pagesTotal,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(selectPagesTotal);
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'users/comments/fetch'),
  );
  const comments = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchComments({ page, userSlug }));
  }, [dispatch, page, userSlug]);

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
        page={page}
        pagesTotal={pagesTotal}
      />
      {comments.map(({ comment, type }) => renderComment(comment))}
    </>
  );
}

export default Comments;
