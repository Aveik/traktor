import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/users/lists/lists.selectors';
import {
  addList,
  fetchLists,
  removeList,
} from '../../../redux/modules/users/lists/lists.slice';
import { getUserSlug } from '../../../utils';

function Lists() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'users/lists/fetch'),
  );
  const lists = useSelector(selectEntities);
  const canManage = userSlug === getUserSlug();

  useEffect(() => {
    dispatch(fetchLists(userSlug));
  }, [dispatch, userSlug]);

  function handleAdd() {
    dispatch(
      addList({
        allowComments: false,
        description: 'This is my list',
        name: 'My list',
      }),
    );
  }

  function handleRemove() {
    dispatch(removeList('my-list'));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      {canManage && (
        <>
          <button onClick={handleAdd} type='button'>
            Add list
          </button>
          <button onClick={handleRemove} type='button'>
            Remove list
          </button>
        </>
      )}
      <pre>{JSON.stringify(lists, null, 2)}</pre>
    </>
  );
}

export default Lists;
