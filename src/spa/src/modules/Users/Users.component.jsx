import {
  Box as MuiBox,
  Button as MuiButton,
  Paper as MuiPaper,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Tooltip as MuiTooltip,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';

import { selectIsFollowedFactory } from '../../redux/modules/users/profile/followers/followers.profile';
import {
  followAndRefetch,
  unfollowAndRefetch,
} from '../../redux/modules/users/profile/followers/followers.slice';
import { getUserSlug } from '../../utils';

const LINKS = [
  ['Ratings', 'ratings'],
  ['Recommendations', 'recommendations'],
  ['Watchlist', 'watchlist'],
  ['Lists', 'lists'],
  ['Comments', 'comments'],
];

async function checkIfTraktorUser(slug) {
  try {
    await axios.get(`/api/users/${slug}`);
    return true;
  } catch (err) {
    return false;
  }
}

function Users() {
  const selector = useMemo(selectIsFollowedFactory, []);
  const { userSlug } = useParams();
  const dispatch = useDispatch();
  const [isTraktorUser, setIsTraktorUser] = useState(false);
  const isFollowed = useSelector((state) => selector(state, userSlug));

  console.log(isFollowed);

  useEffect(() => {
    checkIfTraktorUser(userSlug).then(setIsTraktorUser);
  }, [dispatch, userSlug]);

  function handleFollow() {
    if (isFollowed) {
      dispatch(unfollowAndRefetch(userSlug));
      return;
    }
    dispatch(followAndRefetch(userSlug));
  }

  return (
    <>
      <MuiPaper square>
        <MuiTabs
          centered
          indicatorColor='secondary'
          textColor='secondary'
          value={false}
        >
          {LINKS.map(([label, url]) => (
            <MuiTab
              activeClassName='Mui-selected'
              component={NavLink}
              key={url}
              label={label}
              to={`/app/users/${userSlug}/${url}`}
            />
          ))}
        </MuiTabs>
      </MuiPaper>
      {userSlug !== getUserSlug() && (
        <MuiBox p={2} textAlign='right'>
          <MuiTooltip
            title={
              isTraktorUser
                ? 'Follow or unfollow'
                : 'This user is not traktor user'
            }
          >
            <span>
              <MuiButton
                color='secondary'
                disabled={!isTraktorUser}
                onClick={handleFollow}
                variant='outlined'
              >
                {isFollowed ? 'Unfollow' : 'Follow'}
              </MuiButton>
            </span>
          </MuiTooltip>
        </MuiBox>
      )}
      <Outlet />
    </>
  );
}

export default Users;
