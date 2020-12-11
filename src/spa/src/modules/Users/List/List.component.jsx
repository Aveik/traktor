import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntity } from '../../../redux/modules/users/list/list.selectors';
import { fetchList } from '../../../redux/modules/users/list/list.slice';

function List() {
  const { id, userSlug } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'list/fetch'),
  );
  const list = useSelector(selectEntity);

  useEffect(() => {
    dispatch(fetchList({ id, userSlug }));
  }, [dispatch, id, userSlug]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </>
  );
}

export default List;
