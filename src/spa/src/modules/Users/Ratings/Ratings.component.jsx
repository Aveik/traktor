import {
  Box as MuiBox,
  Grid as MuiGrid,
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
  Typography as MuiTypography,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import InteractiveTile from '../../../components/InteractiveTile/InteractiveTile.component';
import { selectEntities } from '../../../redux/modules/users/ratings/ratings.selectors';
import {
  fetchRatings,
  removeRatingAndFetch,
} from '../../../redux/modules/users/ratings/ratings.slice';
import { transformEntityToPlural } from '../../../utils';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const ratings = useSelector(selectEntities);

  useEffect(() => {
    dispatch(fetchRatings(userSlug));
  }, [dispatch, userSlug]);

  function handleRemove(entity, slug) {
    return function () {
      dispatch(removeRatingAndFetch({ entity, slug }));
    };
  }

  if (!ratings.length) {
    return 'No ratings found';
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {ratings.map((rating) => {
          const type = rating.type;
          const entity = transformEntityToPlural(rating.type);
          const item = rating[type];
          return (
            <MuiGrid item key={item.ids.slug} xs={2}>
              <InteractiveTile
                entity={entity}
                primary={item.title}
                secondary={item.year}
                slug={item.ids.slug}
                tmdbId={item.ids.tmdb}
              >
                <MuiTypography color='secondary' variant='caption'>
                  Rated {rating.rating}/10
                  <MuiTooltip title='Remove rating'>
                    <MuiIconButton
                      color='inherit'
                      disableRipple
                      onClick={handleRemove(entity, item.ids.slug)}
                      size='small'
                    >
                      <DeleteIcon fontSize='inherit' />
                    </MuiIconButton>
                  </MuiTooltip>
                </MuiTypography>
              </InteractiveTile>
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </MuiBox>
  );
}

export default Ratings;
