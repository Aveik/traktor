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

  return (
    <>
      {fetching && <div>Loading...</div>}
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
