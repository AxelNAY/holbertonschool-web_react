import React from 'react';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';

export default function Notifications({ notifications = [] }) {
  const listToRender = (notifications && notifications.length)
    ? notifications
    : [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent',  value: 'New resume available' },
        { id: 3, type: 'urgent',  html: { __html: getLatestNotification() } },
      ];

  return (
    <div className="Notifications" style={{ position: 'relative' }}>
      <p>Here is the list of notifications</p>
      <ul>
        {listToRender.map(({ id, type, value, html }) => (
          <NotificationItem key={id} type={type} value={value} html={html} />
        ))}
      </ul>

      {/* ⚠️ le onClick DOIT être sur le <button>, pas sur l’<img> */}
      <button
        onClick={() => console.log('Close button has been clicked')}
        aria-label="Close"
        style={{ position: 'absolute', top: 10, right: 10, background: 'none', cursor: 'pointer' }}
      >
        <img src={closeIcon} alt="close" style={{ width: 10, height: 10 }} />
      </button>
    </div>
  );
}
