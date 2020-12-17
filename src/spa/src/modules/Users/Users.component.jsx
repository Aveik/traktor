import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function Users() {
  const { userSlug } = useParams();
  return (
    <>
      <ul>
        <li>
          <Link to={`/app/users/${userSlug}/ratings`}>Ratings</Link>
        </li>
        <li>
          <Link to={`/app/users/${userSlug}/recommendations`}>
            Recommendations
          </Link>
        </li>
        <li>
          <Link to={`/app/users/${userSlug}/watchlist`}>Watchlist</Link>
        </li>
        <li>
          <Link to={`/app/users/${userSlug}/lists`}>Lists</Link>
        </li>
        <li>
          <Link to={`/app/users/${userSlug}/comments`}>Comments</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}

export default Users;
