import PropTypes from 'prop-types';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

export default function Notifications({
  displayDrawer = false,
  notifications = [],
}) {
  const hasItems = Array.isArray(notifications) && notifications.length > 0;

  return (
    <div className="Notifications" style={{ position: 'relative' }}>
      {/* Toujours visible */}
      <div className="notification-title">Your notifications</div>

      {/* Visible seulement si le drawer est ouvert */}
      {displayDrawer && (
        <div className="notification-items">
          {hasItems ? (
            <>
              <p>Here is the list of notifications</p>

              <ul>
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                  />
                ))}
              </ul>

              <button
                type="button"
                aria-label="Close"
                className="Notifications-close"
                onClick={() => console.log('Close button has been clicked')}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <img src={closeIcon} alt="close" width="10" height="10" />
              </button>
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>
      )}
    </div>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
};
