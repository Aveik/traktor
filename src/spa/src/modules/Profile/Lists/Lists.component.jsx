import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/profile/lists/lists.selectors';
import {
  addList,
  fetchLists,
  removeList,
} from '../../../redux/modules/profile/lists/lists.slice';

function Lists() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/lists/fetch'),
  );
  const lists = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchLists());
  }, [dispatch]);

  function handleAdd() {
    dispatch(
      addList({
        allowComments: false,
        description: 'the new list for testing purposes',
        name: 'new list',
        privacy: 'public',
      }),
    );
  }

  function handleRemove() {
    dispatch(removeList('new-list'));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleAdd} type='submit'>
        Add list
      </button>
      <button onClick={handleRemove} type='submit'>
        Remove list
      </button>
      <pre>{JSON.stringify(lists, null, 2)}</pre>
    </>
  );
}

export default Lists;
