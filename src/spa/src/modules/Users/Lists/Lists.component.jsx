import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectEntities as selectProfileLists } from '../../../redux/modules/users/profile/lists/lists.selectors';
import {
  addList,
  removeList,
} from '../../../redux/modules/users/profile/lists/lists.slice';
import { selectEntities as selectUserLists } from '../../../redux/modules/users/user/lists/lists.selectors';
import { fetchLists } from '../../../redux/modules/users/user/lists/lists.slice';
import { getUserSlug } from '../../../utils';

function Lists() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector(
    userSlug === getUserSlug() ? selectProfileLists : selectUserLists,
  );

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

  //@TODO: Add empty design component
  if (!lists.length) {
    return 'No lists found';
  }

  return (
    <>
      <button onClick={handleAdd} type='button'>
        Add list
      </button>
      <button onClick={handleRemove} type='button'>
        Remove list
      </button>
      <pre>{JSON.stringify(lists, null, 2)}</pre>
    </>
  );
}

export default Lists;
