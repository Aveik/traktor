import React from 'react';
import { useDispatch } from 'react-redux';

import { removeNotification } from '../../../redux/notifications/notifications.slice';

function Single({ id, message }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(removeNotification(id));
  }

  return <div onClick={handleClick}>{message}</div>;
}

export default Single;
