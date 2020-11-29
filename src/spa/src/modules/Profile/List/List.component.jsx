import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntity } from '../../../redux/modules/profile/list/list.selectors';
import { fetchList } from '../../../redux/modules/profile/list/list.slice';

function List() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'list/fetch'),
  );
  const list = useSelector(selectEntity);

  useEffect(() => {
    dispatch(fetchList(id));
  }, [dispatch, id]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </>
  );
}

export default List;
