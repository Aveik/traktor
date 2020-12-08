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
import { postRating } from '../../redux/modules/profile/ratings/ratings.slice';
import { selectIsRecommended } from '../../redux/modules/profile/recommendations/recommendations.selectors';
import {
  postRecommendation,
  removeRecommendation,
} from '../../redux/modules/profile/recommendations/recommendations.slice';
import { selectIsWatchlisted } from '../../redux/modules/profile/watchlist/watchlist.selectors';
import {
  addToWatchlist,
  removeFromWatchlist,
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
    dispatch(postRating({ entity: 'movies', rating: value, slug }));
  }

  function handleRecommend() {
    if (isRecommended) {
      dispatch(removeRecommendation({ entity: 'movies', slug }));
      return;
    }
    dispatch(postRecommendation({ entity: 'movies', slug }));
  }

  function handleWatchlist() {
    if (isWatchlisted) {
      dispatch(removeFromWatchlist({ entity: 'movies', slug }));
      return;
    }
    dispatch(addToWatchlist({ entity: 'movies', slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleWatchlist} type='button'>
        {isWatchlisted ? 'Remove from watchlist' : 'Add to watchlit'}
      </button>
      <button onClick={handleRecommend} type='button'>
        {isRecommended ? 'Remove recommendation' : 'Recommend'}
      </button>
      <button onClick={handleFetchAllComments} type='button'>
        Fetch all comments
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
