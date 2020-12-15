import {
  Button as MuiButton,
  Checkbox as MuiCheckbox,
  IconButton as MuiIconButton,
  LinearProgress as MuiLinearProgress,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemAction,
  ListItemText as MuiListItemText,
  ListSubheader as MuiListSubheader,
  Popover as MuiPopover,
  Tooltip as MuiTooltip,
} from '@material-ui/core';
import { List as ListIcon } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlagsReducedFactory } from '../../../redux/loading/loading.selectors';
import {
  addToListAndRefetch,
  removeFromListAndRefetch,
} from '../../../redux/modules/users/list/list.slice';
import { selectListsForManagerFactory } from '../../../redux/modules/users/lists/lists.selectors';
import useStyles from './ListItemManager.styles';

function ListItemManager({ entity, size = 'default', slug }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listsSelector = useMemo(selectListsForManagerFactory, []);
  const loadingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const loading = useSelector((state) =>
    loadingSelector(state, [
      'users/lists/fetch',
      'users/list/add',
      'users/list/remove',
    ]),
  );
  const lists = useSelector((state) => listsSelector(state, entity, slug));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const listedOnCount = useMemo(
    () => lists.filter(({ listed }) => Boolean(listed)).length,
    [lists],
  );

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  //@TODO: catch in case recommendation failed
  function handleClick(entity, listed, listSlug) {
    return function () {
      let fn = addToListAndRefetch;
      if (listed) {
        fn = removeFromListAndRefetch;
      }
      dispatch(fn({ entity, listSlug, slug }));
    };
  }

  let button = (
    <MuiButton
      color={listedOnCount ? 'secondary' : 'inherit'}
      disabled={loading}
      onClick={handleOpen}
      startIcon={<ListIcon />}
    >
      {listedOnCount ? `Listed on ${listedOnCount} lists` : 'Add to your lists'}
    </MuiButton>
  );

  if (size === 'small') {
    button = (
      <MuiTooltip
        title={
          listedOnCount
            ? `Listed on ${listedOnCount} lists`
            : 'Add to your lists'
        }
      >
        <MuiIconButton
          color={listedOnCount ? 'secondary' : 'inherit'}
          onClick={handleOpen}
          size='small'
        >
          <ListIcon fontSize='small' />
        </MuiIconButton>
      </MuiTooltip>
    );
  }

  return (
    <>
      {button}
      <MuiPopover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
      >
        {loading && <MuiLinearProgress color='secondary' />}
        <MuiList
          dense
          subheader={
            <MuiListSubheader>
              Listed on {listedOnCount} of {lists.length} lists
            </MuiListSubheader>
          }
        >
          {lists.map(({ listed, name, slug }) => (
            <MuiListItem
              button
              disabled={loading}
              key={slug}
              onClick={handleClick(entity, listed, slug)}
            >
              <MuiListItemAction
                classes={{
                  root: classes.listItemActionRoot,
                }}
              >
                <MuiCheckbox
                  checked={listed}
                  disableRipple
                  edge='start'
                  size='small'
                />
              </MuiListItemAction>
              <MuiListItemText>{name}</MuiListItemText>
            </MuiListItem>
          ))}
        </MuiList>
      </MuiPopover>
    </>
  );
}

ListItemManager.propTypes = {
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  size: PropTypes.oneOf(['default', 'small']),
  slug: PropTypes.string.isRequired,
};

export default ListItemManager;
