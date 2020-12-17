import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectEntities as selectProfileWatchlist } from '../../../redux/modules/users/profile/watchlist/watchlist.selectors';
import { selectEntities as selectUserWatchlist } from '../../../redux/modules/users/user/watchlist/watchlist.selectors';
import { fetchWatchlist } from '../../../redux/modules/users/user/watchlist/watchlist.slice';
import { getUserSlug, renderInteractiveTileBasedOnType } from '../../../utils';

function Watchlist() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const watchlist = useSelector(
    userSlug === getUserSlug() ? selectProfileWatchlist : selectUserWatchlist,
  );

  useEffect(() => {
    dispatch(fetchWatchlist(userSlug));
  }, [dispatch, userSlug]);

  //@TODO: Add empty design component
  if (!watchlist.length) {
    return 'No items';
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {watchlist.map((item) =>
          renderInteractiveTileBasedOnType(item, MuiGrid, {
            item: true,
            xs: 2,
          }),
        )}
      </MuiGrid>
    </MuiBox>
  );
}

export default Watchlist;
