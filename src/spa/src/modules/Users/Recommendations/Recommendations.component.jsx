import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/users/recommendations/recommendations.selectors';
import { fetchRecommendations } from '../../../redux/modules/users/recommendations/recommendations.slice';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'users/recommendations/fetch'),
  );
  const recommendations = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchRecommendations(userSlug));
  }, [dispatch, userSlug]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(recommendations, null, 2)}</pre>
    </>
  );
}

export default Ratings;
