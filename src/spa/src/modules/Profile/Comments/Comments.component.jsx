import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectComments } from '../../../redux/modules/profile/profile.selectors';
import { fetchComments } from '../../../redux/modules/profile/profile.slice';

function Comments() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/comments/fetch'),
  );
  const comments = useSelector(selectComments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(comments, null, 2)}</pre>
    </>
  );
}

export default Comments;
