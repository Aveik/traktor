import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectEntities as selectProfileRecommendations } from '../../../redux/modules/users/profile/recommendations/recommendations.selectors';
import { selectEntities as selectUserRecommendations } from '../../../redux/modules/users/user/recommendations/recommendations.selectors';
import { fetchRecommendations } from '../../../redux/modules/users/user/recommendations/recommendations.slice';
import { getUserSlug, renderTileBasedOnType } from '../../../utils';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const recommendations = useSelector(
    userSlug === getUserSlug()
      ? selectProfileRecommendations
      : selectUserRecommendations,
  );

  useEffect(() => {
    dispatch(fetchRecommendations(userSlug));
  }, [dispatch, userSlug]);

  //@TODO: Add empty design component
  if (!recommendations.length) {
    return 'No ratings found';
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {recommendations.map((recommendation) =>
          renderTileBasedOnType(recommendation, MuiGrid, { item: true, xs: 2 }),
        )}
      </MuiGrid>
    </MuiBox>
  );
}

export default Ratings;
