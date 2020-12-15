import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import ListItemManagerButton from '../../components/buttons/ListItemManager/ListItemManager.component';
import RatingButton from '../../components/buttons/Rating/Rating.component';
import RecommendButton from '../../components/buttons/Recommend/Recommend.component';
import WatchlistButton from '../../components/buttons/Watchlist/Watchlist.component';
import { renderComment } from '../../components/Comments/Comments.utils';
import { selectEntity } from '../../redux/modules/show/show.selectors';
import { fetchShow } from '../../redux/modules/show/show.slice';

function Show() {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const show = useSelector(selectEntity);

  useEffect(() => {
    dispatch(fetchShow(slug));
  }, [dispatch, slug]);

  return (
    <>
      <ListItemManagerButton entity='shows' slug={slug} />
      <WatchlistButton entity='shows' slug={slug} />
      <RecommendButton entity='shows' slug={slug} />
      <RatingButton entity='shows' slug={slug} />
      <Link to='comments'>
        Showing highest rated comments - Show more comments
      </Link>
      {show.comments.map(renderComment)}
    </>
  );
}

export default Show;
