import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectRatings } from '../../../redux/modules/profile/profile.selectors';
import { fetchRatings } from '../../../redux/modules/profile/profile.slice';

function Ratings() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/ratings/fetch'),
  );
  const ratings = useSelector(selectRatings);

  useEffect(() => {
    dispatch(fetchRatings());
  }, [dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(ratings, null, 2)}</pre>
    </>
  );
}

export default Ratings;
