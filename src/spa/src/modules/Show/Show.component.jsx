import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Poster from '../../components/Poster/Poster.component';
import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/show/show.selectors';
import { fetchComments, fetchShow } from '../../redux/modules/show/show.slice';

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

  useEffect(() => {
    dispatch(fetchShow(slug));
  }, [dispatch, slug]);

  function handleFetchAllComments() {
    dispatch(
      fetchComments({ limit: show.stats.comments, slug, sort: 'newest' }),
    );
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <button onClick={handleFetchAllComments} type='button'>
        Fetch all comments
      </button>
      <Poster
        entity='show'
        id={show.summary?.ids.tmdb}
        size='w154'
        type='poster'
      />
      <pre>{JSON.stringify(show, null, 2)}</pre>
    </>
  );
}

export default Show;
