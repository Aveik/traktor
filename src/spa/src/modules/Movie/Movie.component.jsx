import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/movie/movie.selectors';
import {
  fetchComments,
  fetchMovie,
} from '../../redux/modules/movie/movie.slice';
import { selectRating } from '../../redux/modules/profile/ratings/ratings.selectors';
import { postMovieRating } from '../../redux/modules/profile/ratings/ratings.slice';
import { selectIsRecommended } from '../../redux/modules/profile/recommendations/recommendations.selectors';
import {
  postMovieRecommendation,
  removeMovieRecommendation,
} from '../../redux/modules/profile/recommendations/recommendations.slice';
import { selectIsWatchlisted } from '../../redux/modules/profile/watchlist/watchlist.selectors';
import {
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from '../../redux/modules/profile/watchlist/watchlist.slice';

function Movie() {
  const selectLoadingFlagReduced = useMemo(
    selectLoadingFlagsReducedFactory,
    [],
  );
  const dispatch = useDispatch();
  const { slug } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlagReduced(state, ['movie/fetch', 'movie/comments/fetch']),
  );
  const movie = useSelector(selectEntity);
  const rating = useSelector((state) => selectRating(state, 'movie', slug));
  const isRecommended = useSelector((state) =>
    selectIsRecommended(state, 'movie', slug),
  );
  const isWatchlisted = useSelector((state) =>
    selectIsWatchlisted(state, 'movie', slug),
  );

  useEffect(() => {
    dispatch(fetchMovie(slug));
  }, [dispatch, slug]);

  function handleFetchAllComments() {
    dispatch(
      fetchComments({ limit: movie.stats.comments, slug, sort: 'newest' }),
    );
  }

  function handleRating(value) {
    dispatch(postMovieRating({ rating: value, slug }));
  }

  function handleRecommendation() {
    if (isRecommended) {
      dispatch(removeMovieRecommendation(slug));
      return;
    }
    dispatch(postMovieRecommendation(slug));
  }

  function handleWatchlist() {
    if (isWatchlisted) {
      dispatch(removeMovieFromWatchlist(slug));
      return;
    }
    dispatch(addMovieToWatchlist(slug));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleFetchAllComments} type='button'>
        Fetch all comments
      </button>
      <button onClick={handleRecommendation} type='button'>
        {isRecommended ? 'Remove recommendation' : 'Recommend'}
      </button>
      <button onClick={handleWatchlist} type='button'>
        {isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
      </button>
      <Rating onChange={handleRating} value={rating} />
      <Poster
        entity='movie'
        size='w154'
        tmdbId={movie.summary?.ids.tmdb}
        type='poster'
      >
        {(url) => <img alt='poster' src={url} />}
      </Poster>
      <pre>{JSON.stringify(movie, null, 2)}</pre>
    </>
  );
}

export default Movie;
