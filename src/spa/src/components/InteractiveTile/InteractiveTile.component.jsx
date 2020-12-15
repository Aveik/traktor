import {
  Chip as MuiChip,
  Typography as MuiTypography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import ListItemManagerButton from '../buttons/ListItemManager/ListItemManager.component';
import RecommendButton from '../buttons/Recommend/Recommend.component';
import WatchlistButton from '../buttons/Watchlist/Watchlist.component';
import Tile from '../Tile/Tile.component';
import useStyles from './InteractiveTile.styles';

function InteractiveTile({
  children,
  chips = [],
  entity,
  primary,
  secondary,
  slug,
  ...props
}) {
  const classes = useStyles();

  const content = (
    <>
      <div className={classes.chips}>
        {chips.map((chip) => (
          <MuiChip color='secondary' key={chip} label={chip} size='small' />
        ))}
      </div>
      <MuiTypography display='inline' variant='subtitle2'>
        {primary}
      </MuiTypography>
      {secondary && (
        <MuiTypography display='inline' variant='caption'>
          {' '}
          {secondary}
        </MuiTypography>
      )}
    </>
  );

  return (
    <Tile {...props} content={content} entity={entity} slug={slug}>
      <div className={classes.footer}>
        <WatchlistButton entity={entity} size='small' slug={slug} />
        <RecommendButton entity={entity} size='small' slug={slug} />
        <ListItemManagerButton entity={entity} size='small' slug={slug} />
      </div>
      {children}
    </Tile>
  );
}

InteractiveTile.propTypes = {
  children: PropTypes.node,
  chips: PropTypes.arrayOf(PropTypes.string),
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.node,
  slug: PropTypes.string.isRequired,
};

export default InteractiveTile;
