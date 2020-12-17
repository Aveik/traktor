import {
  Paper as MuiPaper,
  Tab as MuiTab,
  Tabs as MuiTabs,
} from '@material-ui/core';
import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const LINKS = [
  ['Ratings', 'ratings'],
  ['Recommendations', 'recommendations'],
  ['Watchlist', 'watchlist'],
  ['Lists', 'lists'],
  ['Comments', 'comments'],
];

function Users() {
  const { userSlug } = useParams();
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
      <Outlet />
    </>
  );
}

export default Users;
