import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectLists } from '../../../redux/modules/profile/profile.selectors';
import { fetchLists } from '../../../redux/modules/profile/profile.slice';

function Lists() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/lists/fetch'),
  );
  const lists = useSelector(selectLists);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(lists, null, 2)}</pre>
    </>
  );
}

export default Lists;
