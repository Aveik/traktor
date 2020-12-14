import {
  Button as MuiButton,
  CircularProgress as MuiCircularProgress,
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
} from '@material-ui/core';
import { Favorite as RecommendIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlagsReducedFactory } from '../../../redux/loading/loading.selectors';
import { selectIsRecommendFactory } from '../../../redux/modules/users/recommendations/recommendations.selectors';
import {
  postRecommendationAndRefetch,
  removeRecommendationAndRefetch,
} from '../../../redux/modules/users/recommendations/recommendations.slice';

function Recommend({ entity, size = 'default', slug }) {
  const dispatch = useDispatch();
  const selector = useMemo(selectIsRecommendFactory, []);
  const loadingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const isRecommended = useSelector((state) => selector(state, entity, slug));
  const loading = useSelector((state) =>
    loadingSelector(state, [
      'users/recommendations/fetch',
      'users/recommendations/recommend',
      'users/recommendations/unrecommend',
    ]),
  );

  //@TODO: catch in case recommendation failed
  function handleRecommend() {
    if (isRecommended) {
      dispatch(removeRecommendationAndRefetch({ entity, slug }));
      return;
    }
    dispatch(postRecommendationAndRefetch({ entity, slug }));
  }

  if (size === 'small') {
    return (
      <MuiTooltip
        title={isRecommended ? 'Remove from recommendations' : 'Recommend'}
      >
        <span>
          <MuiIconButton
            color={isRecommended ? 'secondary' : 'inherit'}
            disabled={loading}
            onClick={handleRecommend}
            size='small'
          >
            {loading ? (
              <MuiCircularProgress color='secondary' size={20} />
            ) : (
              <RecommendIcon fontSize='small' />
            )}
          </MuiIconButton>
        </span>
      </MuiTooltip>
    );
  }
  return (
    <MuiButton
      color={isRecommended ? 'secondary' : 'inherit'}
      disabled={loading}
      onClick={handleRecommend}
      startIcon={<RecommendIcon />}
    >
      {isRecommended ? 'Remove from recommendations' : 'Recommend'}
    </MuiButton>
  );
}

Recommend.propTypes = {
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  size: PropTypes.oneOf(['default,', 'small']),
  slug: PropTypes.string.isRequired,
};

export default Recommend;
