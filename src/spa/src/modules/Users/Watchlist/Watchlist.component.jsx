import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/users/watchlist/watchlist.selectors';
import { fetchWatchlist } from '../../../redux/modules/users/watchlist/watchlist.slice';

function Watchlist() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'users/watchlist/fetch'),
  );
  const watchlist = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchWatchlist(userSlug));
  }, [dispatch, userSlug]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(watchlist, null, 2)}</pre>
    </>
  );
}

export default Watchlist;
