import {
  Chip as MuiChip,
  Typography as MuiTypography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import usePoster from '../../hooks/usePoster';
import ListItemManagerButton from '../buttons/ListItemManager/ListItemManager.component';
import RecommendButton from '../buttons/Recommend/Recommend.component';
import WatchlistButton from '../buttons/Watchlist/Watchlist.component';
import useStyles from './Tile.styles';

function Tile({ chips = [], entity, item, size = 'default' }) {
  const {
    ids: { slug, tmdb: tmdbId },
    title,
    year: releaseYear,
  } = item;
  const posterUrl = usePoster({
    entity,
    size: size === 'small' ? 'w185' : 'w342',
    tmdbId,
    type: 'poster',
  });
  const classes = useStyles({ backgroundImage: posterUrl, size });

  return (
    <div className={classes.root}>
      <Link className={classes.body} to={`/app/${entity}/${slug}`}>
        <div className={classes.chips}>
          {chips.map((chip) => (
            <MuiChip color='secondary' key={chip} label={chip} size='small' />
          ))}
        </div>
        <div>
          <MuiTypography display='inline' variant='subtitle2'>
            {title + ' '}
          </MuiTypography>
          <MuiTypography display='inline' variant='caption'>
            {releaseYear}
          </MuiTypography>
        </div>
      </Link>
      <div className={classes.footer}>
        <WatchlistButton entity={entity} size='small' slug={slug} />
        <RecommendButton entity={entity} size='small' slug={slug} />
        <ListItemManagerButton entity={entity} size='small' slug={slug} />
      </div>
    </div>
  );
}

Tile.propTypes = {
  chips: PropTypes.arrayOf(PropTypes.string),
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  item: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['default', 'small']),
};

export default Tile;
