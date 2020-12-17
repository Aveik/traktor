import {
  Box as MuiBox,
  Chip as MuiChip,
  Grid as MuiGrid,
  IconButton as MuiIconButton,
  LinearProgress as MuiLinearProgress,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  Paper as MuiPaper,
  Typography as MuiTypography,
} from '@material-ui/core';
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import emoji from 'emoji-toolkit';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectLoadingFlagsReducedFactory } from '../../../redux/loading/loading.selectors';
import {
  removeComment,
  updateComment,
} from '../../../redux/modules/users/profile/comments/comments.slice';
import { getUserSlug } from '../../../utils';
import Editor from '../Editor/Editor.component';

function Comment({
  comment,
  createdAt,
  id,
  review,
  spoiler,
  username,
  userRating,
  userSlug,
}) {
  const selector = useMemo(selectLoadingFlagsReducedFactory, []);
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selector(state, ['users/comments/remove', 'users/comments/update']),
  );
  const [state, setState] = useState(null);
  const canEdit = getUserSlug() === userSlug;
  const [isEditing, isRemoving] = [state === 'editing', state === 'removing'];

  function toggleEditMode() {
    if (isEditing) {
      setState('default');
      return;
    }
    setState('editing');
  }

  //@TODO: unwrap promise and add .catch() as removing can fail
  function handleRemove() {
    setState('removing');
    dispatch(removeComment(id));
  }

  //@TODO: unwrap promise and add .catch() as editing can fail
  function handleSubmit({ reset, ...comment }) {
    dispatch(
      updateComment({
        ...comment,
        id,
      }),
    ).then(() => setState('default'));
  }

  return (
    <>
      {(isEditing || isRemoving) && fetching && (
        <MuiLinearProgress color='secondary' />
      )}
      <MuiListItem component={MuiPaper}>
        <MuiListItemText
          primary={
            <MuiGrid container justify='space-between'>
              <MuiGrid item>
                <MuiTypography display='inline' variant='body2'>
                  {review ? 'Review' : 'Shout'} by{' '}
                  <Link to={`/app/users/${userSlug}`}>{username}</Link>
                </MuiTypography>
                <MuiTypography display='inline' variant='caption'>
                  {` | ${new Date(createdAt).toLocaleString('da-Dk')} 
                ${userRating ? `| rated ${userRating} stars` : ''}`}
                  {spoiler && (
                    <>
                      {' | '} <MuiChip label='Spoiler' size='small' />
                    </>
                  )}
                </MuiTypography>
              </MuiGrid>
              {canEdit && (
                <MuiGrid item>
                  <MuiIconButton onClick={toggleEditMode} size='small'>
                    <EditIcon fontSize='small' />
                  </MuiIconButton>
                  <MuiIconButton onClick={handleRemove} size='small'>
                    <DeleteIcon fontSize='small' />
                  </MuiIconButton>
                </MuiGrid>
              )}
            </MuiGrid>
          }
          secondary={
            isEditing ? (
              <MuiBox mt={2}>
                <Editor
                  comment={comment}
                  disabled={fetching}
                  onSubmit={handleSubmit}
                  spoiler={spoiler}
                />
              </MuiBox>
            ) : (
              <ReactMarkdown allowDangerousHtml>
                {emoji.shortnameToImage(comment)}
              </ReactMarkdown>
            )
          }
          secondaryTypographyProps={{
            component: 'div',
          }}
        />
      </MuiListItem>
    </>
  );
}
Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  review: PropTypes.bool.isRequired,
  spoiler: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  userRating: PropTypes.number,
  userSlug: PropTypes.string.isRequired,
};
export default Comment;
