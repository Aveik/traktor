import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/users/ratings/ratings.selectors';
import { fetchRatings } from '../../../redux/modules/users/ratings/ratings.slice';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'users/ratings/fetch'),
  );
  const ratings = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchRatings(userSlug));
  }, [dispatch, userSlug]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(ratings, null, 2)}</pre>
    </>
  );
}

export default Ratings;
