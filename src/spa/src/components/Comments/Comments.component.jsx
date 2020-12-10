import {
  List as MuiList,
  MenuItem as MuiMenuItem,
  TextField as MuiTextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlag } from '../../redux/loading/loading.selectors';
import { fetchComments } from '../../redux/modules/movie/movie.slice';
import { postComment } from '../../redux/modules/profile/comments/comments.slice';
import Post from './Post/Post.component';
import Single from './Single/Single.component';

function renderComments(items) {
  function render(item) {
    const [
      comment,
      createdAt,
      id,
      review,
      spoiler,
      username,
      userRating,
      userSlug,
    ] = [
      item.comment,
      item.created_at,
      item.id,
      item.review,
      item.spoiler,
      item.user.username,
      item.user_rating,
      item.user.ids.slug,
    ];
    return (
      <Single
        comment={comment}
        createdAt={createdAt}
        id={id}
        key={id}
        review={review}
        spoiler={spoiler}
        username={username}
        userRating={userRating}
        userSlug={userSlug}
      />
    );
  }
  return items.map(render);
}

function Comments({ entity, items: _items, slug, totalCount }) {
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selectLoadingFlag(state, 'movie/comments/fetch'),
  );
  const [isExtendedView, setIsExtendedView] = useState(false);
  const [sort, setSort] = useState('highest');
  const items = isExtendedView ? _items : _items.slice(0, 10);

  function handleViewChange() {
    setIsExtendedView(!isExtendedView);
  }

  function handleSortChange({ target: { value } }) {
    setSort(value);
    dispatch(
      fetchComments({
        limit: totalCount,
        slug,
        sort: value,
      }),
    );
  }

  function handlePostSubmit({ comment, done, spoiler }) {
    dispatch(
      postComment({
        comment,
        entity,
        slug,
        spoiler,
      }),
    ).then(() => {
      done();
      dispatch(
        fetchComments({
          limit: totalCount,
          slug,
          sort,
        }),
      );
    });
  }

  return (
    <div>
      {fetching && <div>Loading...</div>}
      <button onClick={handleViewChange} type='button'>
        Switch to {isExtendedView ? 'brief' : 'extended'} view
      </button>
      {isExtendedView && <Post onSubmit={handlePostSubmit} />}
      <h3>
        Comments (showing {items.length} of {totalCount})
      </h3>
      <MuiTextField
        fullWidth
        label='Sort comments by'
        onChange={handleSortChange}
        select
        size='small'
        value={sort}
        variant='outlined'
      >
        <MuiMenuItem value='newest'>Newest</MuiMenuItem>
        <MuiMenuItem value='highest'>Highest</MuiMenuItem>
        <MuiMenuItem value='likes'>Likes</MuiMenuItem>
      </MuiTextField>
      <MuiList>{renderComments(items)}</MuiList>
    </div>
  );
}

Comments.propTypes = {
  entity: PropTypes.oneOf(['movies', 'shows']).isRequired,
  items: PropTypes.array.isRequired,
  slug: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default Comments;
