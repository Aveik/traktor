import { Box as MuiBox, Grid as MuiGrid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Pagination from '../../../components/Pagination/Pagination.component';
import usePagination from '../../../hooks/usePagination';
import {
  selectRecommendations,
  selectRecommendationsPagesTotal,
} from '../../../redux/modules/users/recommendations/recommendations.selectors';
import { fetchRecommendations } from '../../../redux/modules/users/recommendations/recommendations.slice';
import { renderInteractiveTileBasedOnType } from '../../../utils';

function Ratings() {
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const recommendations = useSelector(selectRecommendations);
  const {
    hasNextPage,
    hasPreviousPage,
    page,
    pagesTotal,
    toFirstPage,
    toLastPage,
    toNextPage,
    toPreviousPage,
  } = usePagination(selectRecommendationsPagesTotal);

  useEffect(() => {
    dispatch(fetchRecommendations({ page, userSlug }));
  }, [dispatch, page, userSlug]);

  //@TODO: Add empty design component
  if (!recommendations.length) {
    return 'No ratings found';
  }

  return (
    <MuiBox p={2}>
      <MuiGrid container spacing={1}>
        {recommendations.map((recommendation) =>
          renderInteractiveTileBasedOnType(recommendation, MuiGrid, {
            item: true,
            xs: 2,
          }),
        )}
      </MuiGrid>
      <Pagination
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onFirstPage={toFirstPage}
        onLastPage={toLastPage}
        onNextPage={toNextPage}
        onPreviousPage={toPreviousPage}
        page={page}
        pagesTotal={pagesTotal}
        variant='wrapped'
      />
    </MuiBox>
  );
}

export default Ratings;
