import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ListItemManager from '../../components/ListItemManager/ListItemManager.component';
import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/movie/movie.selectors';
import { fetchMovie } from '../../redux/modules/movie/movie.slice';
import { selectRating } from '../../redux/modules/users/ratings/ratings.selectors';
import { postRating } from '../../redux/modules/users/ratings/ratings.slice';
import { selectIsRecommended } from '../../redux/modules/users/recommendations/recommendations.selectors';
import {
  postRecommendationAndRefetch,
  removeRecommendationAndRefetch,
} from '../../redux/modules/users/recommendations/recommendations.slice';
import { selectIsWatchlisted } from '../../redux/modules/users/watchlist/watchlist.selectors';
import {
  addToWatchlistAndRefetch,
  removeFromWatchlistAndRefetch,
} from '../../redux/modules/users/watchlist/watchlist.slice';

function Movie() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'movie/fetch'),
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

  function handleRating(value) {
    dispatch(postRating({ entity: 'movies', rating: value, slug }));
  }

  function handleRecommend() {
    if (isRecommended) {
      dispatch(removeRecommendationAndRefetch({ entity: 'movies', slug }));
      return;
    }
    dispatch(postRecommendationAndRefetch({ entity: 'movies', slug }));
  }

  function handleWatchlist() {
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAndRefetch({ entity: 'movies', slug }));
      return;
    }
    dispatch(addToWatchlistAndRefetch({ entity: 'movies', slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <ListItemManager entity='movies' slug={slug}>
        {(onClick, listedOnCount) => (
          <button onClick={onClick} type='button'>
            {listedOnCount
              ? `Listed on ${listedOnCount} list(s)`
              : 'Add to list'}
          </button>
        )}
      </ListItemManager>
      <button onClick={handleWatchlist} type='button'>
        {isWatchlisted ? 'Remove from watchlist' : 'Add to watchlit'}
      </button>
      <button onClick={handleRecommend} type='button'>
        {isRecommended ? 'Remove recommendation' : 'Recommend'}
      </button>
      <Rating onChange={handleRating} value={rating} />
      <Poster
        entity='movies'
        size='w154'
        tmdbId={movie.summary?.ids.tmdb}
        type='poster'
      >
        {(url) => <img alt='poster' src={url} />}
      </Poster>
    </>
  );
}

export default Movie;
