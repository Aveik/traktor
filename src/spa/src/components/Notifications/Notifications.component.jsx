import React from 'react';
import { useSelector } from 'react-redux';

import { selectNotifications } from '../../redux/notifications/notifications.selectors';
import Single from './Single/Single.component';

function Notifications() {
  const notifications = useSelector(selectNotifications);
  return notifications.map(({ id, message }) => (
    <Single id={id} key={id} message={message} />
  ));
}

export default Notifications;
