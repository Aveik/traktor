import {
  Checkbox as MuiCheckbox,
  LinearProgress as MuiLinearProgress,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemIcon as MuiListItemAction,
  ListItemText as MuiListItemText,
  ListSubheader as MuiListSubheader,
  Popover as MuiPopover,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectLoadingFlagsReducedFactory } from '../../redux/loading/loading.selectors';
import {
  addToListAndRefetch,
  removeFromListAndRefetch,
} from '../../redux/modules/profile/list/list.slice';
import { selectListsForManagerFactory } from '../../redux/modules/profile/lists/lists.selectors';
import useStyles from './ListItemManager.styles';

function ListItemManager({ children, entity, slug }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listsSelector = useMemo(selectListsForManagerFactory, []);
  const loadingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const loading = useSelector((state) =>
    loadingSelector(state, ['profile/list/add', 'profile/list/remove']),
  );
  const lists = useSelector((state) => listsSelector(state, entity, slug));
  const [anchorEl, setAnchorEl] = useState(null);
  const listedOnCount = useMemo(
    () => lists.filter(({ listed }) => listed).length,
    [lists],
  );
  const open = Boolean(anchorEl);
  const [mirror, setMirror] = useState({});

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(entity, listed, listSlug) {
    return function () {
      let fn = addToListAndRefetch;
      let value = true;
      if (listed) {
        fn = removeFromListAndRefetch;
        value = false;
      }
      dispatch(fn({ entity, listSlug, slug }));
      setMirror({ ...mirror, [listSlug]: value });
    };
  }

  return (
    <>
      {children(handleOpen, listedOnCount)}
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
        {loading && <MuiLinearProgress />}
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
                  checked={slug in mirror ? mirror[slug] : listed}
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
  slug: PropTypes.string.isRequired,
};

export default ListItemManager;
