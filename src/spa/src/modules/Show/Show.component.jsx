import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/show/show.selectors';
import { fetchComments, fetchShow } from '../../redux/modules/show/show.slice';
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
  const rating = useSelector((state) => selectRating(state, 'show', slug));

  useEffect(() => {
    dispatch(fetchShow(slug));
  }, [dispatch, slug]);

  function handleFetchAllComments() {
    dispatch(
      fetchComments({ limit: show.stats.comments, slug, sort: 'newest' }),
    );
  }

  function handleRating(value) {
    dispatch(postRating({ entity: 'shows', rating: value, slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleFetchAllComments} type='button'>
        Fetch all comments
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
      <pre>{JSON.stringify(show, null, 2)}</pre>
    </>
  );
}

export default Show;
