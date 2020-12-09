import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Popover as MuiPopover,
  Typography as MuiTypography,
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

function ListItemManager({ children, entity, slug }) {
  const listsSelector = useMemo(selectListsForManagerFactory, []);
  const loadingSelector = useMemo(selectLoadingFlagsReducedFactory, []);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const loading = useSelector((state) =>
    loadingSelector(state, ['profile/list/add', 'profile/list/remove']),
  );
  const lists = useSelector((state) => listsSelector(state, entity, slug));
  const listedOnCount = useMemo(
    () => lists.filter(({ listed }) => listed).length,
    [lists],
  );
  const open = Boolean(anchorEl);

  function handleOpen(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(entity, listed, listSlug) {
    return function () {
      let fn = addToListAndRefetch;
      if (listed) {
        fn = removeFromListAndRefetch;
      }
      dispatch(fn({ entity, listSlug, slug }));
    };
  }

  //@TODO: implement proper loading component
  //@TODO: implement design
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
        <MuiCard>
          <MuiCardContent>
            {loading
              ? 'Loading...'
              : lists.map(({ listed, name, slug }) => (
                  <div key={slug} onClick={handleClick(entity, listed, slug)}>
                    {name}
                  </div>
                ))}
          </MuiCardContent>
        </MuiCard>
      </MuiPopover>
    </>
  );
}

ListItemManager.propTypes = {
  entity: PropTypes.oneOf(['movies', 'people', 'shows']).isRequired,
  slug: PropTypes.string.isRequired,
};

export default ListItemManager;
