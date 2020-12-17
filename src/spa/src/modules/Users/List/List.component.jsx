import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectEntity as selectProfileList } from '../../../redux/modules/users/profile/list/list.selectors';
import { selectEntity as selectUserList } from '../../../redux/modules/users/user/list/list.selectors';
import { fetchList } from '../../../redux/modules/users/user/list/list.slice';
import { getUserSlug, renderInteractiveTileBasedOnType } from '../../../utils';

function List() {
  const { id, userSlug } = useParams();
  const dispatch = useDispatch();
  const list = useSelector(
    userSlug === getUserSlug() ? selectProfileList : selectUserList,
  );

  useEffect(() => {
    dispatch(fetchList({ id, userSlug }));
  }, [dispatch, id, userSlug]);

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {list.items.map((item) =>
          renderInteractiveTileBasedOnType(item, MuiGrid, {
            item: true,
            xs: 2,
          }),
        )}
      </MuiGrid>
    </MuiBox>
  );
}

export default List;
