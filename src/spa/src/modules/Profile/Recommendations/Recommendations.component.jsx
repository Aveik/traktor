import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../../redux/loading/loading.selectors';
import { selectEntities } from '../../../redux/modules/profile/recommendations/recommendations.selectors';
import { fetchRecommendations } from '../../../redux/modules/profile/recommendations/recommendations.slice';

function Ratings() {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'profile/recommendations/fetch'),
  );
  const recommendations = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchRecommendations());
  }, [dispatch]);

  return (
    <>
      {fetching && <div>Loading...</div>}
      <pre>{JSON.stringify(recommendations, null, 2)}</pre>
    </>
  );
}

export default Ratings;
