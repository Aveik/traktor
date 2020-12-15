import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ListItemManagerButton from '../../components/buttons/ListItemManager/ListItemManager.component';
import RatingButton from '../../components/buttons/Rating/Rating.component';
import RecommendButton from '../../components/buttons/Recommend/Recommend.component';
import WatchlistButton from '../../components/buttons/Watchlist/Watchlist.component';
import { renderComment } from '../../components/Comments/Comments.utils';
import { selectEntity } from '../../redux/modules/movie/movie.selectors';
import { fetchMovie } from '../../redux/modules/movie/movie.slice';

function Movie() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const movie = useSelector(selectEntity);

  useEffect(() => {
    dispatch(fetchMovie(slug));
  }, [dispatch, slug]);

  return (
    <>
      <ListItemManagerButton entity='movies' slug={slug} />
      <WatchlistButton entity='movies' slug={slug} />
      <RecommendButton entity='movies' slug={slug} />
      <RatingButton entity='movies' slug={slug} />
      <Link to='comments'>
        Showing highest rated comments - Show more comments
      </Link>
      {movie.comments.map(renderComment)}
    </>
  );
}

export default Movie;
