import { Grid as MuiGrid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import Tile from '../../components/Tile/Tile.component';

function renderTrending(movies) {
  return movies.map(({ movie, watchers }) => (
    <MuiGrid
      component={Link}
      item
      key={movie.ids.trakt}
      md={4}
      sm={6}
      to={`/app/movies/${movie.ids.slug}`}
      xl={3}
      xs={12}
    >
      <Tile
        releaseYear={movie.year}
        title={movie.title}
        tmdbId={movie.ids.tmdb}
        watchers={watchers}
      />
    </MuiGrid>
  ));
}

function renderTiles({ category, movies }) {
  switch (category) {
    case 'trending':
      return renderTrending(movies);
    case 'popular':
      return null;
    case 'recommended':
      return null;
    case 'watched':
      return null;
    case 'collected':
      return null;
    case 'anticipated':
      return null;
    default:
      return null;
  }
}

export { renderTiles };
