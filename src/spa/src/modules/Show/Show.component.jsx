import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { renderComment } from '../../components/Comments/Comments.utils';
import ListItemManager from '../../components/ListItemManager/ListItemManager.component';
import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/show/show.selectors';
import { fetchShow } from '../../redux/modules/show/show.slice';
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

function Show() {
  const selectLoadingFlagReduced = useMemo(
    selectLoadingFlagsReducedFactory,
    [],
  );
  const dispatch = useDispatch();
  const { slug } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlagReduced(state, ['show/fetch', 'show/comments/fetch']),
  );
  const show = useSelector(selectEntity);
  const rating = useSelector((state) => selectRating(state, 'shows', slug));
  const isRecommended = useSelector((state) =>
    selectIsRecommended(state, 'shows', slug),
  );
  const isWatchlisted = useSelector((state) =>
    selectIsWatchlisted(state, 'shows', slug),
  );

  useEffect(() => {
    dispatch(fetchShow(slug));
  }, [dispatch, slug]);

  function handleRating(value) {
    dispatch(postRating({ entity: 'shows', rating: value, slug }));
  }

  function handleRecommend() {
    if (isRecommended) {
      dispatch(removeRecommendationAndRefetch({ entity: 'shows', slug }));
      return;
    }
    dispatch(postRecommendationAndRefetch({ entity: 'shows', slug }));
  }

  function handleWatchlist() {
    if (isWatchlisted) {
      dispatch(removeFromWatchlistAndRefetch({ entity: 'shows', slug }));
      return;
    }
    dispatch(addToWatchlistAndRefetch({ entity: 'shows', slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <ListItemManager entity='shows' slug={slug}>
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
        entity='shows'
        size='w154'
        tmdbId={show.summary?.ids.tmdb}
        type='poster'
      >
        {(url) => <img alt='poster' src={url} />}
      </Poster>
      <br />
      <Link to='comments'>
        Showing highest rated comments - Show more comments
      </Link>
      {show.comments.map(renderComment)}
    </>
  );
}

export default Show;
