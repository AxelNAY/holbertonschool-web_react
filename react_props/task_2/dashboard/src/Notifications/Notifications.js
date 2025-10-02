import './Notifications.css';
import NotificationItem from './NotificationItem';
import closeIcon from '../assets/close-icon.png';

export default function Notifications({ notifications = [] }) {
  return (
    <div className="Notifications" style={{ position: 'relative' }}>
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.map(({ id, type, value, html }) => (
          <NotificationItem key={id} type={type} value={value} html={html} />
        ))}
      </ul>

      <button
        aria-label="Close"
        style={{ position: 'absolute', top: 10, right: 10, background: 'none', cursor: 'pointer' }}
      >
        <img src={closeIcon} alt="close" style={{ width: 10, height: 10 }} />
      </button>
    </div>
  );
}
