import React from 'react';
import { useSelector } from 'react-redux';

import { selectNotifications } from '../../redux/notifications/notifications.selectors';
import Notification from './Notification/Notification.component';

function Notifications() {
  const notifications = useSelector(selectNotifications);
  return Object.entries(notifications).map(([id, message]) => (
    <Notification id={id} key={id} message={message} />
  ));
}

export default Notifications;
