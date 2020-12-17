import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { selectEntities as selectProfileRatings } from '../../../redux/modules/users/profile/ratings/ratings.selectors';
import { selectEntities as selectUserRatings } from '../../../redux/modules/users/user/ratings/ratings.selectors';
import { fetchRatings } from '../../../redux/modules/users/user/ratings/ratings.slice';
import { getUserSlug, renderInteractiveTileBasedOnType } from '../../../utils';

function Ratings() {
  const dispatch = useDispatch();
  const { userSlug } = useParams();
  const ratings = useSelector(
    userSlug === getUserSlug() ? selectProfileRatings : selectUserRatings,
  );

  useEffect(() => {
    dispatch(fetchRatings(userSlug));
  }, [dispatch, userSlug]);

  //@TODO: Add empty design component
  if (!ratings.length) {
    return 'No ratings found';
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {ratings.map((rating) =>
          renderInteractiveTileBasedOnType(rating, MuiGrid, {
            item: true,
            xs: 2,
          }),
        )}
      </MuiGrid>
    </MuiBox>
  );
}

export default Ratings;
