import {
  Chip as MuiChip,
  Typography as MuiTypography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

import Poster from '../../components/Poster/Poster.component';
import useStyles from './Tile.styles';

function Tile({ releaseYear, title, tmdbId, watchers }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Poster entity='movie' size='w500' tmdbId={tmdbId} type='poster'>
        {(url) => <img alt='poster' className={classes.image} src={url} />}
      </Poster>
      <div className={classes.footer}>
        <MuiChip
          color='secondary'
          label={
            <MuiTypography variant='caption'>
              {watchers} people watching
            </MuiTypography>
          }
          size='small'
        />
        <div>
          <MuiTypography color='textPrimary' display='inline' variant='body1'>
            {title}{' '}
          </MuiTypography>
          <MuiTypography
            color='textSecondary'
            display='inline'
            variant='caption'
          >
            {releaseYear}
          </MuiTypography>
        </div>
      </div>
    </div>
  );
}

Tile.propTypes = {
  releaseYear: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  tmdbId: PropTypes.number.isRequired,
  watchers: PropTypes.number.isRequired,
};

export default Tile;
