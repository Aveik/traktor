import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Poster from '../../components/Poster/Poster.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/movie/movie.selectors';
import {
  fetchComments,
  fetchMovie,
} from '../../redux/modules/movie/movie.slice';

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

  useEffect(() => {
    dispatch(fetchMovie(slug));
  }, [dispatch, slug]);

  function handleFetchAllComments() {
    dispatch(
      fetchComments({ limit: movie.stats.comments, slug, sort: 'newest' }),
    );
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleFetchAllComments} type='button'>
        Fetch all comments
      </button>
      <Poster
        entity='movie'
        id={movie.summary?.ids.tmdb}
        size='w154'
        type='poster'
      />
      <pre>{JSON.stringify(movie, null, 2)}</pre>
    </>
  );
}

export default Movie;
