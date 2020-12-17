import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { renderComment } from '../../../components/Comments/Comments.utils';
import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import { selectEntities as selectProfileComments } from '../../../redux/modules/users/profile/comments/comments.selectors';
import {
  selectEntities as selectUserComments,
  selectPagesTotal,
} from '../../../redux/modules/users/user/comments/comments.selectors';
import { fetchComments } from '../../../redux/modules/users/user/comments/comments.slice';
import { getUserSlug, renderInteractiveTileBasedOnType } from '../../../utils';

function Comments() {
  const dispatch = useDispatch();
  const { userSlug } = useParams();
  const selector =
    userSlug === getUserSlug() ? selectProfileComments : selectUserComments;
  const comments = useSelector(selector);
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

  useEffect(() => {
    dispatch(fetchComments({ page, userSlug }));
  }, [dispatch, page, userSlug]);

  //@TODO: Add empty design component
  if (!comments.length) {
    return 'No comments found';
  }

  return (
    <MuiBox p={2}>
      <Pagination
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
        page={page}
        pagesTotal={pagesTotal}
      />
      <MuiGrid container direction='column' spacing={2}>
        {comments.map((item) => (
          <MuiGrid container item key={item.comment.id} spacing={2}>
            <MuiGrid
              item
              style={{
                width: 220,
              }}
            >
              {renderInteractiveTileBasedOnType(item)}
            </MuiGrid>
            <MuiGrid item xs>
              {renderComment(item.comment)}
            </MuiGrid>
          </MuiGrid>
        ))}
      </MuiGrid>
    </MuiBox>
  );
}

export default Comments;
