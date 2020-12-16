import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import InteractiveTile from '../../../components/InteractiveTile/InteractiveTile.component';
import { selectEntities } from '../../../redux/modules/users/recommendations/recommendations.selectors';
import { fetchRecommendations } from '../../../redux/modules/users/recommendations/recommendations.slice';
import { transformEntityToPlural } from '../../../utils';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const recommendations = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchRecommendations(userSlug));
  }, [dispatch, userSlug]);

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {recommendations.map((recommendation) => {
          const type = recommendation.type;
          const entity = transformEntityToPlural(recommendation.type);
          const item = recommendation[type];
          return (
            <MuiGrid item key={item.ids.slug} xs={2}>
              <InteractiveTile
                entity={entity}
                primary={item.title}
                secondary={item.year}
                slug={item.ids.slug}
                tmdbId={item.ids.tmdb}
              />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </MuiBox>
  );
}

export default Ratings;
