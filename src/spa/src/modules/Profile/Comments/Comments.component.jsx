import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import {
  selectComments,
  selectCommentsPagesTotal,
} from '../../../redux/modules/profile/profile.selectors';
import { fetchComments } from '../../../redux/modules/profile/profile.slice';

function Comments() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/comments/fetch'),
  );
  const comments = useSelector(selectComments);
  const {
    hasNextPage,
    hasPreviousPage,
    page,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(selectCommentsPagesTotal);

  useEffect(() => {
    dispatch(fetchComments(page));
  }, [dispatch, page]);

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
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
}

export default Comments;
