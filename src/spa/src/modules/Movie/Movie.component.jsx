import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ListItemManager from '../../components/buttons/ListItemManager/ListItemManager.component';
import Recommend from '../../components/buttons/Recommend/Recommend.component';
import WatchlistButton from '../../components/buttons/Watchlist/Watchlist.component';
import { renderComment } from '../../components/Comments/Comments.utils';
import Pagination from '../../components/Pagination/Pagination.component';
import Poster from '../../components/Poster/Poster.component';
import Rating from '../../components/Rating/Rating.component';
import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { selectEntity } from '../../redux/modules/movie/movie.selectors';
import { fetchMovie } from '../../redux/modules/movie/movie.slice';
import { selectRating } from '../../redux/modules/users/ratings/ratings.selectors';
import { postRating } from '../../redux/modules/users/ratings/ratings.slice';

function Movie() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'movie/fetch'),
  );
  const movie = useSelector(selectEntity);
  const rating = useSelector((state) => selectRating(state, 'movies', slug));

  useEffect(() => {
    dispatch(fetchMovie(slug));
  }, [dispatch, slug]);

  function handleRating(value) {
    dispatch(postRating({ entity: 'movies', rating: value, slug }));
  }

  return (
    <>
      {fetching && <div>Loading...</div>}
      <ListItemManager entity='movies' slug={slug} />
      <WatchlistButton entity='movies' slug={slug} />
      <Recommend entity='movies' slug={slug} />
      <Rating onChange={handleRating} value={rating} />
      <Poster
        entity='movies'
        size='w154'
        tmdbId={movie.summary?.ids.tmdb}
        type='poster'
      >
        {(url) => <img alt='poster' src={url} />}
      </Poster>
      <Link to='comments'>
        Showing highest rated comments - Show more comments
      </Link>
      {movie.comments.map(renderComment)}
    </>
  );
}

export default Movie;
