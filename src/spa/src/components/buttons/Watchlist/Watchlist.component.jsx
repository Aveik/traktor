import {
  Button as MuiButton,
  CircularProgress as MuiCircularProgress,
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
} from '@material-ui/core';
import { WatchLater as WatchlistIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlagsReducedFactory } from '../../../redux/loading/loading.selectors';
import { selectIsWatchlistedFactory } from '../../../redux/modules/users/profile/watchlist/watchlist.selectors';
import {
  addToWatchlistAndRefetch,
  removeFromWatchlistAndRefetch,
} from '../../../redux/modules/users/profile/watchlist/watchlist.slice';

function Watchlist({ entity, size = 'default', slug }) {
  const dispatch = useDispatch();
  const selector = useMemo(selectIsWatchlistedFactory, []);
  const loadingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const isWatchlisted = useSelector((state) => selector(state, entity, slug));
  const loading = useSelector((state) =>
    loadingSelector(state, [
      'users/watchlist/fetch',
      'users/watchlist/add',
      'users/watchlist/remove',
    ]),
  );

  //@TODO: catch in case watchlist request fails
  function handleWatchlist() {
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAndRefetch({ entity, slug }));
      return;
    }
    dispatch(addToWatchlistAndRefetch({ entity, slug }));
  }

  if (size === 'small') {
    return (
      <MuiTooltip
        title={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        <span>
          <MuiIconButton
            color={isWatchlisted ? 'secondary' : 'inherit'}
            disabled={loading}
            onClick={handleWatchlist}
            size='small'
          >
            {loading ? (
              <MuiCircularProgress color='secondary' size={20} />
            ) : (
              <WatchlistIcon fontSize='small' />
            )}
          </MuiIconButton>
        </span>
      </MuiTooltip>
    );
  }
  return (
    <MuiButton
      color='secondary'
      disabled={loading}
      fullWidth
      onClick={handleWatchlist}
      startIcon={<WatchlistIcon />}
      variant={isWatchlisted ? 'contained' : 'outlined'}
    >
      {isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
    </MuiButton>
  );
}

Watchlist.propTypes = {
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  size: PropTypes.oneOf(['default,', 'small']),
  slug: PropTypes.string.isRequired,
};

export default Watchlist;
