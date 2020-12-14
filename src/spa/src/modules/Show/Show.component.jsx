import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ListItemManager from '../../components/buttons/ListItemManager/ListItemManager.component';
import WatchlistButton from '../../components/buttons/Watchlist/Watchlist.component';
import { renderComment } from '../../components/Comments/Comments.utils';
import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/show/show.selectors';
import { fetchShow } from '../../redux/modules/show/show.slice';
import { selectRating } from '../../redux/modules/users/ratings/ratings.selectors';
import { postRating } from '../../redux/modules/users/ratings/ratings.slice';

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

  useEffect(() => {
    dispatch(fetchShow(slug));
  }, [dispatch, slug]);

  function handleRating(value) {
    dispatch(postRating({ entity: 'shows', rating: value, slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <ListItemManager entity='shows' slug={slug} />
      <WatchlistButton entity='shows' slug={slug} />
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
