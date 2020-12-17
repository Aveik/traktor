import {
  Box as MuiBox,
  Grid as MuiGrid,
  Typography as MuiTypography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Editor from '../../../components/Lists/Editor/Editor.component';
import List from '../../../components/Lists/List/List.component';
import TileGroup from '../../../components/tiles/TileGroup/TileGroup.component';
import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities as selectProfileLists } from '../../../redux/modules/users/profile/lists/lists.selectors';
import { addList } from '../../../redux/modules/users/profile/lists/lists.slice';
import { selectEntities as selectUserLists } from '../../../redux/modules/users/user/lists/lists.selectors';
import { fetchLists } from '../../../redux/modules/users/user/lists/lists.slice';
import { getUserSlug } from '../../../utils';

function Lists() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const lists = useSelector(
    userSlug === getUserSlug() ? selectProfileLists : selectUserLists,
  );
  const isAddingList = useSelector((state) =>
    selectLoadingFlag(state, 'users/lists/add'),
  );
  useEffect(() => {
    dispatch(fetchLists(userSlug));
  }, [dispatch, userSlug]);

  //@TODO: Add empty design component
  if (!lists.length) {
    return 'No lists found';
  }

  function handleSubmit({ reset, ...list }) {
    dispatch(addList(list)).then(reset);
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container direction='column' spacing={2}>
        {userSlug === getUserSlug() && (
          <>
            <MuiGrid item>
              <MuiTypography id='actors' variant='h5'>
                Create new list
              </MuiTypography>
            </MuiGrid>
            <MuiGrid item>
              <Editor disabled={isAddingList} onSubmit={handleSubmit} />
            </MuiGrid>
          </>
        )}

        {lists.map((list) => (
          <MuiGrid container item key={list.ids.slug} spacing={2}>
            <MuiGrid item>
              <MuiBox width={368}>
                <TileGroup items={list.items.slice(0, 5)} />
              </MuiBox>
            </MuiGrid>
            <MuiGrid item xs>
              <List
                description={list.description}
                itemCount={list.items.length}
                listSlug={list.ids.slug}
                name={list.name}
                privacy={list.privacy}
                username={list.user.username}
                userSlug={list.user.ids.slug}
              />
            </MuiGrid>
          </MuiGrid>
        ))}
      </MuiGrid>
    </MuiBox>
  );
}

export default Lists;
