import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/profile/watchlist/watchlist.selectors';
import { fetchWatchlist } from '../../../redux/modules/profile/watchlist/watchlist.slice';

function Watchlist() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/watchlist/fetch'),
  );
  const watchlist = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchWatchlist());
  }, [dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(watchlist, null, 2)}</pre>
    </>
  );
}

export default Watchlist;
