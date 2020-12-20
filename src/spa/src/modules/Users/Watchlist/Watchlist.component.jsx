import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import {
  selectWatchlist,
  selectWatchlistPagesTotal,
} from '../../../redux/modules/users/watchlist/watchlist.selectors';
import { fetchWatchlist } from '../../../redux/modules/users/watchlist/watchlist.slice';
import { renderInteractiveTileBasedOnType } from '../../../utils';

function Watchlist() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const {
    hasNextPage,
    hasPreviousPage,
    page,
    pagesTotal,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(selectWatchlistPagesTotal);

  useEffect(() => {
    dispatch(fetchWatchlist({ page, userSlug }));
  }, [dispatch, page, userSlug]);

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
      <Pagination
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
        page={page}
        pagesTotal={pagesTotal}
        variant='wrapped'
      />
    </MuiBox>
  );
}

export default Watchlist;
