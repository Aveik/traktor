import React from 'react';
import { useDispatch } from 'react-redux';

import { removeNotification } from '../../../redux/notifications/notifications.slice';

function Notification({ id, message }) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(removeNotification(id));
  }

  return <div onClick={handleClick}>{message}</div>;
}

export default Notification;
