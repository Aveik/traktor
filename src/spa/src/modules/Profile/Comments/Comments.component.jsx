import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import {
  selectEntities,
  selectPagesTotal,
} from '../../../redux/modules/profile/comments/comments.selectors';
import { fetchComments } from '../../../redux/modules/profile/comments/comments.slice';

function Comments() {
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
    selectLoadingFlag(state, 'profile/comments/fetch'),
  );
  const comments = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchComments(page));
  }, [dispatch, page]);

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
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
}

export default Comments;
