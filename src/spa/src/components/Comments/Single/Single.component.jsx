import {
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

import { selectLoadingFlagsReducedFactory } from '../../../redux/loading/loading.selectors';
import {
  removeComment,
  updateComment,
} from '../../../redux/modules/profile/comments/comments.slice';
import { getUserSlug } from '../../../utils';
import useStyles from './Single.styles';

function Single({
  comment: _comment,
  createdAt,
  id,
  review,
  spoiler: _spoiler,
  username,
  userRating,
  userSlug,
}) {
  const selector = useMemo(selectLoadingFlagsReducedFactory, []);
  const classes = useStyles();
  const dispatch = useDispatch();
  const fetching = useSelector((state) =>
    selector(state, ['profile/comments/remove', 'profile/comments/update']),
  );
  const [state, setState] = useState(null);
  const [comment, setComment] = useState(_comment);
  const [spoiler, setSpoiler] = useState(_spoiler);
  const canEdit = getUserSlug() === userSlug;
  const [isEditing, isRemoving, isRemoved] = [
    state === 'editing',
    state === 'removing',
    state === 'removed',
  ];

  function handleCommentChange({ target: { value } }) {
    setComment(value);
  }

  function handleSpoilerChange({ target: { checked } }) {
    setSpoiler(checked);
  }

  function toggleEditMode() {
    if (isEditing) {
      setState('default');
      setComment(_comment);
      setSpoiler(_spoiler);
      return;
    }
    setState('editing');
  }

  //@TODO: unwrap promise and add .catch() as removing can fail
  function handleRemove() {
    setState('removing');
    dispatch(removeComment(id)).then(() => setState('removed'));
  }

  //@TODO: unwrap promise and add .catch() as editing can fail
  function handleEdit() {
    setState('default');
    dispatch(
      updateComment({
        comment,
        id,
        spoiler,
      }),
    ).then(() => setState('default'));
  }

  //@TODO: extract this as component for Post/Single as reusable editor.
  const editor = (
    <>
      <label htmlFor='comment'>Edit your comment</label>
      <br />
      <textarea onChange={handleCommentChange} value={comment} />
      <br />
      <input
        checked={spoiler}
        id='spoiler'
        onChange={handleSpoilerChange}
        type='checkbox'
      />
      <label htmlFor='spoiler'>Is this spoiler?</label>
      <br />
      <button onClick={handleEdit} type='button'>
        Edit comment
      </button>
    </>
  );

  if (isRemoved) {
    return null;
  }

  return (
    <>
      {fetching && isEditing && <MuiLinearProgress />}
      {fetching && isRemoving && <MuiLinearProgress />}
      <MuiListItem
        classes={{
          root: classes.listItemRoot,
        }}
        component={MuiPaper}
      >
        <MuiListItemText
          primary={
            <MuiGrid container justify='space-between'>
              <MuiGrid item>
                <MuiTypography display='inline' variant='body2'>
                  {review ? 'Review' : 'Shout'} by {username}
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
              editor
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

Single.propTypes = {
  comment: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  review: PropTypes.bool.isRequired,
  spoiler: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  userRating: PropTypes.number,
  userSlug: PropTypes.string.isRequired,
};

export default Single;
